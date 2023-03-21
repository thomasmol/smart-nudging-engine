<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Nudgee } from '@prisma/client';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Nudgees</h1>
			<h2 class="text-slate-700">A list of all nudgees</h2>
		</div>
		<div class="">
			<a
				href="/nudgees/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add Nudgee</a>
		</div>
	</div>

	<div class="relative overflow-x-auto rounded-lg border">
		<table class="w-full text-left text-sm text-gray-500 ">
			<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700 ">
				<tr class="">
					<th scope="col" class="py-3 px-6">Id</th>
					<th scope="col" class="py-3 px-6">Profile</th>
					<th scope="col" class="py-3 px-6" />
				</tr>
			</thead>
			<tbody>
				{#if data.nudgees.length === 0}
					<tr class="border-b bg-white ">
						<td class="py-4 px-6" colspan="5">
							No nudgees found
						</td>
					</tr>
				{/if}
				{#each data.nudgees as nudgee}
					<tr class="border-b bg-white ">
						<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 ">
							{nudgee.id}
						</th>
						<td class="py-4 px-6">{nudgee.profile?.toString()}</td>
						<td class="py-4 px-6">
							<a href="nudgees/{nudgee.id}" class="text-blue-600 hover:underline">View more</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
