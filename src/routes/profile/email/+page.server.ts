import { requireLogin, validateEmail } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	const user = requireLogin(event);
	return { user };
};

export const actions: Actions = {
	changeEmail: async (event) => {
		const user = requireLogin(event);

		const formData = await event.request.formData();
		const email = formData.get('email');

		if (user.email === email) {
			return fail(400, {
				action: 'changeEmail',
				message: 'Die eingegebene E-Mail-Adresse ist identisch mit der aktuellen E-Mail-Adresse.'
			});
		}

		if (!validateEmail(email)) {
			return fail(400, { action: 'changeEmail', message: 'Ungültige E-Mail-Adresse' });
		}

		db.update(userTable)
			.set({
				email,
				updatedAt: new Date()
			})
			.where(eq(userTable.id, user.id))
			.run();

		return { action: 'changeEmail', success: true };
	},
	verification: async (event) => {
		const user = requireLogin(event);

		console.log('Sende Mail zur Verifizierung an:', user.email);

		return { action: 'verification', success: true };
	}
};
