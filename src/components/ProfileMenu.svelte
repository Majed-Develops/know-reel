<script>
  import { createEventDispatcher } from 'svelte';
  import { auth } from '../lib/stores/auth.js';
  const dispatch = createEventDispatcher();
  export let open = false;

  function goSettings() { dispatch('settings'); }
  function goActivity() { dispatch('activity'); }
  function goInfo() { dispatch('info'); }
  function goLogin() { dispatch('login'); }
  function goSignup() { dispatch('signup'); }
  function goQuran() { dispatch('quran'); }
</script>

{#if open}
  <div class="menu" role="menu" aria-label="Profile Menu">
    {#if $auth.user}
      <div class="section">
        <div class="title">Your Information</div>
        <div class="item muted">{$auth.user.name || 'User'}</div>
      </div>
    {:else}
      <div class="section">
        <button class="item" on:click={goLogin}>Login</button>
        <button class="item" on:click={goSignup}>Sign up</button>
      </div>
    {/if}

    <div class="section">
      <button class="item" on:click={goActivity}>My activity</button>
      <button class="item" on:click={goSettings}>Settings</button>
      <button class="item" on:click={goQuran}>Know us more</button>
    </div>
  </div>
{/if}

<style>
  .menu {
    position: absolute;
    top: 38px;
    right: 0;
    background: var(--menu-bg);
    color: var(--icon);
    border: 1px solid chocolate;
    border-radius: 12px;
    padding: 6px;
    min-width: 200px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    animation: drop .16s ease-out;
    z-index: 50;
  }
  @keyframes drop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
  .section { display: grid; gap: 6px; padding: 6px; }
  .section + .section { border-top: 1px solid chocolate; }
  .title { font-weight: 700; font-size: 12px; color: chocolate; }
  .item {
    background: transparent;
    border: 1px solid chocolate;
    border-radius: 10px;
    color: chocolate;
    padding: 8px 10px;
    text-align: left;
    font: inherit;
    cursor: pointer;
  }
  .item.muted { border-style: dashed; cursor: default; }
  .item:hover, .item:active { background: chocolate; color: var(--nav-bg); border-color: chocolate; }
  button.item { width: 100%; }
  .menu :global(a.item) { text-decoration: none; display: block; }
  
</style>
