import { writable } from 'svelte/store';

function parse() {
  const hash = (location.hash || '').replace(/^#\/?/, '').trim();
  const parts = hash.split('/').filter(Boolean);
  const route = parts[0] || '';
  return route || 'home';
}

export const route = writable(parse());

export function navigate(to) {
  if (!to.startsWith('#')) to = `#/${to}`;
  location.hash = to;
}

function onHashChange() { route.set(parse()); }

window.addEventListener('hashchange', onHashChange);
window.addEventListener('DOMContentLoaded', onHashChange);

