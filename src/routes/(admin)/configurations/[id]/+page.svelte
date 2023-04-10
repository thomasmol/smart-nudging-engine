<script lang="ts">
	import type { ComponentValue } from '@prisma/client';
	import type { PageData } from './$types';

	export let data: PageData;

	// flatten data.componentTypes, which is an array of objects,
	// which has an attribute ComponentValue which is an array of ComponentValue objects,
	// into a single array of component values
	const componentValues: ComponentValue[] = data.componentTypes.reduce(
		(acc, componentType) => [...acc, ...componentType.ComponentValue],
		[]
	);
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
		<h2 class="mt-14 text-lg font-semibold">Groups</h2>
		<ul class="mt-2 grid w-full gap-6 md:grid-cols-4">
			{#each data.configuration.GroupConfiguration as { Group }}
				<li>
					<div
						class="inline-flex w-full items-center justify-between rounded-lg border bg-white p-3 text-slate-600">
						<div class="block">
							<div class="w-full text-base font-semibold">{Group.name}</div>
							<div class="w-full text-sm">{Group.NudgeeGroup.length} nudgees</div>
							{#if Group.control}
								<div class="w-full text-sm italic">is control group</div>
							{/if}
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{/if}

	{#if data.configuration.MetricTypeWeight.length > 0}
		<div class="relative mt-10 overflow-x-auto rounded-lg border">
			<h2 class="border-b p-4 text-lg font-semibold">Metric Type weights</h2>
			<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
				<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
					<tr class="">
						<th scope="col" class="py-3 px-6">Type</th>
						<th scope="col" class="py-3 px-6">Weight</th>
					</tr>
				</thead>
				<tbody>
					{#each data.configuration.MetricTypeWeight as metricTypeWeight}
						<tr class="border-b bg-white ">
							<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
								{metricTypeWeight.MetricType.label}
							</th>
							<td class="py-4 px-6"> {metricTypeWeight.weight} </td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	{#if data.configuration.generate && data.configuration.deconstructed_prompt}
		<div class="relative mt-10 overflow-x-auto rounded-lg border">
			<header class="flex items-center justify-between border-b p-4">
				<h2 class=" text-lg font-semibold">Prompt</h2>
				<form method="post">
					<button
						type="submit"
						formaction="/configurations/{data.configuration.id}?/generate"
						class="rounded-lg bg-blue-600 px-2 py-1 text-white">Generate a new nudge</button>
				</form>
			</header>
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

	{#if data.configuration.GroupConfiguration}
		<div class="relative mt-10 overflow-x-auto rounded-lg border">
			<h2 class="border-b p-4 text-lg font-semibold">Nudges</h2>
			<table class="w-full text-left text-sm text-gray-500 ">
				<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700 ">
					<tr class="">
						<th scope="col" class="py-3 px-6">Nudgee</th>
						<th scope="col" class="py-3 px-6">Content</th>
						<th scope="col" class="py-3 px-6">Effectiveness</th>
					</tr>
				</thead>
				<tbody>
					{#each data.configuration.GroupConfiguration as { Group }}
						{#each Group.NudgeeGroup as { Nudgee }, index}
							{#each Nudgee.NudgeRecipient as { Nudge }}
								<tr class="bg-white ">
									<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 ">
										{Nudgee.id}
									</th>
									<td class="py-4 px-6">{Nudge.content}</td>
									<td class="py-4 px-6">{data.compositeScores[index]}</td>
								</tr>
								<tr class="border-b bg-white ">
									<td colspan="3" class="py-4 px-6  text-gray-700 ">
										<form method="post">
											<input type="hidden" name="effectiveness" value="{data.compositeScores[index]}">
											<input type="hidden" name="nudgee" value="{Nudgee.id}">
											<input type="hidden" name="nudge" value="{Nudge.id}">
											<button
												type="submit"
												formaction="/configurations/{data.configuration.id}?/updateNudgeeWeights"
												class="rounded-lg bg-slate-600 px-3 py-2 text-white">Update weights</button>
										</form>
										<p class="mt-2 font-semibold">Nudgee weights:</p>
										<div class="mt-2 grid grid-cols-3 gap-3 font-mono">
											{#each data.configuration.NudgeeWeights as { nudgee_id, weights }}
												{#if nudgee_id == Nudgee.id}
													{#each weights as { component_value_id, weight }}
														<div class="flex justify-between p-1 ">
															{componentValues.find((element) => element.id == component_value_id)
																?.value}:<span class="font-bold">{weight}</span>
														</div>
													{/each}
												{/if}
											{/each}
										</div>
									</td>
								</tr>
							{/each}
						{/each}
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
