<script>
  import { nav } from '../lib/stores/nav.js';
  import { fly } from 'svelte/transition';
  import VideoReel from '../components/VideoReel.svelte';
  import ProfileMenu from '../components/ProfileMenu.svelte';
  import SalahStatus from '../components/SalahStatus.svelte';
  
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
  let showProfile = false;
  let showSalah = false;
  let showActivity = false; // bookmarked overlay

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

<!-- Header: Salah status (left) and Profile menu (right) -->
<header class="top">
  <div class="top-box" />
  <div class="left">
    <SalahStatus open={showSalah} on:toggle={() => { showSalah = !showSalah; if (showSalah) showProfile = false; }} />
  </div>
  <div class="right">
    <button class="icon" aria-label="Profile Menu" on:click={() => { const next = !showProfile; showProfile = next; if (next) showSalah = false; }}>
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" fill="none" stroke="var(--icon)" stroke-width="2"/>
        <path d="M4 21c1.8-3.5 5-5 8-5s6.2 1.5 8 5" fill="none" stroke="var(--icon)" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="menu-wrap">
      <ProfileMenu open={showProfile}
        on:settings={() => { showProfile = false; nav.set('forward'); location.hash = '#/settings'; }}
        on:activity={() => { showActivity = true; showProfile = false; }}
        on:quran={() => { try { window.open('https://quran.com/','_blank'); } catch {} ; showProfile = false; }}
        on:login={() => { showProfile = false; alert('Login flow to be implemented'); }}
        on:signup={() => { showProfile = false; alert('Signup flow to be implemented'); }}
      />
    </div>
  </div>
</header>

{#if showProfile || showSalah}
  <div class="click-capture" on:click={() => { showProfile = false; showSalah = false; }} />
{/if}

  <section class="feed">
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
          <a class="icon" aria-label="Download" href={r.src} download>
            <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
              <circle cx="14" cy="14" r="12" fill="none" stroke="var(--action-icon)" stroke-width="2"/>
              <path d="M14 7v9m0 0l3.5-3.5M14 16l-3.5-3.5M6 21h16" fill="none" stroke="var(--action-icon)" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </a>

          <span class="spacer" />

          <button class="icon" aria-label="Bookmark"
                  class:active={isSaved(r.id)}
                  on:click={() => toggleSave(r.id)}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M6 4h12v17l-6-3-6 3V4z"
                    fill={isSaved(r.id) ? 'var(--action-icon-active)' : 'none'}
                    stroke={isSaved(r.id) ? 'var(--action-icon-active)' : 'var(--action-icon)'}
                    stroke-width="2" />
            </svg>
          </button>
        </div>
      </article>
    {/each}
  </section>

{#if showActivity}
  <div class="overlay" on:click={() => showActivity = false}>
    <div class="panel" on:click|stopPropagation>
      <div class="panel-head">
        <button class="back" on:click={() => showActivity = false}>&lt; Activity</button>
        <h3>Bookmarked Videos</h3>
        <span class="pad" />
      </div>
      {#if saved.size === 0}
        <div class="empty">No bookmarks yet.</div>
      {:else}
        <ul class="bookmarks">
          {#each reels.filter(r => saved.has(r.id)) as r}
            <li>
              <span>Video #{r.id}</span>
              <a href={r.src} download>Download</a>
            </li>
          {/each}
        </ul>
      {/if}
      <div class="actions"><button class="close" on:click={() => showActivity = false}>Close</button></div>
    </div>
  </div>
{/if}

<style>
  .top {
    position: sticky; top: 0; z-index: 20;
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 10px; background: transparent;
  }
  .top-box {
    position: absolute; top: 0; left: 0; right: 0; height: 100%;
    background: var(--nav-bg);
    border-bottom-left-radius: 15px; border-bottom-right-radius: 15px;
    border-top-left-radius: 0; border-top-right-radius: 0;
    z-index: 0;
  }
  .top > .left, .top > .right { position: relative; z-index: 1; }
  .right { position: relative; }
  .menu-wrap { position: absolute; right: 0; top: 0; }
  .click-capture { position: fixed; inset: 0; z-index: 10; }
  .feed { padding: 20px 10px 10px; display: grid; gap: 12px; }
  .card {
    background: transparent;
    border: none;
    border-radius: 0;
    overflow: visible;
    /* Ensure each reel page fills the visible content area so next card doesn't peek */
    min-height: calc(100vh - 96px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  @supports (height: 100svh) {
    .card { min-height: calc(100svh - 96px); }
  }
  @supports (height: 100dvh) {
    .card { min-height: calc(100dvh - 96px); }
  }
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

  .list { padding: 20px 10px 10px; display: grid; gap: 0; }
  .hadith { padding: 14px 0; border-bottom: 1px solid var(--border); }
  .quote { position: relative; padding: 6px 8px 8px 16px; border-left: 3px solid var(--accent); }
  .quote-icon { position: absolute; top: -2px; left: -2px; }
  .text { margin: 0 0 8px; line-height: 1.6; font-size: 15px; }
  /* Activity overlay */
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: grid; place-items: center; z-index: 60; }
  .panel { width: min(420px, 92vw); background: var(--card); color: var(--fg); border: 1px solid var(--border); border-radius: 12px; padding: 12px; }
  .panel-head { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 8px; margin-bottom: 8px; }
  .panel h3 { margin: 0; text-align: center; }
  .panel .back { background: chocolate; color: var(--nav-bg); border: 1px solid chocolate; border-radius: 8px; padding: 6px 10px; font-weight: 700; }
  .panel .back:hover { filter: brightness(0.95); }
  /* Light mode gradient for back button in Activity panel */
  :global(html[data-theme="light"]) .panel .back {
    background: linear-gradient(to right, chocolate, #8b4513) !important;
    border-color: #8b4513;
    color: var(--nav-bg);
  }
  :global(html[data-theme="light"]) .panel .back:hover { filter: brightness(0.98); }
  .panel .pad { width: 44px; height: 1px; }
  .bookmarks { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
  .bookmarks li { display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border); border-radius: 10px; padding: 8px 10px; background: #00000006; }
  .close { width: 100%; background: var(--accent); color: var(--accent-contrast); border: none; border-radius: 10px; padding: 10px; margin-top: 10px; }
</style>
