<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<header>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">
				Component Type {data.componentType.label}
			</h1>
		</header>
		<div class="">
			<a
				href="/components/{data.componentType.id}/values/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add Component value</a>
		</div>
	</div>

	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
				<tr class="">
					<th scope="col" class="py-3 px-6"> Label </th>
					<th scope="col" class="py-3 px-6"> Data Type</th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				<tr class="border-b bg-white ">
					<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
						{data.componentType.label}
					</th>
					<td class="py-4 px-6"> {data.componentType.data_type} </td>

					<td class="py-4 px-6">
						<a href="/components/{data.componentType.id}/edit" class="text-blue-600 hover:underline"
							>Edit</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	{#if data.componentType.ComponentValue.length > 0}
		<div class="mb-4 mt-8 flex justify-between">
			<header>
				<h1 class="mb-2 text-xl font-semibold text-slate-800">Component values</h1>
			</header>
		</div>
		<div class="relative overflow-x-auto rounded-lg border">
			<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
				<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
					<tr class="">
						<th scope="col" class="py-3 px-6"> Value </th>
						<th scope="col" class="py-3 px-6" />
					</tr>
				</thead>
				<tbody>
					{#each data.componentType.ComponentValue as value}
						<tr class="border-b bg-white ">
							<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
								{value.value}
							</th>
							<td class="py-4 px-6">
								<a
									href="/components/{data.componentType.id}/values/{value.id}/edit"
									class="text-blue-600 hover:underline">Edit</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
