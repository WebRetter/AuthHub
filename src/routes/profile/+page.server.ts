import { requireLogin, validateName, validateUsername } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	const user = requireLogin(event);
	return { user };
};

export const actions: Actions = {
	default: async (event) => {
		const user = requireLogin(event);

		const formData = await event.request.formData();
		const username = formData.get('username');
		const name = formData.get('name');

		if (!validateUsername(username)) {
			return fail(400, { message: 'Ungültiger Username' });
		}

		if (!validateName(name)) {
			return fail(400, { message: 'Ungültige Name' });
		}

		db.update(userTable)
			.set({
				username,
				name,
				updatedAt: new Date()
			})
			.where(eq(userTable.id, user.id))
			.run();

		return { success: true };
	}
};
