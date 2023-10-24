<script lang="ts">
    import BlogCardGrid from '$components/BlogCardGrid.svelte'

    export let blogs: any[] = [];
</script>

<div class="p-4">
    <div class="container m-auto">
        <BlogCardGrid blogs={blogs} />
    </div>
</div>
