import { writable } from 'svelte/store';

const KEY = 'knowreel.ui';

function getInitial() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

const defaults = {
  homeMode: 'watch' // 'watch' | 'hadith'
};

function initState() {
  const saved = getInitial();
  return { ...defaults, ...saved };
}

export const ui = writable(initState());

ui.subscribe((val) => {
  try { localStorage.setItem(KEY, JSON.stringify(val)); } catch {}
});

