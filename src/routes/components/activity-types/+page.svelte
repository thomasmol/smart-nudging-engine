<script lang="ts">
	export let data: any;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Activity types</h1>
			<h2 class="text-slate-700">A list of all activity types</h2>
		</div>
		<div class="">
			<a
				href="/components/activity-types/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add activity type</a>
		</div>
	</div>

	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead
				class="border-b bg-gray-50 text-sm uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
				<tr class="">
					<th scope="col" class="py-3 px-6"> Name </th>
					<th scope="col" class="py-3 px-6"> Metadata </th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				{#each data.activityTypes as activityType}
					<tr class="border-b bg-white ">
						<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 ">
							{activityType.name}
						</th>
						<td class="py-4 px-6"> ? </td>
						<td class="py-4 px-6">
							<a href="/components/activity-types" class="text-blue-600 hover:underline">edit</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
