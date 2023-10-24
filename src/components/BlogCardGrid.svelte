<script lang="ts">
	import BlogCard from '$components/BlogCard.svelte';

	export let blogs: any[] = [];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
	{#each blogs as blog}
		<BlogCard
			slug={blog.id}
			title={blog.title}
			date={blog.created_at}
		/>
	{/each}
</div>
