import { writable } from 'svelte/store';

// Simple placeholder auth store. Replace with real auth when available.
// user: { name, username } | null
export const auth = writable({ user: null });

