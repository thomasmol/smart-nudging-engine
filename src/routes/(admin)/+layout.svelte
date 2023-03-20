<script lang="ts">
	import '../../app.css';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { navigating, page } from '$app/stores';
	import MainPageShiver from '$lib/components/MainPageShiver.svelte';

	let isOpen = false;
	const pages = [
		{ path: '/', label: 'Overview' },
		{ path: '/configurations', label: 'Configurations' },
		{ path: '/groups', label: 'Groups' },
		{ path: '/nudgees', label: 'Nudgees' },
		{ path: '/actions', label: 'Actions' },
		{ path: '/nudges', label: 'Nudges' },
		{ path: '/components', label: 'Components' },
		{ path: '/metrics', label: 'Metrics' },
	];
</script>

<div class="flex h-screen justify-between">
	<aside
		class="fixed inset-y-0 left-0 z-50 h-full transform border-r border-slate-200 bg-white text-slate-700 md:block md:h-auto md:transform-none
		{isOpen
			? 'translate-x-0'
			: '-translate-x-full'} transition duration-300 ease-in-out md:static md:translate-x-0">
		<button
			class="absolute top-0 right-0 mt-2 mr-2 text-xl text-slate-800 focus:outline-none md:hidden"
			on:click={() => (isOpen = !isOpen)}>
			x
		</button>
		<div class="flex h-full flex-col">
			<h1 class="py-4 px-2 text-center text-2xl font-bold text-slate-800 md:px-0">NaaS</h1>
			<div class="flex w-full flex-col text-sm font-semibold md:w-auto md:text-base">
				{#each pages as { path, label }}
					<a
						class:bg-slate-100={$page.url.pathname === path ||
							($page.url.pathname.startsWith(path) && path !== '/')}
						href={path}
						class="flex cursor-pointer items-center gap-2 px-8 py-5 hover:bg-slate-100"
						on:click={() => (isOpen = false)}>
						<span class="h-1 w-2 rounded-full bg-slate-300" />
						<span>{label}</span>
					</a>
				{/each}
			</div>
		</div>
	</aside>
	<div class="w-full max-w-6xl ">
		<button
			class="m-2 rounded-lg border bg-white px-2 py-1 text-sm font-bold text-slate-800 focus:outline-none md:hidden"
			on:click={() => (isOpen = !isOpen)}>
			☰ Menu
		</button>
		<div class="container">
			<Breadcrumb path={$page.url.pathname} />
		</div>
		{#if $navigating}
			<MainPageShiver />
		{:else}
			<slot />
		{/if}
	</div>
	<div />
</div>
