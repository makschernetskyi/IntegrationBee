<script setup lang="ts">
import FullScreenIntegral from '@/components/FullScreenIntegral.vue';
import FullScreenSolution from '@/components/FullScreenSolution.vue';
import { usePresentingStore } from '@/stores/presentingStore/presentingStore';
import { useToastStore } from '@/stores/toastStore/toastStore';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute()

const presentingStore = usePresentingStore()
const {currentSeriesName, series, timePerIntegral, tieBreakers, currentIntegralIndex, currentTieBreakerIndex} = storeToRefs(presentingStore)

onMounted(async()=>{
	await presentingStore.fetchSeries(route.params.competition as string, route.params.series as string)
	await presentingStore.fetchTieBreakers(route.params.competition as string)
})

onUnmounted(()=>{
	presentingStore.$reset()
})

const currentIntegral = computed(()=>series.value[currentIntegralIndex.value])


const timePerIntegralModel = computed({
	get: ()=>timePerIntegral.value,
	set: (value)=>{presentingStore.timePerIntegral = Number(value)}
})

const currentTieBreakerModel = computed({
	get: ()=>currentTieBreakerIndex.value,
	set: (value)=>{
		if(!Number(value) || Number(value)>=tieBreakers.value.length){
			useToastStore().addToast({
				type: "error",
				title: "Tie-breaker doesn't exist",
				message: `Tie breaker nr ${value} doesn't exist. the number should be between 0 and ${tieBreakers.value.length-1}`
			})
		}
		presentingStore.currentTieBreakerIndex = Number(value)
	}
})



const rightTransitionClasses = ['translate-x-[150%]', 'translate-x-0', 'translate-x-0', '-translate-x-[150%]']
const leftTransitionClasses = ['-translate-x-[150%]', 'translate-x-0', 'translate-x-0', 'translate-x-[150%]']

const transitionClasses = ref(rightTransitionClasses)
const isIntegralShown = ref(false)
const isSolutionShown = ref(false)


const showNextIntegral = () =>{
	transitionClasses.value = rightTransitionClasses
	if(presentingStore.currentIntegralIndex<presentingStore.series.length-1)
		presentingStore.currentIntegralIndex++
}

const showPrevIntegral = () =>{
	transitionClasses.value = leftTransitionClasses
	if(presentingStore.currentIntegralIndex)
		presentingStore.currentIntegralIndex--
}

