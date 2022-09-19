<script>
	import '../app.css';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { page } from '$app/stores';
</script>

<nav class="shadow-xlshadow-zinc-100 border-b border-slate-200 bg-white text-slate-500">
	<div class="justify-left container flex space-x-10 ">
		<h1 class="py-4 text-center text-xl font-bold text-slate-700">NaaS</h1>
		<div class="flex font-semibold">
			<a class:bg-slate-100="{$page.url.pathname === "/"}" href="/" class="px-6 py-5 hover:bg-slate-100">Dashboard</a>
			<a class:bg-slate-100="{$page.url.pathname.startsWith('/nudges')}" href="/nudges" class="px-6 py-5 hover:bg-slate-100">Nudges</a>
			<a class:bg-slate-100="{$page.url.pathname.startsWith('/nudgees')}" href="/nudgees" class="px-6 py-5 hover:bg-slate-100">Nudgees</a>
			<a class:bg-slate-100="{$page.url.pathname.startsWith('/components')}" href="/components" class="px-6 py-5 hover:bg-slate-100">Components</a>
			<a class:bg-slate-100="{$page.url.pathname.startsWith('/configurations')}" href="/configurations" class="px-6 py-5 hover:bg-slate-100">Configurations</a>
		</div>
	</div>
</nav>

<div class="container">
	<Breadcrumb path={$page.url.pathname} />
</div>

<slot />
