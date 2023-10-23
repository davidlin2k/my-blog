<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="bg-bg-200 p-8 rounded-lg shadow-md w-96">
	<h1 class="text-3xl font-bold mb-4 text-text-100">Register</h1>

	<form
		method="POST"
		use:enhance={() => {
			return async ({ result, update }) => {
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

		<button
			type="submit"
			class="w-full bg-primary-200 text-text-100 py-2 rounded-md hover:bg-primary-300"
			>Register</button
		>
	</form>
</div>
