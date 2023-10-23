<script>
	import { enhance } from '$app/forms';
	import { Checkbox } from 'flowbite-svelte';

	import { email, rememberMe } from "../../store"

	let emailInput = $email;
	let rememberMeInput = $rememberMe;
</script>

<div class="bg-bg-200 p-8 rounded-lg shadow-md w-96">
	<h1 class="text-3xl font-bold mb-4 text-text-100">Log In</h1>

	<form
		method="POST"
		use:enhance={() => {
			return async ({ result, update }) => {
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

		<button
			type="submit"
			name="submit"
			class="w-full p-3 rounded-md bg-primary-200 text-text-100 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100"
		>
			Sign In
		</button>
	</form>
</div>
