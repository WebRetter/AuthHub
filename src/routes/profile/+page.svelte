<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="flex w-full flex-col gap-3 lg:flex-row">
	<form method="post" use:enhance class="w-full space-y-4">
		<fieldset class="fieldset">
			<label for="name" class="label">Name</label>
			<input
				type="text"
				name="name"
				id="name"
				class="input w-full"
				value={data.user.name}
				autocomplete="name"
				required
			/>

			<label for="username" class="label">Username</label>
			<input
				type="text"
				name="username"
				id="username"
				class="input w-full"
				minlength="3"
				value={data.user.username}
				autocomplete="username"
				required
			/>
		</fieldset>

		{#if form?.message}
			<div class="alert alert-error text-sm">{form.message}</div>
		{/if}

		<button type="submit" class="btn btn-primary w-full"> 💾 Speichern </button>
	</form>
</div>
