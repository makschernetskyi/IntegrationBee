import { defineStore } from 'pinia';
import { Integral, IntegralsState, Series, Solution } from './types.ts';
import { api } from '@/api';
import { URLS } from '@/config';
import { isAxiosError } from 'axios';
import { MessagesStore, useMessagesStore } from '@/store/modules/Messages';
import { difficultyToWord } from '@/utils';
import { DoublyLinkedList } from 'data-structure-typed';

const useIntegralsStore = defineStore('integrals', {
	state: (): IntegralsState => ({
		series: [],
		currentSeriesDetails: {
			id: null,
			name: null,
			timePerIntegral: null,
			integrals: new DoublyLinkedList<Integral>(),
		},
		menuState: {
			chosenSeriesId: null,
		},
		presentationState: {
			isPresenting: false,
			currentIntegral: null,
			timer: {
				timeLeft: null,
			},
		},
	}),
	getters: {},
	actions: {
		async fetchIntegralsSeries(): Promise<void> {
			const messagesStore: MessagesStore = useMessagesStore();

			try {
				const { data: responseData } = await api.get(URLS.integralsSeriesList);
				this.series = responseData.map(
					(item: {
						pk: number;
						name: string;
						time_per_integral: number;
					}): Series => ({
						id: item.pk,
						name: item.name,
						timePerIntegral: item.time_per_integral,
					})
				);
			} catch (error: unknown) {
				let errorMessage = 'Failed to fetch integral series: Unknown error';

				if (isAxiosError(error)) {
					if (error.response) {
						errorMessage = `Failed to fetch integral series: ${error.response.data.message || 'Unknown error'}`;
					} else if (error.request) {
						errorMessage =
							'Failed to fetch integral series: No response from server';
					} else {
						errorMessage = `Failed to fetch integral series: ${error.message}`;
					}
				} else if (error instanceof Error) {
					errorMessage = `Failed to fetch integral series: ${error.message}`;
				}

				messagesStore.addMessage({
					text: errorMessage,
					meta: { type: 'error' },
				});
			}
		},
		async fetchIntegralSeriesDetails(id: number) {
			const messagesStore = useMessagesStore();

			// resetting the details
			this.currentSeriesDetails = {
				id: null,
				name: null,
				timePerIntegral: null,
				integrals: new DoublyLinkedList<Integral>(),
			};

			try {
				const { data: responseData } = await api.get(
					URLS.integralsSeriesDetails + id + '/'
				);
				this.currentSeriesDetails.id = responseData.id;
				this.currentSeriesDetails.name = responseData.name;
				this.currentSeriesDetails.timePerIntegral =
					responseData.time_per_integral;
				responseData.integrals
					.map(
						(item: any): Integral => ({
							id: item.id,
							name: item.name,
							position: item.position,
							integral: item.integral,
							solution: item.solution
								? {
										solution: item.solution.solution,
									}
								: null,
							difficulty: item.difficulty,
							difficultyWord: difficultyToWord(item.difficulty),
							author: item.author,
						})
					)
					.sort(
						(integral1: Integral, integral2: Integral) =>
							integral1.position - integral2.position
					)
					.forEach((integral: Integral) => {
						this.currentSeriesDetails.integrals.push(integral);
					});
			} catch (error: unknown) {
				let errorMessage =
					'Failed to fetch integral series details: Unknown error';

				if (isAxiosError(error)) {
					if (error.response) {
						errorMessage = `Failed to fetch integral series details: ${error.response.data.message || 'Unknown error'}`;
					} else if (error.request) {
						errorMessage =
							'Failed to fetch integral series details: No response from server';
					} else {
						errorMessage = `Failed to fetch integral series details: ${error.message}`;
					}
				} else if (error instanceof Error) {
					errorMessage = `Failed to fetch integral series details: ${error.message}`;
				}

				messagesStore.addMessage({
					text: errorMessage,
					meta: { type: 'error' },
				});
			}
		},
		async addIntegralSeries(newSeries: {
			name: string;
			timePerIntegral: number;
		}) {
			const messagesStore = useMessagesStore();

			const formData = new FormData();
			formData.append('name', newSeries.name);
			formData.append(
				'time_per_integral',
				newSeries.timePerIntegral.toString()
			);

			try {
				const { data: responseData } = await api.post(
					URLS.integralsSeriesDetails,
					formData
				);
				this.series.push({
					id: responseData.pk,
					name: responseData.name,
					timePerIntegral: responseData.time_per_integral,
				});
				messagesStore.addMessage({
					text: 'Integral series added successfully.',
					meta: { type: 'success' },
				});
			} catch (error: unknown) {
				let errorMessage = 'Failed to add integral series: Unknown error';

				if (isAxiosError(error)) {
					if (error.response) {
						errorMessage = `Failed to add integral series: ${error.response.data.message || 'Unknown error'}`;
					} else if (error.request) {
						errorMessage =
							'Failed to add integral series: No response from server';
					} else {
						errorMessage = `Failed to add integral series: ${error.message}`;
					}
				} else if (error instanceof Error) {
					errorMessage = `Failed to add integral series: ${error.message}`;
				}

				messagesStore.addMessage({
					text: errorMessage,
					meta: { type: 'error' },
				});
			}
		},
		async updateIntegralSeries(
			id: number,
			updatedSeries: { name: string; timePerIntegral: number }
		) {
			const messagesStore = useMessagesStore();

			const formData = new FormData();
			formData.append('name', updatedSeries.name);
			formData.append(
				'time_per_integral',
				updatedSeries.timePerIntegral.toString()
			);

			try {
				await api.patch(URLS.integralsSeriesDetails + id + '/', formData);
				const index = this.series.findIndex((series) => series.id === id);
				if (index !== -1) {
					this.series[index] = { ...this.series[index], ...updatedSeries };
				}
				messagesStore.addMessage({
					text: 'Integral series updated successfully.',
					meta: { type: 'success' },
				});
			} catch (error: unknown) {
				let errorMessage = 'Failed to update integral series: Unknown error';

				if (isAxiosError(error)) {
					if (error.response) {
						errorMessage = `Failed to update integral series: ${error.response.data.message || 'Unknown error'}`;
					} else if (error.request) {
						errorMessage =
							'Failed to update integral series: No response from server';
					} else {
						errorMessage = `Failed to update integral series: ${error.message}`;
					}
				} else if (error instanceof Error) {
					errorMessage = `Failed to update integral series: ${error.message}`;
				}

				messagesStore.addMessage({
					text: errorMessage,
					meta: { type: 'error' },
				});
			}
		},
		async deleteIntegralSeries(id: number) {
			const messagesStore = useMessagesStore();

			try {
				await api.delete(URLS.integralsSeriesDetails + id + '/');
				this.series = this.series.filter((series) => series.id !== id);
				messagesStore.addMessage({
					text: 'Integral series deleted successfully.',
					meta: { type: 'success' },
				});
			} catch (error: unknown) {
				let errorMessage = 'Failed to delete integral series: Unknown error';

				if (isAxiosError(error)) {
					if (error.response) {
						errorMessage = `Failed to delete integral series: ${error.response.data.message || 'Unknown error'}`;
					} else if (error.request) {
						errorMessage =
							'Failed to delete integral series: No response from server';
					} else {
						errorMessage = `Failed to delete integral series: ${error.message}`;
					}
				} else if (error instanceof Error) {
					errorMessage = `Failed to delete integral series: ${error.message}`;
				}

				messagesStore.addMessage({
					text: errorMessage,
					meta: { type: 'error' },
				});
			}
		},
		async addIntegral(
			seriesId: number,
			newIntegral: {
				name: string;
				position: number;
				integral: string;
				difficulty: number;
				author: string;
			}
		) {
			const messagesStore = useMessagesStore();

			const formData = new FormData();
			formData.append('name', newIntegral.name);
			formData.append('position', newIntegral.position.toString());
			formData.append('integral', newIntegral.integral);
			formData.append('difficulty', newIntegral.difficulty.toString());
			formData.append('author', newIntegral.author);

			try {
				const { data: responseData } = await api.post(
					`${URLS.integralsSeriesDetails}${seriesId}/integrals/`,
					formData
				);
				if (
					this.currentSeriesDetails &&
					this.currentSeriesDetails.id === seriesId
				) {
					this.currentSeriesDetails.integrals.push({
						id: responseData.pk,
						name: responseData.name,
						position: responseData.position,
						integral: responseData.integral,
						solution: responseData.solution
							? {
									solution: responseData.solution.solution,
								}
							: null,
						difficulty: responseData.difficulty,
						difficultyWord: difficultyToWord(responseData.difficulty),
						author: responseData.author,
					});
				}
				messagesStore.addMessage({
					text: 'Integral added successfully.',
					meta: { type: 'success' },
				});
			} catch (error: unknown) {
				let errorMessage = 'Failed to add integral: Unknown error';

				if (isAxiosError(error)) {
					if (error.response) {
						errorMessage = `Failed to add integral: ${error.response.data.message || 'Unknown error'}`;
					} else if (error.request) {
						errorMessage = 'Failed to add integral: No response from server';
					} else {
						errorMessage = `Failed to add integral: ${error.message}`;
					}
				} else if (error instanceof Error) {
					errorMessage = `Failed to add integral: ${error.message}`;
				}

				messagesStore.addMessage({
					text: errorMessage,
					meta: { type: 'error' },
				});
			}
		},
		async updateIntegral(
			seriesId: number,
			integralId: number,
			updatedIntegral: Integral
		) {
			const messagesStore = useMessagesStore();

			const formData = new FormData();
			formData.append('name', updatedIntegral.name);
			formData.append('position', updatedIntegral.position.toString());
			formData.append('integral', updatedIntegral.integral);
			formData.append('difficulty', updatedIntegral.difficulty.toString());
			formData.append('author', updatedIntegral.author);
			if (updatedIntegral.solution) {
				formData.append('solution', updatedIntegral.solution.solution);
			}

			try {
				await api.patch(
					`${URLS.integralsSeriesDetails}${seriesId}/integrals/${integralId}/`,
					formData
				);
				messagesStore.addMessage({
					text: 'Integral updated successfully.',
					meta: { type: 'success' },
				});
			} catch (error: unknown) {
				let errorMessage = 'Failed to update integral: Unknown error';

				if (isAxiosError(error)) {
					if (error.response) {
						errorMessage = `Failed to update integral: ${error.response.data.message || 'Unknown error'}`;
					} else if (error.request) {
						errorMessage = 'Failed to update integral: No response from server';
					} else {
						errorMessage = `Failed to update integral: ${error.message}`;
					}
				} else if (error instanceof Error) {
					errorMessage = `Failed to update integral: ${error.message}`;
				}

				messagesStore.addMessage({
					text: errorMessage,
					meta: { type: 'error' },
				});
			}
		},
		async deleteIntegral(seriesId: number, integralId: number) {
			const messagesStore = useMessagesStore();

			try {
				await api.delete(
					`${URLS.integralsSeriesDetails}${seriesId}/integrals/${integralId}/`
				);
				if (
					this.currentSeriesDetails &&
					this.currentSeriesDetails.id === seriesId
				) {
					this.currentSeriesDetails.integrals =
						this.currentSeriesDetails.integrals.filter(
							(integral) => integral.id !== integralId
						);
				}
				messagesStore.addMessage({
					text: 'Integral deleted successfully.',
					meta: { type: 'success' },
				});
			} catch (error: unknown) {
				let errorMessage = 'Failed to delete integral: Unknown error';

				if (isAxiosError(error)) {
					if (error.response) {
						errorMessage = `Failed to delete integral: ${error.response.data.message || 'Unknown error'}`;
					} else if (error.request) {
						errorMessage = 'Failed to delete integral: No response from server';
					} else {
						errorMessage = `Failed to delete integral: ${error.message}`;
					}
				} else if (error instanceof Error) {
					errorMessage = `Failed to delete integral: ${error.message}`;
				}

				messagesStore.addMessage({
					text: errorMessage,
					meta: { type: 'error' },
				});
			}
		},
	},
});

export { useIntegralsStore };
export type IntegralsStore = ReturnType<typeof useIntegralsStore>;
