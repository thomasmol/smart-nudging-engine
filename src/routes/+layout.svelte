<script>
	import '../app.css';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { navigating, page } from '$app/stores';
</script>

<nav class="shadow-xlshadow-zinc-100 border-b border-slate-200 bg-white text-slate-500">
	<div class="container flex flex-wrap justify-between md:space-x-10 ">
		<h1 class="py-4 text-center text-xl font-bold text-slate-700">NaaS</h1>
		<div class="flex font-semibold text-sm md:text-base">
			<a
				class:bg-slate-100={$page.url.pathname === '/'}
				href="/"
				class="px-2 md:px-6 py-5 hover:bg-slate-100">Dashboard</a>
			<a
				class:bg-slate-100={$page.url.pathname.startsWith('/nudgees')}
				href="/nudgees"
				class="px-2 md:px-6 py-5 hover:bg-slate-100">Nudgees</a>
			<a
				class:bg-slate-100={$page.url.pathname.startsWith('/components')}
				href="/components"
				class="px-2 md:px-6 py-5 hover:bg-slate-100">Components</a>
			<a
				class:bg-slate-100={$page.url.pathname.startsWith('/configurations')}
				href="/configurations"
				class="px-2 md:px-6 py-5 hover:bg-slate-100">Configurations</a>
		</div>
		<div />
	</div>
</nav>

<div class="container">
	<Breadcrumb path={$page.url.pathname} />
</div>
{#if $navigating}
	<div class="container">
		<div class="mb-4 flex justify-between">
			<div>
				<h1 class="mb-2 text-xl font-semibold text-slate-800">
					<div class="h-4 w-20 rounded bg-slate-200" />
				</h1>
				<h2 class="text-slate-700"><div class="h-3 w-32 rounded bg-slate-200" /></h2>
			</div>
			<div class="">
				<button
					disabled
					class="inline-block  animate-pulse rounded bg-slate-500/50 px-4 py-4 align-middle text-lg font-bold text-white shadow-sm"
					><div class="h-2 w-20 rounded bg-slate-400" /></button>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 opacity-10">
			{#each [0, 1] as item}
				<!-- content here -->
				<div class="mx-auto w-full rounded-md border bg-white p-4 shadow-sm">
					<div class="flex animate-pulse space-x-4">
						<div class="h-10 w-10 rounded-full bg-slate-200" />
						<div class="flex-1 space-y-6 py-1">
							<div class="h-2 rounded bg-slate-200" />
							<div class="space-y-3">
								<div class="grid grid-cols-3 gap-4">
									<div class="col-span-2 h-2 rounded bg-slate-200" />
									<div class="col-span-1 h-2 rounded bg-slate-200" />
								</div>
								<div class="h-2 rounded bg-slate-200" />
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<slot />
{/if}
