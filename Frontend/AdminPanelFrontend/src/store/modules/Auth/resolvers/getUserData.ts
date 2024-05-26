import { isAxiosError } from 'axios';
import { URLS } from '@/config';
import { api } from '@/api';
import { AuthState } from '../types';
import { useMessagesStore } from '@/store';
import { useLoadingStore, LoadingStore } from '@/store';

/**
 * Fetches user data and updates the AuthState with the received information.
 * If an error occurs, it logs the error using the message store, except for 401 errors.
 *
 * @param this - The AuthState context.
 * @returns A promise that resolves when the user data fetch completes.
 */
export async function getUserDataResolver(this: AuthState): Promise<void> {
	const messagesStore = useMessagesStore();
	const loadingStore: LoadingStore = useLoadingStore();

	this.requestsInfo.getUserData.state = 'pending';

	try {
		loadingStore.setLoading('userData', true);
		const { data: responseData, status } = await api.get(URLS.userData);
		this.user.email = responseData.email;
		this.user.firstName = responseData.first_name;
		this.user.lastName = responseData.last_name;
		this.user.role = responseData.role;
		this.user.dateJoined = responseData.date_joined;

		//requestInfo
		this.requestsInfo.getUserData.state = 'resolved';
		this.requestsInfo.getUserData.statusCode = status;
	} catch (error: unknown) {
		let errorMessage = 'Failed to fetch user data: Unknown error';

		if (isAxiosError(error)) {
			if (error.response) {
				this.requestsInfo.getUserData.state = 'rejected';
				this.requestsInfo.getUserData.statusCode = error.response.status;

				if (error.response.status === 401) {
					return;
				}
				errorMessage = `Failed to fetch user data: ${error.response.data.message || 'Unknown error'}`;
			} else if (error.request) {
				errorMessage = 'Failed to fetch user data: No response from server';
			} else {
				errorMessage = `Failed to fetch user data: ${error.message}`;
			}
		} else if (error instanceof Error) {
			errorMessage = `Failed to fetch user data: ${error.message}`;
		}

		messagesStore.addMessage({
			text: errorMessage,
			meta: { type: 'error' },
		});
	} finally {
		loadingStore.setLoading('userData', false);
	}
}
