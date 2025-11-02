import { writable } from 'svelte/store';

const KEY = 'knowreels.activity.v1';

function safeLoad() {
  try {
    const raw = localStorage.getItem(KEY) || '{}';
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function safeSave(v) {
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {}
}

const initial = (() => {
  const x = safeLoad();
  return {
    bookmarks: { videos: Array.isArray(x?.bookmarks?.videos) ? x.bookmarks.videos : [] },
    likes: { videos: Array.isArray(x?.likes?.videos) ? x.likes.videos : [] }
  };
})();

export const activity = writable(initial);

activity.subscribe((v) => safeSave(v));

export function isBookmarkedVideo(id, state) {
  const s = state ?? safeLoad();
  return Array.isArray(s?.bookmarks?.videos) && s.bookmarks.videos.includes(id);
}

export function isLikedVideo(id, state) {
  const s = state ?? safeLoad();
  return Array.isArray(s?.likes?.videos) && s.likes.videos.includes(id);
}

export function toggleBookmarkVideo(id) {
  activity.update((s) => {
    const set = new Set(s.bookmarks.videos);
    if (set.has(id)) set.delete(id); else set.add(id);
    const next = { ...s, bookmarks: { ...s.bookmarks, videos: Array.from(set) } };
    safeSave(next);
    return next;
  });
}

export function toggleLikeVideo(id) {
  activity.update((s) => {
    const set = new Set(s.likes.videos);
    if (set.has(id)) set.delete(id); else set.add(id);
    const next = { ...s, likes: { ...s.likes, videos: Array.from(set) } };
    safeSave(next);
    return next;
  });
}

