<script>
    import { formatDate } from "$lib/utils";

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>{data.title}</h1>
<div>{formatDate(data.created_at)}</div>
