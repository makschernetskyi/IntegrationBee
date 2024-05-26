import Cookie from 'js-cookie';
import { URLS } from '@/config';
import { noAuthApi as api } from '@/api';
import { isAxiosError } from 'axios';
import { useMessagesStore } from '@/store/modules/Messages';
import { useLoadingStore, LoadingStore } from '@/store';

/**
 * Attempts to log in a user with the provided email and password.
 * If successful, sets the access and refresh tokens in cookies.
 *
 * @param email - The email of the user attempting to log in.
 * @param password - The password of the user attempting to log in.
 * @returns A promise that resolves when the login process completes.
 */

export async function loginResolver(
	email: string,
	password: string
): Promise<void> {
	const requestData: FormData = new FormData();
	requestData.append('email', email);
	requestData.append('password', password);

	const messagesStore = useMessagesStore();
	const loadingStore: LoadingStore = useLoadingStore();

	try {
		loadingStore.setLoading('login', true);

		const { data: responseData } = await api.post(URLS.login, requestData);
		Cookie.set('access', responseData.access);
		Cookie.set('refresh', responseData.refresh);
	} catch (error: unknown) {
		let errorMessage = 'Login failed: Unknown error';

		if (isAxiosError(error)) {
			if (error.response) {
				errorMessage = `Login failed: ${error.response.data.message || 'Unknown error'}`;
			} else if (error.request) {
				errorMessage = 'Login failed: No response from server';
			} else {
				errorMessage = `Login failed: ${error.message}`;
			}
		} else if (error instanceof Error) {
			errorMessage = `Login failed: ${error.message}`;
		}

		messagesStore.addMessage({
			text: errorMessage,
			meta: { type: 'error' },
		});
	} finally {
		loadingStore.setLoading('login', false);
	}
}
