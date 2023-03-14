<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<h1>Group: {data.group.name}</h1>
	<p>Nudgees: {data.group.NudgeeGroup.Nudgee}</p>
</div>
