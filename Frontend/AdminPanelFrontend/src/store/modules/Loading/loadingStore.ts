import { defineStore, StoreDefinition } from 'pinia';

interface LoadingState {
	requests: {
		[key: string]: { loading: boolean };
	};
}

export const useLoadingStore: StoreDefinition = defineStore('loading', {
	state: (): LoadingState => ({
		requests: {},
	}),
	getters: {
		isLoading(state: LoadingState) {
			return Object.values(state.requests).some((value) => value.loading);
		},
	},
	actions: {
		setLoading(requestName: string, loading: boolean) {
			this.requests[requestName] = { loading };
		},
	},
});

export type LoadingStore = ReturnType<typeof useLoadingStore>;
