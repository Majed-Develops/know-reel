<script>
  import { createEventDispatcher } from 'svelte';

  const segments = [
    { id: 'watch', label: 'Watch' },
    { id: 'read', label: 'Read' }
  ];

  const videos = [
    {
      id: 1,
      title: 'Morning Dhikr for a Tranquil Heart',
      scholar: 'Sheikh Omar',
      topic: 'Dhikr',
      duration: '1:12',
      views: '12.4k views'
    },
    {
      id: 2,
      title: 'Mercy in the Sunnah: Caring for Others',
      scholar: 'Ustadha Layla',
      topic: 'Sunnah',
      duration: '0:58',
      views: '8.9k views'
    },
    {
      id: 3,
      title: 'Purification Tips Before Prayer',
      scholar: 'Imam Idris',
      topic: 'Fiqh',
      duration: '1:34',
      views: '15.1k views'
    }
  ];

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

  export let settings = {
    holdEnabled: false,
    defaultMode: 'watch',
    currentMode: 'watch'
  };

  const dispatch = createEventDispatcher();

  let activeSegment = settings.currentMode ?? 'watch';
  let liked = new Set();
  let saved = new Set();
  let likedHadith = new Set();
  let savedHadith = new Set();

  const toggleValue = (collection, id) => {
    const next = new Set(collection);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    return next;
  };

  const toggleLike = (id) => {
    liked = toggleValue(liked, id);
  };

  const toggleSave = (id) => {
    saved = toggleValue(saved, id);
  };

  const isLiked = (id) => liked.has(id);
  const isSaved = (id) => saved.has(id);

  const toggleHadithLike = (id) => {
    likedHadith = toggleValue(likedHadith, id);
  };

  const toggleHadithSave = (id) => {
    savedHadith = toggleValue(savedHadith, id);
  };

  const isHadithLiked = (id) => likedHadith.has(id);
  const isHadithSaved = (id) => savedHadith.has(id);

  $: {
    const nextMode = settings?.currentMode ?? 'watch';
    if (activeSegment !== nextMode) {
      activeSegment = nextMode;
    }
  }

  const selectMode = (mode) => {
    if (settings?.holdEnabled) return;
    if (mode === activeSegment) return;
    dispatch('modechange', { mode });
  };
</script>

