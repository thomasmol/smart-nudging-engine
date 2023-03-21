<script lang="ts">
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Create new action</h1>
		</div>
	</div>
	<div class="relative overflow-x-auto rounded-lg border bg-white p-5">
		<form method="post">
			<div class="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6">
				<div>
					<label for="nudgee" class="mb-2 block text-sm font-medium text-gray-900">Nudgee</label>
					<select
						id="nudgee"
						name="nudgee_id"
						class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900">
						<option selected>Select nudgee</option>
						{#each data.nudgees as nudgee}
							<option value={nudgee.id}>{nudgee.id}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="metric_type" class="mb-2 block text-sm font-medium text-gray-900"
						>Metric Type</label>
					<select
						id="metric_type"
						name="metric_type_id"
						class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900">
						<option selected>Select metric type</option>
						{#each data.metricTypes as metricType}
							<option value={metricType.id}>{metricType.label} - {metricType.type}</option>
						{/each}
					</select>
				</div>
				<div class="w-full">
					<label for="metricValue" class="mb-2 block text-sm font-medium text-gray-900"
						>Metric value</label>
					<input
						type="text"
						name="metric_value"
						id="metricValue"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="Metric value"
						required />
				</div>
				<div class="w-full">
					<label for="created_at" class="mb-2 block text-sm font-medium text-gray-900"
						>Created at (leave empty for current datetime)</label>
					<input
						type="datetime-local"
						name="created_at"
						id="created_at"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="created at" />
				</div>
			</div>
			<div class="flex items-center space-x-4">
				<button
					type="submit"
					class="rounded-lg bg-slate-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300">
					Create action
				</button>
			</div>
		</form>
		{#if form?.success}
			<div class="mt-4">
				<SuccessAlert alert="Success" message="Created new action." />
			</div>
		{/if}
	</div>
</div>
