<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	export let data: any;
	let loading = false;

	async function generate() {
		loading = true;
		const response = await fetch('/api/configurations/' + data.configuration.id + '/generate');
		if (response.ok) {
			loading = false;
			invalidateAll();
		} else {
			loading = false;
			throw new Error(response.statusText);
		}
	}
</script>

<div class="container space-y-16">
	<section>
		<div class="mb-4 flex justify-between">
			<div>
				<h1 class="mb-2 text-xl font-semibold text-slate-800">
					Configuration of {data.configuration.name}
				</h1>
				<h2 class="text-slate-700">Detailed view of your configuration</h2>
			</div>
			<div class="" />
		</div>

		<div class="rounded-lg border bg-white ">
			<div class="p-4">
				<header class="flex justify-between">
					<h2 class="text-xl font-semibold">{data.configuration.name}</h2>
					{#if new Date() > data.configuration.start_time}
						<div class="inline-flex  rounded  px-4 py-2 font-semibold text-slate-600">
							<svg
								class="-ml-1 mr-3 h-5 w-5 animate-spin text-slate-600"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4" />
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
							</svg>Running
						</div>
					{/if}
				</header>
				<p class="">Algo: {data.configuration.algorithm}</p>
				<p>Reaction wait time: {data.configuration.reaction_wait_time}</p>
				<p>Start time: {new Date(data.configuration.start_time).toLocaleString('nl-NL')}</p>
			</div>
		</div>
	</section>
	<section>
		<div class="mb-4 flex justify-between">
			<div>
				<h1 class="mb-2 text-xl font-semibold text-slate-800">Generated nudges</h1>
				<h2 class="text-slate-700">A list of all nudges of this configuration</h2>
			</div>
			<div>
				{#if loading}
					<button
						disabled
						class="inline-block cursor-not-allowed rounded bg-blue-400 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
						>Generating...</button>
				{:else}
					<button
						on:click={generate}
						class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
						>Generate new nudge</button>
				{/if}
			</div>
		</div>
		<div class="relative overflow-x-auto rounded-lg border">
			<table class="w-full text-left text-sm text-gray-500 ">
				<thead class="border-b bg-gray-50 text-sm uppercase text-gray-700 ">
					<tr class="">
						<th scope="col" class="py-3 px-6">Id</th>
						<th scope="col" class="py-3 px-6">Activity Type</th>
						<th scope="col" class="py-3 px-6">Timeframe</th>
						<th scope="col" class="py-3 px-6">Effectiveness</th>
						<th scope="col" class="py-3 px-6">Text</th>
					</tr>
				</thead>
				<tbody>
					{#each data.nudges as nudge}
						<tr class="border-b bg-white ">
							<th
								scope="row"
								class="block w-24 truncate whitespace-nowrap py-4 pl-6 font-medium text-gray-900">
								{nudge.id}
							</th>
							<td class="py-4 px-6">{nudge.ActivityType.name}</td>
							<td class="py-4 px-6">{nudge.Timeframe.name}</td>
							<td class="py-4 px-6">{nudge.effectiveness}</td>
							<td class="py-4 px-6">{nudge.text}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>
