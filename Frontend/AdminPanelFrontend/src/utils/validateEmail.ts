export function validateEmail(email: string): boolean {
	const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}
