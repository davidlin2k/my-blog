<script lang="ts">
	import type { PageData } from './$types';
	import BlogCardGrid from '$components/BlogCardGrid.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>David's Blog</title>
</svelte:head>

<div class="p-4">
	<div class="container m-auto">
		<BlogCardGrid blogs={data.blogs} />
	</div>
</div>
