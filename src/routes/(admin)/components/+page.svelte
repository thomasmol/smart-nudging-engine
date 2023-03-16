<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<header>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Component Types</h1>
			<h2 class="text-slate-700">Nudge component types</h2>
		</header>
		<div class="">
			<a
				href="/components/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add new component type</a>
		</div>
	</div>
	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
				<tr class="">
					<th scope="col" class="py-3 px-6"> Label </th>
					<th scope="col" class="py-3 px-6"> Data Type</th>
					<th scope="col" class="py-3 px-6"> Value Count</th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				{#if data.componentTypes.length === 0}
					<tr class="border-b bg-white ">
						<td class="py-4 px-6" colspan="6"> No Component Types found </td>
					</tr>
				{/if}
				{#each data.componentTypes as { id, label, data_type, ComponentValue }}
					<tr class="border-b bg-white ">
						<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
							{label}
						</th>
						<td class="py-4 px-6"> {data_type} </td>
						<td class="py-4 px-6"> {Object.keys(ComponentValue).length || 'No values found'} </td>
						<td class="py-4 px-6">
							<a href="/components/{id}" class="text-blue-600 hover:underline">View more</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
