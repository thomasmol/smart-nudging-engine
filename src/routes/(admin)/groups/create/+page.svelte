<script lang="ts">
	import type { Group } from '@prisma/client';
	let result: Group;
	let loading: boolean = false;

	// method that calls the API to create a group
	const create = async (event: Event) => {
		loading = true;
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const response = await fetch('/api/groups', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(
        {
          name: data.get('name')
        }
      )
		});
		result = await response.json();

		loading = false;
	};
</script>

<div class="container">
	<form on:submit|preventDefault={create} class="max-w-md rounded-lg border bg-white p-6">
		<h1 class="text-lg font-semibold text-slate-900">Create new group</h1>
		<label class="mb-2 mt-4 block font-medium text-gray-700" for="label">Name</label>
		<input
			class="w-full rounded-lg bg-gray-200 p-2"
			name="name"
			type="text"
			placeholder="Enter a name"
			required />

		{#if loading}
			<button
				disabled
				class="mt-4 w-full rounded-lg bg-slate-500 py-2 px-4 text-white hover:bg-slate-600"
				>Adding group...</button>
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
