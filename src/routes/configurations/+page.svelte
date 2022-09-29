<script lang="ts">
	export let data: any;
</script>

<div class="container">
	<div class="mb-4 flex justify-between">
		<div>
			<h1 class="mb-2 text-xl font-semibold text-slate-800">Configurations</h1>
			<h2 class="text-slate-700">A list of all nudge configurations</h2>
		</div>
		<div class="">
			<a
				href="/configurations"
				class="inline-block rounded bg-blue-600 px-4 py-2 align-middle text-lg font-bold text-white shadow-sm"
				>Add new configuration</a>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		{#each data.configurations as configuration}
			<div class="rounded-lg border bg-white ">
				<div class="p-4">
					<header class="flex justify-between">
						<h2 class="text-xl font-semibold">{configuration.name}</h2>
						{#if new Date() > configuration.start_time}
							<div class="inline-flex  rounded  px-4 py-2 font-semibold text-slate-600">
								<svg
									class="-ml-1 mr-3 h-5 w-5 animate-spin text-slate-600"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24">
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4" />
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
								</svg>Running
							</div>
						{/if}
					</header>
					<p class="">Algo: {configuration.algorithm}</p>
					<p>Reaction wait time: {configuration.reaction_wait_time}</p>
					<p>Start time: {new Date(configuration.start_time).toLocaleString('nl-NL')}</p>
				</div>
				<div class="rounded-b-lg bg-slate-50 p-4 ">
					<a
						href="/configurations/{configuration.id}"
						class="rounded  bg-slate-500 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-600"
						>View Details</a>
				</div>
			</div>
		{/each}
	</div>
</div>
