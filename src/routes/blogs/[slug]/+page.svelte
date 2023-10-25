<script>
    import { page } from '$app/stores';

    import {formatDate, capitalizeFirstLetter, isEmptyString } from "$lib/utils";
    import {CalendarMonthSolid, EyeSolid} from "flowbite-svelte-icons";
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
            <BreadcrumbItem linkClass="ml-1 text-sm font-medium text-text-100 hover:text-text-200 md:ml-2" spanClass="ml-1 text-sm font-medium max-w-[128px] overflow-hidden whitespace-nowrap overflow-ellipsis text-gray-500 md:ml-2">{isEmptyString(data.title) ? 'Untitled' : data.title}</BreadcrumbItem>
        </Breadcrumb>

        {#if data.user_id === $page.data.user?.id}
            <a class="ml-auto" href={`/blogs/${data.id}/edit`}>Edit</a>
        {/if}
    </div>

    <div class="text-3xl md:text-4xl font-semibold py-4">{isEmptyString(data.title) ? 'Untitled' : data.title}</div>

    <div class="mb-4 border-b border-bg-300">
        <table class="table-auto w-full border-spacing-y-4 border-separate">
            <tbody>
            <tr class="items-center text-text-200">
                <td class="flex items-center">
                    <CalendarMonthSolid class="w-4 h-4 mr-2" />
                    <div>Date</div>
                </td>

                <td class="">{formatDate(data.created_at)}</td>
            </tr>
            <tr class="items-center text-text-200">
                <td class="flex items-center">
                    <EyeSolid class="w-4 h-4 mr-2" />
                    <div>Status</div>
                </td>

                <td class="">{capitalizeFirstLetter(data.status)}</td>
            </tr>
            </tbody>
        </table>
    </div>

    <Editor data={data.content} readOnly={true}/>
</div>
