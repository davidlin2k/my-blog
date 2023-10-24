<script lang="ts">
    import { formatDate } from "$lib/utils";

    import { Breadcrumb, BreadcrumbItem, Spinner } from "flowbite-svelte";
    import { CalendarMonthSolid } from "flowbite-svelte-icons";

    import Editor from "$components/Editor.svelte";

    let editorComponent: any;

    /** @type {import('./$types').PageData} */
    export let data: any;

    let title = data.title;
    let saving = false;

    async function onSave(event: CustomEvent) {
        saving = true;

        await fetch("", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                blog: {
                    title,
                    content: event.detail
                }
            })
        });

        saving = false;
    }
</script>

<svelte:head>
    <title>{data.title ?? "Untitled"}</title>
</svelte:head>

<div class="max-w-3xl p-8 m-auto">
    <div class="flex items-center mb-3">
        <Breadcrumb>
            <BreadcrumbItem homeClass="inline-flex items-center text-sm font-medium text-text-100 hover:text-text-200" href="/" home>Home</BreadcrumbItem>
            <BreadcrumbItem linkClass="ml-1 text-sm font-medium text-text-100 max-w-[128px] overflow-hidden whitespace-nowrap overflow-ellipsis hover:text-text-200 md:ml-2" href={`/blogs/${data.id}`}>{title ?? 'Untitled'}</BreadcrumbItem>
            <BreadcrumbItem linkClass="ml-1 text-sm font-medium text-text-100 hover:text-text-200 md:ml-2">Edit</BreadcrumbItem>
        </Breadcrumb>


        {#if saving}
            <Spinner class="ml-auto mr-3" size="4" color="white" />
            <span>Saving...</span>
        {:else}
            <button class="ml-auto" on:click={() => editorComponent.save()}>Save</button>
        {/if}
    </div>

    <div class="block text-3xl md:text-4xl py-4 font-semibold bg-transparent border-none focus:ring-0 focus:outline-none" contenteditable="true" placeholder="Untitled" bind:textContent={title}>{title}</div>
    <div class="flex items-center text-text-200 py-4 my-4 border-b border-bg-300">
        <CalendarMonthSolid class="w-4 h-4 m-2" />
        <div>Date</div>

        <div class="ml-16">{formatDate(data.created_at)}</div>
    </div>

    <Editor data={data.content} bind:this={editorComponent} on:save={onSave}/>
</div>
