<script>
  import { onMount } from 'svelte';
  const STORAGE_KEY = 'knowreel.hadith';

  let source = '';
  let narrator = '';
  let text = '';
  let reference = '';
  let items = [];

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  }
  function save(v) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); } catch {} }

  function submit() {
    if (!text.trim()) return;
    const entry = { source: source.trim(), narrator: narrator.trim(), text: text.trim(), reference: reference.trim(), ts: Date.now() };
    items = [entry, ...items];
    save(items);
    source = narrator = text = reference = '';
  }

  function clearAll() { if (confirm('Clear all saved hadith?')) { items = []; save(items); } }

  onMount(() => { items = load(); });
</script>

<section class="card">
  <h1>Add Hadith</h1>
  <form class="form-grid" on:submit|preventDefault={submit}>
    <label>
      <span>Source/Collection</span>
      <input bind:value={source} type="text" placeholder="e.g., Sahih al-Bukhari" />
    </label>
    <label>
      <span>Narrator</span>
      <input bind:value={narrator} type="text" placeholder="e.g., Abu Huraira" />
    </label>
    <label class="full">
      <span>Hadith Text</span>
      <textarea bind:value={text} rows="6" placeholder="Enter hadith text..." required></textarea>
    </label>
    <label>
      <span>Reference</span>
      <input bind:value={reference} type="text" placeholder="e.g., Book 1, Hadith 1" />
    </label>
    <div class="actions">
      <button type="submit">Save</button>
    </div>
  </form>
</section>

<section class="card">
  <div class="row between center">
    <h2>Saved Hadith</h2>
    <button class="danger small" on:click={clearAll}>Clear All</button>
  </div>
  <ul class="list">
    {#each items as h}
      <li>
        {#if (h.source || h.narrator)}
          <strong>{[h.source, h.narrator].filter(Boolean).join(' • ')}</strong>
        {/if}
        <div>{h.text}</div>
        {#if h.reference}
          <span class="muted">{h.reference}</span>
        {/if}
      </li>
    {/each}
  </ul>
</section>

