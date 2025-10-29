<script>
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();
  export let open = false;
  let label = 'Dhuhr';
  let icon = 'sun'; // sun | sun-cloud | sun-above-cloud | moon | moon-cloud

  function updateByTime() {
    const h = new Date().getHours();
    if (h >= 5 && h < 7) { label = 'Fajr'; icon = 'sun-cloud'; }
    else if (h >= 12 && h < 15) { label = 'Dhuhr'; icon = 'sun'; }
    else if (h >= 15 && h < 18) { label = 'Asr'; icon = 'sun-above-cloud'; }
    else if (h >= 18 && h < 20) { label = 'Maghrib'; icon = 'moon-cloud'; }
    else { label = 'Isha'; icon = 'moon'; }
  }
  onMount(() => { updateByTime(); const t = setInterval(updateByTime, 60000); return () => clearInterval(t); });

  function toggle() { dispatch('toggle'); }
</script>

<div class="salah" role="button" aria-haspopup="true" aria-expanded={open} on:click={toggle}>
  {#if icon === 'sun'}
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="5" fill="chocolate" />
    </svg>
  {:else if icon === 'sun-cloud'}
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="9" cy="10" r="4" fill="chocolate" />
      <ellipse cx="15" cy="14" rx="6" ry="3.5" fill="sandybrown" opacity="0.8" />
    </svg>
  {:else if icon === 'sun-above-cloud'}
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="7" r="4" fill="chocolate" />
      <ellipse cx="14" cy="15" rx="6" ry="3.5" fill="sandybrown" opacity="0.8" />
    </svg>
  {:else if icon === 'moon'}
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M14 3a8 8 0 1 0 7 11A7 7 0 0 1 14 3z" fill="chocolate" />
    </svg>
  {:else}
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M14 3a8 8 0 1 0 7 11A7 7 0 0 1 14 3z" fill="chocolate" />
      <ellipse cx="10" cy="15" rx="6" ry="3.5" fill="sandybrown" opacity="0.8" />
    </svg>
  {/if}
  <span class="label">{label}</span>
  {#if open}
    <div class="menu" role="menu" aria-label="Salah Menu">
      <div class="row">Next Salah: <strong class="name">{label}</strong> in <strong class="time">—</strong></div>
    </div>
  {/if}
</div>

<style>
  .salah { position: relative; display: inline-flex; align-items: center; gap: 6px; padding: 6px; border-radius: 10px; }
  .label { font-weight: 700; color: chocolate; font-size: 12px; }
  .menu {
    position: absolute;
    top: 32px; left: 0;
    background: var(--menu-bg);
    border: 1px solid chocolate;
    border-radius: 12px;
    padding: 8px 10px;
    color: chocolate;
    min-width: 220px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    animation: drop .16s ease-out;
    z-index: 50;
  }
  .row { display: flex; gap: 6px; align-items: baseline; }
  .name, .time { color: chocolate; }
  @keyframes drop { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
</style>
