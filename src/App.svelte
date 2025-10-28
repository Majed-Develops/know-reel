<script>
  import { route, navigate } from './lib/router.js';
  import { theme } from './lib/stores/theme.js';
  import Home from './routes/Home.svelte';
  import Hadith from './routes/Hadith.svelte';
  import Settings from './routes/Settings.svelte';
  import Search from './routes/Search.svelte';
  import Profile from './routes/Profile.svelte';
  import BottomNav from './components/BottomNav.svelte';

  $: current = $route;
  const go = (id) => navigate(id);
</script>

<div class="phone">
  <main class="content">
    {#if current === 'home'}
      <Home />
    {:else if current === 'hadith'}
      <Hadith />
    {:else if current === 'search'}
      <Search />
    {:else if current === 'profile'}
      <Profile />
    {:else if current === 'settings'}
      <Settings themeStore={theme} />
    {:else}
      <Home />
    {/if}
  </main>

  <BottomNav {current} on:select={(e) => go(e.detail)} />
  
</div>

<style>
  .phone {
    max-width: 440px;
    height: 100vh;
    margin: 0 auto;
    display: grid;
    grid-template-rows: 1fr auto;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
  }
  .content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .content::-webkit-scrollbar { display: none; }
  
</style>
