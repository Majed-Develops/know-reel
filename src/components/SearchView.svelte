<script>
  const quickFilters = ['Hadith', 'Qur’an', 'Fiqh', 'Seerah', 'Tafsir', 'Akhlaq'];

  const curatedCollections = [
    {
      id: 1,
      title: 'Mercy & Compassion',
      description: 'Stories of the Prophet ﷺ on kindness',
      count: 12
    },
    {
      id: 2,
      title: 'Foundations of Prayer',
      description: 'Step-by-step reminders for focus in salah',
      count: 9
    },
    {
      id: 3,
      title: 'Daily Qur’an Reflections',
      description: 'Short tafsir moments to carry in your day',
      count: 15
    }
  ];

  let activeFilters = new Set(['Hadith']);

  const toggleFilter = (filter) => {
    const next = new Set(activeFilters);
    if (next.has(filter)) {
      next.delete(filter);
    } else {
      next.add(filter);
    }
    activeFilters = next;
  };

  const isActive = (filter) => activeFilters.has(filter);
</script>

<section class="search">
  <header>
    <h1>Explore Topics</h1>
    <p>Search short reels by theme or classical source</p>
  </header>

  <label class="search-field">
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="5.5" fill="none" stroke="var(--text-muted)" stroke-width="1.6" />
      <path
        d="m15.5 15.5 3.5 3.5"
        fill="none"
        stroke="var(--text-muted)"
        stroke-width="1.6"
        stroke-linecap="round"
      />
    </svg>
    <input type="text" placeholder="Search by theme, scholar, or keyword" />
  </label>

  <div class="filters">
    {#each quickFilters as filter}
      <button
        class:active={isActive(filter)}
        on:click={() => toggleFilter(filter)}
        type="button"
      >
        {filter}
      </button>
    {/each}
  </div>

  <div class="collections">
    {#each curatedCollections as collection}
      <article class="collection-card">
        <div>
          <h2>{collection.title}</h2>
          <p>{collection.description}</p>
        </div>
        <span>{collection.count} reels</span>
      </article>
    {/each}
  </div>
</section>

<style>
  .search {
    padding-bottom: 5.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  }

  header {
    padding: 1.2rem 0.4rem 0;
  }

  h1 {
    margin: 0;
    font-size: 1.26rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  header p {
    margin: 0.35rem 0 0;
    font-size: 0.82rem;
    color: var(--text-muted);
  }

  .search-field {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-radius: 18px;
    background: var(--surface-elevated);
    border: 1px solid var(--stroke);
    box-shadow: 0 14px 30px var(--shadow-soft);
  }

  .search-field svg {
    width: 22px;
    height: 22px;
  }

  input {
    border: none;
    flex: 1;
    font-size: 0.92rem;
    color: var(--text-primary);
    background: transparent;
  }

  input::placeholder {
    color: var(--text-muted);
  }

  input:focus {
    outline: none;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .filters button {
    padding: 0.42rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--stroke);
    background: var(--surface);
    color: var(--text-primary);
    font-size: 0.78rem;
    font-weight: 600;
    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  }

  .filters button.active {
    background: var(--accent);
    color: #f2f9f5;
    border-color: var(--accent);
  }

  .filters button:active {
    transform: scale(0.95);
  }

  .collections {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .collection-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.1rem 1.2rem;
    border-radius: 20px;
    background: var(--surface-elevated);
    border: 1px solid var(--stroke);
    box-shadow: 0 12px 32px var(--shadow-soft);
  }

  .collection-card h2 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .collection-card p {
    margin: 0.45rem 0 0;
    font-size: 0.78rem;
    color: var(--text-muted);
    line-height: 1.5;
    max-width: 16rem;
  }

  .collection-card span {
    font-size: 0.74rem;
    font-weight: 600;
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    background: var(--accent-soft);
    color: var(--accent);
  }
</style>
