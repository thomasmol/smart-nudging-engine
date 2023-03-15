<script>
	import '../../app.css';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { navigating, page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
</script>

<div class="flex h-screen justify-center">
	<aside class="mx-5 h-full border-x border-slate-200 bg-white text-slate-700 shadow-sm">
		<div class="flex flex-col h-full">
			<h1 class="py-4 px-2 text-center text-xl font-bold text-slate-800 md:px-0">NaaS</h1>
			<div class="flex w-full flex-col text-sm font-semibold md:w-auto md:text-base">
				<a
					class:bg-slate-100={$page.url.pathname === '/'}
					href="/"
					class="px-1 py-5 hover:bg-slate-100 md:px-10">Overview</a>
				<a
					class:bg-slate-100={$page.url.pathname.startsWith('/nudgees')}
					href="/nudgees"
					class="px-1 py-5 hover:bg-slate-100 md:px-10">Nudgees</a>
				<a
					class:bg-slate-100={$page.url.pathname.startsWith('/nudges')}
					href="/nudges"
					class="px-1 py-5 hover:bg-slate-100 md:px-10">Nudges</a>
				<a
					class:bg-slate-100={$page.url.pathname.startsWith('/actions')}
					href="/actions"
					class="px-1 py-5 hover:bg-slate-100 md:px-10">Actions</a>
				<a
					class:bg-slate-100={$page.url.pathname.startsWith('/metrics')}
					href="/metrics"
					class="px-1 py-5 hover:bg-slate-100 md:px-10">Metrics</a>
				<a
					class:bg-slate-100={$page.url.pathname.startsWith('/components')}
					href="/components"
					class="px-1 py-5 hover:bg-slate-100 md:px-10">Components</a>
				<a
					class:bg-slate-100={$page.url.pathname.startsWith('/configurations')}
					href="/configurations"
					class="px-1 py-5 hover:bg-slate-100 md:px-10">Configurations</a>
				<a
					class:bg-slate-100={$page.url.pathname.startsWith('/groups')}
					href="/groups"
					class="px-1 py-5 hover:bg-slate-100 md:px-10">Groups</a>
			</div>
			<!-- <div class="flex">
			<button on:click={signOut} class="px-1 md:px-10 py-5 hover:bg-slate-100">Sign out</button>
		</div> -->
		</div>
	</aside>
	<div class="w-full max-w-6xl">
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

				<div class="grid grid-cols-1 gap-8 opacity-10 md:grid-cols-2">
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
	</div>
</div>
