<script>
	import { enhance } from '$app/forms';
	import { Checkbox, Spinner, Button } from 'flowbite-svelte';

	import { email, rememberMe } from '../../store';

	let emailInput = $email;
	let rememberMeInput = $rememberMe;

	let loading = false;
</script>

<div class="bg-bg-200 p-8 rounded-lg shadow-md w-96">
	<h1 class="text-3xl font-bold mb-4 text-text-100">Log In</h1>

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
					alert('Invalid credentials');
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
			<Button
				disabled
				class="w-full bg-primary-200 text-text-100 hover:bg-primary-100"
			>
				<Spinner class="mr-3" size="4" color="white" />
				<span>Signing in...</span>
			</Button>
		{:else}
			<Button
				type="submit"
				class="w-full bg-primary-200 text-text-100 hover:bg-primary-100"
			>
				Sign In
			</Button>
		{/if}
	</form>
</div>
