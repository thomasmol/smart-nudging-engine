<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Update action</h1>
		</div>
	</div>

	<div class="relative overflow-x-auto rounded-lg border bg-white p-5">
		<form method="post" action="/actions/{data.action.id}?/update">
			<div class="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6">
				<div>
					<label for="nudgee" class="mb-2 block text-sm font-medium text-gray-900">Nudgee</label>
					<select
						id="nudgee"
						name="nudgee_id"
						bind:value={data.action.nudgee_id}
						class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900">
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
						bind:value={data.action.metric_type_id}
						class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900">
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
						value={data.action.metric_value}
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="Metric value"
						required />
				</div>
				<div class="w-full">
					<label for="created_at" class="mb-2 block text-sm font-medium text-gray-900"
						>Created at (UTC)</label>
					<input
						type="datetime-local"
						name="created_at"
						id="created_at"
						value={(new Date(data.action.created_at)).toISOString().slice(0, 16)}
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="created at" />
				</div>
			</div>
			<div class="flex items-center space-x-4">
				<button
					type="submit"
					class="rounded-lg bg-slate-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300">
					Update action
				</button>
				<button
					formaction="/actions/{data.action.id}?/destroy"
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
