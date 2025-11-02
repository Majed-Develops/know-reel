<header class="bar">
  <h1>Contributors</h1>
</header>

<section class="wrap">
  <div class="search">
    <svg viewBox="0 0 24 24" width="18" height="18">
      <circle cx="11" cy="11" r="6" fill="none" stroke="var(--icon)" stroke-width="2" />
      <path d="M20 20l-3.5-3.5" stroke="var(--icon)" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <input placeholder="Search contributors by name or handle" />
  </div>

  <h2>Featured contributors</h2>
  <ul class="list">
    {#each [
      { name: 'Ustadh Ahmad', handle: '@ahmad', role: 'Scholar' },
      { name: 'Ali Khan', handle: '@ali', role: 'Producer' }
    ] as c}
      <li class="contrib">
        <div class="meta">
          <div class="name">{c.name} <span class="handle">{c.handle}</span></div>
          <div class="role">{c.role}</div>
        </div>
        <button class="follow">View</button>
      </li>
    {/each}
  </ul>
</section>

<style>
  .bar { position: sticky; top: 0; background: transparent; padding: 10px 14px; border-bottom: none; }
  h1 { margin: 0; font-size: 18px; }
  .wrap { padding: 12px; display: grid; gap: 14px; }
  .search {
    display: flex; align-items: center; gap: 8px;
    background: var(--card); border: 1px solid var(--border); border-radius: 10px;
    padding: 10px 12px;
  }
  input {
    flex: 1; background: transparent; border: none; outline: none; color: var(--fg);
    font-size: 14px;
  }
  h2 { font-size: 14px; color: var(--muted); margin: 0; }
  .list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
  .contrib { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border: 1px solid var(--border); border-radius: 10px; background: var(--card); }
  .name { font-weight: 600; }
  .handle { color: var(--muted); font-weight: 400; margin-left: 6px; }
  .role { color: var(--muted); font-size: 12px; }
  .follow { background: transparent; color: var(--icon); border: 1px solid var(--border); border-radius: 999px; padding: 6px 10px; }
</style>

