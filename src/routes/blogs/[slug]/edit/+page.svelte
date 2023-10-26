<script lang="ts">
    import { PUBLIC_API_URL } from '$env/static/public';

    import { formatDate, isEmptyString, getFileMd5 } from "$lib/utils";
    import placeholder from '$lib/assets/placeholder.jpg';

    import { Breadcrumb, BreadcrumbItem, Spinner, Select } from "flowbite-svelte";
    import { CalendarMonthSolid, EyeSolid } from "flowbite-svelte-icons";

    import DivInput from "$components/DivInput.svelte";

    import Editor from "$components/Editor.svelte";
    import DirectUploadInput from "$components/DirectUploadInput.svelte";

    let editorComponent: any;

    /** @type {import('./$types').PageData} */
    export let data: any;

    let title = data.title ?? "";
    let status = data.status ?? "";
    let coverImage = data.cover_image_url ?? "";

    let statusSelections = [
        { value: 'draft', name: 'Draft' },
        { value: 'published', name: 'Published' },
    ];

    let saving = false;

    async function onSave(event: CustomEvent) {
        saving = true;

        try {
            await directUpload();
        } catch (error) {
            console.log(error);
        }

        try {
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
        } catch (error) {
            console.log(error);
        }

        saving = false;
    }

    const updateResourceBody = (signed_id: string) => {
        return {
            blog: {
                cover_image: signed_id
            }
        }
    }

    let directUpload: any;
    let files: any;

    $: if (files) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            coverImage = reader.result;
        });
        reader.readAsDataURL(files[0]);
    }

    const uploadByFile = async (file: any) => {
        const md5 = await getFileMd5(file);

        const blob = {
            blob: {
                filename: file.name,
                byte_size: file.size,
                content_type: file.type,
                checksum: md5,
            }
        }

        const directUpload = await fetch('/files', {
            method: 'POST',
            body: JSON.stringify(blob),
        });

        const res = await directUpload.json();

        const s3 = await fetch(res.direct_upload.url, {
            method: 'PUT',
            headers: res.direct_upload.headers,
            body: file,
        });

        if (s3.ok) {
            const resource = await fetch("", {
                method: 'PUT',
                body: JSON.stringify({ blog: { files: [res.signed_id] } }),
            });

            if (resource.ok) {
                return {
                    success: 1,
                    file: {
                        url: `${PUBLIC_API_URL}/api/blogs/${data.id}/files/${res.id}`,
                    }
                };
            }
        }

        return {
            success: 0,
            message: 'Upload failed',
        };
    }
</script>

<svelte:head>
    <title>{data.title ?? "Untitled"}</title>
</svelte:head>

<DirectUploadInput updateResourceBody={updateResourceBody} directUploadUrl="/files" id="cover-image-input" bind:directUpload={directUpload} bind:files={files} />

<label for="cover-image-input" class="hover:cursor-pointer">
    <img class="w-screen h-[30vh] object-cover" src={ isEmptyString(coverImage) ? placeholder : coverImage } alt="Cover" />
</label>

<div class="max-w-3xl px-8 py-4 m-auto">
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

    <Editor data={data.content} uploadByFile={uploadByFile} bind:this={editorComponent} on:save={onSave} />
</div>
