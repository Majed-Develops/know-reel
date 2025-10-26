<script>
  import { createEventDispatcher } from 'svelte';
  import { ui } from '../lib/stores/ui.js';
  export let current = 'home';
  const dispatch = createEventDispatcher();

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search' },
    { id: 'profile', label: 'Profile' }
  ];

  function select(id) { dispatch('select', id); }
  let pressTimer;
  function onHomeDown() {
    if ($ui.homeToggle === 'hold') {
      clearTimeout(pressTimer);
      pressTimer = setTimeout(() => {
        ui.update(s => ({ ...s, homeMode: s.homeMode === 'watch' ? 'hadith' : 'watch' }));
      }, 500);
    }
  }
  function onHomeUp() { clearTimeout(pressTimer); }
</script>

<nav class="nav">
  {#each tabs as t, i}
    {#if t.id === 'search'}
      <button
        class="tab search {current === t.id ? 'active' : ''}"
        aria-label={t.label}
        on:click={() => select(t.id)}>
        <div class="search-circle {current === 'search' ? 'active' : ''}">
          <svg viewBox="0 0 24 24" width="29" height="29" aria-hidden="true">
            <circle cx="11" cy="11" r="6" fill="none" stroke={current === 'search' ? 'var(--accent-contrast)' : 'var(--nav-icon)'} stroke-width="2"/>
            <path d="M20 20l-3.5-3.5" stroke={current === 'search' ? 'var(--accent-contrast)' : 'var(--nav-icon)'} stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </button>
    {:else}
      <button
        class="tab {current === t.id ? 'active' : ''}"
        aria-label={t.label}
        on:click={() => select(t.id)}
        on:mousedown={onHomeDown}
        on:mouseup={onHomeUp}
        on:mouseleave={onHomeUp}
        on:touchstart|preventDefault={onHomeDown}
        on:touchend={onHomeUp}
        on:touchcancel={onHomeUp}>
        {#if t.id === 'home'}
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            {#if current === 'home'}
              <path d="M3 10.5 12 3 21 10.5V21H14V14H10V21H3Z" fill="var(--nav-icon-active)"/>
            {:else}
              <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" fill="none" stroke="var(--nav-icon)" stroke-width="2" stroke-linejoin="round"/>
            {/if}
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            {#if current === 'profile'}
              <circle cx="12" cy="8" r="4" fill="var(--nav-icon-active)"/>
              <rect x="4" y="13" width="16" height="8" rx="5" ry="5" fill="var(--nav-icon-active)" />
            {:else}
              <circle cx="12" cy="8" r="4" fill="none" stroke="var(--nav-icon)" stroke-width="2"/>
              <path d="M4 21c1.8-3.5 5-5 8-5s6.2 1.5 8 5" fill="none" stroke="var(--nav-icon)" stroke-width="2" stroke-linecap="round"/>
            {/if}
          </svg>
        {/if}
      </button>
    {/if}
  {/each}
  </nav>

<style>
  .nav {
    position: sticky;
    bottom: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: var(--nav-bg);
    border-top: none;
    padding: 4px 0 6px;
    width: 100%;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
  }
  .tab {
    display: grid;
    place-items: center;
    gap: 2px;
    padding: 6px 0;
    color: var(--muted);
    background: transparent;
    border: none;
    font: inherit;
  }
  .tab.active span { color: var(--accent-dark); }
  .tab span { font-size: 11px; }
  .tab:active { transform: translateY(1px); }
  svg { display: block; }

  /* Special raised search button */
  .tab.search {
    position: relative;
  }
  .search-circle {
    width: 52px; height: 52px;
    border-radius: 999px;
    background: var(--nav-bg);
    display: grid; place-items: center;
    transform: translateY(-18px);
  }
  .search-circle.active { background: var(--nav-icon-active); }
  .tab.search { position: relative; overflow: visible; }
  .tab.search span { display: none; }
  .tab span { display: none; }
</style>
