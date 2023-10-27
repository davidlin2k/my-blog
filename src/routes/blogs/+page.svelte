<script lang="ts">
	import Blogs from './Blogs.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Blogs blogs={data.blogs} />
