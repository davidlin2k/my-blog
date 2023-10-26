<script lang="ts">
	import {formatDate, isEmptyString} from '$lib/utils';
	import placeholder from '$lib/assets/placeholder.jpg';

	export let slug: string;
	export let thumbnail = placeholder;
	export let title: string;
	export let date: string;

</script>

<a href={`/blogs/${slug}`}>
	<div
		class="max-w-sm sm:max-w-none h-full m-auto bg-bg-300 rounded-md overflow-hidden shadow-lg hover:bg-primary-200 transition-colors"
	>
		<img src={thumbnail ?? placeholder} alt="thumbnail" class="w-full h-60 object-cover" />
		<div class="flex flex-col flex-auto p-3 space-y-2">
			<div class="font-semibold text-sm">{isEmptyString(title) ? 'Untitled' : title}</div>
			<div class="text-sm">{formatDate(date)}</div>
		</div>
	</div>
</a>
