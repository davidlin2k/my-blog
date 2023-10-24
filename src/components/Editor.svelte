<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let readOnly: boolean = false;
    export let data: any = {};

    let editor: any;

    onMount(async () => {
        const EditorJS = await import('@editorjs/editorjs');
        const Header = await import('@editorjs/header');

        editor = new EditorJS.default({
            holder: 'editor',
            placeholder: 'Type something...',
            readOnly: readOnly,
            tools: {
                header: Header.default
            },
            data: data
        });
    });

    export const save = () => {
        editor.save().then((outputData: any) => {
            dispatch('save', outputData);
        }).catch((error: any) => {
            console.log('Saving failed: ', error)
        });
    }
</script>

<div id="editor"></div>
