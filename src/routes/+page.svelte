<script lang="ts">
	import { Role } from '$lib/roles';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="mx-auto mt-10 max-w-4xl space-y-6">
	<h1 class="text-3xl font-bold">Willkommen, {data.user.username}!</h1>
	<p class="text-gray-600">Deine Benutzer-ID: <span class="font-mono">{data.user.id}</span></p>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<!-- Übersichtskarte -->
		<div class="bg-base-200 rounded-xl border p-6 shadow-md">
			<h2 class="mb-2 text-xl font-semibold">Dein Profil</h2>
			<ul class="space-y-1 text-gray-700">
				<li><strong>Username:</strong> {data.user.username}</li>
				<li><strong>ID:</strong> {data.user.id}</li>
				<li><strong>Rolle:</strong> {Role[data.user.role]}</li>
			</ul>
		</div>

		<!-- Quick Links -->
		<div class="bg-base-200 rounded-xl border p-6 shadow-md">
			<h2 class="mb-2 text-xl font-semibold">Schnellzugriff</h2>
			<div class="flex flex-col space-y-2">
				<a href="/profile" class="btn btn-outline btn-primary">Profil verwalten</a>
				<a href="/admin/users" class="btn btn-outline btn-accent">Benutzerverwaltung</a>
				<a href="/settings" class="btn btn-outline">Einstellungen</a>
			</div>
		</div>
	</div>
</div>
