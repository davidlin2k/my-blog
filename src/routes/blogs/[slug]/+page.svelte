<script>
    import { page } from '$app/stores';

    import { formatDate } from "$lib/utils";
    import {CalendarMonthSolid} from "flowbite-svelte-icons";
    import Editor from "$components/Editor.svelte";
    import {Breadcrumb, BreadcrumbItem, Spinner} from "flowbite-svelte";

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
    <title>{data.title ?? "Untitled"}</title>
</svelte:head>

<div class="max-w-3xl p-8 m-auto">
    <div class="flex items-center mb-3">
        <Breadcrumb>
            <BreadcrumbItem homeClass="inline-flex items-center text-sm font-medium text-text-100 hover:text-text-200" href="/" home>Home</BreadcrumbItem>
            <BreadcrumbItem linkClass="ml-1 text-sm font-medium text-text-100 hover:text-text-200 md:ml-2" spanClass="ml-1 text-sm font-medium max-w-[128px] overflow-hidden whitespace-nowrap overflow-ellipsis text-gray-500 md:ml-2">{data.title ?? 'Untitled'}</BreadcrumbItem>
        </Breadcrumb>

        {#if data.user_id === $page.data.user.id}
            <a class="ml-auto" href={`/blogs/${data.id}/edit`}>Edit</a>
        {/if}
    </div>

    <div class="text-5xl font-semibold py-4">{data.title ?? "Untitled"}</div>
    <div class="flex items-center text-text-200 py-4 my-4 border-b border-bg-300">
        <CalendarMonthSolid class="w-4 h-4 m-2" />
        <div>Date</div>

        <div class="ml-16">{formatDate(data.created_at)}</div>
    </div>

    <Editor data={data.content} readOnly={true}/>
</div>
