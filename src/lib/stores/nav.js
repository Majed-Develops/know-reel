import { writable } from 'svelte/store';

// 'neutral' | 'forward' | 'back'
export const nav = writable('neutral');

