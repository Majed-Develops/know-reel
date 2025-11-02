<script>
  import { navigate } from '../lib/router.js';
  import { contributor } from '../lib/stores/contributor.js';
  const user = {
    username: '@majed',
    name: 'Majed Bashir',
    email: 'majed@example.com',
    level: 'Student'
  };
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

<section class="wrap">
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

  <!-- Moved Likes and Bookmarks into Activity page -->
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
</style>
