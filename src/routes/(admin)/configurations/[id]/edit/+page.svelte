<script lang="ts">
	import type { Prisma } from '@prisma/client';
	import type { PageData } from './$types';

	export let data: PageData;

	let generate = false;
	let inputRows: any = [
		{ type: 'text', content: 'Generate a nudge that will encourage users to ' }
	];
	if (data.configuration.generate) {
		generate = data.configuration.generate;
		inputRows = data.configuration.deconstructed_prompt;
	}
	function addInputRow() {
		inputRows = [...inputRows, { type: 'text', content: '' }];
	}
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Update configuration</h1>
		</div>
	</div>

	<div class="relative overflow-x-auto rounded-lg border bg-white p-5">
		<form method="post" action="/configurations/{data.configuration.id}?/update">
			<div class="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6">
				<div class="w-full">
					<label for="name" class="mb-2 block text-sm font-medium text-gray-900">Name</label>
					<input
						type="text"
						name="name"
						value={data.configuration.name}
						id="name"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="Name"
						required />
				</div>
				<div class="w-full">
					<label for="algorithm" class="mb-2 block text-sm font-medium text-gray-900"
						>Algorithm</label>
					<input
						type="text"
						name="algorithm"
						value={data.configuration.algorithm}
						id="algorithm"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="Algorithm"
						required />
				</div>
				<div class="w-full">
					<label for="weight" class="mb-2 block text-sm font-medium text-gray-900"
						>Decision Time Weight</label>
					<input
						type="number"
						name="decision_time_weight"
						id="weight"
						min="0"
						max="1"
						step="0.001"
						value={data.configuration.decision_time_weight}
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="0.556"
						required />
				</div>
				<div class="w-full">
					<label for="start_datetime" class="mb-2 block text-sm font-medium text-gray-900"
						>Start datetime</label>
					<input
						type="datetime-local"
						name="start_datetime"
						value={new Date(data.configuration.start_datetime).toISOString().slice(0, -8)}
						id="start_datetime"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600" />
				</div>
				<div class="w-full">
					<label for="end_datetime" class="mb-2 block text-sm font-medium text-gray-900"
						>End datetime</label>
					<input
						type="datetime-local"
						name="end_datetime"
						value={new Date(data.configuration.end_datetime).toISOString().slice(0, -8)}
						id="end_datetime"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600" />
				</div>
				<div class="col-span-2">
					<label for="groups" class="mb-2 block text-sm font-medium text-gray-900"
						>Groups you want to nudge</label>
					<ul class="grid w-full gap-6 md:grid-cols-4">
						{#each data.groups as group}
							<li>
								<input
									type="checkbox"
									name="groups"
									checked={data.configuration.GroupConfiguration.some(
										(groupConfig) => groupConfig.group_id === group.id
									)}
									id="group-{group.id}"
									value={group.id}
									class="peer hidden" />
								<label
									for="group-{group.id}"
									class="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-slate-600 peer-checked:text-gray-600">
									<div class="block">
										<div class="w-full text-base font-semibold">{group.name}</div>
										<div class="w-full text-sm">{group.NudgeeGroup.length} nudgees</div>
										{#if group.control}
											<div class="w-full text-sm italic">is control group</div>
										{/if}
									</div>
								</label>
							</li>
						{/each}
					</ul>
				</div>
				<div class="col-span-2">
					<label for="groups" class="mb-2 block text-sm font-medium text-gray-900"
						>Metric type weights (how much does each metric contribute to nudge effectiveness)</label>
					<ul class="space-y-4">
						{#each data.metricTypes as metricType}
							<li class="flex w-full items-center gap-4">
								<label for="metric-type-weight-{metricType.id}" class="flex-1"
									>{metricType.label}</label>
								<input type="hidden" name="metric_types" value={metricType.id} />
								<input
									type="number"
									min="0"
									max="1"
									step="0.001"
									value={data.configuration.MetricTypeWeight.find(
										(metricTypeWeight) => metricTypeWeight.metric_type_id === metricType.id
									)
										? data.configuration.MetricTypeWeight.find(
												(metricTypeWeight) => metricTypeWeight.metric_type_id === metricType.id
										  ).weight
										: 0}
									name="metric_type_weights"
									class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600" />
							</li>
						{/each}
					</ul>
				</div>
				<div class="col-span-2">
					<label for="content" class="mb-2 block text-sm font-medium text-gray-900"
						>Generate nudges</label>
					<input
						type="checkbox"
						name="generate"
						bind:checked={generate}
						id="generate"
						class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="generate" />
				</div>
				{#if generate && data.componentTypes}
					<div class="col-span-2">
						<label for="generate-model" class="mb-2 block text-sm font-medium text-gray-900"
							>Generate model (model that is used to generate nudges)</label>
						<select
							id="generate-model"
							name="generate_model"
							class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900">
							<option value="gpt-4">OpenAI GPT-4</option>
						</select>
					</div>
					<header class="col-span-2">
						<h2 class="font-semibold">Prompt builder</h2>
						<h3 class="text-sm text-slate-700">
							Build a prompt with component types that is used to generate prompts
						</h3>
					</header>
					<p class=" rounded-lg border p-2 font-semibold text-slate-800 ">
						"{#each inputRows as inputRow}
							{#if inputRow.type === 'text'}
								{inputRow.content}
							{:else if inputRow.type === 'component_type_id'}
								{#each data.componentTypes as componentType}
									{#if componentType.id === inputRow.content}
										<span class="font-bold italic">{componentType.label}</span>
									{/if}
								{/each}
							{/if}
						{/each}"
					</p>
					{#each inputRows as inputRow, i}
						<div class="col-span-2 flex gap-4">
							<select
								bind:value={inputRow.type}
								name="prompt[type][]"
								class="focus:ring-primary-500 focus:border-primary-500 block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900">
								<option value="text">Text</option>
								<option value="component_type_id">Component Type</option>
							</select>
							{#if inputRow.type === 'text'}
								<input
									bind:value={inputRow.content}
									type="text"
									name="prompt[content][]"
									class="focus:ring-primary-500 focus:border-primary-500 block flex-grow  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
									placeholder="Content" />
							{:else}
								<select
									bind:value={inputRow.content}
									name="prompt[content][]"
									class="focus:ring-primary-500 focus:border-primary-500 block flex-grow  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900">
									{#each data.componentTypes as componentType}
										<option value={componentType.id}>{componentType.label}</option>
									{/each}
								</select>
							{/if}
						</div>
					{/each}
					<button
						type="button"
						on:click={addInputRow}
						class="col-span-2 rounded-lg bg-slate-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300">
						Add prompt section</button>
				{/if}
			</div>
			<div class="flex items-center space-x-4">
				<button
					type="submit"
					class="rounded-lg bg-slate-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300">
					Update configuration
				</button>
				<button
					formaction="/configurations/{data.configuration.id}?/destroy"
					class="inline-flex items-center rounded-lg border border-red-600 px-5 py-2.5 text-center text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300">
					<svg
						class="mr-1 -ml-1 h-5 w-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clip-rule="evenodd" /></svg>
					Delete
				</button>
			</div>
		</form>
	</div>
</div>
