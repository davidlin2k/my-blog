<script>
	import { enhance } from '$app/forms';
	import { Checkbox, Spinner, Button } from 'flowbite-svelte';
	import { fade } from 'svelte/transition';

	import { email, rememberMe } from '../../store';

	let emailInput = $email;
	let rememberMeInput = $rememberMe;

	let loading = false;
	let showAlert = false;

	function closeAlert() {
		showAlert = false;
	}
</script>

<div>
	{#if showAlert}
		<div
			class="flex items-center p-2 mb-4 text-red-800 rounded-lg bg-red-50"
			out:fade={{ duration: 150 }}
		>
			<div class="ml-3 text-sm font-medium">Sign in failed.</div>
			<Button
				class="ml-auto text-red-500 rounded-lg bg-red-50 p-1.5 hover:bg-red-200 h-8 w-8"
				on:click={closeAlert}
			>
				<span class="sr-only">Close</span>
				<svg
					class="w-3 h-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
			</Button>
		</div>
	{/if}

	<div class="bg-bg-200 p-8 rounded-lg shadow-md w-96">
		<h1 class="text-3xl font-bold mb-4 text-text-100">Sign In</h1>

		<form
			method="POST"
			use:enhance={() => {
				loading = true;

				return async ({ result, update }) => {
					loading = false;

					if (!rememberMeInput) {
						email.set('');
						rememberMe.set(false);
					}

					if (result.status === 401) {
						showAlert = true;
					} else {
						if (rememberMeInput) {
							email.set(emailInput);
							rememberMe.set(rememberMeInput);
						}

						update();
					}
				};
			}}
		>
			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-text-200 mb-2">Email</label>
				<input
					bind:value={emailInput}
					type="email"
					name="email"
					class="w-full p-3 rounded-md bg-bg-300 text-text-100 placeholder-text-200 border border-accent-100"
					placeholder="Email"
				/>
			</div>

			<div class="mb-4">
				<label for="password" class="block text-sm font-medium text-text-200 mb-2">Password</label>
				<input
					type="password"
					name="password"
					class="w-full p-3 rounded-md bg-bg-300 text-text-100 placeholder-text-200 border border-accent-100"
					placeholder="Password"
				/>
			</div>

			<div class="mb-4">
				<Checkbox class="text-text-200" bind:checked={rememberMeInput}>Remember me</Checkbox>
			</div>

			{#if loading}
				<Button disabled class="w-full bg-primary-200 text-text-100 hover:bg-primary-100">
					<Spinner class="mr-3" size="4" color="white" />
					<span>Signing in...</span>
				</Button>
			{:else}
				<Button type="submit" class="w-full bg-primary-200 text-text-100 hover:bg-primary-100">
					Sign In
				</Button>
			{/if}
		</form>
	</div>
</div>
