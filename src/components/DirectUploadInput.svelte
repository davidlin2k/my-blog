<script lang="ts">
    import { getFileMd5 } from "$lib/utils";

    export let directUploadUrl = '/files';
    export let resourceUrl = '';
    export let id = '';

    export let updateResourceBody: any = (signed_id: string) => {
        return signed_id;
    }

    export let files: any = null;

    export const directUpload = async () => {
        if (!files) return;

        const file = files[0];
        const md5 = await getFileMd5(file);

        const blob = {
            blob: {
                filename: file.name,
                byte_size: file.size,
                content_type: file.type,
                checksum: md5,
            }
        }

        const directUpload = await fetch(directUploadUrl, {
            method: 'POST',
            body: JSON.stringify(blob),
        });

        const data = await directUpload.json();

        const s3 = await fetch(data.direct_upload.url, {
            method: 'PUT',
            headers: data.direct_upload.headers,
            body: file,
        });

        if (s3.ok) {
            const resource = await fetch(resourceUrl, {
                method: 'PUT',
                body: JSON.stringify(updateResourceBody(data.signed_id)),
            });

            const resourceData = await resource.json();
            console.log(resourceData);
        }
    }
</script>

<input class="hidden" type="file" id={id} bind:files={files}>
