interface AuthState {
	user: {
		firstName: string | null;
		lastName: string | null;
		email: string | null;
		role: string | null;
		dateJoined: string | null;
	};
	requestsInfo: {
		[key: string]: {
			state: 'resolved' | 'pending' | 'rejected' | null;
			statusCode: number | null;
		};
	};
}

export type { AuthState };
