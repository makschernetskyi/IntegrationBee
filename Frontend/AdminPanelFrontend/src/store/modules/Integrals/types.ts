import { DoublyLinkedList, DoublyLinkedListNode } from 'data-structure-typed';

interface Series {
	name: string;
	timePerIntegral?: number;
	id: number;
}

interface Solution {
	solution: string;
}

interface Integral {
	id: number;
	name: string;
	position: number;
	integral: string;
	series?: any;
	solution: Solution | null;
	difficulty: number;
	difficultyWord: string;
	author: string;
}

interface MenuState {
	chosenSeriesId: number | null;
}

interface PresentationState {
	isPresenting: boolean;
	currentIntegral: DoublyLinkedListNode<Integral> | null;
	timer: {
		timeLeft: number | null;
	};
}

interface IntegralsState {
	series: Series[];
	currentSeriesDetails: {
		id: number | null;
		name: string | null;
		timePerIntegral: number | null;
		integrals: DoublyLinkedList<Integral>;
	};
	menuState: MenuState;
	presentationState: PresentationState;
}

export type { Solution, Integral, IntegralsState, Series };
