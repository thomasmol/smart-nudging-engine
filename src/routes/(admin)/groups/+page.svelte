<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<header>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Groups</h1>
			<h2 class="text-slate-700">Group of nudgees</h2>
		</header>
		<div class="">
			<a
				href="/groups/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add new group</a>
		</div>
	</div>
	<div class="my-4 rounded-lg border bg-white p-2">
		<div class="flex items-center gap-2">
			<span class="text-xl text-blue-700"> <InformationCircle /></span>
			<h3 class="text-lg font-semibold ">What are Groups?</h3>
		</div>
		<div>
			<ul class="mt-2 list-inside list-disc space-y-2 px-2 text-slate-700">
				<li>Nudgees are part of groups, usually only one.</li>
				<li>A group can be a control group or regular group.</li>
				<li>A configuration will not generate or assign nudges to nudgees in a control group.</li>
				<li>Actions can still be recorded for nudgees who are part of a control group.</li>
				<li>You can manually add groups or use the API.</li>
			</ul>
		</div>
	</div>
	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
				<tr class="">
					<th scope="col" class="py-3 px-6"> Name </th>
					<th scope="col" class="py-3 px-6"> Control </th>
					<th scope="col" class="py-3 px-6"> Nudgees Count</th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				{#if data.groups.length === 0}
					<tr class="border-b bg-white ">
						<td class="py-4 px-6" colspan="3"> No groups found </td>
					</tr>
				{/if}
				{#each data.groups as { id, name, control, NudgeeGroup }}
					<tr class="border-b bg-white ">
						<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
							{name}
						</th>
						<td class="py-4 px-6"> {control} </td>
						<td class="py-4 px-6"> {Object.keys(NudgeeGroup).length} </td>
						<td class="py-4 px-6">
							<a href="/groups/{id}" class="text-blue-600 hover:underline">View more</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
