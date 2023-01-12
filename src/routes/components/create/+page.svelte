<script lang="ts">
	let label: string;
	let dataType: string;
	async function create(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const response = await fetch('/api/components/types', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label,
				dataType
			})
		});

		const result = await response.json();

		if (result.success) {
			console.log('success');
		}
	}
</script>

<div class="container">
	<form on:submit|preventDefault={create} class="max-w-md rounded-lg border bg-white p-6">
		<h1 class="text-lg font-semibold text-slate-900">Create new component type</h1>
		<label class="mb-2 mt-4 block font-medium text-gray-700" for="label">Label</label>
		<input
			class="w-full rounded-lg bg-gray-200 p-2"
			bind:value={label}
			type="text"
			placeholder="Enter a label"
			required />
		<label class="mb-2 mt-4 block font-medium text-gray-700" for="dateType">Date type</label>
		<input
			class="w-full rounded-lg bg-gray-200 p-2"
			bind:value={dataType}
			type="text"
			placeholder="Enter a datatype"
			required />

		<button class="mt-4 w-full rounded-lg bg-slate-500 py-2 px-4 text-white hover:bg-slate-600"
			>Submit</button>
	</form>
</div>
