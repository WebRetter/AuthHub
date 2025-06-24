import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	logout();
};

export const actions: Actions = {
	logout
};

async function logout() {
	const event = getRequestEvent();

	if (!event.locals.session) {
		return fail(401);
	}

	await auth.invalidateSession(event.locals.session.id);
	auth.deleteSessionTokenCookie(event);

	return redirect(302, '/login');
}
