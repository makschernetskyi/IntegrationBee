import { defineStore, StoreDefinition } from 'pinia';

type Message = {
	text: string;
	meta: {
		type: 'info' | 'warn' | 'error';
		[key: string]: any;
	};
};

interface MessagesState {
	messages: Message[];
}

export const useMessagesStore: StoreDefinition = defineStore('messages', {
	state: (): MessagesState => ({
		messages: [],
	}),
	getters: {
		lastMessage(state: MessagesState): Message | undefined {
			return state.messages.at(-1);
		},
	},
	actions: {
		addMessage(msg: Message) {
			this.messages.push(msg);
		},
		popMessage() {
			this.messages.pop();
		},
	},
});

export type MessagesStore = ReturnType<typeof useMessagesStore>;
