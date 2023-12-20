<script>
	import { enhance } from '$app/forms';
	import { page } from "$app/stores";

	import { Button } from 'flowbite-svelte';
</script>

<div class="min-h-[calc(100dvh-65px)] flex items-center justify-center p-8">
	<div class="bg-bg-200 p-8 rounded-lg shadow-md w-96">
		<h1 class="text-3xl font-bold mb-4 text-text-100">Settings</h1>

		<form method="POST" action="?/update">
			<div class="mb-4">
				<label for="name" class="block text-sm font-medium text-text-200 mb-2">Name</label>
				<input
						type="text"
						name="name"
						value="{$page.data.user?.name}"
						class="w-full p-3 rounded-md bg-bg-300 text-text-100 placeholder-text-200 border border-accent-100"
						placeholder="Name"
				/>
			</div>

			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-text-200 mb-2">Email</label>
				<input
						type="email"
						name="email"
						value="{$page.data.user?.email}"
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

			<Button
					type="submit"
					class="w-full p-3 rounded-md bg-primary-200 text-text-100 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100"
			>
				Save
			</Button>
		</form>
	</div>
</div>
