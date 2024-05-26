<script setup lang="ts">
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useIntegralsStore } from '@/store';
import { useRoute } from 'vue-router';
import { computed } from '@vue/runtime-dom';
import { DoublyLinkedListNode } from 'data-structure-typed';
import { Integral } from '@/store/modules/Integrals/types.js';
import { secondsToTimerTime } from '@/utils';

const integralsStore = useIntegralsStore();
const route = useRoute();

const currentSeriesDetails = computed(
	() => integralsStore.currentSeriesDetails
);
const presentationState = computed(() => integralsStore.presentationState);

onMounted(async () => {
	await integralsStore.fetchIntegralSeriesDetails(Number(route.params.id));
	integralsStore.presentationState.currentIntegral =
		integralsStore.currentSeriesDetails.integrals.head || null;
	integralsStore.presentationState.timer.timeLeft =
		integralsStore.currentSeriesDetails.timePerIntegral;
});

//transition logic

const transitionName = ref('fade');

function nextIntegral() {
	if (integralsStore.presentationState.currentIntegral?.next) {
		transitionName.value = 'slide-left';
		integralsStore.presentationState.currentIntegral =
			integralsStore.presentationState.currentIntegral?.next || null;
		restartTimer();
		stopTimer();
	}
}
function prevIntegral() {
	if (integralsStore.presentationState.currentIntegral?.prev) {
		transitionName.value = 'slide-right';
		integralsStore.presentationState.currentIntegral =
			integralsStore.presentationState.currentIntegral?.prev || null;
		restartTimer();
		stopTimer();
	}
}

// show integral logic
const isIntegralVisible = ref(false);
const setIsIntegralVisible = (newValue: boolean) => {
	if (integralsStore.presentationState.currentIntegral?.value.integral) {
		isIntegralVisible.value = newValue;
	}
};

//timer logic

const isTimerOn = ref(false);
let countDown = ref();
const runTimer = () => {
	isTimerOn.value = true;
	countDown.value = setInterval(() => {
		if (
			integralsStore.presentationState.timer.timeLeft == null ||
			integralsStore.presentationState.timer.timeLeft <= 0
		) {
			isTimerOn.value = false;
			clearInterval(countDown.value);
			return;
		}
		integralsStore.presentationState.timer.timeLeft =
			integralsStore.presentationState.timer.timeLeft - 1;
	}, 1000);
};

function stopTimer() {
	isTimerOn.value = false;
	if (typeof countDown.value === 'number') {
		clearInterval(countDown.value);
	}
}

function restartTimer() {
	integralsStore.presentationState.timer.timeLeft =
		integralsStore.currentSeriesDetails.timePerIntegral;
}

//solution logic

const isSolutionSeen = ref(false);
const setIsSolutionSeen = (newValue: boolean) => {
	isSolutionSeen.value = newValue;
};

const toast = useToast();

