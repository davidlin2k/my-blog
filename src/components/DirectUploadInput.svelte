<script lang="ts">
    import CryptoJS from 'crypto-js';

    export let directUploadUrl = '/files';
    export let resourceUrl = '';
    export let id = '';

    export let updateResourceBody: any = (signed_id: string) => {
        return signed_id;
    }

    export let files: any = null;

    const getFileMd5 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function(event) {
                const binary = event.target?.result;
                const md5 = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(binary)).toString(CryptoJS.enc.Base64);
                resolve(md5);
            };

            reader.readAsBinaryString(file);
        });
    }

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
