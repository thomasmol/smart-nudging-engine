<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Component types</h1>
			<h2 class="text-slate-700">A list of all nudge component types</h2>
		</div>
		<div class="">
			<a
				href="/components/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add new type</a>
		</div>
	</div>
	<div class="grid md:grid-cols-3 gap-8">
		<a
			href="components/activity-types"
			class="flex-grow rounded-lg border bg-white hover:border-slate-300 ">
			<div class="p-4">
				<h2 class="text-xl font-semibold">Activity Types (required)</h2>
				<p class="mt-2 text-sm text-slate-700">string</p>
			</div>
			<div class="rounded-b-lg bg-slate-50 p-4 text-blue-800">View details</div>
		</a>
		<a
			href="components/timeframes"
			class="flex-grow rounded-lg border bg-white hover:border-slate-300">
			<div class="p-4">
				<h2 class="text-xl font-semibold">Timeframes (required)</h2>
				<p class="mt-2 text-sm text-slate-700">datetime</p>
			</div>
			<div class="rounded-b-lg bg-slate-50 p-4 text-blue-800">View details</div>
		</a>
		{#each data.metricTypes as { id, label, data_type }}
			<a
				href="components/{id}"
				class="flex-grow rounded-lg border bg-white hover:border-slate-300 ">
				<div class="p-4">
					<h2 class="text-xl font-semibold">{label}</h2>
					<p class="mt-2 text-sm text-slate-700">{data_type}</p>
				</div>
				<div class="rounded-b-lg bg-slate-50 p-4 text-blue-800">View details</div>
			</a>
		{/each}
		<!--
	<a
		href="components/categories"
		class="flex-grow rounded-lg border bg-white hover:border-slate-300">
		<div class="flex gap-4 p-4">
			<h2 class="text-xl font-semibold">Categories</h2>
		</div>
		<div class="rounded-b-lg bg-slate-50 p-4 text-blue-800">View details</div>
	</a>
	<a href="components/channels" class="flex-grow rounded-lg border bg-white hover:border-slate-300">
		<div class="flex gap-4 p-4">
			<h2 class="text-xl font-semibold">Channels</h2>
		</div>
		<div class="rounded-b-lg bg-slate-50 p-4 text-blue-800">View details</div>
	</a> -->
	</div>
</div>
