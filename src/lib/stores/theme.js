import { writable } from 'svelte/store';

const KEY = 'knowreel.theme';
let mql;

function getInitial() {
  try { return localStorage.getItem(KEY) || 'system'; } catch { return 'system'; }
}

export const theme = writable(getInitial());

function apply(val) {
  const html = document.documentElement;
  if (val === 'system') {
    try {
      mql = mql || window.matchMedia('(prefers-color-scheme: dark)');
      const dark = mql.matches;
      if (dark) html.removeAttribute('data-theme'); else html.setAttribute('data-theme', 'light');
    } catch {
      html.setAttribute('data-theme', 'light');
    }
    return;
  }
  if (val === 'light') html.setAttribute('data-theme', 'light');
  else html.removeAttribute('data-theme');
}

theme.subscribe((val) => {
  try { localStorage.setItem(KEY, val); } catch {}
  apply(val);
});

try {
  mql = window.matchMedia('(prefers-color-scheme: dark)');
  mql.addEventListener?.('change', () => {
    let val;
    theme.subscribe((v) => (val = v))();
    if (val === 'system') apply('system');
  });
} catch {}

