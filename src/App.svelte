<script>
  import { onMount } from 'svelte';
  import { route, navigate } from './lib/router.js';
  import { nav } from './lib/stores/nav.js';
  import { fly } from 'svelte/transition';
  import { theme } from './lib/stores/theme.js';
  import Home from './routes/Home.svelte';
  import Hadith from './routes/Hadith.svelte';
  import Settings from './routes/Settings.svelte';

  $: current = $route;
  $: dir = $nav; // 'neutral' | 'forward' | 'back'
  const go = (id) => navigate(id);

  onMount(() => {
    const hash = (location.hash || '').replace(/^#\/?/, '').trim();
    if (!hash) navigate('home');
  });
</script>

<div class="phone">
  <main class="content">
    {#key current}
      <div class="route"
        in:fly={dir === 'back' ? { x: -80, duration: 260, opacity: 0 } : (dir === 'forward' ? { x: 80, duration: 260, opacity: 0 } : undefined)}
        out:fly={dir === 'back' ? { x: 80, duration: 220, opacity: 0 } : (dir === 'forward' ? { x: -80, duration: 220, opacity: 0 } : undefined)}
      >
        {#if current === 'home'}
          <Home />
        {:else if current === 'hadith'}
          <Hadith />
        {:else if current === 'settings'}
          <Settings themeStore={theme} />
        {:else}
          <Home />
        {/if}
      </div>
    {/key}
  </main>

</div>

<style>
  .phone {
    max-width: 440px;
    height: 100vh; /* fallback */
    margin: 0 auto;
    display: grid;
    grid-template-rows: 1fr;
    background: var(--bg);
    border-radius: 18px;
    overflow: hidden;
    /* Thin black bezel frame for desktop/PC view */
    border: 2px solid #000;
  }
  /* Prefer dynamic viewport units on modern browsers to avoid mobile 100vh issues */
  @supports (height: 100dvh) {
    .phone { height: 100dvh; }
  }
  @supports (height: 100svh) {
    .phone { height: 100svh; }
  }
  .content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .content::-webkit-scrollbar { display: none; }
  
</style>
