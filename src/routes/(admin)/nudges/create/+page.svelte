<script lang="ts">
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Create new nudge</h1>
		</div>
	</div>
	<div class="relative overflow-x-auto rounded-lg border bg-white p-5">
		<form method="post">
			<div class="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6">
				<div class="w-full">
					<label for="content_type" class="mb-2 block text-sm font-medium text-gray-900"
						>Content Type</label>
					<input
						type="text"
						name="content_type"
						id="content_type"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="content type" />
				</div>
				<div class="w-full">
					<label for="content" class="mb-2 block text-sm font-medium text-gray-900">Content</label>
					<input
						type="text"
						name="content"
						id="content"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="content"
						required />
				</div>
				<div class="col-span-2">
					<label for="content" class="mb-2 block text-sm font-medium text-gray-900"
						>Generated</label>
					<input
						type="checkbox"
						name="generated"
						id="generated"
						class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="generated" />
				</div>
				<div class="">
					<label for="nudgees" class="mb-2 block text-sm font-medium text-gray-900">Add Nudgees (who do you want to nudge?)</label>
					<select
						name="nudgee_ids"
						id="nudgees"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						multiple
						required>
						{#each data.nudgees as nudgee}
							<option value={nudgee.id}>{nudgee.id}</option>
						{/each}
					</select>
				</div>
				<div class="w-full">
					<label for="component-values" class="mb-2 block text-sm font-medium text-gray-900">Select component values (what does the nudge consist of?)</label>
					<select
						name="component_value_ids"
						id="component-values"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						multiple
						required>
						{#each data.componentTypes as componentType}
							{#each componentType.ComponentValue as value}
								<option value={value.id}>{componentType.label} - {value.value}</option>
							{/each}
						{/each}
					</select>
				</div>
				<div class="w-full">
					<label for="metric-types" class="mb-2 block text-sm font-medium text-gray-900">Select metric types (what do you want to measure)</label>
					<select
						name="metric_type_ids"
						id="metric-types"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						multiple
						required>
						{#each data.metricTypes as metricType}
								<option value={metricType.id}>{metricType.label}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="flex items-center space-x-4">
				<button
					type="submit"
					class="rounded-lg bg-slate-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300">
					Create Nudge
				</button>
			</div>
		</form>
		{#if form?.success}
			<div class="mt-4">
				<SuccessAlert alert="Success" message="Created new nudgee." />
			</div>
		{/if}
	</div>
</div>
