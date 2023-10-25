<script lang="ts">
    import { formatDate, isEmptyString } from "$lib/utils";

    import { Breadcrumb, BreadcrumbItem, Spinner, Select } from "flowbite-svelte";
    import { CalendarMonthSolid, EyeSolid } from "flowbite-svelte-icons";

    import DivInput from "$components/DivInput.svelte";

    import Editor from "$components/Editor.svelte";

    let titleComponent: any;
    let editorComponent: any;

    /** @type {import('./$types').PageData} */
    export let data: any;

    let title = data.title ?? "";
    let status = data.status ?? "";

    let statusSelections = [
        { value: 'draft', name: 'Draft' },
        { value: 'published', name: 'Published' },
    ];

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
                    status,
                    content: event.detail,
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
            <BreadcrumbItem linkClass="ml-1 text-sm font-medium text-text-100 max-w-[128px] overflow-hidden whitespace-nowrap overflow-ellipsis hover:text-text-200 md:ml-2" href={`/blogs/${data.id}`}>{isEmptyString(title) ? 'Untitled' : title}</BreadcrumbItem>
            <BreadcrumbItem linkClass="ml-1 text-sm font-medium text-text-100 hover:text-text-200 md:ml-2">Edit</BreadcrumbItem>
        </Breadcrumb>


        {#if saving}
            <Spinner class="ml-auto" size="4" color="white" />
        {:else}
            <button class="ml-auto" on:click={() => editorComponent.save()}>Save</button>
        {/if}
    </div>

    <DivInput className="block text-3xl md:text-4xl py-4 font-semibold bg-transparent border-none focus:ring-0 focus:outline-none" placeholder="Untitled" bind:value={title}>{title}</DivInput>

    <div class="mb-4 border-b border-bg-300">
        <table class="table-auto w-full border-spacing-y-4 border-separate">
            <tbody>
                <tr class="items-center text-text-200">
                    <td class="flex items-center">
                        <CalendarMonthSolid class="w-4 h-4 mr-2" />
                        <div>Date</div>
                    </td>

                    <td>{formatDate(data.created_at)}</td>
                </tr>
                <tr class="items-center text-text-200">
                    <td class="flex items-center">
                        <EyeSolid class="w-4 h-4 mr-2" />
                        <div>Status</div>
                    </td>

                    <td>
                        <Select id="countries" class="p-0 bg-transparent border-0 focus:ring-0 text-text-100 inline-block w-auto" defaultClass="" bind:value={status} placeholder="Select a status...">
                            {#each statusSelections as { value, name }}
                                <option {value}>{name}</option>
                            {/each}
                        </Select>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <Editor data={data.content} bind:this={editorComponent} on:save={onSave}/>
</div>
