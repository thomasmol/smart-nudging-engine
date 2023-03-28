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
					<th scope="col" class="py-3 px-6"> Generate</th>
					<th scope="col" class="py-3 px-6"> Generate model</th>
					<th scope="col" class="py-3 px-6"> Decision Time Weight</th>
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
					<td class="py-4 px-6"> {data.configuration.generate} </td>
					<td class="py-4 px-6"> {data.configuration.generate_model} </td>
					<td class="py-4 px-6"> {data.configuration.decision_time_weight} </td>
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

	{#if data.configuration.GroupConfiguration.length > 0}
		<h2 class="text-semibold mt-10 text-lg">Groups</h2>
		<ul class="mt-2 grid w-full gap-6 md:grid-cols-4">
			{#each data.configuration.GroupConfiguration as { Group }}
				<li>
					<div
						class="inline-flex w-full items-center justify-between rounded-lg border bg-white p-3 text-slate-600">
						<div class="block">
							<div class="w-full text-base font-semibold">{Group.name}</div>
							<div class="w-full text-sm">{Group.NudgeeGroup.length} nudgees</div>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{/if}

	{#if data.configuration.generate && data.configuration.deconstructed_prompt}
		<h2 class="text-semibold mt-10 text-lg">Prompt</h2>
		<div class="relative mt-4 overflow-x-auto rounded-lg border">
			<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
				<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
					<tr class="">
						<th scope="col" class="py-3 px-6"> Type </th>
						<th scope="col" class="py-3 px-6"> Value </th>
					</tr>
				</thead>
				<tbody>
					{#each data.configuration.deconstructed_prompt as prompt}
						<tr class="border-b bg-white ">
							<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
								{prompt.type}
							</th>
							{#if prompt.type !== 'text'}
								<td class="py-4 px-6">
									{data.componentTypes.find((element) => element.id == prompt.content).label} ({prompt.content})
								</td>
							{:else}
								<td class="py-4 px-6"> {prompt.content} </td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
