<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Nudgee } from '@prisma/client';
	import type { PageData } from './$types';
	let loading: boolean = false;
	let result: Nudgee;
	async function create() {
		loading = true;
		const response = await fetch('/api/nudgees', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		});

		result = await response.json();

		if (result) {
			console.log('success');
		}

		loading = false;
		invalidateAll();
	}

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Nudgees</h1>
			<h2 class="text-slate-700">A list of all nudgees</h2>
		</div>
		<div class="">
			{#if loading}
				<button
					class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm">
					<span class="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-gray-900" />
				</button>
			{:else}
				<button
					on:click={create}
					class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
					>Add Nudgee</button>
			{/if}
		</div>
	</div>

	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 ">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700 ">
				<tr class="">
					<th scope="col" class="py-3 px-6"> Id </th>
					<th scope="col" class="py-3 px-6"> Metadata </th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				{#each data.nudgees as nudgee}
					<tr class="border-b bg-white ">
						<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 ">
							{nudgee.id}
						</th>
						<td class="py-4 px-6"> ? </td>
						<td class="py-4 px-6">
							<a href="nudgees/edit?id={nudgee.id}" class="text-blue-600 hover:underline">edit</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
