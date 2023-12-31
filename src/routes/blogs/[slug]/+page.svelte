<script>
	import {enhance} from '$app/forms';
	import {page} from '$app/stores';

	import {formatDate, capitalizeFirstLetter, isEmptyString} from '$lib/utils';
	import {CalendarMonthSolid, EyeSolid, ChevronDownSolid} from 'flowbite-svelte-icons';
	import Editor from '$components/Editor.svelte';
	import {Breadcrumb, BreadcrumbItem, Dropdown, DropdownItem, Button} from 'flowbite-svelte';
	import CommentContainer from './CommentContainer.svelte';

/** @type {import('./$types').PageData} */
export let data;
</script>

<svelte:head>
	<title>{data.blog.title ?? 'Untitled'}</title>
</svelte:head>

{#if data.blog.cover_image_url}
	<img class="w-screen h-[30vh] object-cover" src={data.blog.cover_image_url} alt="Writing" />
{/if}

<div class="max-w-3xl px-8 py-4 m-auto">
	<div class="flex items-center mb-3">
		<Breadcrumb>
			<BreadcrumbItem
				homeClass="inline-flex items-center text-sm font-medium text-text-100 hover:text-text-200"
				href="/"
				home>Home</BreadcrumbItem
			>
			<BreadcrumbItem
				linkClass="ml-1 text-sm font-medium text-text-100 hover:text-text-200 md:ml-2"
				spanClass="ml-1 text-sm font-medium max-w-[128px] overflow-hidden whitespace-nowrap overflow-ellipsis text-gray-500 md:ml-2"
				>{isEmptyString(data.blog.title) ? 'Untitled' : data.blog.title}</BreadcrumbItem
			>
		</Breadcrumb>

		{#if data.blog.user_id === $page.data.user?.id}
			<Button class="ml-auto">Settings<ChevronDownSolid class="w-3 h-3 ms-2 text-white dark:text-white" /></Button>
			<Dropdown class="w-32">
				<DropdownItem href={`/blogs/${data.blog.id}/edit`}>Edit</DropdownItem>
				<DropdownItem>
					<form action="?/delete" method="POST" use:enhance>
						<input type="hidden" name="_method" value="DELETE" />
						<button type="submit" onclick="return confirm('Are you sure?')">Delete</button>
					</form>
				</DropdownItem>
			</Dropdown>
		{/if}
	</div>

	<div class="text-3xl md:text-4xl font-semibold font-serif py-4">
		{isEmptyString(data.blog.title) ? 'Untitled' : data.blog.title}
	</div>

	<div class="mb-4 border-b border-bg-300">
		<table class="table-auto w-full border-spacing-y-4 border-separate">
			<tbody>
				<tr class="items-center text-text-200">
					<td class="flex items-center">
						<CalendarMonthSolid class="w-4 h-4 mr-2" />
						<div>Date</div>
					</td>

					<td class="">{formatDate(data.blog.created_at)}</td>
				</tr>
				<tr class="items-center text-text-200">
					<td class="flex items-center">
						<EyeSolid class="w-4 h-4 mr-2" />
						<div>Status</div>
					</td>

					<td class="">{capitalizeFirstLetter(data.blog.status)}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="font-serif">
		<Editor data={data.blog.content} readOnly={true} uploadByFile={null} />
	</div>

	<CommentContainer comments={data.comments} />
</div>
