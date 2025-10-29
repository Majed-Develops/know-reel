<script>
  import { navigate } from '../lib/router.js';
  import { nav } from '../lib/stores/nav.js';
  export let themeStore;
  $: currentTheme = $themeStore;
  const setTheme = (mode) => { if (mode !== $themeStore) themeStore.set(mode); };
</script>

<header class="bar">
  <button class="back" on:click={() => { nav.set('back'); navigate('home'); }}>&lt; Settings</button>
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

  <!-- Home Switch removed as requested -->
</section>

<section class="wrap">
  

  <div class="section">
    <button class="cta">Become a contributor</button>
  </div>

  <div class="section tail">
    <button class="logout">Log out</button>
  </div>
</section>

<style>
  .bar { position: sticky; top: 0; background: var(--bg); padding: 10px 12px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px; }
  .back { background: chocolate; color: var(--nav-bg); border: 1px solid chocolate; border-radius: 8px; padding: 6px 10px; font-weight: 700; }
  .back:hover { filter: brightness(0.95); }
  /* Light mode: give back button a subtle brown gradient */
  :global(html[data-theme="light"]) .back {
    background: linear-gradient(to right, chocolate, #8b4513) !important;
    border-color: #8b4513;
    color: var(--nav-bg);
  }
  :global(html[data-theme="light"]) .back:hover {
    filter: brightness(0.98);
  }
  h1 { display: none; }
  .wrap { padding: 12px; display: grid; gap: 16px; }
  h2 { margin: 6px 0 0; font-size: 14px; color: var(--muted); font-weight: 700; letter-spacing: .3px; }
  .section { padding: 8px 0; border-bottom: 1px solid var(--border); }
  .row { display: flex; gap: 12px; }
  .row.between { justify-content: space-between; }
  .row.center { align-items: center; }
  .label { color: var(--fg); font-weight: 600; }
  .toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .toggle button { background: none; color: var(--fg); border: none; padding: 8px 0; font-weight: 800; font-size: 14px; }
  .toggle button.active { background: chocolate; color: var(--nav-bg); border: 1px solid chocolate; border-bottom: none; border-radius: 8px; padding: 8px 10px; }
  .toggle button:hover { background: chocolate; color: var(--nav-bg); border: 1px solid chocolate; border-radius: 8px; padding: 8px 10px; }
  .small { font-size: 12px; }
  .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .form-grid label { display: grid; gap: 6px; font-size: 12px; color: var(--muted); }
  .form-grid input { background: transparent; border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; color: var(--fg); font-size: 14px; }
  .actions { margin-top: 6px; }
  .cta { width: 100%; background: var(--accent); color: var(--accent-contrast); font-weight: 700; border: none; border-radius: 12px; padding: 12px; font-size: 14px; }
  .logout { width: 100%; background: var(--danger); color: #ffffff; border: 1px solid transparent; border-radius: 12px; padding: 10px 12px; }
  .logout:hover { filter: brightness(0.95); }
  .tail { border-bottom: none; padding-bottom: 24px; }
  @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
</style>
