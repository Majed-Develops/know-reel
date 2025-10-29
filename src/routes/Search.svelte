<header class="bar">
  <h1>Search</h1>
  </header>

<section class="wrap">
  <div class="search">
    <svg viewBox="0 0 24 24" width="18" height="18">
      <circle cx="11" cy="11" r="6" fill="none" stroke="var(--icon)" stroke-width="2" />
      <path d="M20 20l-3.5-3.5" stroke="var(--icon)" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <input placeholder="Search topics, videos, hadith..." />
  </div>

  <h2>Topics</h2>
  <div class="chips">
    {#each ['Hadith', "Qur'an", 'Islamic Rules', 'Fiqh', 'Aqeedah', 'Tafsir'] as t}
      <button class="chip">{t}</button>
    {/each}
  </div>
</section>

<style>
  .bar { position: sticky; top: 0; background: var(--bg); padding: 10px 14px; border-bottom: 1px solid var(--border); }
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
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    background: var(--card);
    color: var(--fg);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 13px;
  }
  .chip:active { border-color: var(--accent); color: var(--accent); }
</style>

