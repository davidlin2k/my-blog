<script>
	import { page } from '$app/stores';
</script>

<div>
	{#if $page.data.user}
		<h1>Welcome, {$page.data.user.name}</h1>
	{:else}
		<h1>Welcome, guest</h1>
	{/if}
</div>
