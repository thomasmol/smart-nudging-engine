<script lang="ts">
	import type { Configuration } from '@prisma/client';

	let name: string;
	let algorithm: string;
	let reactionWaitTime: number;
	let startTime: Date;

	let loading: boolean = false;
	let result: Configuration;

	async function create() {
		loading = true;
		const response = await fetch('/api/configurations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				algorithm,
				reactionWaitTime,
				startTime
			})
		});

		result = await response.json();

		if (result) {
			console.log('success');
		}
		loading = false;
	}
</script>

<div class="container">
	<form on:submit|preventDefault={create} class="max-w-md rounded-lg border bg-white p-6">
		<h1 class="text-lg font-semibold text-slate-900">Create new component type</h1>
		<label class="mb-2 mt-4 block font-medium text-gray-700" for="label">Label</label>
		<input
			class="w-full rounded-lg bg-gray-200 p-2"
			bind:value={name}
			type="text"
			placeholder="Enter a label"
			required />

		<label class="mb-2 mt-4 block font-medium text-gray-700" for="algorithm">Algorithm</label>
		<input
			class="w-full rounded-lg bg-gray-200 p-2"
			bind:value={algorithm}
			type="text"
			placeholder="Enter an algorithm"
			required />
		<label class="mb-2 mt-4 block font-medium text-gray-700" for="reactionWaitTime"
			>Reaction wait time (seconds)</label>
		<input
			class="w-full rounded-lg bg-gray-200 p-2"
			bind:value={reactionWaitTime}
			type="number"
			placeholder="Enter a reaction wait time"
			required />
		<label class="mb-2 mt-4 block font-medium text-gray-700" for="startTime">Start datetime</label>
		<input
			class="w-full rounded-lg bg-gray-200 p-2"
			bind:value={startTime}
			type="datetime-local"
			placeholder="Enter a date"
			required />

		{#if loading}
			<button
				disabled
				class="mt-4 w-full rounded-lg bg-slate-500 py-2 px-4 text-white hover:bg-slate-600"
				>Adding config...</button>
		{:else}
			<button
				type="submit"
				class="mt-4 w-full rounded-lg bg-slate-500 py-2 px-4 text-white hover:bg-slate-600"
				>Submit</button>
		{/if}
	</form>
	{#if result}
		<div class="mt-2 max-w-md rounded-lg border border-green-100 bg-green-50 p-6">
			<p>Added <span class="font-semibold">"{result.name}"</span> successfully</p>
		</div>
	{/if}
</div>
