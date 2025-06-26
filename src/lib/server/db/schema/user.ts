import { Role } from '$lib/roles';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	email: text('email').unique(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: integer('role').notNull().$type<Role>().default(Role.Readonly), // ← Hier kommt dein Rollensystem rein
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
	lastLogin: integer('last_login', { mode: 'timestamp' })
});

export type User = typeof user.$inferSelect;
