import { writable } from 'svelte/store';

const base = [
  { id: 1, src: '/videos/1.mp4' },
  { id: 2, src: '/videos/2.mp4' },
  { id: 3, src: '/videos/3.mp4' },
  { id: 4, src: '/videos/4.mp4' },
  { id: 5, src: '/videos/5.mp4' },
  { id: 6, src: '/videos/6.mp4' },
  { id: 7, src: '/videos/7.mp4' },
  { id: 8, src: '/videos/8.mp4' },
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
