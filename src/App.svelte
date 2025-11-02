<script>
  import { onMount } from 'svelte';
  import { route, navigate } from './lib/router.js';
  import { nav } from './lib/stores/nav.js';
  
  import { theme } from './lib/stores/theme.js';
  import Home from './routes/Home.svelte';
  import Search from './routes/Search.svelte';
  import Profile from './routes/Profile.svelte';
  import Settings from './routes/Settings.svelte';
  import Activity from './routes/Activity.svelte';
  import BottomNav from './components/BottomNav.svelte';
  import { overlay as overlayStore } from './lib/stores/overlay.js';

  $: current = $route;
  $: dir = $nav; // 'neutral' | 'forward' | 'back'
  const go = (id) => navigate(id);
  // Contributor add flow state
  import { addReel } from './lib/stores/feed.js';
  let showUploader = false;
  let step = 'pick'; // 'pick' | 'edit' | 'caption'
  let fileUrl = '';
  let caption = '';
  function openUploader() { showUploader = true; step = 'pick'; overlayStore.set(true); }
  function resetUploader() {
    showUploader = false; step = 'pick'; caption = '';
    fileUrl = '';
    overlayStore.set(false);
  }
  function onPick(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    try { fileUrl = URL.createObjectURL(f); } catch { fileUrl = ''; }
    step = 'edit';
  }
  function toCaption() { step = 'caption'; }
  function share() { if (fileUrl) addReel(fileUrl, caption); resetUploader(); }

  onMount(() => {
    const hash = (location.hash || '').replace(/^#\/?/, '').trim();
    if (!hash) navigate('home');
  });
</script>

<div class="phone">
  <main class="content">
    {#key current}
      <div class="route">
        {#if current === 'home'}
          <Home />
        {:else if current === 'search'}
          <Search />
        {:else if current === 'profile'}
          <Profile />
        {:else if current === 'settings'}
          <Settings themeStore={theme} />
        {:else if current === 'activity'}
          <Activity />
        {:else}
          <Home />
        {/if}
      </div>
    {/key}
  </main>
  <BottomNav {current} on:select={(e) => go(e.detail)} on:add={openUploader} />
</div>

{#if showUploader}
  <div class="overlay" on:click={resetUploader}>
    <div class="sheet" on:click|stopPropagation>
      <div class="drag" />
      {#if step === 'pick'}
        <h3>Add media</h3>
        <input type="file" accept="video/*" on:change={onPick} />
      {:else if step === 'edit'}
        <div class="edit-bar">
          <button class="small">Edit media</button>
          <button class="primary" on:click={toCaption}>Continue</button>
        </div>
        <div class="preview">
          <video src={fileUrl} controls playsinline style="width:100%;height:100%;object-fit:contain;"></video>
        </div>
      {:else}
        <h3>Add caption</h3>
        <textarea rows="3" placeholder="Write a caption..." bind:value={caption}></textarea>
        <div class="row right">
          <button class="primary" on:click={share}>Share</button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .phone {
    max-width: 440px;
    height: 100vh; /* fallback */
    margin: 0 auto;
    display: grid;
    grid-template-rows: 1fr;
    background: var(--bg);
    border-radius: 0 0 18px 18px; /* square top corners, rounded bottom */
    overflow: hidden;
    /* No bezel; frame element handles outer background */
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
  /* Enable vertical scroll snap only when reels feed exists */
  .content:has(.reels) {
    scroll-snap-type: y proximity;
    /* account for sticky headers while snapping */
    scroll-padding-top: 72px;
    scroll-padding-bottom: 16px;
    overscroll-behavior-y: contain;
  }
  .content::-webkit-scrollbar { display: none; }
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: grid; place-items: end center; z-index: 90; }
  .sheet { width: min(440px, 100%); background: var(--card); color: var(--fg); border-top-left-radius: 16px; border-top-right-radius: 16px; border-top: 1px solid var(--border); padding: 12px; box-shadow: 0 -10px 30px rgba(0,0,0,0.35); }
  .drag { width: 40px; height: 4px; border-radius: 999px; background: var(--border); margin: 4px auto 10px; }
  .sheet h3 { margin: 6px 2px 10px; }
  .sheet input[type=file] { width: 100%; padding: 24px 12px; border: 1px dashed var(--border); border-radius: 12px; background: var(--surface); color: var(--muted); }
  .edit-bar { display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-bottom: 8px; }
  .primary { background: var(--accent); color: var(--accent-contrast); border: none; border-radius: 10px; padding: 8px 10px; font-weight: 700; }
  .preview { aspect-ratio: 9 / 16; background: #00000020; border: 1px solid var(--border); border-radius: 12px; display: grid; place-items: center; overflow: hidden; }
  textarea { width: 100%; border: 1px solid var(--border); border-radius: 12px; padding: 10px; background: transparent; color: var(--fg); }
  .row.right { justify-content: flex-end; }
</style>
