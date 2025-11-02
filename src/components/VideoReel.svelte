<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { overlay as overlayStore } from '../lib/stores/overlay.js';

  export let id;
  export let src;
  export let poster = '';
  export let muted = true; // controlled by parent across all reels
  export let activeId = null; // controlled by parent to ensure only one plays

  let container;
  let frame;
  let video;
  let observer;
  let showIndicator = false;
  let indicator = 'muted'; // 'muted' | 'unmuted'
  let indicatorTimer;
  let holdTimer;
  let holding = false;
  let pressing = false;
  let duration = 0;
  let currentTime = 0;
  $: progress = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;
  let scrubbing = false;
  let wasPlaying = false;
  let rafId;
  let startX = 0, startY = 0;
  const MOVE_CANCEL_PX = 12; // cancel tap if user scrolls/drags more than this
  let lastVisible = false;

  function startRaf() {
    stopRaf();
    const loop = () => {
      if (video && !video.paused && !scrubbing) {
        currentTime = video.currentTime || 0;
        rafId = requestAnimationFrame(loop);
      }
    };
    rafId = requestAnimationFrame(loop);
  }
  function stopRaf() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }

  const dispatch = createEventDispatcher();
  let showMenu = false;
  export let contributed = false;

  function showMuteIndicator(state) {
    indicator = state ? 'muted' : 'unmuted';
    showIndicator = true;
    clearTimeout(indicatorTimer);
    indicatorTimer = setTimeout(() => (showIndicator = false), 3000);
  }

  function toggleMute() {
    const next = !muted;
    if (video) video.muted = next;
    showMuteIndicator(next);
    dispatch('mutetoggle', { muted: next, id });
  }

  function onPointerDown(e) {
    clearTimeout(holdTimer);
    holding = false;
    pressing = true;
    const t = e.touches?.[0] ?? e;
    startX = t.clientX ?? 0;
    startY = t.clientY ?? 0;
    holdTimer = setTimeout(() => {
      holding = true;
      if (video) video.pause();
    }, 400);
  }

  function onPointerUp() {
    clearTimeout(holdTimer);
    if (!pressing) return; // ignore stray ups/leaves
    if (holding) {
      holding = false;
      if (video) video.play().catch(() => {});
    } else {
      toggleMute();
    }
    pressing = false;
  }

  function onCancel() {
    clearTimeout(holdTimer);
    holding = false;
    pressing = false;
  }

  function onPointerMove(e) {
    if (!pressing || scrubbing) return;
    const t = e.touches?.[0] ?? e;
    const dx = (t.clientX ?? 0) - startX;
    const dy = (t.clientY ?? 0) - startY;
    if (Math.abs(dx) > MOVE_CANCEL_PX || Math.abs(dy) > MOVE_CANCEL_PX) {
      // Consider it a scroll/drag; cancel tap/hold so release won't toggle mute
      clearTimeout(holdTimer);
      holding = false;
      pressing = false;
    }
  }

  let progressEl;
  function seekByClientX(clientX) {
    if (!video || !duration || !progressEl) return;
    const rect = progressEl.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const r = rect.width > 0 ? x / rect.width : 0;
    const t = r * duration;
    try { video.currentTime = t; } catch {}
    currentTime = t;
  }
  function onProgressDown(e) {
    e.stopPropagation();
    scrubbing = true;
    wasPlaying = !!video && !video.paused;
    if (wasPlaying) { try { video.pause(); } catch {} }
    // Support mouse/touch/pointer
    const clientX = e.touches?.[0]?.clientX ?? e.clientX;
    seekByClientX(clientX);
  }
  function onProgressMove(e) {
    if (!scrubbing) return;
    e.stopPropagation();
    const clientX = e.touches?.[0]?.clientX ?? e.clientX;
    seekByClientX(clientX);
  }
  function onProgressUp(e) {
    if (!scrubbing) return;
    e.stopPropagation();
    scrubbing = false;
    if (wasPlaying) { try { video.play(); } catch {} }
    startRaf();
  }

  function handleVisibility(entries) {
    for (const entry of entries) {
      if (entry.target !== container) continue;
      const visible = entry.intersectionRatio >= 0.5;
      if (visible) {
        if ($overlayStore) { lastVisible = true; return; }
        // restart from beginning when becoming visible again
        if (!lastVisible && video) {
          try { video.currentTime = 0; } catch {}
        }
        if (video && (activeId === null || activeId === id)) {
          video.muted = muted;
          video.play().catch(() => {});
        }
        dispatch('active', { id });
      } else {
        if (video) {
          try { video.pause(); } catch {}
          try { video.currentTime = 0; } catch {}
        }
      }
      lastVisible = visible;
    }
  }

  // Pause immediately when another reel is set active
  $: if (video && activeId !== null && activeId !== id) { video.pause(); }
  $: if (video) { video.muted = muted; }
  $: if (video && $overlayStore) { try { video.pause(); } catch {} }

  onMount(() => {
    if (video) { video.muted = muted; }
    observer = new IntersectionObserver(handleVisibility, {
      root: null,
      threshold: [0, 0.5, 1]
    });
    if (container) observer.observe(container);

    // Proactively try to play if already ≥50% visible
    setTimeout(() => {
      try {
        if (!container || !video) return;
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
        const ratio = visible / Math.max(1, rect.height);
        if (ratio >= 0.5 && !$overlayStore) {
          video.muted = muted;
          video.play().catch(() => {});
          dispatch('active', { id });
          startRaf();
          lastVisible = true;
        }
      } catch {}
    }, 0);

    function onPlay() { startRaf(); dispatch('active', { id }); }
    function onPause() { stopRaf(); }
    function onEnded() { stopRaf(); }
    video?.addEventListener('play', onPlay);
    video?.addEventListener('pause', onPause);
    video?.addEventListener('ended', onEnded);

    return () => {
      video?.removeEventListener('play', onPlay);
      video?.removeEventListener('pause', onPause);
      video?.removeEventListener('ended', onEnded);
    };
  });

  onDestroy(() => {
    if (observer && container) observer.unobserve(container);
    clearTimeout(indicatorTimer);
    clearTimeout(holdTimer);
    stopRaf();
    if (video) {
      try { video.pause(); } catch {}
      try { if (typeof video.src === 'string' && video.src.startsWith('blob:')) URL.revokeObjectURL(video.src); } catch {}
      try { video.src = video.src; } catch {}
    }
  });
