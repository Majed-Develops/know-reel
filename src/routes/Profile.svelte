<script>
  import { navigate } from '../lib/router.js';
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
      <strong>{user.username}</strong>
      <button class="icon" aria-label="Edit username">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="none" stroke="var(--muted)" stroke-width="2"/>
        </svg>
      </button>
    </div>
    <button class="icon" aria-label="Settings" on:click={() => navigate('settings')}>
      <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
        <g fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <circle cx="12" cy="12" r="8"/>
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41"/>
        </g>
      </svg>
    </button>
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

  <h2>Bookmarks</h2>
  <div class="list">
    <div class="empty">No bookmarks yet.</div>
  </div>

  <h2>Likes</h2>
  <div class="list">
    <div class="empty">No likes yet.</div>
  </div>
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
