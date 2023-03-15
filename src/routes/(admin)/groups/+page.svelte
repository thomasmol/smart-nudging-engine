<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<header>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Groups</h1>
			<h2 class="text-slate-700">Group nudgees?</h2>
		</header>
		<div class="">
			<a
				href="/groups/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add new group</a>
		</div>
	</div>
	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
				<tr class="">
					<th scope="col" class="py-3 px-6"> Name </th>
					<th scope="col" class="py-3 px-6"> Nudgees Count</th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				{#if data.groups.length === 0}
					<tr class="border-b bg-white ">
						<td class="py-4 px-6" colspan="3">
							No groups found
						</td>
					</tr>
				{/if}
				{#each data.groups as { id, name, nudgeeGroup }}
					<tr class="border-b bg-white ">
						<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
							{name}
						</th>
						<td class="py-4 px-6"> {nudgeeGroup ? Object.keys(nudgeeGroup).length : 0} </td>
						<td class="py-4 px-6">
							<a href="/groups/{id}" class="text-blue-600 hover:underline">View more</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
