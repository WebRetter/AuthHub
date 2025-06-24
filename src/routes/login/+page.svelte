<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="bg-base-200 flex min-h-screen items-center justify-center px-4">
	<div class="card bg-base-100 w-full max-w-sm shadow-2xl">
		<form method="post" action="?/login" use:enhance class="card-body space-y-4">
			<h2 class="text-center text-2xl font-bold">🔐 Login</h2>

			<div>
				<label class="label" for="username">
					<span class="label-text">Username</span>
				</label>
				<input
					name="username"
					id="username"
					type="text"
					class="input input-bordered"
					minlength="3"
					maxlength="31"
					required
				/>
			</div>

			<div>
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					name="password"
					id="password"
					type="password"
					class="input input-bordered"
					minlength="6"
					maxlength="255"
					required
				/>
			</div>

			{#if form?.message}
				<div class="alert alert-error p-2 text-sm">
					{form.message}
				</div>
			{/if}

			<button type="submit" class="btn btn-primary w-full">Login</button>

			<div class="text-center text-sm opacity-70">
				Noch kein Konto? <a href="/register" class="link link-primary">Registrieren</a>
			</div>
		</form>
	</div>
</div>
