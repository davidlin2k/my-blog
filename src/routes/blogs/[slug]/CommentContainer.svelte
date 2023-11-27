<script lang="ts">
    import { page } from '$app/stores';

    import Comment from "./Comment.svelte";

    export let comments: any[];
</script>

<div>
    <div class="my-2 font-semibold text-lg">Comments</div>

    {#if $page.data.user}
        <div>New Comment</div>
    {:else}
        <div class="h-20 text-center">
            <a href="/login">Sign in</a>
            or
            <a href="/register">sign up</a>
            to add comments on this article.
        </div>
    {/if}

    {#each comments as comment}
        <Comment {comment} />
    {/each}
</div>