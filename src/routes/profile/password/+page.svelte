<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex w-full flex-col gap-3 lg:flex-row">
	<div class="w-full">
		<form method="post" use:enhance class="space-y-4">
			<fieldset class="fieldset">
				<label for="currentPassword" class="label">Aktuelles Passwort</label>
				<input
					type="password"
					name="currentPassword"
					id="currentPassword"
					class="input w-full"
					minlength="6"
					maxlength="255"
					autocomplete="current-password"
					required
				/>

				<label for="newPassword" class="label">Neues Passwort</label>
				<input
					type="password"
					name="newPassword"
					id="newPassword"
					class="input w-full"
					minlength="6"
					maxlength="255"
					autocomplete="new-password"
					required
				/>

				<label for="confirmPassword" class="label">Neues Passwort bestätigen</label>
				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					class="input w-full"
					minlength="6"
					maxlength="255"
					autocomplete="new-password"
					required
				/>
			</fieldset>

			{#if form?.message}
				<div class="alert alert-error text-sm">{form.message}</div>
			{/if}

			<button type="submit" class="btn btn-primary w-full"> 🔒 Passwort speichern </button>
		</form>
	</div>
</div>
