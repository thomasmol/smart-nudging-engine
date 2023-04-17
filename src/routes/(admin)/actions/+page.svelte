<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<header>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Actions</h1>
			<h2 class="text-slate-700">Actions by nudgees</h2>
		</header>
		<div class="">
			<a
				href="/actions/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add new action</a>
		</div>
	</div>
	<div class="my-4 rounded-lg border bg-white p-2">
		<div class="flex items-center gap-2">
			<span class="text-xl text-blue-700"> <InformationCircle /></span>
			<h3 class="text-lg font-semibold ">What are Actions?</h3>
		</div>
		<div>
			<ul class="mt-2 list-inside list-disc space-y-2 px-2 text-slate-700">
				<li>Actions represent any action done by a nudgee.</li>
				<li>
					Actions have a metric type and a metric value representing the details of what was done.
				</li>
				<li>You can manually add actions or use the API to add actions.</li>
			</ul>
		</div>
	</div>
	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
				<tr class="">
					<th scope="col" class="py-3 px-6"> Nudgee </th>
					<th scope="col" class="py-3 px-6"> Metric Type</th>
					<th scope="col" class="py-3 px-6"> Metric Value</th>
					<th scope="col" class="py-3 px-6"> Created At</th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				{#if data.actions.length === 0}
					<tr class="border-b bg-white ">
						<td class="py-4 px-6" colspan="6"> No actions found </td>
					</tr>
				{/if}
				{#each data.actions as { id, Nudgee, MetricType, metric_value, created_at }}
					<tr class="border-b bg-white ">
						<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
							{Nudgee.id}
						</th>
						<td class="py-4 px-6"> {MetricType.label || 'No type found'} </td>
						<td class="py-4 px-6"> {metric_value} </td>
						<td class="py-4 px-6"> {created_at} </td>
						<td class="py-4 px-6">
							<a href="/actions/{id}" class="text-blue-600 hover:underline">View more</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
