<script>
  import { onMount } from 'svelte';

  const STORAGE_KEY = 'knowreel.videos';

  let title = '';
  let url = '';
  let tags = '';
  let items = [];
  let previewUrl = '';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  }
  function save(v) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); } catch {} }

  function toEmbed(u) {
    try {
      const x = new URL(u);
      const host = x.hostname.replace(/^www\./, '');
      if (host === 'youtu.be') {
        const id = x.pathname.slice(1);
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      if (host === 'youtube.com' || host === 'm.youtube.com') {
        const id = x.searchParams.get('v');
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      if (host === 'vimeo.com') {
        const id = x.pathname.split('/').filter(Boolean)[0];
        if (id) return `https://player.vimeo.com/video/${id}`;
      }
      return null;
    } catch { return null; }
  }

  function submit() {
    if (!url) return;
    const entry = {
      title: title.trim(),
      url: url.trim(),
      tags: tags.split(',').map(s => s.trim()).filter(Boolean),
      ts: Date.now()
    };
    items = [entry, ...items];
    save(items);
    title = '';
    url = '';
    tags = '';
  }

  function doPreview() { previewUrl = url; }
  function clearAll() { if (confirm('Clear all saved videos?')) { items = []; save(items); previewUrl = ''; } }

  onMount(() => { items = load(); });
</script>

<section class="card">
  <h1>Add Video</h1>
  <form class="form-grid" on:submit|preventDefault={submit}>
    <label>
      <span>Title</span>
      <input bind:value={title} type="text" placeholder="e.g., Beautiful Recitation" />
    </label>
    <label>
      <span>Video URL</span>
      <input bind:value={url} type="url" placeholder="Paste YouTube/Vimeo URL" required />
    </label>
    <label>
      <span>Tags</span>
      <input bind:value={tags} type="text" placeholder="comma,separated,tags" />
    </label>
    <div class="actions">
      <button type="submit">Save</button>
      <button type="button" class="secondary" on:click={doPreview}>Preview</button>
    </div>
  </form>
</section>

{#if previewUrl}
<section class="card">
  <h2>Preview</h2>
  <div class="video-frame">
    {#if toEmbed(previewUrl)}
      <iframe src={toEmbed(previewUrl)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    {:else}
      No preview available for this URL.
    {/if}
  </div>
  </section>
{/if}

<section class="card">
  <div class="row between center">
    <h2>Saved Videos</h2>
    <button class="danger small" on:click={clearAll}>Clear All</button>
  </div>
  <ul class="list">
    {#each items as it}
      <li on:click={() => previewUrl = it.url}>
        <strong>{it.title || 'Untitled'}</strong>
        <span class="muted">{it.url}</span>
        {#if it.tags?.length}
          <span class="muted">#{it.tags.join(' #')}</span>
        {/if}
      </li>
    {/each}
  </ul>
</section>

