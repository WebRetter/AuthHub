<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
</script>

<nav class="navbar bg-base-100 sticky top-0 z-10 flex justify-between p-2 shadow-md">
	<div class="gap-1">
		<a href="./" class="btn btn-ghost p-2" aria-label="Home">Home</a>
	</div>
	<div class="gap-1"></div>
	<div class="gap-1">
		{#if page.data.user}
			<form method="post" action="./?/logout" class="btn btn-ghost hover:btn-error" use:enhance>
				<button aria-label="Logout">Logout</button>
			</form>
		{:else}
			<a href="./login" class="btn btn-ghost" aria-label="Login">Login</a>
		{/if}
	</div>
</nav>
