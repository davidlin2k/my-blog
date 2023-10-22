<script>
	import { enhance } from '$app/forms';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';

	let isOpen = false;

	onMount(() => {
		// Add event listener when component mounts
		window.addEventListener('click', closeDropdown);

		return () => {
			// Cleanup event listener when component is destroyed
			onDestroy(window.removeEventListener('click', closeDropdown));
		};
	});

	function closeDropdown() {
		if (isOpen) {
			isOpen = false;
		}
	}

	function toggleDropdown(event) {
		event.stopPropagation(); // Prevent event from reaching window click listener
		isOpen = !isOpen;
	}
</script>

<div class="bg-bg-100 text-text-100 p-3 border-b border-bg-200 shadow-md">
	<div class="container mx-auto">
		<div class="flex justify-between items-center">
			<!-- Branding -->
			<a href="/" class="text-2xl font-semibold text-100">David's Blog</a>

			<!-- User section with dropdown -->
			<div class="relative dropdown-container">
				<button on:click={toggleDropdown} class="flex items-center rounded px-3 py-2 text-text-100">
					<span class="mr-2">{$page.data.user ? $page.data.user.name : 'Welcome'}</span>
					<svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
						><path d="M7 10l5 5 5-5H7z" /></svg
					>
				</button>

				<!-- Dropdown Menu -->
				<div
					class={isOpen ? 'absolute right-0 mt-2 w-48 py-2 bg-bg-200 rounded shadow-xl' : 'hidden'}
				>
					{#if $page.data.user}
						<a href="#" class="block px-4 py-2 hover:bg-primary-200 hover:text-text-100">Profile</a>
						<a href="/settings" class="block px-4 py-2 hover:bg-primary-200 hover:text-text-100"
							>Settings</a
						>
						<form action="/logout" method="POST" use:enhance>
							<button
								type="submit"
								class="block w-full text-left px-4 py-2 hover:bg-primary-200 hover:text-text-100"
								>Log out</button
							>
						</form>
					{:else}
						<a href="/login" class="block px-4 py-2 hover:bg-primary-200 hover:text-text-100"
							>Login</a
						>
						<a href="/register" class="block px-4 py-2 hover:bg-primary-200 hover:text-text-100"
							>Sign Up</a
						>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
