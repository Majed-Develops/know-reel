<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

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
        if (video && (activeId === null || activeId === id)) {
          video.muted = muted;
          video.play().catch(() => {});
        }
        dispatch('active', { id });
      } else {
        if (video) video.pause();
      }
    }
  }

  // Pause immediately when another reel is set active
  $: if (video && activeId !== null && activeId !== id) { video.pause(); }
  $: if (video) { video.muted = muted; }

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
        if (ratio >= 0.5) {
          video.muted = muted;
          video.play().catch(() => {});
          dispatch('active', { id });
          startRaf();
        }
      } catch {}
    }, 0);

    function onPlay() { startRaf(); }
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
  });
</script>

<section
  bind:this={container}
  class="reel"
  role="group"
  on:pointerdown={onPointerDown}
  on:pointerup={onPointerUp}
  on:pointercancel={onCancel}
  on:mouseleave={onCancel}
  on:touchstart={onPointerDown}
  on:touchmove={onPointerMove}
  on:pointermove={onPointerMove}
  on:touchcancel={onCancel}
>
  <div class="frame" bind:this={frame}>
    <video
      bind:this={video}
      class="video"
      src={src}
      {poster}
      playsinline
      webkit-playsinline
      preload="metadata"
      muted
      loop
      on:loadedmetadata={() => { try { duration = video?.duration || 0; } catch {} }}
      on:timeupdate={() => { try { currentTime = video?.currentTime || 0; } catch {} }}
    />

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
    background: rgba(255,255,255,0.9); /* unfinished portion */
    pointer-events: auto;
  }
  .progress-fill {
    height: 100%;
    width: 0%;
    background: var(--accent); /* green in dark, brown in light */
    transition: width .06s linear;
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
