<script lang="ts">
    import Time from "svelte-time";

    export let comment: any;
</script>

<div class="space-y-2 p-4 rounded-lg bg-bg-300">
    <div><span class="font-medium">{comment.user.name}</span> • <Time timestamp={comment.user.created_at} relative /></div>
    <div>{comment.content}</div>
</div>