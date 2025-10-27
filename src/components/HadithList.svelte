<script>
  const ahadith = [
    {
      id: 1,
      reference: 'Sunan al-Tirmidhi 2518',
      text:
        'The Messenger of Allah ﷺ said: “The best of you are those who learn the Qur’an and teach it.”',
      narrator: 'Uthman ibn Affan'
    },
    {
      id: 2,
      reference: 'Riyad as-Salihin 1836',
      text:
        'The Prophet ﷺ said: “Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.”',
      narrator: 'Abu Hurairah'
    },
    {
      id: 3,
      reference: 'Sahih Muslim 2699',
      text:
        'The Messenger of Allah ﷺ said: “The believer’s shade on the Day of Resurrection will be his charity.”',
      narrator: 'Ka’b ibn Ujrah'
    }
  ];

  let liked = new Set();
  let saved = new Set();

  const toggle = (state, id) => {
    const next = new Set(state);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    return next;
  };

  const toggleLike = (id) => {
    liked = toggle(liked, id);
  };

  const toggleSave = (id) => {
    saved = toggle(saved, id);
  };

  const isLiked = (id) => liked.has(id);
  const isSaved = (id) => saved.has(id);
</script>

<section class="hadith">
  <header>
    <h1>Daily Hadith</h1>
    <p>Reflect and revisit the words of the Prophet ﷺ</p>
  </header>

  <div class="hadith-list">
    {#each ahadith as hadith}
      <article class="card">
        <span class="reference">{hadith.reference}</span>
        <p class="text">“{hadith.text}”</p>
        <p class="narrator">— {hadith.narrator}</p>

        <footer>
          <button
            class:active={isSaved(hadith.id)}
            on:click={() => toggleSave(hadith.id)}
            aria-label="Bookmark hadith"
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M7 5.5h10a1 1 0 0 1 1 1v13l-6-3.8-6 3.8v-13a1 1 0 0 1 1-1"
                fill={isSaved(hadith.id) ? 'var(--accent)' : 'none'}
                stroke={isSaved(hadith.id) ? 'var(--accent)' : 'var(--text-muted)'}
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div class="actions">
            <button
              class:active={isLiked(hadith.id)}
              on:click={() => toggleLike(hadith.id)}
              aria-label="Like hadith"
            >
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 19.5s-6.5-4.4-6.5-8.6a3.4 3.4 0 0 1 6-2 3.4 3.4 0 0 1 6 2c0 4.3-6.5 8.6-6.5 8.6z"
                  fill={isLiked(hadith.id) ? 'var(--accent)' : 'none'}
                  stroke={isLiked(hadith.id) ? 'var(--accent)' : 'var(--text-muted)'}
                  stroke-width="1.6"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button aria-label="Share hadith">
              <svg viewBox="0 0 24 24">
                <path
                  d="m17 7-10 5 10 5"
                  fill="none"
                  stroke="var(--text-muted)"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17 7v10"
                  fill="none"
                  stroke="var(--text-muted)"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </footer>
      </article>
    {/each}
  </div>
</section>

<style>
  .hadith {
    padding-bottom: 5.5rem;
  }

  header {
    padding: 1.2rem 0.4rem 0.6rem;
  }

  h1 {
    margin: 0;
    font-size: 1.28rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  header p {
    margin: 0.35rem 0 0;
    font-size: 0.82rem;
    color: var(--text-muted);
  }

  .hadith-list {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .card {
    background: var(--surface-elevated);
    border-radius: 22px;
    padding: 1.2rem;
    box-shadow: 0 12px 32px var(--shadow-soft);
    border: 1px solid var(--stroke);
  }

  .reference {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .text {
    margin: 0.8rem 0 0.6rem;
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--text-primary);
  }

  .narrator {
    margin: 0;
    font-size: 0.76rem;
    color: var(--text-muted);
  }

  footer {
    margin-top: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  button:active {
    transform: scale(0.95);
  }

  button.active {
    background: var(--accent-soft);
  }

  .actions {
    display: flex;
    gap: 0.4rem;
  }

  svg {
    width: 22px;
    height: 22px;
  }
</style>
