<script lang="ts">
    export let className = "";
    export let placeholder = "";
    export let value = "";

    let html = "";
</script>

<div class={className} contenteditable="true" bind:innerHTML={html} on:input={() => {if (html === '<br>') html = "" }} placeholder={placeholder} bind:textContent={value}>{value}</div>
