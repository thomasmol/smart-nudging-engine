<script lang="ts">
	import SuccessAlert from '$lib/components/SuccessAlert.svelte';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Create new nudgee</h1>
		</div>
	</div>
	<div class="relative overflow-x-auto rounded-lg border bg-white p-5">
		<form method="post">
			<div class="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-2 sm:gap-6">
				<div class="w-full">
					<label for="id" class="mb-2 block text-sm font-medium text-gray-900">ID (leave empty for auto generated)</label>
					<input
						type="text"
						name="id"
						id="id"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="id"
						 />
				</div>
				<div class="w-full">
					<label for="profile" class="mb-2 block text-sm font-medium text-gray-900">Profile (and its dimensions, as a json object)</label>
					<input
						type="text"
						name="profile"
						id="profile"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-slate-600 focus:ring-slate-600"
						placeholder="profile"
						required />
				</div>
			</div>
			<div class="flex items-center space-x-4">
				<button
					type="submit"
					class="rounded-lg bg-slate-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300">
					Create Nudgee
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
