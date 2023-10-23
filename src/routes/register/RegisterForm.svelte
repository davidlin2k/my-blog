<script lang="ts">
	import { enhance } from '$app/forms';
	import { Spinner, Button } from 'flowbite-svelte';

	let loading = false;
</script>

<div class="bg-bg-200 p-8 rounded-lg shadow-md w-96">
	<h1 class="text-3xl font-bold mb-4 text-text-100">Sign Up</h1>

	<form
		method="POST"
		use:enhance={() => {
			loading = true;

			return async ({ result, update }) => {
				loading = false;

				if (result.status !== 200) {
					alert('Register failed.');
				} else {
					update();
				}
			};
		}}
	>
		<div class="mb-4">
			<label for="email" class="block text-sm font-medium text-text-200 mb-2">Email</label>
			<input
				type="text"
				name="name"
				class="w-full p-3 rounded-md bg-bg-300 text-text-100 placeholder-text-200 border border-accent-100"
				placeholder="Name"
			/>
		</div>

		<div class="mb-4">
			<label for="email" class="block text-sm font-medium text-text-200 mb-2">Email</label>
			<input
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
			<label for="password" class="block text-sm font-medium text-text-200 mb-2">Password</label>
			<input
				type="password"
				name="password_confirmation"
				class="w-full p-3 rounded-md bg-bg-300 text-text-100 placeholder-text-200 border border-accent-100"
				placeholder="Confirm Password"
			/>
		</div>

		{#if loading}
			<Button
				disabled
				class="w-full p-3 rounded-md bg-primary-200 text-text-100 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100"
			>
				<Spinner class="mr-3" size="4" color="white" />
				<span>Loading...</span>
			</Button>
		{:else}
			<Button
				type="submit"
				class="w-full p-3 rounded-md bg-primary-200 text-text-100 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100"
			>
				Sign Up
			</Button>
		{/if}
	</form>
</div>
