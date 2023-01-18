<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Groups</h1>
			<h2 class="text-slate-700">An overview of your groups</h2>
		</div>
		<div class="">
			<a
				href="/groups/create"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add new group</a>
		</div>
	</div>
	<div class="grid md:grid-cols-3 gap-8">
		{#each data.groups as { id, name }}
			<a
				href="groups/{id}"
				class="flex-grow rounded-lg border bg-white hover:border-slate-300 ">
				<div class="p-4">
					<h2 class="text-xl font-semibold">{name}</h2>
				</div>
				<div class="rounded-b-lg bg-slate-50 p-4 text-blue-800">View details</div>
			</a>
		{/each}
	</div>
</div>
