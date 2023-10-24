<script lang="ts">
    import { formatDate } from "$lib/utils";

    import {Spinner} from "flowbite-svelte";
    import { CalendarMonthSolid } from "flowbite-svelte-icons";

    import Editor from "$components/Editor.svelte";

    let editorComponent: any;

    /** @type {import('./$types').PageData} */
    export let data: any;

    let title = data.title ?? "";
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
    <title>{title}</title>
</svelte:head>

<div class="max-w-3xl p-8 m-auto">
    <div class="flex items-center">
        {#if saving}
            <Spinner class="ml-auto mr-3" size="4" color="white" />
            <span>Saving...</span>
        {:else}
            <button class="ml-auto" on:click={() => editorComponent.save()}>Save</button>
        {/if}
    </div>

    <div class="block text-5xl p-2 py-4 font-semibold bg-transparent border-none focus:ring-0 focus:outline-none" contenteditable="true" placeholder="Untitled" bind:textContent={title}>{title}</div>
    <div class="flex items-center text-text-200 p-2 py-4 my-4 border-b border-bg-300">
        <CalendarMonthSolid class="w-4 h-4 m-2" />
        <div>Date</div>

        <div class="ml-16">{formatDate(data.created_at)}</div>
    </div>

    <Editor data={data.content} bind:this={editorComponent} on:save={onSave}/>
</div>
