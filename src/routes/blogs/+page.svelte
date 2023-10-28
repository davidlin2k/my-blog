<script lang="ts">
	import type { PageData } from './$types';
    import BlogCardGrid from "$components/BlogCardGrid.svelte";

	export let data: PageData;
</script>

<div class="p-4">
    <div class="container m-auto">
        <BlogCardGrid blogs={data.blogs} />
    </div>
</div>