const showSolution = () => {
	if (
		integralsStore.presentationState.currentIntegral?.value.solution?.solution
	) {
		setIsSolutionSeen(true);
	} else {
		toast.add({
			severity: 'contrast',
			summary: 'Solution not provided',
			detail: 'Solution to this integral was not provided.',
			life: 3000,
		});
	}
};
</script>
<template>
	<div
		class="flex h-full w-full flex-row place-content-between items-center p-32"
	>
		<button
			@click="prevIntegral"
			class="h-12 w-12 rounded-full border-0 bg-transparent outline-0"
		>
			<svg
				class="h-full w-full stroke-surface-600 hover:stroke-primary-600"
				width="800px"
				height="800px"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M11 9L8 12M8 12L11 15M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<transition :name="transitionName" mode="out-in">
			<div
				:key="presentationState.currentIntegral?.value.id || 1"
				class="flex h-max w-max flex-col items-center gap-4"
			>
				<h1 class="text-3xl">
					{{ presentationState.currentIntegral?.value.name }}
				</h1>
				<Button
					@click="
						() => {
							setIsIntegralVisible(true);
						}
					"
					class="h-[4rem] w-[9rem] text-3xl"
					raised
					>SHOW</Button
				>
				<Button @click="showSolution" class="text-lg" severity="secondary" text
					>see solution</Button
				>
			</div>
		</transition>
		<button
			@click="nextIntegral"
			class="h-12 w-12 rounded-full border-0 bg-transparent outline-0"
		>
			<svg
				class="h-full w-full stroke-surface-600 hover:stroke-primary-600"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
	<div
		v-if="isIntegralVisible"
		class="absolute left-0 top-0 z-10 flex h-full w-full flex-col bg-black"
	>
		<div class="absolute right-[2rem] top-[2rem] z-20 h-8 w-8 rounded-full">
			<button
				@click="
					() => {
						setIsIntegralVisible(false);
					}
				"
				class="h-full w-full rounded-full border-0 bg-transparent outline-0"
				type="button"
				aria-label="Cancel"
			>
				<svg
					class="h-full w-full fill-surface-50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
					<path
						d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
					/>
				</svg>
			</button>
		</div>
		<div class="flex h-[30%] w-full flex-row items-end justify-center">
			<div class="flex w-max flex-row items-center gap-4">
				<div class="text-5xl text-surface-50">
					<template v-if="presentationState.timer.timeLeft !== null">
						{{ secondsToTimerTime(presentationState.timer.timeLeft) }}
					</template>
				</div>
				<button
					@click="() => (isTimerOn ? stopTimer() : runTimer())"
					class="h-8 w-8 border-0 bg-transparent outline-0"
				>
					<svg
						v-if="!isTimerOn"
						class="h-full w-full fill-surface-50"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 384 512"
					>
						<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
						<path
							d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
						/>
					</svg>
					<svg
						v-else
						class="h-full w-full fill-surface-50"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 320 512"
					>
						<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
						<path
							d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
						/>
					</svg>
				</button>
				<button
					@click="restartTimer"
					class="h-8 w-8 border-0 bg-transparent outline-0"
				>
					<svg
						class="h-full w-full fill-surface-50"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
						<path
							d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96H320v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32V64H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192V352c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448H352c88.4 0 160-71.6 160-160z"
						/>
					</svg>
				</button>
			</div>
		</div>
		<div class="flex h-[70%] w-full flex-row items-center justify-center">
			<div
				class="flex h-[45%] min-h-[20rem] w-[60%] min-w-[50rem] items-center justify-center bg-white"
			>
				<div class="text-5xl" v-katex>
					{{ presentationState.currentIntegral?.value.integral }}
				</div>
			</div>
		</div>
	</div>
	<div
		v-if="isSolutionSeen"
		class="absolute left-0 top-0 z-10 flex h-full w-full flex-col bg-black"
	>
		<div class="absolute right-[2rem] top-[2rem] z-20 h-8 w-8 rounded-full">
			<button
				@click="
					() => {
						setIsSolutionSeen(false);
					}
				"
				class="h-full w-full rounded-full border-0 bg-transparent outline-0"
				type="button"
				aria-label="Cancel"
			>
				<svg
					class="h-full w-full fill-surface-50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
					<path
						d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
					/>
				</svg>
			</button>
		</div>
		<div class="flex h-full w-full flex-row items-center justify-center">
			<div
				class="flex h-[40%] min-h-[20rem] w-[60%] min-w-[50rem] items-center justify-center bg-white"
			>
				<div class="text-5xl" v-katex>
					{{ presentationState.currentIntegral?.value.solution?.solution }}
				</div>
			</div>
		</div>
	</div>
	<Toast />
</template>

<style scoped lang="postcss">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
	transition:
		transform 0.5s,
		opacity 0.5s;
}

.slide-left-enter,
.slide-right-leave-to {
	transform: translateX(100%);
	opacity: 0;
}

.slide-left-leave-to,
.slide-right-enter {
	transform: translateX(-100%);
	opacity: 0;
}

.slide-right-enter,
.slide-left-leave-to {
	transform: translateX(-100%);
	opacity: 0;
}

.slide-right-leave-to,
.slide-left-enter {
	transform: translateX(100%);
	opacity: 0;
}
</style>
