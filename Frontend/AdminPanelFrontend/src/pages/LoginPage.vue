<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore, AuthStore } from '@/store';
import { validateEmail } from '@/utils';

const authStore: AuthStore = useAuthStore();

const email: Ref = defineModel('email', { default: '' });
const password: Ref = defineModel('password', { default: '' });

const isPasswordSeen: Ref = ref(false);
const isEmailInvalid: Ref = ref(false);
const isPasswordInvalid: Ref = ref(false);

const router = useRouter();

const handleSubmit = (event: Event) => {
	event.preventDefault();
	if (!validateEmail(email.value) || !email.value.length) {
		isEmailInvalid.value = true;
		return;
	}

	isEmailInvalid.value = false;

	if (!password.value.length) {
		isPasswordInvalid.value = true;
		return;
	}

	isPasswordInvalid.value = false;

	authStore.login(email.value, password.value).then(async () => {
		await authStore.getUserData();
		await router.push('/');
	});
};
</script>
<template>
	<div class="flex h-full w-full items-center justify-center">
		<form
			@submit="handleSubmit"
			class="login-form-grid-cols grid h-max w-96 grid-rows-3 gap-4 p-4"
		>
			<InputText
				v-model="email"
				type="text"
				placeholder="email"
				:invalid="isEmailInvalid"
				class="col-span-3 col-start-1 h-8 !text-black"
			/>
			<InputText
				v-model="password"
				:type="isPasswordSeen ? 'text' : 'password'"
				placeholder="password"
				:invalid="isPasswordInvalid"
				class="col-span-2 col-start-1 h-8 !text-black"
			/>
			<Button
				type="button"
				@click="
					() => {
						isPasswordSeen ^= 1;
					}
				"
				class="col-span-1 col-start-3 h-8 w-8 !p-1 text-black"
			>
				<svg
					class="h-full w-full"
					v-if="!isPasswordSeen"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<svg
					class="h-full w-full"
					v-if="isPasswordSeen"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.60997 9.60714C8.05503 10.4549 7 12.1043 7 14C7 16.7614 9.23858 19 12 19C13.8966 19 15.5466 17.944 16.3941 16.3878M21 14C21 9.02944 16.9706 5 12 5C11.5582 5 11.1238 5.03184 10.699 5.09334M3 14C3 11.0069 4.46104 8.35513 6.70883 6.71886M3 3L21 21"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</Button>
			<Button
				type="submit"
				label="sign in"
				class="col-span-2 col-start-2 h-8"
			></Button>
		</form>
	</div>
</template>
<style scoped lang="postcss">
.login-form-grid-cols {
	grid-template-columns: 1fr 3rem 2rem;
}
</style>
