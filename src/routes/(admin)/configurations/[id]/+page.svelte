<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Configuration</h1>
		</div>
	</div>

	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
				<tr class="">
					<th scope="col" class="py-3 px-6"> Name </th>
					<th scope="col" class="py-3 px-6"> Algorithm</th>
					<th scope="col" class="py-3 px-6"> Start datetime</th>
					<th scope="col" class="py-3 px-6"> End datetime</th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				<tr class="border-b bg-white ">
					<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
						{data.configuration.name}
					</th>
					<td class="py-4 px-6"> {data.configuration.algorithm} </td>
					<td class="py-4 px-6"> {data.configuration.start_datetime} </td>
					<td class="py-4 px-6"> {data.configuration.end_datetime} </td>
					<td class="py-4 px-6">
						<a
							href="/configurations/{data.configuration.id}/edit"
							class="text-blue-600 hover:underline">Edit</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
