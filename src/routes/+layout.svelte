<script>
	import '../app.css';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { page } from '$app/stores';
</script>

<nav class="shadow-xlshadow-zinc-100 border-b bg-white text-slate-500">
	<div class="justify-left container flex space-x-10 ">
		<h1 class="py-4 text-center text-xl font-bold text-slate-700">NaaS</h1>
		<div class="flex font-semibold">
			<a href="/" class="px-6 py-5 hover:bg-slate-200">Dashboard</a>
			<a href="/nudges" class="px-6 py-5 hover:bg-slate-200">Nudges</a>
			<a href="/nudgees" class="px-6 py-5 hover:bg-slate-200">Nudgees</a>
			<a href="/components" class="px-6 py-5 hover:bg-slate-200">Components</a>
			<a href="/configuration" class="px-6 py-5 hover:bg-slate-200">Configuration</a>
		</div>
	</div>
</nav>

<div class="container">
	<Breadcrumb path={$page.url.pathname} />
</div>

<slot />
