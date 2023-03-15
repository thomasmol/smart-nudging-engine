<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">{data.nudge.id}</h1>
		</div>
	</div>

	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
				<tr class="">
					<th scope="col" class="py-3 px-6"> ID </th>
					<th scope="col" class="py-3 px-6"> Content Type </th>
					<th scope="col" class="py-3 px-6"> Content </th>
					<th scope="col" class="py-3 px-6"> Generated </th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				<tr class="border-b bg-white ">
					<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
						{data.nudge.id}
					</th>
					<td class="py-4 px-6">{data.nudge.content_type}</td>
					<td class="py-4 px-6">{data.nudge.content}</td>
					<td class="py-4 px-6">{data.nudge.generated}</td>
					<td class="py-4 px-6">
						<a href="/nudges/{data.nudge.id}/edit" class="text-blue-600 hover:underline">Edit</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
