import { writable } from 'svelte/store';

// Use faster remote video URLs
const BASE_URL = 'https://raw.githubusercontent.com/Majed-Develops/know-reel/refs/heads/main/public/videos';
const u = (n) => `${BASE_URL}/${n}.mp4`;
const base = [
  { id: 1, src: u(1) },
  { id: 2, src: u(2) },
  { id: 3, src: u(3) },
  { id: 4, src: u(4) },
  { id: 5, src: u(5) },
  { id: 6, src: u(6) },
  { id: 7, src: u(7) },
  { id: 9, src: u(9) },
  { id: 10, src: u(10) }
];

export const reels = writable(base);

export function addReel(src, caption = '') {
  const item = { id: Date.now(), src, caption: caption?.trim() || '', contributed: true };
  reels.update((arr) => [item, ...arr]);
}

export function removeReel(id) {
  reels.update((arr) => arr.filter((r) => r.id !== id));
}

export function restoreReel(item) {
  if (!item) return;
  reels.update((arr) => [item, ...arr]);
}

export function setPinned(id) {
  reels.update((arr) => {
    let found = false;
    const next = arr.map((r) => {
      if (r.id === id) { found = true; return { ...r, pinned: true }; }
      return r.pinned ? { ...r, pinned: false } : r;
    });
    return next;
  });
}

export function updateCaption(id, caption) {
  const text = (caption || '').trim();
  reels.update((arr) => arr.map((r) => (r.id === id ? { ...r, caption: text } : r)));
}
