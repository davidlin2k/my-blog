<script lang="ts">
	import type { PageData } from './$types';
    import BlogCardGrid from "$components/BlogCardGrid.svelte";

	export let data: PageData;
</script>

<div class="p-4">
    <div class="container m-auto">
        {#await data.streamed.blogs}
            Loading...
        {:then value}
            <BlogCardGrid blogs={value.data} />
        {:catch error}
            Error :(
        {/await}
    </div>
</div>