</script>

<section
  bind:this={container}
  class="reel"
  role="group"
  on:click={() => showMenu = false}
  on:pointerdown={onPointerDown}
  on:pointerup={onPointerUp}
  on:pointercancel={onCancel}
  on:mouseleave={onCancel}
  on:touchstart={onPointerDown}
  on:touchmove={onPointerMove}
  on:pointermove={onPointerMove}
  on:touchcancel={onCancel}
  on:dblclick={() => dispatch('dblclick', { id })}
>
  <div class="frame" bind:this={frame}>
    <video
      bind:this={video}
      class="video"
      src={src}
      {poster}
      autoplay
      playsinline
      webkit-playsinline
      preload="metadata"
      muted
      loop
      on:loadedmetadata={() => { try { duration = video?.duration || 0; } catch {} }}
      on:timeupdate={() => { try { currentTime = video?.currentTime || 0; } catch {} }}
    />

    <!-- progress and indicators below -->

    <div
      class="progress {scrubbing ? 'active' : ''}"
      bind:this={progressEl}
      on:pointerdown|stopPropagation={onProgressDown}
      on:pointermove|stopPropagation={onProgressMove}
      on:pointerup|stopPropagation={onProgressUp}
      on:touchstart|stopPropagation|preventDefault={onProgressDown}
      on:touchmove|stopPropagation|preventDefault={onProgressMove}
      on:touchend|stopPropagation|preventDefault={onProgressUp}
    >
      <div class="progress-fill" style={`width: ${Math.round(progress * 1000) / 10}%`}></div>
    </div>

    {#if showIndicator}
      <div class="mute-indicator" transition:fade>
        {#if indicator === 'muted'}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10h4l5-4v12l-5-4H4z" fill="currentColor"/>
            <path d="M16.5 8.5l5 5m0-5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10h4l5-4v12l-5-4H4z" fill="currentColor"/>
            <path d="M17 9a5 5 0 010 6M15 7a8 8 0 010 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        {/if}
      </div>
    {/if}
  </div>
  <!-- Top-right menu (3 vertical dots) placed outside, above the video frame -->
  <button class="more" aria-label="More options" on:click|stopPropagation={() => showMenu = !showMenu}>
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <circle cx="12" cy="5" r="2" fill="currentColor"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <circle cx="12" cy="19" r="2" fill="currentColor"/>
    </svg>
  </button>
  {#if showMenu}
    <div class="menu" role="menu" on:click|stopPropagation>
      {#if contributed}
        <button class="item" on:click={() => { showMenu = false; dispatch('delete', { id }); }}>Delete</button>
      {:else}
        <button class="item" on:click={() => { showMenu = false; alert('Reported.'); }}>Report</button>
      {/if}
    </div>
  {/if}
</section>

<style>
  .reel { position: relative; }
  .frame {
    position: relative;
    aspect-ratio: 9/16;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    background: linear-gradient(180deg, #1a1d1f, #0f1113);
  }
  .more {
    position: absolute;
    top: -29px; right: 0px;
    background: transparent;
    color: var(--icon);
    border: none;
    border-radius: 0;
    padding: 0;
    z-index: 3;
  }
  .menu {
    position: absolute; top: 10px; right: 0;
    background: var(--card);
    color: var(--fg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 6px;
    z-index: 3;
    box-shadow: 0 8px 24px rgba(0,0,0,0.22);
  }
  .menu .item {
    background: transparent;
    border: none;
    color: var(--fg);
    padding: 8px 10px;
    border-radius: 8px;
    width: 120px;
    text-align: left;
  }
  .menu .item:active { background: var(--border); }
  .video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .progress {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 3px;
    background: var(--border); /* track */
    pointer-events: auto;
  }
  .progress-fill {
    height: 100%;
    width: 0%;
    background: var(--icon); /* white in dark, black in light */
    transition: width .06s linear;
  }
  /* Light mode: keep shadow for visibility */
  :global(html[data-theme="light"]) .progress-fill {
    box-shadow: 0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.22), 0 0 4px rgba(0,0,0,0.18);
  }
  /* Apply elevated contrast only during active click/drag (no hover) */
  .progress.active {
    box-shadow:
      0 0 0 1px rgba(0,0,0,0.18),
      inset 0 1px 1px rgba(0,0,0,0.2);
  }
  .progress.active .progress-fill {
    filter: drop-shadow(0 0 2px rgba(0,0,0,0.35));
  }
  .mute-indicator {
    position: absolute;
    right: 8px;
    bottom: 8px;
    background: rgba(0,0,0,0.45);
    color: #fff;
    border-radius: 999px;
    padding: 8px;
    display: grid; place-items: center;
  }
  .mute-indicator svg { width: 22px; height: 22px; }
</style>