</script>
<template>
	<div
	class="px-[2rem] xl:px-[12rem] 2xl:px-[calc(50vw-65rem)] bg-pearl-white h-screen flex flex-col text-screenBlack font-body text-body overflow-x-hidden"
	>
	<header class="fixed top-0 left-0 z-[20] py-[4rem] flex items-center justify-start px-[2rem] xl:px-[12rem] 2xl:px-[calc(50vw-65rem)]">
		<div
		class="w-max flex justify-start items-center bg-white p-6 rounded-xl"
		>
		<RouterLink
			to="/presenting"
			class="flex justify-center items-center h-full aspect-square stroke-screenBlack hover:stroke-primary"
		>
			<svg
			width="41"
			height="41"
			viewBox="0 0 41 41"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-full h-full"
			>
			<path
				d="M8.54098 21.5V39H33.1311V21.5M2.5 18L20.5 2.5L39 18"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			</svg>
		</RouterLink>
		</div>
	</header>
	<main v-if="currentIntegral" class="relative flex flex-col justify-center flex-1 w-full">
		<div class="w-full h-[10rem] flex justify-center items-center">
		<div class="flex gap-[2rem] items-center">
			<div
			class="h-full aspect-square flex justify-center items-center"
			>
			<svg
				width="50"
				height="54"
				viewBox="0 0 50 54"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="h-full"
			>
				<circle
				cx="24.9193"
				cy="28.9193"
				r="22.3826"
				stroke="#242424"
				stroke-width="5.0734"
				/>
				<path
				d="M24.9189 15.3268V29.8253L31.7151 37.0746"
				stroke="#242424"
				stroke-width="6.37371"
				/>
				<rect
				x="2"
				y="9.36597"
				width="11"
				height="8"
				rx="3"
				transform="rotate(-35.3609 2 9.36597)"
				fill="#242424"
				/>
				<rect
				width="11"
				height="9.81894"
				rx="3"
				transform="matrix(-0.815523 -0.578725 -0.578725 0.815523 46.6533 6.88257)"
				fill="#242424"
				/>
			</svg>
			</div>
			<input
				type="text"
				class="bg-white font-semibold text-subtitle w-[15rem] px-[2rem] py-[1rem] text-center rounded-xl outline-none"
				v-model="timePerIntegralModel"
				placeholder="sec."
			/>
		</div>
		</div>
		<!-- Adjusted flex container -->
		<div class="flex px-[16rem] mt-[5rem]">
		<!-- Inner wrapper to hold the transitioning content -->
		<Transition
			:enter-from-class="transitionClasses[0]"
			enter-active-class="transition-transform duration-200"
			:enter-to-class="transitionClasses[1]"
			:leave-from-class="transitionClasses[2]"
			leave-active-class="transition-transform duration-200"
			:leave-to-class="transitionClasses[3]"
			mode="out-in"
		>
			<div
			:key="currentIntegral"
			class="flex w-full gap-[4rem]"
			>
			<div class="flex flex-col w-max">
				<h1 class="font-heading text-heading text-primary">
					{{ currentIntegral.isTieBreaker ? 'Tie-breaker' : currentSeriesName }}
				</h1>
				<div
				class="flex justify-start items-center gap-[2rem]"
				>
				<h2 class="font-heading text-heading text-nowrap">
					Integral {{ currentIntegralIndex + 1 }}.
				</h2>
				<div
					class="aspect-square h-full flex justify-center items-start"
				>
					<svg
					width="93"
					height="86"
					viewBox="0 0 93 86"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="h-[80%]"
					>
					<rect
						x="7.50806"
						y="42.3372"
						width="61.3789"
						height="42.746"
						rx="5.48026"
						fill="#242424"
					/>
					<path
						d="M75.4629 57.2213C75.4629 56.4827 75.8348 55.7938 76.4523 55.3886L89.6049 46.7571C91.0627 45.8005 92.9997 46.8462 92.9997 48.5898V81.1281C92.9997 82.8499 91.1058 83.8995 89.6458 82.987L76.4932 74.7666C75.8523 74.366 75.4629 73.6635 75.4629 72.9077V57.2213Z"
						fill="#242424"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M53.9941 38.3618C64.5875 38.3618 73.175 29.7742 73.175 19.1809C73.175 8.58758 64.5875 0 53.9941 0C43.4008 0 34.8132 8.58758 34.8132 19.1809C34.8132 29.7742 43.4008 38.3618 53.9941 38.3618ZM58.2602 13.4779C57.3474 12.3784 55.9173 11.8494 54.5087 12.0901L51.5845 12.59C50.1759 12.8308 49.0027 13.8047 48.5069 15.145L47.4777 17.9274C46.9819 19.2677 47.2388 20.7707 48.1516 21.8702L50.0466 24.1527C50.9594 25.2522 52.3895 25.7812 53.7982 25.5404L56.7223 25.0406C58.131 24.7998 59.3041 23.8258 59.7999 22.4855L60.8292 19.7032C61.3249 18.3629 61.068 16.8599 60.1552 15.7604L58.2602 13.4779Z"
						fill="#242424"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M13.7006 37.9004C21.2673 37.9004 27.4013 31.7665 27.4013 24.1998C27.4013 16.6331 21.2673 10.4991 13.7006 10.4991C6.13399 10.4991 0 16.6331 0 24.1998C0 31.7665 6.13399 37.9004 13.7006 37.9004ZM16.7093 20.2401C16.1099 19.5182 15.171 19.1709 14.2462 19.3291L11.7386 19.7578C10.8137 19.916 10.0435 20.5555 9.71806 21.4355L8.83558 23.8215C8.51011 24.7015 8.67884 25.6883 9.2782 26.4101L10.9033 28.3674C11.5027 29.0892 12.4416 29.4365 13.3664 29.2784L15.874 28.8496C16.7989 28.6915 17.5691 28.052 17.8945 27.172L18.777 24.7859C19.1025 23.906 18.9338 22.9192 18.3344 22.1973L16.7093 20.2401Z"
						fill="#242424"
					/>
					</svg>
				</div>
				</div>
			</div>
			<div
				class="flex-1 h-full flex flex-col justify-between pt-[1rem] pb-[2rem]"
			>
				<button
				@click="()=>{isIntegralShown = true}"
				class="font-heading text-title px-[4rem] pt-[0.6rem] pb-[0.4rem] bg-primary rounded-[20px]"
				>
					Present
				</button>
				<button
				@click="()=>{isSolutionShown = true}"
				class="overflow-hidden rounded-[20px] font-heading text-title px-[4rem] pt-[0.6rem] pb-[0.4rem] relative bg-primary border-primary border-4 text-screenBlack after:absolute after:w-full after:h-full after:top-0 after:left-0 after:hidden lg:after:flex after:bg-pearl-white lg:hover:after:scale-y-0 after:transition-transform after:duration-200 after:will-change-transform after:origin-top"
				>
					<span class="relative z-[2]">Solution</span>
				</button>
			</div>
			</div>
		</Transition>
		</div>
		<div class="w-full flex justify-center items-center mt-[5rem] gap-[2rem]">
			<button
				@click="()=>{presentingStore.addCurrentTieBreaker()}"
				class="overflow-hidden rounded-[20px] font-heading text-title px-[4rem] pt-[0.6rem] pb-[0.4rem] relative bg-red border-red border-4 text-screenBlack after:absolute after:w-full after:h-full after:top-0 after:left-0 after:hidden lg:after:flex after:bg-pearl-white lg:hover:after:scale-y-0 after:transition-transform after:duration-200 after:will-change-transform after:origin-top"
				>
					<span class="relative z-[2]">Introduce a Tie Breaker</span>
			</button>
			<p class="font-heading text-title ml-[4rem]">Nr.</p>
			<input
				type="text"
				class="bg-white font-semibold text-subtitle w-[10rem] px-[2rem] py-[1rem] text-center rounded-xl outline-none"
				v-model="currentTieBreakerModel"
				placeholder="nr"
			/>
		</div>
		<!-- Navigation buttons -->
		<button
		v-if="presentingStore.currentIntegralIndex > 0"
		@click="showPrevIntegral"
		class="absolute left-0 top-[50%] -translate-y-[50%] cursor-pointer h-[8rem] transition-transform will-change-transform hover:scale-[1.1]"
		>
		<svg
			width="47"
			height="83"
			viewBox="0 0 47 83"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="-scale-x-[100%] h-full"
		>
			<path
			d="M19.319 0H0L26.5276 40.7869L0 83H19.319L47 40.7869L19.319 0Z"
			fill="#FBC151"
			/>
		</svg>
		</button>
		<button
		v-if="presentingStore.currentIntegralIndex < presentingStore.series.length - 1"
		@click="showNextIntegral"
		class="absolute right-0 top-[50%] -translate-y-[50%] cursor-pointer h-[8rem] transition-transform will-change-transform hover:scale-[1.1]"
		>
		<svg
			width="47"
			height="83"
			viewBox="0 0 47 83"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="h-full"
		>
			<path
			d="M19.319 0H0L26.5276 40.7869L0 83H19.319L47 40.7869L19.319 0Z"
			fill="#FBC151"
			/>
		</svg>
		</button>
	</main>
	<FullScreenIntegral v-if="isIntegralShown" @close="()=>{isIntegralShown = false}" :author="currentIntegral.original_author" :integral="currentIntegral.integral" :totalTime="timePerIntegral"/>
	<FullScreenSolution v-if="isSolutionShown" @close="()=>{isSolutionShown = false}" :solution="currentIntegral.integral_answer"/>
	</div>
</template>
