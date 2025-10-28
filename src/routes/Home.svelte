<script>
  import { ui } from '../lib/stores/ui.js';
  import { fly } from 'svelte/transition';
  import VideoReel from '../components/VideoReel.svelte';
  $: mode = $ui.homeMode; // 'watch' | 'hadith'
  $: holdToggle = $ui.homeToggle === 'hold';
  let dirX = 0; let lastMode = mode;
  function setMode(m) {
    if (m !== mode) {
      dirX = holdToggle ? 0 : (m === 'hadith' ? 40 : -40);
      ui.update(s => ({ ...s, homeMode: m }));
    }
  }
  $: if (mode !== lastMode) { dirX = holdToggle ? 0 : (mode === 'hadith' ? 40 : -40); lastMode = mode; }
  const videos = Array.from({ length: 4 }).map((_, i) => ({ id: i + 1, title: 'Islamic Reminder', author: 'Ustadh • @channel', duration: '1:23' }));
  const ahadith = [
    { id: 1, text: '“Actions are judged by intentions...” — Bukhari & Muslim' },
    { id: 2, text: '“Let him speak good or remain silent.” — Bukhari' },
    { id: 3, text: '“Strong is the one who controls anger.” — Bukhari & Muslim' }
  ];
  // Prototype reel sources. Place files under /public/videos/
  const reels = [
    { id: 1, src: '/videos/1.mp4' },
    { id: 2, src: '/videos/2.mp4' },
    { id: 3, src: '/videos/3.mp4' },
    { id: 4, src: '/videos/4.mp4' }
  ];
  let activeId = null;
  let globalMuted = true;
  let liked = new Set();
  let saved = new Set();

  const toggleValue = (set, id) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  };
  const toggleLike = (id) => { liked = toggleValue(liked, id); };
  const toggleSave = (id) => { saved = toggleValue(saved, id); };
  const isLiked = (id) => liked.has(id);
  const isSaved = (id) => saved.has(id);
</script>

{#if !holdToggle}
<header class="bar">
  <div class="toggle">
    <button class:active={mode==='watch'} on:click={() => setMode('watch')}>Watch</button>
    <button class:active={mode==='hadith'} on:click={() => setMode('hadith')}>Hadith</button>
  </div>
</header>
{/if}

{#if mode === 'watch'}
  <section class="feed" class:compact={holdToggle} transition:fly={{ x: dirX, duration: 220 }}>
    {#each reels as r}
      <article class="card">
        <VideoReel
          id={r.id}
          src={r.src}
          {activeId}
          muted={globalMuted}
          on:active={(e) => activeId = e.detail.id}
          on:mutetoggle={(e) => globalMuted = e.detail.muted}
        />

        <div class="actions">
          <button class="icon" aria-label="Like"
                  class:active={isLiked(r.id)}
                  on:click={() => toggleLike(r.id)}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M12 21s-6-4.4-8.5-7C1.5 11 3 6.5 7 6.5c2 0 3.2 1.2 5 3 1.8-1.8 3-3 5-3 4 0 5.5 4.5 3.5 7.5C18 16.6 12 21 12 21z"
                    fill={isLiked(r.id) ? 'var(--accent)' : 'none'}
                    stroke={isLiked(r.id) ? 'var(--accent)' : 'var(--accent)'}
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <a class="icon" aria-label="Download" href={r.src} download>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M12 3v12m0 0l4-4m-4 4l-4-4M4 21h16"
                    fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" />
            </svg>
          </a>

          <span class="spacer" />

          <button class="icon" aria-label="Bookmark"
                  class:active={isSaved(r.id)}
                  on:click={() => toggleSave(r.id)}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M6 4h12v17l-6-3-6 3V4z"
                    fill={isSaved(r.id) ? 'var(--accent)' : 'none'}
                    stroke={isSaved(r.id) ? 'var(--accent)' : 'var(--accent)'}
                    stroke-width="2" />
            </svg>
          </button>
        </div>
      </article>
    {/each}
  </section>
{:else}
  <section class="list" class:compact={holdToggle} transition:fly={{ x: dirX, duration: 220 }}>
    {#each ahadith as h}
      <article class="hadith">
        <div class="quote">
          <svg class="quote-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M7 11c0-3.866 3.134-7 7-7v3c-2.209 0-4 1.791-4 4h4v7H7v-7zm-6 0C1 7.134 4.134 4 8 4v3C5.791 7 4 8.791 4 11h4v7H1v-7z" fill="var(--accent)" opacity="0.25"/>
          </svg>
          <p class="text">{h.text}</p>
        </div>
        <div class="actions">
          <button class="icon" aria-label="Like">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M12 21s-6-4.4-8.5-7C1.5 11 3 6.5 7 6.5c2 0 3.2 1.2 5 3 1.8-1.8 3-3 5-3 4 0 5.5 4.5 3.5 7.5C18 16.6 12 21 12 21z"
                fill="none" stroke="var(--accent)" stroke-width="2" />
            </svg>
          </button>
          <button class="icon" aria-label="Share">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 7l-4-4-4 4M12 3v13"
                fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <span class="spacer" />
          <button class="icon" aria-label="Bookmark">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M6 4h12v17l-6-3-6 3V4z" fill="none" stroke="var(--accent)" stroke-width="2" />
            </svg>
          </button>
        </div>
      </article>
    {/each}
  </section>
{/if}

<style>
  .bar { position: fixed; top: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 440px; background: transparent; padding: 8px 12px; z-index: 5; }
  .toggle { display: grid; grid-template-columns: 1fr 1fr; align-items: center; }
  .toggle button { background: none; color: var(--fg); border: none; padding: 10px 0; font-weight: 800; font-size: 15px; letter-spacing: 0.2px; }
  .toggle button.active { color: var(--accent-dark); border-bottom: 3px solid var(--accent-dark); }

  .feed { padding: 68px 10px 10px; display: grid; gap: 14px; }
  .feed.compact { padding: 10px; }
  .card { background: transparent; border: none; border-radius: 0; overflow: visible; }
  .video {
    aspect-ratio: 9/16;
    background: linear-gradient(180deg, #1a1d1f, #0f1113);
    display: grid; place-items: end;
    border: none;
    border-radius: 10px;
    overflow: hidden;
  }
  .badge { margin: 8px; padding: 2px 8px; border-radius: 999px; background: rgba(0,0,0,.6); color: #fff; font-size: 12px; }
  .meta { padding: 10px 12px 4px; }
  .title { font-weight: 600; }
  .sub { color: var(--muted); font-size: 12px; margin-top: 2px; }
  .actions { display: flex; align-items: center; gap: 10px; padding: 8px 0 10px 0; }
  .spacer { flex: 1; }
  .icon { background: transparent; border: none; padding: 6px; border-radius: 8px; }
  .icon:active { background: #15181a; }

  /* No custom feed scroller here; we use .content scroll which hides bars */

  .list { padding: 68px 10px 10px; display: grid; gap: 0; }
  .list.compact { padding: 10px; }
  .hadith { padding: 14px 0; border-bottom: 1px solid var(--border); }
  .quote { position: relative; padding: 6px 8px 8px 16px; border-left: 3px solid var(--accent); }
  .quote-icon { position: absolute; top: -2px; left: -2px; }
  .text { margin: 0 0 8px; line-height: 1.6; font-size: 15px; }
</style>
