import { user, type User } from './schema/user';
import { session, type Session } from './schema/session';
import { apiToken, type ApiToken } from './schema/token';

export const schema = { user, session, token: apiToken };

export { user, type User, session, type Session, apiToken as token, type ApiToken as Token };
