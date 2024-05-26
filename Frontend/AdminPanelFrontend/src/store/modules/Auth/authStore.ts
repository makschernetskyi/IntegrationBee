import { defineStore, StoreDefinition } from 'pinia';
import Cookie from 'js-cookie';
import { loginResolver } from './resolvers/loginResolver.ts';
import { getUserDataResolver } from './resolvers/getUserData.ts';
import { AuthState } from './types';

export const useAuthStore: StoreDefinition = defineStore('auth', {
	state: (): AuthState => ({
		user: {
			firstName: null,
			lastName: null,
			email: null,
			role: null,
			dateJoined: null,
		},
		requestsInfo: {
			getUserData: {
				state: null,
				statusCode: null,
			},
		},
	}),
	getters: {},
	actions: {
		getUserData: getUserDataResolver,
		login: loginResolver,
		logout: (): void => {
			Cookie.remove('access');
			Cookie.set('refresh', 'null');
		},
	},
});

export type AuthStore = ReturnType<typeof useAuthStore>;
