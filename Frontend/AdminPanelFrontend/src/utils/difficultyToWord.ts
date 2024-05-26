export function difficultyToWord(difficulty: number): string {
	if (difficulty >= 7) {
		return 'hard';
	}
	if (difficulty >= 4) {
		return 'medium';
	}
	return 'easy';
}
