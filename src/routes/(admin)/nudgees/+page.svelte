<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Nudgee } from '@prisma/client';
	import type { PageData } from './$types';
	import InformationCircle from '$lib/icons/InformationCircle.svelte';

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
	<div class="my-4 rounded-lg border bg-white p-2">
		<div class="flex items-center gap-2">
			<span class="text-xl text-blue-700"> <InformationCircle /></span>
			<h3 class="text-lg font-semibold ">What are Nudgees?</h3>
		</div>
		<div>
			<ul class="mt-2 list-inside list-disc space-y-2 px-2 text-slate-700">
				<li>A nudgee is an individual, e.g. a user of your app/system or a participant of your experiment.</li>
				<li>
					They have a unique id and a profile, which can contain any data you want. (In JSON format)
				</li>
				<li>You can manually add nudgees or use the API.</li>
			</ul>
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
						<td class="py-4 px-6" colspan="5"> No nudgees found </td>
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
