<script>
  import { toasts, remove } from '../lib/stores/toast.js';
</script>

<div class="toast-wrap">
  {#each $toasts as t (t.id)}
    <div class="toast {t.kind}">
      <span class="msg">{t.message}</span>
      {#if t.action}
        <button class="act" on:click={() => { try { t.action.handler?.(); } finally { remove(t.id); } }}>{t.action.label}</button>
      {/if}
    </div>
  {/each}
  <div aria-live="polite" aria-atomic="true" class="sr" />
</div>

<style>
  .toast-wrap { position: fixed; left: 50%; bottom: 68px; transform: translateX(-50%); width: min(440px, 100vw); padding: 0 12px; z-index: 120; display: grid; gap: 8px; }
  .toast { display: flex; align-items: center; justify-content: space-between; gap: 12px; border: 1px solid var(--border); background: var(--card); color: var(--fg); border-radius: 12px; padding: 10px 12px; box-shadow: 0 10px 24px rgba(0,0,0,0.22); }
  .toast .msg { font-size: 14px; }
  .toast .act { border: none; background: transparent; color: var(--accent); font-weight: 700; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
</style>

