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
		{ path: '/metrics', label: 'Metrics' }
	];
</script>

<nav
	class="fixed border-b top-0 z-50 w-full bg-white">
	<div class="container flex items-center justify-between ">
		<a href="/" class="font-bold text-slate-700 text-sm italic">🔬</a>
		<button
			class=" rounded-lg border my-3 bg-white px-2 py-1 text-sm font-bold text-slate-800 focus:outline-none lg:hidden"
			on:click={() => (isOpen = !isOpen)}>
			☰ Menu
		</button>
		<div class="hidden lg:flex lg:justify-center lg:items-center lg:h-full lg:w-full ">
			{#each pages as { path, label }}
				<a
					class:bg-slate-100={$page.url.pathname === path ||
						($page.url.pathname.startsWith(path) && path !== '/')}
					href={path}
					class="inline-block cursor-pointer py-5 font-semibold text-sm px-6 hover:bg-slate-100 "
					on:click={() => (isOpen = false)}>
					<span>{label}</span>
				</a>
			{/each}
		</div>
	</div>
	<div class="{isOpen ? 'block' : 'hidden'} flex flex-col w-full border-b shadow-sm text-center lg:hidden bg-white">
		{#each pages as { path, label }}
			<a
				class:bg-slate-100={$page.url.pathname === path ||
					($page.url.pathname.startsWith(path) && path !== '/')}
				href={path}
				class="cursor-pointer py-3 px-6 hover:bg-slate-100"
				on:click={() => (isOpen = false)}>
				<span>{label}</span>
			</a>
		{/each}
	</div>
</nav>

<div class="mt-16 pb-10">
	<div class="container">
		<Breadcrumb path={$page.url.pathname} />
	</div>
	{#if $navigating}
		<MainPageShiver />
	{:else}
		<slot />
	{/if}
</div>
