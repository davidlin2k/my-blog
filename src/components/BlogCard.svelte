<script lang="ts">
	import { formatDate } from '$lib/utils';

	export let thumbnail: string;
	export let title: string;
	export let date: string;
</script>

<a href="/">
	<div
		class="max-w-sm sm:max-w-none h-full m-auto bg-bg-300 rounded-md overflow-hidden shadow-lg hover:bg-primary-100 transition-colors"
	>
		<img src={thumbnail} alt="thumbnail" class="w-full h-60 object-cover" />
		<div class="flex flex-col flex-auto p-3 space-y-2">
			<div class="font-semibold text-sm">{title}</div>
			<div class="text-sm">{formatDate(date)}</div>
		</div>
	</div>
</a>
