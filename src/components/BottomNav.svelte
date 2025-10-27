<script>
  import { createEventDispatcher } from 'svelte';
<<<<<<< HEAD

  export let active = 'home';
  export let holdEnabled = false;

  const dispatch = createEventDispatcher();

  const items = [
    { id: 'home', label: 'Home', type: 'default' },
    { id: 'search', label: 'Search', type: 'search' },
    { id: 'profile', label: 'Profile', type: 'default' }
  ];

  let holdTimer = null;

  const handleClick = (id) => {
    dispatch('navigate', { id });
  };

  const startHold = () => {
    if (!holdEnabled) return;
    clearTimeout(holdTimer);
    holdTimer = setTimeout(() => {
      dispatch('holdhome');
      holdTimer = null;
    }, 600);
  };

  const cancelHold = () => {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
  };
</script>

<nav class="bottom-nav">
  {#each items as item}
    <button
      class:active={item.id === active}
      class:search={item.type === 'search'}
      on:click={() => handleClick(item.id)}
      on:pointerdown={() => item.id === 'home' && startHold()}
      on:pointerup={() => item.id === 'home' && cancelHold()}
      on:pointerleave={() => item.id === 'home' && cancelHold()}
      aria-label={`Go to ${item.label}`}
      type="button"
    >
      {#if item.id === 'home'}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4.5 10.5L12 4l7.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 19z"
            fill={item.id === active ? 'currentColor' : 'none'}
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 20v-5h4v5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      {:else if item.id === 'search'}
        <div class="search-icon" data-active={item.id === active}>
          <svg viewBox="0 0 28 28" aria-hidden="true">
            <circle
              cx="13"
              cy="13"
              r="6.5"
              fill="none"
              stroke={item.id === active ? '#ffffff' : 'var(--accent)'}
              stroke-width="1.8"
            />
            <path
              d="m18.5 18.5 4.5 4.5"
              fill="none"
              stroke={item.id === active ? '#ffffff' : 'var(--accent)'}
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
        </div>
      {:else}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="12"
            cy="8"
            r="4"
            fill={item.id === active ? 'currentColor' : 'none'}
            stroke="currentColor"
            stroke-width="1.8"
          />
          <path
            d="M6 19.5c1.2-3 3.6-4.5 6-4.5s4.8 1.5 6 4.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      {/if}
    </button>
  {/each}
</nav>

<style>
  .bottom-nav {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: min(18vw, 6rem);
    padding: 0.4rem min(12vw, 3.2rem) calc(env(safe-area-inset-bottom) + 0.5rem);
    background: var(--surface-elevated);
    box-shadow: 0 -12px 28px var(--shadow-soft);
    border-top: 1px solid var(--stroke);
    z-index: 10;
    overflow: visible;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    padding: 0.6rem 0;
    color: var(--text-muted);
    transition: transform 0.2s ease, color 0.2s ease;
  }

  button.active {
    color: var(--accent);
    transform: translateY(-2px);
  }

  button.search {
    position: relative;
  }

  .search-icon {
    display: grid;
    place-items: center;
    width: 104px;
    height: 104px;
    margin-top: -55px;
    border-radius: 999px;
    background: var(--surface-elevated);
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .search-icon[data-active='true'] {
    background: var(--accent);
  }

  svg {
    width: 28px;
    height: 28px;
    transition: stroke 0.2s ease;
  }

  .search-icon svg {
    width: 36px;
    height: 36px;
  }
=======
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
>>>>>>> bcdfe73c3985c68cca8b9b36205fac2571a40cf2
</style>
