<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let isOpen = false;

	function closeDropdown() {
		if (isOpen) {
			isOpen = false;
		}
	}

	function toggleDropdown(event: MouseEvent) {
		event.stopPropagation();
		isOpen = !isOpen;
	}
</script>

<svelte:window on:click={closeDropdown} />

<div class="bg-bg-100 text-text-100 p-2 border-b border-bg-200 shadow-md">
	<div class="container mx-auto">
		<div class="flex justify-between items-center">
			<!-- Branding -->
			<a href="/" class="text-2xl font-semibold text-100">David's Blog</a>

			<div class="flex items-center">
				<!-- New blog -->
				{#if $page.data.user?.is_admin}
					<form action="/blogs" method="POST" use:enhance>
						<button
							type="submit"
							class="mr-3 text-text-200 hover:text-accent-100 transition-colors"
						>
							New Blog
						</button>
					</form>
				{/if}
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
							<a
								href="/settings"
								class="block px-4 py-2 hover:bg-primary-200 hover:text-text-100 transition-colors"
								>Settings</a
							>
							<form action="/settings?/logout" method="POST" use:enhance>
								<button
									type="submit"
									class="block w-full text-left px-4 py-2 hover:bg-primary-200 hover:text-text-100 transition-colors"
									>Log out</button
								>
							</form>
						{:else}
							<a
								href="/login"
								class="block px-4 py-2 hover:bg-primary-200 hover:text-text-100 transition-colors"
								>Sign In</a
							>
							<a
								href="/register"
								class="block px-4 py-2 hover:bg-primary-200 hover:text-text-100 transition-colors"
								>Sign Up</a
							>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
