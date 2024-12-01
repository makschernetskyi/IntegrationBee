<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import "katex/dist/katex.min.css";
//@ts-expect-error not meant for ts
import katex from "katex";
import { cleanLatex } from "@/utils/cleanLatex";
import { calculateLatexFontSize } from "@/utils/calculateLatexFontSize";

const emit = defineEmits(["close"]);
const props = defineProps({
	integral: { type: String, required: true },
	author: { type: String },
	totalTime: { type: Number },
});

const defaultFontSize = 60;
const latexFontSize = ref(`text-[${defaultFontSize}px]`);

const formula = computed(() => {
	const f = cleanLatex(props.integral);
	latexFontSize.value = `text-[${calculateLatexFontSize(f, defaultFontSize)}px]`;
	return katex.renderToString(f, { throwOnError: false, displayMode: true });
});

const countDownStep = ref(3);
const isLoaded = ref(false);
let t: ReturnType<typeof setInterval> | null = null;
let mainTimer: ReturnType<typeof setInterval> | null = null;
const timeRemaining = ref(props.totalTime)
const paused = ref(false)


const setTimer = () =>{
	mainTimer = setInterval(()=>{
		if(timeRemaining.value){
			timeRemaining.value--
		}else{
			if(mainTimer){
				clearInterval(mainTimer);
			}
			paused.value=true
		}
	},1000)
	paused.value = false
}

const pause = () =>{
	if(mainTimer){
		clearInterval(mainTimer);
	}
	paused.value=true
}

onMounted(() => {
	t = setInterval(() => {
		if (countDownStep.value > 1) {
			countDownStep.value--;
		} else {
			if (t) clearInterval(t);
			isLoaded.value = true;
			setTimer()
		}
	}, 1000);
});
</script>

<template>
	<div
		class="fixed top-0 left-0 h-full w-full bg-black z-[100]"
	>
		<button
			@click="emit('close')"
			class="w-[5rem] aspect-square fixed right-[5rem] top-[5rem] fill-white"
		>
			<!-- SVG content -->
			<svg
				width="134"
				height="134"
				viewBox="0 0 134 134"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="w-full h-full"
			>
				<g clip-path="url(#clip0_286_9)">
					<rect
						x="-2.67847"
						y="6.51398"
						width="13"
						height="184.075"
						rx="6.5"
						transform="rotate(-45 -2.67847 6.51398)"
						fill="#F2F1F0"
					/>
					<rect
						x="127.482"
						y="-2.67841"
						width="13"
						height="184.075"
						rx="6.5"
						transform="rotate(45 127.482 -2.67841)"
						fill="#F2F1F0"
					/>
				</g>
				<defs>
					<clipPath id="clip0_286_9">
						<rect width="134" height="134" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</button>

		<Transition
			mode="out-in"
			enter-active-class="transition-opacity duration-500"
			leave-active-class="transition-opacity duration-500"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div :key="isLoaded ? 'content' : 'countdown'">
				<div v-if="!isLoaded" class="flex items-center justify-center h-full w-full">
					<Transition
						mode="out-in"
						enter-active-class="transition-all duration-300"
						leave-active-class="transition-all duration-300"
						enter-from-class="opacity-0 scale-50"
						enter-to-class="opacity-100 scale-100"
						leave-from-class="opacity-100 scale-100"
						leave-to-class="opacity-0 scale-50"
					>
						<div :key="countDownStep" class="font-heading text-heading text-white text-center mt-[50vh] -translate-y-[50%]">
							{{ countDownStep }}
						</div>
					</Transition>
				</div>
				<div v-else class="w-full">
					<div
						class="bg-white flex justify-center items-center text-black w-[70vw] h-[30rem] rounded-xl mx-auto mt-[10rem]"
						:class="latexFontSize"
					>
						<div v-html="formula"></div>
					</div>
					<div class="w-full h-[10rem] flex justify-center items-center mt-[3rem]">
						<div :class="`h-full w-[30rem] flex justify-end items-center text-title font-heading ${timeRemaining && timeRemaining > 10 ? 'text-white' : 'text-red'}`">
							<p>
								{{ timeRemaining && Math.floor(timeRemaining/60) + ':' + (timeRemaining%60 < 10 ? '0' : '') + timeRemaining%60 }}
							</p>
							<button v-if="!paused" @click="pause" class="h-[70%] aspect-square flex justify-center ml-[2rem]">
								<svg width="28" height="42" viewBox="0 0 28 42" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full">
									<rect x="16.8864" y="0.337891" width="10.8162" height="41.4622" rx="2.35135" fill="white"/>
									<rect x="0.662109" y="0.337891" width="10.8162" height="41.4622" rx="2.35135" fill="white"/>
								</svg>
							</button>
							<button v-else @click="setTimer" class="h-[70%] aspect-square flex justify-center ml-[2rem]">
								<svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full">
									<path d="M0.952706 1.36705C0.952706 0.597251 1.78604 0.116126 2.45271 0.501026L30.5477 16.7217C31.2144 17.1066 31.2144 18.0688 30.5477 18.4537L2.45271 34.6744C1.78604 35.0593 0.952707 34.5782 0.952707 33.8084L0.952706 1.36705Z" fill="white"/>
								</svg>
							</button>
							<button @click="()=>{pause(); timeRemaining = totalTime}" class="h-[70%] aspect-square flex justify-center -ml-[1rem]">
								<svg width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full">
									<path d="M40.0135 26.3365L35.8101 37.2872C35.5022 38.0894 34.7813 38.6598 33.9297 38.7748L16.4613 41.1346C15.6506 41.2441 14.8412 40.9243 14.3242 40.2903L3.25641 26.7162C2.72198 26.0607 2.58072 25.1687 2.88647 24.3802L9.29868 7.84342C9.59826 7.07082 10.2824 6.51295 11.0995 6.37497L28.659 3.40988C29.4542 3.27561 30.2627 3.55819 30.8011 4.15857L39.1584 13.478M39.1584 13.478L35.9826 2.51355M39.1584 13.478L29.2644 10.0007" stroke="white" stroke-width="4.7027" stroke-linecap="round"/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>
