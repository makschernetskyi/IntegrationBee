<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import "katex/dist/katex.min.css";
//@ts-expect-error not meant for ts
import katex from "katex";
import { cleanLatex } from "@/utils/cleanLatex";
import { calculateLatexFontSize } from "@/utils/calculateLatexFontSize";

const emit = defineEmits(["close"]);
const props = defineProps({
	solution: { type: String, required: true },
});

const defaultFontSize = 60;
const latexFontSize = ref(`text-[${defaultFontSize}px]`);

const formula = computed(() => {
	const f = cleanLatex(props.solution);
	latexFontSize.value = `text-[${calculateLatexFontSize(f, defaultFontSize)}px]`;
	return katex.renderToString(f, { throwOnError: false, displayMode: true });
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

			<div>
				<div class="w-full">
					<div
						class="bg-white flex justify-center items-center text-black w-[70vw] h-[30rem] rounded-xl mx-auto mt-[10rem]"
						:class="latexFontSize"
					>
						<div v-html="formula"></div>
					</div>
				</div>
			</div>
	</div>
</template>
