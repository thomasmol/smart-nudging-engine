<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Metric types</h1>
			<h2 class="text-slate-700">What do you want to measure?</h2>
		</div>
		<div class="">
			<a
				href="/metrics/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add new metric</a>
		</div>
	</div>
	<div class="my-4 rounded-lg border bg-white p-2">
		<div class="flex items-center gap-2">
			<span class="text-xl text-blue-700"> <InformationCircle /></span>
			<h3 class="text-lg font-semibold ">What are Metrics?</h3>
		</div>
		<div>
			<ul class="mt-2 list-inside list-disc space-y-2 px-2 text-slate-700">
				<li>
					Metric types are variables you want to capture in order to measure nudge effectiveness.
				</li>
				<li>Metric types have a lable and data type like "number" or "boolean".</li>
				<li>
					Actions must have 1 metric type and a value of this type must be recorded in the action
					(1:1 relation).
				</li>
				<li>You can manually add metric types or use the API.</li>
			</ul>
		</div>
	</div>
	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
				<tr class="">
					<th scope="col" class="py-3 px-6"> Label </th>
					<th scope="col" class="py-3 px-6"> Type </th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				{#if data.metricTypes.length === 0}
					<tr class="border-b bg-white ">
						<td class="py-4 px-6" colspan="3"> No metric types found </td>
					</tr>
				{/if}
				{#each data.metricTypes as { id, label, type }}
					<tr class="border-b bg-white ">
						<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
							{label}
						</th>
						<td class="py-4 px-6"> {type} </td>
						<td class="py-4 px-6">
							<a href="/metrics/{id}" class="text-blue-600 hover:underline">View more</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
