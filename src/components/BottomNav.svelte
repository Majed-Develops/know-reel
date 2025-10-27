<script>
  import { createEventDispatcher } from 'svelte';

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
</style>
