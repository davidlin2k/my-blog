<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from 'flowbite-svelte';
</script>

<div class="min-h-[calc(100dvh-65px)] flex flex-col justify-center items-center">
	<div class="text-7xl font-bold text-text-100 mb-4">
		{$page.status ?? '404'}
	</div>
	<div class="text-xl mb-4">
		{$page.error?.message}
	</div>
	<Button href="/" class="bg-bg-300 hover:bg-accent-100 transition-colors"
		>Go back to the homepage</Button
	>
</div>
