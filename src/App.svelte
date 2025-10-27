<script>
  import { onDestroy } from 'svelte';
  import BottomNav from './components/BottomNav.svelte';
  import HomeFeed from './components/HomeFeed.svelte';
  import SearchView from './components/SearchView.svelte';
  import ProfileView from './components/ProfileView.svelte';
  import { appearance } from './stores/appearance';

  let currentTab = 'home';
  let appearanceSettings = {
    holdEnabled: false,
    defaultMode: 'watch',
    currentMode: 'watch'
  };

  const unsubscribe = appearance.subscribe((value) => {
    appearanceSettings = value;
  });

  onDestroy(unsubscribe);

  const switchTab = (event) => {
    currentTab = event.detail.id;
  };

  const handleModeChange = (event) => {
    const { mode } = event.detail;
    appearance.update((state) => ({
      ...state,
      currentMode: mode,
      defaultMode: state.holdEnabled ? state.defaultMode : state.defaultMode
    }));
  };

  const handleHoldHome = () => {
    if (!appearanceSettings.holdEnabled) return;
    appearance.update((state) => ({
      ...state,
      currentMode: state.currentMode === 'watch' ? 'read' : 'watch'
    }));
    currentTab = 'home';
  };
</script>

<div class="app">
  <main>
    {#if currentTab === 'home'}
      <HomeFeed settings={appearanceSettings} on:modechange={handleModeChange} />
    {:else if currentTab === 'search'}
      <SearchView />
    {:else}
      <ProfileView />
    {/if}
  </main>
  <footer class="nav-wrap">
    <BottomNav
      active={currentTab}
      holdEnabled={appearanceSettings.holdEnabled}
      on:navigate={switchTab}
      on:holdhome={handleHoldHome}
    />
  </footer>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
    color: var(--text-primary);
  }

  main {
    flex: 1;
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    padding: 1.2rem 1rem 5.5rem;
  }

  .nav-wrap {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: center;
    background: var(--bg);
  }

  .nav-wrap :global(.bottom-nav) {
    width: min(520px, 100%);
  }

  @media (max-width: 600px) {
    main {
      padding: 1rem 0.75rem 5.5rem;
    }
  }
</style>
