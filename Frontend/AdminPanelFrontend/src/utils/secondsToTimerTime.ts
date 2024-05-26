export function secondsToTimerTime(seconds: number): string {
	let stringminutes: string, stringseconds: string;
	const minutes = Math.floor(seconds / 60);
	stringminutes = minutes.toString();
	if (minutes < 10) {
		stringminutes = '0' + stringminutes;
	}
	stringseconds = (seconds % 60).toString();
	if (seconds % 60 < 10) {
		stringseconds = '0' + stringseconds;
	}
	return `${stringminutes}:${stringseconds}`;
}
