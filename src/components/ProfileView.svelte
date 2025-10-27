<script>
  import { appearance } from '../stores/appearance';

  const profile = {
    username: '@knowSeeker',
    name: 'Majed Bashir',
    email: 'majed@example.com'
  };

  let showSettings = false;

  const toggleSettings = () => {
    showSettings = !showSettings;
  };

  const flipHold = () => {
    appearance.update((state) => {
      const holdEnabled = !state.holdEnabled;
      return {
        ...state,
        holdEnabled,
        currentMode: holdEnabled ? state.currentMode : state.defaultMode
      };
    });
  };

  const flipDefault = () => {
    appearance.update((state) => {
      const nextDefault = state.defaultMode === 'watch' ? 'read' : 'watch';
      return {
        ...state,
        holdEnabled: false,
        defaultMode: nextDefault,
        currentMode: nextDefault
      };
    });
  };
</script>

<section class="profile">
  <header class="top-bar">
    <div class="username">
      <span>{profile.username}</span>
      <button aria-label="Edit username">
        <svg viewBox="0 0 24 24">
          <path
            d="M6 15.5v2.5h2.5l8-8a1.8 1.8 0 0 0-2.5-2.5z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="m15 7 2 2"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
    <button
      class="settings"
      class:open={showSettings}
      aria-label="Open settings"
      aria-expanded={showSettings}
      type="button"
      on:click={toggleSettings}
    >
      <svg viewBox="0 0 24 24">
        <path
          d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7m7.5 3.5a2.1 2.1 0 0 0-.05-.42l2.14-1.67-2-3.46-2.6.56a2 2 0 0 0-.72-.42l-.39-2.64H8.12l-.39 2.64a2 2 0 0 0-.72.42l-2.6-.56-2 3.46 2.14 1.67a2 2 0 0 0 0 .84L2.41 14.6l2 3.46 2.6-.56a2 2 0 0 0 .72.42l.39 2.64h5.56l.39-2.64a2 2 0 0 0 .72-.42l2.6.56 2-3.46-2.14-1.67a2.1 2.1 0 0 0 .05-.42"
          fill="none"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Settings
    </button>
  </header>

  <div class="card highlight">
    <div class="avatar" aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <circle cx="32" cy="22" r="12" fill="white" opacity="0.95" />
        <path
          d="M20 48c3.4-8.6 20.6-8.6 24 0l2.2 6.2c0.5 1.4-0.5 2.8-2 2.8H19.8c-1.5 0-2.5-1.4-2-2.8z"
          fill="white"
          opacity="0.9"
        />
        <path
          d="M24 20c0-5.5 4.5-10 10-10s10 4.5 10 10v4a2 2 0 0 1-2 2H26a2 2 0 0 1-2-2z"
          fill="white"
          opacity="0.5"
        />
      </svg>
    </div>
    <div class="info">
      <h1 contenteditable="true">{profile.name}</h1>
      <p contenteditable="true">{profile.email}</p>
    </div>
  </div>

  <div class="details">
    <div>
      <span class="label">Name</span>
      <span class="value">{profile.name}</span>
    </div>
    <div>
      <span class="label">Username</span>
      <span class="value">{profile.username}</span>
    </div>
    <div>
      <span class="label">Email</span>
      <span class="value">{profile.email}</span>
    </div>
  </div>

  {#if showSettings}
    <div class="settings-panel">
      <h2>Change Appearance</h2>
      <div class="setting-row">
        <div>
          <span class="setting-title">Hold Home to Toggle</span>
          <span class="setting-subtitle">Switch between Watch & Read instantly</span>
        </div>
        <label class="switch">
          <input type="checkbox" checked={$appearance.holdEnabled} on:change={flipHold} />
          <span class="slider" />
        </label>
      </div>
      <div class="setting-row">
        <div>
          <span class="setting-title">Default Mode</span>
          <span class="setting-subtitle">
            {$appearance.defaultMode === 'watch'
              ? 'Start in Watch each time'
              : 'Start in Read each time'}
          </span>
        </div>
        <label class="switch">
          <input
            type="checkbox"
            checked={$appearance.defaultMode === 'watch'}
            on:change={flipDefault}
            disabled={$appearance.holdEnabled}
          />
          <span class="slider" />
        </label>
      </div>
    </div>
  {/if}

  <div class="card contributor">
    <div>
      <h2>Become a Contributor</h2>
      <p>Share authentic reels and notes with the community.</p>
    </div>
    <button>Apply</button>
  </div>
</section>

<style>
  .profile {
    padding-bottom: 5.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  .top-bar {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .username {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .username button {
    border: none;
    background: var(--accent-soft);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
  }

  .username svg {
    width: 16px;
    height: 16px;
  }

  .settings {
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--accent-soft);
    color: var(--accent);
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 600;
  }

  .settings.open {
    background: var(--accent);
    color: #f1fbf6;
  }

  .settings svg {
    width: 17px;
    height: 17px;
  }

  .card {
    background: transparent;
    border-radius: 24px;
    padding: 0;
    box-shadow: none;
    border: none;
  }

  .highlight {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
  }

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 20px;
    background: linear-gradient(135deg, var(--accent), rgba(63, 154, 106, 0.72));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .avatar svg {
    width: 40px;
    height: 40px;
  }

  .info h1 {
    margin: 0;
    font-size: 1.1rem;
    color: var(--text-primary);
  }

  .info p {
    margin: 0.4rem 0 0;
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.5rem 0 0.6rem;
  }

  .details div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    font-weight: 600;
  }

  .value {
    font-size: 0.88rem;
    color: var(--text-primary);
    font-weight: 500;
  }

  .settings-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.2rem 1.1rem;
    border-radius: 20px;
    background: var(--surface);
    border: 1px solid var(--stroke);
  }

  .settings-panel h2 {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .setting-title {
    display: block;
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .setting-subtitle {
    display: block;
    font-size: 0.72rem;
    color: var(--text-muted);
    margin-top: 0.25rem;
  }

  .switch {
    position: relative;
    width: 46px;
    height: 24px;
    display: inline-flex;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    transition: background 0.2s ease;
  }

  .slider::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--surface-elevated);
    top: 3px;
    left: 4px;
    transition: transform 0.2s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }

  .switch input:checked + .slider {
    background: var(--accent);
  }

  .switch input:checked + .slider::after {
    transform: translateX(20px);
    background: #f5fff7;
  }

  .switch input:disabled + .slider {
    opacity: 0.4;
  }

  .switch input:disabled + .slider::after {
    box-shadow: none;
  }

  .contributor {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    background: var(--accent-soft);
    border-radius: 20px;
    padding: 1.1rem 1.2rem;
  }

  .contributor h2 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .contributor p {
    margin: 0.45rem 0 0;
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .contributor button {
    border: none;
    background: var(--accent);
    color: #f1fbf6;
    padding: 0.5rem 1.1rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
  }
</style>
