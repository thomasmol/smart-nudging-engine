<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<main class="container">
	<div class="mt-10 rounded border bg-white p-10">
		<h1 class="text-center text-xl font-semibold text-slate-800">
			Sign in to use the smart nudging engine
		</h1>
		<p class="mt-4 flex flex-col">
			<button on:click={() => signIn('github')} class="rounded border bg-slate-800 p-2 text-white"
				>Sign In with GitHub</button>
		</p>
	</div>
</main>
