<script lang="ts">
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';
	import type { ActionData, PageData } from './$types';

	let inputRows = [{ type: 'text', content: 'Generate a nudge that will encourage users to ' }];

	function addInputRow() {
		inputRows = [...inputRows, { type: 'text', content: '' }];
	}

	let generate: boolean;

	export let form: ActionData;
	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<header>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Create new configuration</h1>
		</header>
	</div>
	<div class="relative overflow-x-auto rounded-lg border bg-white p-5">
		<form method="post">
			<div class="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6">
				<div class="w-full">
					<label for="name" class="mb-2 block text-sm font-medium text-gray-900">Name</label>
					<input
						type="text"
						name="name"
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
						id="algorithm"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="Algorithm"
						required />
				</div>
				<div class="w-full">
					<label for="start_datetime" class="mb-2 block text-sm font-medium text-gray-900"
						>Start datetime</label>
					<input
						type="datetime-local"
						name="start_datetime"
						id="start_datetime"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600" />
				</div>
				<div class="w-full">
					<label for="end_datetime" class="mb-2 block text-sm font-medium text-gray-900"
						>End datetime</label>
					<input
						type="datetime-local"
						name="end_datetime"
						id="end_datetime"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600" />
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
					Create configuration
				</button>
			</div>
		</form>
		{#if form?.success}
			<div class="mt-4">
				<SuccessAlert alert="Success" message="Created new configuration." />
			</div>
		{/if}
	</div>
</div>
