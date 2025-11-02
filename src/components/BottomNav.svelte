<script>
  import { createEventDispatcher } from 'svelte';
  import { contributor } from '../lib/stores/contributor.js';

  export let current = 'home';
  const dispatch = createEventDispatcher();

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search' },
    { id: 'profile', label: 'Profile' }
  ];

  function select(id) { dispatch('select', id); }
</script>

<nav class="nav" style={`grid-template-columns: repeat(${$contributor ? 4 : 3}, 1fr);`}>
  <!-- Home -->
  <button class="tab {current === 'home' ? 'active' : ''}" aria-label="Home" on:click={() => select('home')}>
    <div class="circle {current === 'home' ? 'active' : ''}">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    </div>
    <span>Home</span>
  </button>

  <!-- Search -->
  <button class="tab {current === 'search' ? 'active' : ''}" aria-label="Search" on:click={() => select('search')}>
    <div class="circle {current === 'search' ? 'active' : ''}">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <span>Search</span>
  </button>

  <!-- Add (contributor only) -->
  {#if $contributor}
    <button class="tab add-btn" aria-label="Add" on:click={() => dispatch('add')}>
      <div class="circle dotted">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M12 6v12M6 12h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <span>Add</span>
    </button>
  {/if}

  <!-- Profile -->
  <button class="tab {current === 'profile' ? 'active' : ''}" aria-label="Profile" on:click={() => select('profile')}>
    <div class="circle {current === 'profile' ? 'active' : ''}">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M4 21c1.8-3.5 5-5 8-5s6.2 1.5 8 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <span>Profile</span>
  </button>
</nav>

<style>
  .nav {
    position: sticky;
    bottom: 0;
    display: grid;
    background: var(--nav-bg);
    padding: 8px 12px 10px;
    width: 100%;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    z-index: 20;
  }
  .tab {
    display: grid;
    justify-items: center;
    align-items: center;
    gap: 6px;
    padding: 0;
    background: transparent;
    border: none;
    color: var(--icon);
    font: inherit;
  }
  .tab span { font-size: 11px; opacity: 0.7; }
  .tab:active { transform: translateY(1px); }
  svg { display: block; }

  .circle {
    width: 44px; height: 44px;
    display: grid; place-items: center;
    border-radius: 999px;
    border: 2px solid transparent; /* invisible for inactive */
    background: transparent;
    transition: background-color .2s ease, color .2s ease, border-color .2s ease;
  }
  .circle.active {
    background: var(--nav-active-circle-bg);
    color: var(--nav-active-icon);
    border-color: var(--nav-active-circle-bg);
  }
  .add-btn .circle { border-width: 2px; border-style: dotted; border-color: var(--icon); background: var(--add-inactive-bg); color: var(--add-inactive-icon); }
  .add-btn:active .circle { background: var(--add-active-bg); color: var(--add-active-icon); }
</style>
