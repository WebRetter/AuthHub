<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<title>AuthHub</title>

<div class="bg-base-300 flex h-fit min-h-screen flex-col">
	<Nav />
	{@render children()}
</div>
