<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import Time from 'svelte-time';

	export let comment: any;
</script>

<div class="space-y-2 my-4 p-4 rounded-lg bg-bg-300">
	<div>
		<span class="font-medium">{comment.user.name}</span> • <Time
			timestamp={comment.created_at}
			relative
		/>
	</div>
	<div>{comment.content}</div>

	{#if comment.user.id === $page.data.user.id}
		<div class="flex justify-end">
			<form method="POST" action="?/deleteComment&id={comment.id}" use:enhance>
				<button class="text-sm text-red-500 hover:text-red-600">Delete</button>
			</form>
		</div>
	{/if}
</div>
