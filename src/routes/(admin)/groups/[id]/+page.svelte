<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Group {data.group.name}</h1>
		</div>
	</div>


	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
				<tr class="">
					<th scope="col" class="py-3 px-6"> Name </th>
					<th scope="col" class="py-3 px-6"> Is Control </th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				<tr class="border-b bg-white ">
					<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
						{data.group.name}
					</th>
					<td class="py-4 px-6">
						{data.group.control}
					</td>
					<td class="py-4 px-6">
						<a href="/groups/{data.group.id}/edit" class="text-blue-600 hover:underline">edit</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	{#if data.group.NudgeeGroup.length > 0}
		<div class="mb-4 mt-8 flex justify-between">
			<header>
				<h1 class="mb-2 text-xl font-semibold text-slate-800">Nudgees in group</h1>
			</header>
		</div>
		<div class="relative overflow-x-auto rounded-lg border">
			<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
				<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
					<tr class="">
						<th scope="col" class="py-3 px-6"> Id </th>
						<th scope="col" class="py-3 px-6" />
					</tr>
				</thead>
				<tbody>
					{#each data.group.NudgeeGroup as {Nudgee}}
						<tr class="border-b bg-white ">
							<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
								{Nudgee.id}
							</th>
							<td class="py-4 px-6">
								<a href="/nudgees/{Nudgee.id}/edit" class="text-blue-600 hover:underline">Edit</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
