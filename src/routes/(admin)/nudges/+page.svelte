<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Nudge } from '@prisma/client';
	import type { PageData } from './$types';
	import InformationCircle from '$lib/icons/InformationCircle.svelte';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Nudges</h1>
			<h2 class="text-slate-700">A list of all nudges</h2>
		</div>
		<div class="">
			<a
				href="/nudges/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add new nudge</a>
		</div>
	</div>
	<div class="my-4 rounded-lg border bg-white p-2">
		<div class="flex items-center gap-2">
			<span class="text-xl text-blue-700"> <InformationCircle /></span>
			<h3 class="text-lg font-semibold ">What are Nudges?</h3>
		</div>
		<div>
			<ul class="mt-2 list-inside list-disc space-y-2 px-2 text-slate-700">
				<li>Nudges are used to influence a nudgee to make a certain decision.</li>
				<li>They have a content type, like "text" or "image_url", and the actual content.</li>
				<li>
					They can be pre-made by you or an AI model can auto generate them based on a model, prompt
					and component types.
				</li>
				<li>Nudges are assigned to nudgees in a configuration.</li>
				<li>
					Nudges have related component values, which are used to optimize nudge effectiveness.
				</li>
				<li>
					You can manually add nudges, auto generate them in a configuration, or use the API to add
					them.
				</li>
			</ul>
		</div>
	</div>
	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 ">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700 ">
				<tr class="">
					<th scope="col" class="py-3 px-6">Id</th>
					<th scope="col" class="py-3 px-6">Content Type</th>
					<th scope="col" class="py-3 px-6">Content</th>
					<th scope="col" class="py-3 px-6">Generated</th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				{#if data.nudges.length === 0}
					<tr class="border-b bg-white ">
						<td class="py-4 px-6" colspan="5"> No nudges found </td>
					</tr>
				{/if}
				{#each data.nudges as nudge}
					<tr class="border-b bg-white ">
						<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 ">
							{nudge.id}
						</th>
						<td class="py-4 px-6">{nudge.content_type}</td>
						<td class="py-4 px-6">{nudge.content}</td>
						<td class="py-4 px-6">{nudge.generated}</td>
						<td class="py-4 px-6">
							<a href="nudges/{nudge.id}" class="text-blue-600 hover:underline">View more</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
