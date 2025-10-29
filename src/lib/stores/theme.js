import { writable } from 'svelte/store';

const KEY = 'knowreel.theme';

function getInitial() {
  try { return localStorage.getItem(KEY) || 'light'; } catch { return 'light'; }
}

export const theme = writable(getInitial());

theme.subscribe((val) => {
  try { localStorage.setItem(KEY, val); } catch {}
  const html = document.documentElement;
  if (val === 'light') html.setAttribute('data-theme', 'light');
  else html.removeAttribute('data-theme');
});

