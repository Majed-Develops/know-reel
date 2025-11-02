<script>
  import { navigate } from '../lib/router.js';
  import { contributor } from '../lib/stores/contributor.js';
  import { reels as reelsStore, removeReel, restoreReel, setPinned, updateCaption } from '../lib/stores/feed.js';
  import { push as pushToast } from '../lib/stores/toast.js';
  const user = {
    username: '@majed',
    name: 'Majed Bashir',
    email: 'majed@example.com',
    level: 'Student'
  };
  let menuFor = null;
  const contributed = () => ($reelsStore || []).filter((r) => r.contributed);
  const pinned = () => contributed().find((r) => r.pinned);
  const others = () => contributed().filter((r) => !r.pinned);

  function openMenu(id) { menuFor = id; }
  function closeMenu() { menuFor = null; }

  async function doEditCaption(id, current) {
    const next = prompt('Edit caption', current || '');
    if (next === null) return;
    updateCaption(id, next);
    pushToast('Caption updated');
  }
  function doShare(src) {
    try { navigator.clipboard.writeText(src); pushToast('Link copied'); } catch {}
  }
  function doDelete(item) {
    const removed = item;
    removeReel(item.id);
    pushToast('Post deleted', { action: { label: 'Undo', handler: () => restoreReel(removed) }, timeout: 4000 });
  }
</script>

