import { writable } from 'svelte/store';

const base = [
  { id: 1, src: '/videos/1.mp4' },
  { id: 2, src: '/videos/2.mp4' },
  { id: 3, src: '/videos/3.mp4' },
  { id: 4, src: '/videos/4.mp4' },
  { id: 5, src: '/videos/5.mp4' },
  { id: 6, src: '/videos/6.mp4' },
  { id: 7, src: '/videos/7.mp4' },
  { id: 9, src: '/videos/9.mp4' },
  { id: 10, src: '/videos/10.mp4' }
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
