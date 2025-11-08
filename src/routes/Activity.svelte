<script>
  import { navigate } from '../lib/router.js';
  import { activity } from '../lib/stores/activity.js';
  import { reels as reelsStore } from '../lib/stores/feed.js';
  const goBack = () => navigate('profile');

  let mode = 'none'; // 'likes' | 'bookmarks' | 'none'
  let viewer = null; // { src }

  const openLikes = () => mode = 'likes';
  const openBookmarks = () => mode = 'bookmarks';
  const REMOTE_BASE = 'https://raw.githubusercontent.com/Majed-Develops/know-reel/refs/heads/main/public/videos';
  const videoSrcById = (id) => {
    const r = $reelsStore.find((x) => x.id === id);
    if (r) return r.src;
    if (typeof id === 'number') return `${REMOTE_BASE}/${id}.mp4`;
    return String(id);
  };
  const openViewer = (src) => viewer = { src };
  const closeViewer = () => viewer = null;
</script>

<header class="bar">
  <div class="row between center">
    <button class="icon" aria-label="Back" on:click={goBack}>
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path d="M15 18 9 12l6-6" fill="none" stroke="var(--icon)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <h1>Activity</h1>
    <span style="width:24px;height:24px;"></span>
  </div>
</header>

<section class="wrap">
  <div class="grid">
    <button class="tile" aria-label="Likes" on:click={openLikes}>
      <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" class="tile-icon">
        <path d="M12 19.5s-6.5-4.4-6.5-8.6a3.4 3.4 0 0 1 6-2 3.4 3.4 0 0 1 6 2c0 4.3-6.5 8.6-6.5 8.6z"
              fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
      </svg>
      <div class="label">Likes</div>
      <div class="count">{$activity.likes.videos.length}</div>
    </button>

    <button class="tile" aria-label="Bookmarks" on:click={openBookmarks}>
      <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true" class="tile-icon">
        <path d="M6.5 5.5h11a1 1 0 0 1 1 1v13l-6.5-4.2-6.5 4.2v-13a1 1 0 0 1 1-1" fill="currentColor" />
      </svg>
      <div class="label">Bookmarks</div>
      <div class="count">{$activity.bookmarks.videos.length}</div>
    </button>
  </div>

  {#if mode === 'likes' || mode === 'bookmarks'}
    <h2 class="sub">{mode === 'likes' ? 'Liked Videos' : 'Bookmarked Videos'}</h2>
    <div class="grid-videos">
      {#each (mode === 'likes' ? $activity.likes.videos : $activity.bookmarks.videos) as id}
        <button class="vbox" on:click={() => openViewer(videoSrcById(id))} aria-label="Open video">
          <div class="vthumb">
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" stroke-width="1.6"/>
              <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
            </svg>
          </div>
        </button>
      {/each}
    </div>
  {/if}

  {#if viewer}
    <div class="overlay" on:click={closeViewer}>
      <div class="player" on:click|stopPropagation>
        <video src={viewer.src} controls autoplay playsinline loop style="width:100%; height:100%; object-fit:contain;"></video>
      </div>
    </div>
  {/if}
</section>

<style>
  .bar { position: sticky; top: 0; background: transparent; padding: 10px 12px; border-bottom: none; }
  .row { display: flex; align-items: center; justify-content: space-between; }
  h1 { margin: 0; font-size: 18px; }
  .icon { background: transparent; border: none; padding: 6px; border-radius: 10px; }
  .icon:active { background: #15181a; }
  .wrap { padding: 14px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .tile { display: grid; justify-items: center; align-content: center; gap: 8px; aspect-ratio: 1/1; border-radius: 18px; border: 1px solid var(--border); background: var(--card); color: var(--icon); }
  .tile:active { transform: scale(0.98); }
  .tile-icon { color: var(--accent); }
  .label { font-weight: 700; font-size: 0.9rem; color: var(--fg); }
  .count { font-size: 0.8rem; color: var(--muted); }
  .sub { margin: 12px 2px 6px; font-size: 0.9rem; color: var(--muted); }
  .grid-videos { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .vbox { aspect-ratio: 1 / 1; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); display: grid; place-items: center; color: var(--icon); }
  .vbox:active { transform: scale(0.98); }
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: grid; place-items: center; z-index: 80; }
  .player { width: min(420px, 92vw); height: min(740px, 86vh); background: var(--card); border-radius: 16px; padding: 8px; box-shadow: 0 14px 36px rgba(0,0,0,0.4); }
</style>
