<script>
	import '../app.css';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { navigating, page } from '$app/stores';
</script>

<nav class="shadow-xlshadow-zinc-100 border-b border-slate-200 bg-white text-slate-500">
	<div class="container flex justify-between space-x-10 ">
		<h1 class="py-4 text-center text-xl font-bold text-slate-700">NaaS</h1>
		<div class="flex font-semibold">
			<a
				class:bg-slate-100={$page.url.pathname === '/'}
				href="/"
				class="px-6 py-5 hover:bg-slate-100">Dashboard</a>
			<a
				class:bg-slate-100={$page.url.pathname.startsWith('/nudgees')}
				href="/nudgees"
				class="px-6 py-5 hover:bg-slate-100">Nudgees</a>
			<a
				class:bg-slate-100={$page.url.pathname.startsWith('/components')}
				href="/components"
				class="px-6 py-5 hover:bg-slate-100">Components</a>
			<a
				class:bg-slate-100={$page.url.pathname.startsWith('/configurations')}
				href="/configurations"
				class="px-6 py-5 hover:bg-slate-100">Configurations</a>
		</div>
		<div />
	</div>
</nav>

<div class="container">
	<Breadcrumb path={$page.url.pathname} />
</div>
{#if $navigating}
	<div class="container">
		<div class="flex justify-center">
			<div class="w-8 h-8 border-2 border-slate-200 rounded-full animate-spin" />
		</div>
	</div>
{:else}
	<slot />
{/if}
