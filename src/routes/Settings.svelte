<script>
  import { navigate } from '../lib/router.js';
  import { nav } from '../lib/stores/nav.js';
  import { contributor } from '../lib/stores/contributor.js';
  export let themeStore;
  $: currentTheme = $themeStore;
  const setTheme = (mode) => { if (mode !== $themeStore) themeStore.set(mode); };
</script>

<header class="bar">
  <button class="back" on:click={() => { nav.set('back'); navigate('profile'); }} aria-label="Back">
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M15 18 9 12l6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>Back</span>
  </button>
</header>

<section class="wrap">
  <h2>Appearance</h2>
  <div class="section">
    <div class="row between center">
      <label class="label">Theme</label>
      <div class="selector">
        <button class:active={currentTheme==='light'} on:click={() => setTheme('light')} aria-label="Light">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="12" cy="12" r="5" fill="currentColor"/>
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9 17.7 6.3M6.3 17.7 4.9 19.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
          <span>Light</span>
        </button>
        <button class:active={currentTheme==='dark'} on:click={() => setTheme('dark')} aria-label="Dark">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M20 12.5A8 8 0 1 1 11.5 4 6.5 6.5 0 0 0 20 12.5z" fill="currentColor"/>
          </svg>
          <span>Dark</span>
        </button>
        <button class:active={currentTheme==='system'} on:click={() => setTheme('system')} aria-label="System">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <rect x="3" y="4" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <path d="M8 20h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
          <span>System</span>
        </button>
      </div>
    </div>
    <p class="muted small">Your choice persists across pages.</p>
  </div>

  <!-- Home Switch removed as requested -->
</section>

<section class="wrap">
  

  <div class="section">
    <button class="cta" on:click={() => contributor.update(v => !v)}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.8 7.2 17l.9-5.4L4.2 7.7l5.4-.8L12 2z" fill="currentColor"/>
      </svg>
      <span>{$contributor ? 'Contributor enabled' : 'Become a contributor'}</span>
    </button>
  </div>

  <div class="section tail">
    <button class="logout">Log out</button>
  </div>
</section>

<style>
  .bar { position: sticky; top: 0; background: transparent; padding: 10px 12px; border-bottom: none; display: flex; align-items: center; gap: 8px; }
  .back { background: transparent; color: var(--icon); border: 1px solid var(--border); border-radius: 999px; padding: 6px 10px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; }
  h1 { display: none; }
  .wrap { padding: 12px; display: grid; gap: 16px; }
  h2 { margin: 6px 0 0; font-size: 14px; color: var(--muted); font-weight: 700; letter-spacing: .3px; }
  .section { padding: 8px 0; border-bottom: 1px solid var(--border); }
  .row { display: flex; gap: 12px; }
  .row.between { justify-content: space-between; }
  .row.center { align-items: center; }
  .label { color: var(--fg); font-weight: 600; }
  .selector { display: grid; grid-auto-flow: column; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 6px; }
  .selector button { background: transparent; color: var(--fg); border: none; padding: 6px 10px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; font-weight: 700; }
  .selector button.active { background: var(--nav-active-circle-bg); color: var(--nav-active-icon); }
  .small { font-size: 12px; }
  .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .form-grid label { display: grid; gap: 6px; font-size: 12px; color: var(--muted); }
  .form-grid input { background: transparent; border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; color: var(--fg); font-size: 14px; }
  .actions { margin-top: 6px; }
  .cta { width: 100%; background: var(--accent); color: var(--accent-contrast); font-weight: 700; border: none; border-radius: 12px; padding: 12px; font-size: 14px; display: inline-flex; align-items: center; gap: 8px; justify-content: center; }
  .logout { width: 100%; background: #fff; color: var(--danger); border: 2px solid var(--danger); border-radius: 14px; padding: 14px 12px; font-size: 16px; font-weight: 800; }
  .logout:hover { filter: brightness(0.99); }
  .tail { border-bottom: none; padding-bottom: 32px; margin-top: 32px; }
  @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
</style>
