<script>
  import { ui } from '../lib/stores/ui.js';
  export let themeStore;
  $: currentTheme = $themeStore;
  const setTheme = (mode) => { if (mode !== $themeStore) themeStore.set(mode); };
  $: togglePref = $ui.homeToggle; // 'default' | 'hold'
  const setTogglePref = (val) => ui.update(s => ({ ...s, homeToggle: val }));
</script>

<header class="bar">
  <h1>Settings</h1>
</header>

<section class="wrap">
  <h2>Appearance</h2>
  <div class="section">
    <div class="row between center">
      <label class="label">Themes</label>
      <div class="toggle">
        <button class:active={currentTheme==='dark'} on:click={() => setTheme('dark')}>Dark</button>
        <button class:active={currentTheme==='light'} on:click={() => setTheme('light')}>Light</button>
      </div>
    </div>
    <p class="muted small">Your choice persists across pages.</p>
  </div>

  <div class="section">
    <div class="row between center">
      <label class="label">Home Switch</label>
      <div class="toggle">
        <button class:active={togglePref==='default'} on:click={() => setTogglePref('default')}>Default</button>
        <button class:active={togglePref==='hold'} on:click={() => setTogglePref('hold')}>Hold Home to Toggle</button>
      </div>
    </div>
    <p class="muted small">Hold toggles Watch/Read by long-pressing Home and hides the top switch.</p>
  </div>
</section>

<section class="wrap">
  <h2>Change Information</h2>
  <div class="section">
    <form class="form-grid" on:submit|preventDefault>
      <label>
        <span>Name</span>
        <input type="text" placeholder="Your name" />
      </label>
      <label>
        <span>Username</span>
        <input type="text" placeholder="@username" />
      </label>
      <label>
        <span>Email</span>
        <input type="email" placeholder="you@example.com" />
      </label>
      <label>
        <span>Password</span>
        <input type="password" placeholder="••••••••" />
      </label>
      <div class="actions">
        <button type="submit">Save Changes</button>
      </div>
    </form>
  </div>

  <div class="section">
    <button class="cta">Become a contributor</button>
  </div>

  <div class="section tail">
    <button class="logout">Log out</button>
  </div>
</section>

<style>
  .bar { position: sticky; top: 0; background: var(--bg); padding: 10px 14px; border-bottom: 1px solid var(--border); }
  h1 { margin: 0; font-size: 18px; }
  .wrap { padding: 12px; display: grid; gap: 16px; }
  h2 { margin: 6px 0 0; font-size: 14px; color: var(--muted); font-weight: 700; letter-spacing: .3px; }
  .section { padding: 8px 0; border-bottom: 1px solid var(--border); }
  .row { display: flex; gap: 12px; }
  .row.between { justify-content: space-between; }
  .row.center { align-items: center; }
  .label { color: var(--fg); font-weight: 600; }
  .toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .toggle button { background: none; color: var(--fg); border: none; padding: 8px 0; font-weight: 800; font-size: 14px; }
  .toggle button.active { color: var(--accent-dark); border-bottom: 3px solid var(--accent-dark); }
  .small { font-size: 12px; }
  .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .form-grid label { display: grid; gap: 6px; font-size: 12px; color: var(--muted); }
  .form-grid input { background: transparent; border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; color: var(--fg); font-size: 14px; }
  .actions { margin-top: 6px; }
  .cta { width: 100%; background: var(--accent); color: var(--accent-contrast); font-weight: 700; border: none; border-radius: 12px; padding: 12px; font-size: 14px; }
  .logout { width: 100%; background: transparent; color: #ff6b6b; border: 1px solid #ff6b6b44; border-radius: 12px; padding: 10px 12px; }
  .tail { border-bottom: none; padding-bottom: 24px; }
  @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
</style>
