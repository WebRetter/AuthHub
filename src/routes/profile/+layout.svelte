<script lang="ts">
	import { page } from '$app/state';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const settingsPages = [
		[
			{
				name: 'Profildaten',
				path: '/profile'
			},
			{
				name: 'Email',
				path: '/profile/email'
			},
			{
				name: 'Passwort',
				path: '/profile/password'
			}
		]
	];
</script>

<main class="mx-auto flex w-full grow flex-col gap-5 px-2 py-10 lg:w-4/5 lg:flex-row lg:px-0">
	<!-- Sidebar -->
	<div class="rounded-box bg-base-200 mb-5 h-fit w-full lg:mb-0 lg:w-60">
		{#each settingsPages as group, i}
			<ul class="menu rounded-box w-full gap-1">
				{#each group as Page}
					<li>
						<a href={Page.path} class={page.url.pathname === Page.path ? 'font-bold' : ''}>
							{Page.name}
						</a>
					</li>
				{/each}
			</ul>
			{#if i < settingsPages.length - 1}
				<hr class="border-base-content" />
			{/if}
		{/each}
	</div>

	<!-- Main Content -->
	<div class="h-fit w-full">
		{@render children?.()}
	</div>
</main>
