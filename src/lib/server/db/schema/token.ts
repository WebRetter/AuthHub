import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { user } from './user';

export const apiToken = sqliteTable('api_token', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	token: text('token').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' })
});

export type ApiToken = typeof apiToken.$inferSelect;
