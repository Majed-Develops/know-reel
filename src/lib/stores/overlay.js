import { writable } from 'svelte/store';

// Simple transient store to signal a global blocking overlay (e.g., contributor add flow)
export const overlay = writable(false);

