export function camelToSnake(camelCaseString: string) {
	return camelCaseString.replace(/([A-Z])/g, "_$1").toLowerCase();
}