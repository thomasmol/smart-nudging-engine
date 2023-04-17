<script lang="ts">
	import InformationCircle from '$lib/icons/InformationCircle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<header>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Configurations</h1>
			<h2 class="text-slate-700">Configurations for your experiments</h2>
		</header>
		<div class="">
			<a
				href="/configurations/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add new configuration</a>
		</div>
	</div>
	<div class="my-4 rounded-lg border bg-white p-2">
		<div class="flex items-center gap-2">
			<span class="text-xl text-blue-700"> <InformationCircle /></span>
			<h3 class="text-lg font-semibold ">What are Configurations?</h3>
		</div>
		<div>
			<ul class="mt-2 list-inside list-disc px-2 text-slate-700 space-y-2">
				<li>Configurations bring everything together to start an experiment.</li>
				<li>
					They specify the algorithm, a prompt and model if you want to auto generate nudges, groups
					and start and end dates.
				</li>
				<li>
					You can also specify metric type and decision time weights that are used for by the algorithm to calculate the
					effectiveness of nudges.
				</li>
				<li>
					Nudgee weights are related to configurations. These weights contain the weights for
					each component value and user profile dimensions. Your nudge optimization algorithm can
					use and update these weights to find the optimal nudge.
				</li>
				<li>You can manually add configurations or use the API.</li>
			</ul>
		</div>
	</div>
	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
				<tr class="">
					<th scope="col" class="py-3 px-6"> Name </th>
					<th scope="col" class="py-3 px-6"> Algorithm</th>
					<th scope="col" class="py-3 px-6"> Generate</th>
					<th scope="col" class="py-3 px-6"> Start datetime</th>
					<th scope="col" class="py-3 px-6"> End datetime</th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				{#if data.configurations.length === 0}
					<tr class="border-b bg-white ">
						<td class="py-4 px-6" colspan="6"> No configurations found </td>
					</tr>
				{/if}
				{#each data.configurations as { id, name, algorithm, generate, start_datetime, end_datetime }}
					<tr class="border-b bg-white ">
						<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
							{name}
						</th>
						<td class="py-4 px-6"> {algorithm} </td>
						<td class="py-4 px-6"> {generate} </td>
						<td class="py-4 px-6"> {start_datetime} </td>
						<td class="py-4 px-6"> {end_datetime} </td>
						<td class="py-4 px-6">
							<a href="/configurations/{id}" class="text-blue-600 hover:underline">View more</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
