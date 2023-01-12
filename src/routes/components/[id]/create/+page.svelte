<script lang="ts">
	import type { ComponentValue } from '@prisma/client';
	import type { PageData } from './$types';
	let value: string;
	let loading: boolean = false;
	let result: ComponentValue;
	export let data: PageData;
	async function create() {
		loading = true;
		const response = await fetch('/api/components/' + data.componentType.id + '/values', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				value
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
		<h1 class="text-lg font-semibold text-slate-900">
			Create new value for {data.componentType.label}
		</h1>
		<label class="mb-2 mt-4 block font-medium text-gray-700" for="label"
			>Value (of type: {data.componentType.data_type})</label>
		<input
			class="w-full rounded-lg bg-gray-200 p-2"
			bind:value
			type="text"
			placeholder="Enter a value"
			required />
		{#if loading}
			<button
				disabled
				class="mt-4 w-full rounded-lg bg-slate-500 py-2 px-4 text-white hover:bg-slate-600"
				>Adding "{value}"...</button>
		{:else}
			<button
				type="submit"
				class="mt-4 w-full rounded-lg bg-slate-500 py-2 px-4 text-white hover:bg-slate-600"
				>Submit</button>
		{/if}
	</form>
	{#if result}
		<div class="mt-2 max-w-md rounded-lg border border-green-100 bg-green-50 p-6">
			<p>Added <span class="font-semibold">"{result.value}"</span> successfully</p>
		</div>
	{/if}
</div>
