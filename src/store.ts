import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Email
const storedEmail = browser ? localStorage.getItem('email') : '';
export const email = writable(storedEmail);
email.subscribe((value) => {
	if (browser) localStorage.setItem('email', value ?? '');
});

// Remember me
const storedRememberMe = browser ? localStorage.getItem('rememberMe') : 'false';
export const rememberMe = writable(storedRememberMe === 'true');
rememberMe.subscribe((value) => {
	if (browser) localStorage.setItem('rememberMe', value ? 'true' : 'false');
});
