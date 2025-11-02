<script>
  import { nav } from '../lib/stores/nav.js';
  import { fly } from 'svelte/transition';
  import VideoReel from '../components/VideoReel.svelte';
  import { activity, toggleBookmarkVideo, toggleLikeVideo } from '../lib/stores/activity.js';
  import { reels as reelsStore, addReel, removeReel, restoreReel } from '../lib/stores/feed.js';
  import { push as pushToast } from '../lib/stores/toast.js';
  import { contributor } from '../lib/stores/contributor.js';
  
  const videos = Array.from({ length: 4 }).map((_, i) => ({ id: i + 1, title: 'Islamic Reminder', author: 'Ustadh • @channel', duration: '1:23' }));
  const ahadith = [
    { id: 1, text: '“Actions are judged by intentions...” — Bukhari & Muslim' },
    { id: 2, text: '“Let him speak good or remain silent.” — Bukhari' },
    { id: 3, text: '“Strong is the one who controls anger.” — Bukhari & Muslim' }
  ];
  // Static demo sources: place videos as 1.mp4 ... 10.mp4 under /public/videos
  $: reels = $reelsStore;
  let activeId = null;
  let globalMuted = true;
  let showShare = false;
  let shareFor = null; // video id for share actions
  // contributor inline URL post removed; use Add flow in navbar
</script>

<!-- Header removed per new UI spec -->


  <section class="feed reels">
    {#each reels as r}
      <article class="card">
        <VideoReel
          id={r.id}
          src={r.src}
          contributed={!!r.contributed}
          {activeId}
          muted={globalMuted}
          on:active={(e) => activeId = e.detail.id}
          on:mutetoggle={(e) => globalMuted = e.detail.muted}
          on:dblclick={() => toggleLikeVideo(r.id)}
          on:delete={() => { const removed = r; if (activeId === r.id) activeId = null; if (shareFor === r.id) { showShare = false; shareFor = null; } removeReel(r.id); pushToast('Video deleted', { action: { label: 'Undo', handler: () => restoreReel(removed) }, timeout: 4000 }); }}
        />

        <div class="actions">
          <!-- Like (left) -->
          <button class="icon" aria-label="Like"
                  class:active={$activity.likes.videos.includes(r.id)}
                  on:click={() => toggleLikeVideo(r.id)}>
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path d="M12 20s-7-4.8-7-9.5a3.8 3.8 0 0 1 6.5-2.2A3.8 3.8 0 0 1 19 10.5C19 15.2 12 20 12 20z"
                    fill={$activity.likes.videos.includes(r.id) ? 'currentColor' : 'none'}
                    stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
            </svg>
          </button>

          <!-- Download (middle) -->
          <a class="icon" aria-label="Download" href={r.src} download>
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path d="M12 4v10m0 0 3.5-3.5M12 14 8.5 10.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 15.5v2a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 17.5v-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </a>

          <span class="spacer" />

          <!-- Send/Share (right) -->
          <button class="icon" aria-label="Send"
                  on:click={() => { showShare = true; shareFor = r.id; }}>
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path d="m7 5 12 7-12 7 3-7-3-7z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        {#if r.caption}
          <div class="caption">{r.caption}</div>
        {/if}
      </article>
    {/each}
  </section>

{#if showShare}
  <div class="share-overlay" on:click={() => { showShare = false; shareFor = null; }}>
    <div class="share-bar" on:click|stopPropagation>
      <div class="handle" />
      <div class="share-row">
        <button class="share-item" aria-label="Share to WhatsApp" title="WhatsApp">
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" fill="#25D366"/>
            <path d="M16.6 14.2c-.2.6-1.2 1.1-1.7 1.2-.5.1-1 .1-1.7-.1-.4-.1-1-.3-1.7-.7a7.8 7.8 0 0 1-2.9-2.9c-.2-.4-.5-1.3-.7-1.7-.2-.7-.2-1.2-.1-1.7.1-.5.7-1.5 1.2-1.7.3-.1.7-.1.9 0 .2.1.5.7.6 1 .1.3.5 1.2.5 1.3.1.1.1.2 0 .4-.1.2-.2.3-.4.6-.1.1-.2.3-.3.4-.1.1-.2.2-.1.4.1.2.5.8 1.1 1.4.8.8 1.4 1.1 1.6 1.2.2.1.3.1.4 0 .1-.1.5-.6.6-.8.2-.2.3-.2.5-.1.2.1 1 .5 1.3.6.3.1.7.3.8.4.2.1.2.2.2.3Z" fill="#fff"/>
          </svg>
          <span>WhatsApp</span>
        </button>
        <button class="share-item" aria-label="Messages" title="Messages">
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-5 4V5Z" fill="currentColor"/>
          </svg>
          <span>Messages</span>
        </button>
        <button class="share-item" aria-label="Bookmark" title="Bookmark"
                on:click={() => { if (shareFor != null) { const willSave = !$activity.bookmarks.videos.includes(shareFor); toggleBookmarkVideo(shareFor); pushToast(willSave ? 'Saved to bookmarks' : 'Removed from bookmarks'); } showShare = false; }}>
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path d="M6.5 5.5h11a1 1 0 0 1 1 1v13l-6.5-4.2-6.5 4.2v-13a1 1 0 0 1 1-1" fill="currentColor" />
          </svg>
          <span>Bookmark</span>
        </button>
        <button class="share-item" aria-label="Copy Link" title="Copy Link"
                on:click={async () => { try { await navigator.clipboard.writeText(reels.find(x=>x.id===shareFor)?.src || ''); pushToast('Link copied'); } catch {}; showShare = false; }}>
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path d="M10 13a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1 1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7l1-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .feed { padding: 20px 10px 10px; display: grid; gap: 12px; }
  /* Make each reel card a snap point for vertical scroll */
  .reels > .card {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
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
  .icon { background: transparent; border: none; padding: 6px; border-radius: 999px; color: var(--icon); }
  .icon.active { outline: none; }
  .icon:active { opacity: 0.8; }

  /* No custom feed scroller here; we use .content scroll which hides bars */

  .list { padding: 20px 10px 10px; display: grid; gap: 0; }
  .hadith { padding: 14px 0; border-bottom: 1px solid var(--border); }
  .quote { position: relative; padding: 6px 8px 8px 16px; border-left: 3px solid var(--accent); }
  .quote-icon { position: absolute; top: -2px; left: -2px; }
  .text { margin: 0 0 8px; line-height: 1.6; font-size: 15px; }
  /* Share mini bar overlay */
  .share-overlay {
    position: fixed; top: 0; bottom: 0; left: 50%; transform: translateX(-50%);
    width: min(440px, 100vw);
    background: rgba(0,0,0,0.4);
    z-index: 60;
  }
  .share-bar {
    position: absolute; left: 0; right: 0; bottom: 0;
    background: var(--card); color: var(--fg);
    border-top-left-radius: 16px; border-top-right-radius: 16px;
    border-top: 1px solid var(--border);
    padding: 10px 16px 18px;
    z-index: 70;
    animation: rise .18s ease-out;
  }
  @keyframes rise { from { transform: translateY(14px); opacity: .95; } to { transform: translateY(0); opacity: 1; } }
  .handle { width: 38px; height: 4px; border-radius: 999px; background: var(--border); margin: 4px auto 10px; }
  .share-row { display: flex; justify-content: space-around; gap: 12px; }
  .share-item { display: grid; justify-items: center; gap: 6px; background: transparent; border: none; color: var(--icon); }
  .share-item span { font-size: 12px; color: var(--fg); }
  .caption { padding-top: 4px; font-size: 0.92rem; color: var(--fg); }
</style>

