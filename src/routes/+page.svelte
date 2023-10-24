<script lang="ts">
	import Blogs from "./blogs/Blogs.svelte";
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>David's Blog</title>
</svelte:head>

<Blogs blogs={data.blogs} />