<header class="bar">
  <div class="row between center">
    <div class="left">
      {#if $contributor}
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M12 2l2.6 4.9 5.4.8-3.9 3.8.9 5.4L12 14.8 7 17l.9-5.4L4 7.7l5.4-.8L12 2z" fill="var(--icon)"/>
        </svg>
      {/if}
      <strong>{user.username}</strong>
      <button class="icon" aria-label="Edit username">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="none" stroke="var(--muted)" stroke-width="2"/>
        </svg>
      </button>
    </div>
    <div class="right">
      <button class="icon" aria-label="Activity" title="Activity" on:click={() => navigate('activity')}>
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path d="M3 13h4l2-6 4 12 2-6h4" fill="none" stroke="var(--icon)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="icon" aria-label="Settings" on:click={() => navigate('settings')}>
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path d="M19.4 15a2 2 0 0 0 0-6l1.2-2.1-2-3.5-2.4.5a6 6 0 0 0-1.2-.7L14.6 1h-5.2l-.4 2.2a6 6 0 0 0-1.2.7l-2.4-.5-2 3.5L4.6 9a2 2 0 0 0 0 6l-1.2 2.1 2 3.5 2.4-.5a6 6 0 0 0 1.2.7l.4 2.2h5.2l.4-2.2c.4-.2.8-.4 1.2-.7l2.4.5 2-3.5z" fill="none" stroke="var(--icon)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="var(--icon)" stroke-width="1.6"/>
        </svg>
      </button>
    </div>
  </div>
</header>

<section class="wrap" on:click={closeMenu}>
  <div class="card">
    <div class="field">
      <label>Name</label>
      <div>{user.name}</div>
    </div>
    <div class="field">
      <label>Email</label>
      <div>{user.email}</div>
    </div>
  </div>

  {#if $contributor}
  <h2>Posts</h2>
  {#if contributed().length === 0}
    <div class="empty">No posts yet.</div>
  {:else}
    {#if pinned()}
      <article class="pin">
        <div class="pin-tag">Pinned</div>
        <div class="pin-video">
          <video src={pinned().src} muted playsinline preload="metadata"></video>
        </div>
        {#if pinned().caption}
          <div class="cap">{pinned().caption}</div>
        {/if}
        <button class="more" aria-label="More" on:click|stopPropagation={() => openMenu(pinned().id)}>
          <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="6" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="18" r="1.6"/></svg>
        </button>
        {#if menuFor === pinned().id}
          <div class="menu" role="menu" on:click|stopPropagation>
            <button class="item" on:click={() => { setPinned(pinned().id); closeMenu(); }}>Unpin</button>
            <button class="item" on:click={() => { doEditCaption(pinned().id, pinned().caption); closeMenu(); }}>Edit caption</button>
            <button class="item" on:click={() => { doShare(pinned().src); closeMenu(); }}>Share link</button>
            <button class="item danger" on:click={() => { doDelete(pinned()); closeMenu(); }}>Delete</button>
          </div>
        {/if}
      </article>
    {/if}
    <div class="grid">
      {#each others() as it}
        <article class="post">
          <div class="thumb">
            <video src={it.src} muted playsinline preload="metadata"></video>
          </div>
          {#if it.caption}
            <div class="cap">{it.caption}</div>
          {/if}
          <button class="more" aria-label="More" on:click|stopPropagation={() => openMenu(it.id)}>
            <svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="6" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="18" r="1.6"/></svg>
          </button>
          {#if menuFor === it.id}
            <div class="menu" role="menu" on:click|stopPropagation>
              <button class="item" on:click={() => { setPinned(it.id); closeMenu(); }}>Pin to top</button>
              <button class="item" on:click={() => { doEditCaption(it.id, it.caption); closeMenu(); }}>Edit caption</button>
              <button class="item" on:click={() => { doShare(it.src); closeMenu(); }}>Share link</button>
              <button class="item danger" on:click={() => { doDelete(it); closeMenu(); }}>Delete</button>
            </div>
          {/if}
        </article>
      {/each}
    </div>
  {/if}
  {/if}
</section>

<style>
  .bar { position: sticky; top: 0; background: transparent; padding: 10px 12px; border-bottom: none; }
  .row { display: flex; align-items: center; justify-content: space-between; }
  .left { display: flex; align-items: center; gap: 8px; }
  strong { font-size: 22px; }
  .wrap { padding: 12px; }
  .card { background: transparent; border: none; border-radius: 0; padding: 12px; display: grid; gap: 12px; }
  .field label { color: var(--muted); font-size: 12px; display: block; margin-bottom: 4px; }
  .icon { background: transparent; border: none; padding: 6px; border-radius: 8px; }
  .icon:active { background: #15181a; }
  h2 { font-size: 14px; color: var(--muted); margin: 12px 0 6px; }
  .list { border-top: 1px solid var(--border); padding: 10px 0; }
  .empty { color: var(--muted); font-size: 13px; }
  
  .row.between { justify-content: space-between; }
  .row.center { align-items: center; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .post { position: relative; border: 1px solid var(--border); border-radius: 12px; background: var(--card); overflow: hidden; }
  .thumb { aspect-ratio: 9/16; background: #00000020; display: grid; place-items: center; }
  .thumb video { width: 100%; height: 100%; object-fit: cover; }
  .cap { padding: 8px; font-size: 13px; color: var(--fg); }
  .more { position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.35); color: #fff; border: none; border-radius: 999px; width: 30px; height: 30px; display: grid; place-items: center; }
  .pin { position: relative; border: 1px solid var(--border); border-radius: 12px; background: var(--card); overflow: hidden; margin-bottom: 8px; }
  .pin-video { aspect-ratio: 9/16; background: #00000020; }
  .pin-video video { width: 100%; height: 100%; object-fit: cover; }
  .pin-tag { position: absolute; top: 8px; left: 8px; background: var(--accent); color: var(--accent-contrast); border-radius: 999px; padding: 2px 8px; font-size: 12px; font-weight: 700; }
  .menu { position: absolute; top: 38px; right: 6px; background: var(--card); color: var(--fg); border: 1px solid var(--border); border-radius: 10px; padding: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.22); z-index: 10; min-width: 150px; }
  .menu .item { width: 100%; text-align: left; background: transparent; color: var(--fg); border: none; padding: 8px 10px; border-radius: 8px; }
  .menu .item:active { background: var(--border); }
  .menu .item.danger { color: #ff6b6b; }
</style>
