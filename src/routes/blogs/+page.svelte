<script lang="ts">
	import Blogs from './Blogs.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#await data.blogs}
    Loading...
{:then value}
    <Blogs blogs={value.data} />
{:catch error}
    Error :(
{/await}
