<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let readOnly = false;
    export let data;

    let editor;

    onMount(async () => {
        const EditorJS = await import('@editorjs/editorjs');
        const Header = await import('@editorjs/header');
        const ImageTool = await import('@editorjs/image');

        editor = new EditorJS.default({
            holder: 'editor',
            placeholder: 'Type something...',
            readOnly: readOnly,
            tools: {
                header: Header.default,
                image: {
                    class: ImageTool.default,
                    config: {
                        endpoints: {
                            byFile: '/api/upload/image',
                            byUrl: '/api/upload/image',
                        },
                    }
                }
            },
            data: data
        });
    });

    export const save = () => {
        editor.save().then((outputData) => {
            dispatch('save', outputData);
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    }
</script>

<div id="editor"></div>