<section class="home">
  {#if !settings?.holdEnabled}
    <div class="segment-track">
      {#each segments as segment}
        <button
          class:active={segment.id === activeSegment}
          type="button"
          on:click={() => selectMode(segment.id)}
        >
          {segment.label}
        </button>
      {/each}
      <div
        class="indicator"
        style={`transform: translateX(${activeSegment === 'read' ? '100%' : '0'})`}
      />
    </div>
  {:else}
    <div class="spacer" />
  {/if}

  {#if activeSegment === 'watch'}
    <div class="feed reels">
      {#each videos as video}
        <article class="reel-card">
          <div class="video-preview">
            <div class="topic-chip">{video.topic}</div>
            <div class="video-gradient" />
            <div class="duration">{video.duration}</div>
          </div>
          <div class="meta">
            <h2>{video.title}</h2>
            <p>{video.scholar} • {video.views}</p>
          </div>
          <footer class="actions">
            <div class="primary-actions">
              <button
                class:active={isLiked(video.id)}
                on:click={() => toggleLike(video.id)}
                aria-label="Like reel"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 19.5s-6.5-4.4-6.5-8.6a3.4 3.4 0 0 1 6-2 3.4 3.4 0 0 1 6 2c0 4.3-6.5 8.6-6.5 8.6z"
                    fill={isLiked(video.id) ? 'var(--accent)' : 'none'}
                    stroke={isLiked(video.id) ? 'var(--accent)' : 'var(--text-muted)'}
                    stroke-width="1.6"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button aria-label="Download reel">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 4v10m0 0 3.5-3.5M12 14 8.5 10.5"
                    fill="none"
                    stroke="var(--text-muted)"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 15.5v2a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 17.5v-2"
                    fill="none"
                    stroke="var(--text-muted)"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
            <button
              class:active={isSaved(video.id)}
              on:click={() => toggleSave(video.id)}
              aria-label="Save for later"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6.5 5.5h11a1 1 0 0 1 1 1v13l-6.5-4.2-6.5 4.2v-13a1 1 0 0 1 1-1"
                  fill={isSaved(video.id) ? 'var(--accent)' : 'none'}
                  stroke={isSaved(video.id) ? 'var(--accent)' : 'var(--text-muted)'}
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </footer>
        </article>
      {/each}
    </div>
  {:else}
    <div class="feed hadith-feed">
      {#each ahadith as hadith}
        <article class="hadith-card">
          <header>
            <span class="reference">{hadith.reference}</span>
          </header>
          <p class="text">“{hadith.text}”</p>
          <p class="narrator">— {hadith.narrator}</p>
          <footer class="actions">
            <div class="primary-actions">
              <button
                class:active={isHadithLiked(hadith.id)}
                on:click={() => toggleHadithLike(hadith.id)}
                aria-label="Like hadith"
              >
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 19.5s-6.5-4.4-6.5-8.6a3.4 3.4 0 0 1 6-2 3.4 3.4 0 0 1 6 2c0 4.3-6.5 8.6-6.5 8.6z"
                    fill={isHadithLiked(hadith.id) ? 'var(--accent)' : 'none'}
                    stroke={isHadithLiked(hadith.id) ? 'var(--accent)' : 'var(--text-muted)'}
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
            <button
              class:active={isHadithSaved(hadith.id)}
              on:click={() => toggleHadithSave(hadith.id)}
              aria-label="Bookmark hadith"
            >
              <svg viewBox="0 0 24 24">
                <path
                  d="M7 5.5h10a1 1 0 0 1 1 1v13l-6-3.8-6 3.8v-13a1 1 0 0 1 1-1"
                  fill={isHadithSaved(hadith.id) ? 'var(--accent)' : 'none'}
                  stroke={isHadithSaved(hadith.id) ? 'var(--accent)' : 'var(--text-muted)'}
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </footer>
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  .segment-track {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 320px;
    margin: 0 auto 1.2rem;
    position: sticky;
    top: 0;
    z-index: 5;
  }

  .segment-track button {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.84rem;
    font-weight: 700;
    padding: 0.65rem 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    position: relative;
    z-index: 2;
    transition: color 0.2s ease;
  }

  .segment-track button.active {
    color: var(--accent);
  }

  .indicator {
    position: absolute;
    bottom: -0.45rem;
    left: 0;
    width: 50%;
    height: 4px;
    background: var(--accent);
    border-radius: 999px;
    transform: translateX(0);
    transition: transform 0.25s ease;
  }

  @media (max-width: 480px) {
    .segment-track {
      max-width: 260px;
    }

    .segment-track button {
      font-size: 0.78rem;
    }
  }

  .home {
    display: flex;
    flex-direction: column;
  }

  .mode-pill {
    display: none;
  }

  .spacer {
    height: 0.4rem;
  }

  .feed {
    padding-bottom: 2.4rem;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }

  .reel-card {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .topic-chip {
    position: absolute;
    top: 1rem;
    left: 1rem;
    align-self: flex-start;
    padding: 0.25rem 0.72rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--accent);
    background: var(--accent-soft);
  }

  .video-preview {
    position: relative;
    width: 100%;
    border-radius: 22px;
    overflow: hidden;
    aspect-ratio: 9 / 16;
    background: var(--accent);
    box-shadow: 0 24px 54px rgba(0, 0, 0, 0.26);
  }

  .video-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(9, 73, 36, 0.65), rgba(239, 249, 242, 0.1));
  }

  .duration {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    padding: 0.28rem 0.6rem;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.4);
    color: #f2f8f4;
    font-size: 0.68rem;
    font-weight: 600;
  }

  .meta h2 {
    margin: 0;
    font-size: 1.08rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .meta p {
    margin: 0.35rem 0 0;
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.2rem;
  }

  .primary-actions {
    display: inline-flex;
    gap: 0.85rem;
  }

  .actions button {
    border: none;
    background: none;
    padding: 0;
    display: inline-flex;
    border-radius: 999px;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .actions button:active {
    transform: scale(0.96);
  }

  .actions button.active {
    background: var(--accent-soft);
  }

  svg {
    width: 22px;
    height: 22px;
  }

  .hadith-feed {
    gap: 1.4rem;
  }

  .hadith-card {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding: 1.1rem 1.1rem 0.9rem;
    border-radius: 20px;
    background: var(--surface);
    border: 1px solid var(--stroke);
  }

  .hadith-card .reference {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
  }

  .hadith-card .text {
    margin: 0;
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--text-primary);
  }

  .hadith-card .narrator {
    margin: 0;
    font-size: 0.76rem;
    color: var(--text-muted);
  }
</style>
