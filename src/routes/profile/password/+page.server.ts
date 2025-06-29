import { requireLogin, validatePassword } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';
import { hash, verify } from '@node-rs/argon2';

export const load: PageServerLoad = async (event) => {
	const user = requireLogin(event);
	return { user };
};

export const actions: Actions = {
	default: async (event) => {
		const user = requireLogin(event);

		const formData = await event.request.formData();
		const currentPassword = formData.get('currentPassword');
		const newPassword = formData.get('newPassword');
		const confirmPassword = formData.get('confirmPassword');

		if (!validatePassword(currentPassword)) {
			return fail(400, {
				message: 'Ungültiges aktuelles Passwort (min 6, max 255 Zeichen)'
			});
		}

		if (newPassword !== confirmPassword) {
			return fail(400, {
				message: 'Die Passwörter stimmen nicht überein'
			});
		}

		if (!validatePassword(newPassword)) {
			return fail(400, {
				message: 'Invalid new password (min 6, max 255 characters)'
			});
		}

		const results = await db.select().from(userTable).where(eq(userTable.id, user.id));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Incorrect Email or password' });
		}

		const validPassword = await verify(existingUser.passwordHash, newPassword, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			return fail(400, { message: 'Incorrect Email or password' });
		}

		const passwordHash = await hash(newPassword, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		db.update(userTable)
			.set({
				passwordHash,
				updatedAt: new Date()
			})
			.where(eq(userTable.id, user.id))
			.run();

		return { success: true };
	}
};
