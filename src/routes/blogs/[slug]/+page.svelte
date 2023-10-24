<script>
    import { formatDate } from "$lib/utils";
    import {CalendarMonthSolid} from "flowbite-svelte-icons";
    import Editor from "$components/Editor.svelte";

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
    <title>{data.title}</title>
</svelte:head>

<div class="max-w-3xl p-8 m-auto">
    <div class="text-5xl font-semibold p-2 py-4">{data.title}</div>
    <div class="flex items-center text-text-200 p-2 py-4 my-4 border-b border-bg-300">
        <CalendarMonthSolid class="w-4 h-4 m-2" />
        <div>Date</div>

        <div class="ml-16">{formatDate(data.created_at)}</div>
    </div>

    <Editor data={data.content} readOnly="true"/>
</div>
