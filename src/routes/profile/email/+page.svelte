<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="grid w-full flex-col gap-3 lg:flex-row">
	<!-- E-Mail-Änderungsformular -->
	<form method="post" use:enhance class="w-full space-y-4">
		<fieldset class="fieldset">
			<label for="email" class="label">Email</label>
			<input
				type="text"
				name="email"
				id="email"
				class="input w-full"
				minlength="3"
				value={data.user.email}
				autocomplete="email"
				disabled={form?.success && form?.action === 'changeEmail'}
				required
			/>
		</fieldset>

		{#if form?.message && form?.action === 'changeEmail'}
			<div class="alert alert-error text-sm">{form.message}</div>
		{:else if form?.success && form?.action === 'changeEmail'}
			<p class="text-success">Erfolgreich geändert</p>
		{/if}

		<button type="submit" formaction="?/changeEmail" class="btn btn-primary w-full">
			💾 Speichern
		</button>
	</form>

	<!-- Verifizierungsformular -->
	{#if !data.user.verified}
		<form method="post" action="?/verification" use:enhance>
			<button
				id="verification"
				class="btn mt-6 w-full"
				disabled={form?.success && form?.action === 'verification'}
			>
				📧 Sende Verifizierungs-E-Mail
			</button>

			{#if form?.message && form?.action === 'verification'}
				<div class="alert alert-error text-sm">{form.message}</div>
			{:else if form?.success && form?.action === 'verification'}
				<p class="text-success">Erfolgreich gesendet</p>
			{/if}
		</form>
	{/if}
</div>
