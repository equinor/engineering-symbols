import { customAlphabet } from 'nanoid';

export function generateRandomString(length: number): string {
	const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
	return nanoid(length);
}
