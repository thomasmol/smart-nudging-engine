<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<header>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">{data.nudge.id}</h1>
		</header>
	</div>

	<div class="relative mb-10 overflow-x-auto rounded-lg border">
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

	{#if data.nudge.NudgeMetric}
		<div class="mb-4 flex justify-between">
			<header>
				<h1 class="mb-2 text-xl font-semibold text-slate-800">Metrics</h1>
			</header>
		</div>

		<div class="relative mb-10 overflow-x-auto rounded-lg border">
			<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
				<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
					<tr class="">
						<th scope="col" class="py-3 px-6"> Label </th>
						<th scope="col" class="py-3 px-6"> Type </th>
					</tr>
				</thead>
				<tbody>
					{#each data.nudge.NudgeMetric as { MetricType }}
						<tr class="border-b bg-white ">
							<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
								{MetricType.label}
							</th>
							<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
								{MetricType.type}
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	{#if data.nudge.UsedComponent}
		<div class="mb-4 flex justify-between">
			<header>
				<h1 class="mb-2 text-xl font-semibold text-slate-800">Components</h1>
			</header>
		</div>

		<div class="relative mb-10 overflow-x-auto rounded-lg border">
			<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
				<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
					<tr class="">
						<th scope="col" class="py-3 px-6"> Type </th>
						<th scope="col" class="py-3 px-6"> Value </th>
					</tr>
				</thead>
				<tbody>
					{#each data.nudge.UsedComponent as { ComponentValue }}
						<tr class="border-b bg-white ">
							<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
								{ComponentValue.ComponentType.label}
							</th>
							<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
								{ComponentValue.value}
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	{#if data.nudge.NudgeRecipient}
		<div class="mb-4 flex justify-between">
			<header>
				<h1 class="mb-2 text-xl font-semibold text-slate-800">Nudgees</h1>
			</header>
		</div>

		<div class="relative mb-10 overflow-x-auto rounded-lg border">
			<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
				<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700">
					<tr class="">
						<th scope="col" class="py-3 px-6"> Id </th>
					</tr>
				</thead>
				<tbody>
					{#each data.nudge.NudgeRecipient as { Nudgee }}
						<tr class="border-b bg-white ">
							<th scope="row" class="whitespace-nowrap py-4 px-6 font-medium text-gray-900">
								{Nudgee.id}
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
