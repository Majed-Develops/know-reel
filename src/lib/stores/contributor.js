import { writable } from 'svelte/store';

const KEY = 'knowreel.contributor';

function load() {
  try { return localStorage.getItem(KEY) === '1'; } catch { return false; }
}
function save(v) { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch {} }

export const contributor = writable(load());
contributor.subscribe(save);

