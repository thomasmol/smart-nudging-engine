<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Nudgee Action</h1>
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
				<tr class="border-b bg-white ">
					<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
						{data.action.Nudgee.id}
					</th>
					<td class="py-4 px-6"> {data.action.MetricType.label || 'No type found'} </td>
					<td class="py-4 px-6"> {data.action.metric_value} </td>
					<td class="py-4 px-6"> {data.action.created_at} </td>
					<td class="py-4 px-6">
						<a href="/actions/{data.action.id}/edit" class="text-blue-600 hover:underline">Edit</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
