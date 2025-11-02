import { writable } from 'svelte/store';

let nextId = 1;
export const toasts = writable([]);

export function push(message, opts = {}) {
  const id = nextId++;
  const t = {
    id,
    message,
    kind: opts.kind || 'info',
    action: opts.action || null, // { label, handler }
    timeout: typeof opts.timeout === 'number' ? opts.timeout : 2500
  };
  toasts.update((arr) => [...arr, t]);
  if (t.timeout > 0) {
    setTimeout(() => remove(id), t.timeout);
  }
  return id;
}

export function remove(id) {
  toasts.update((arr) => arr.filter((x) => x.id !== id));
}

