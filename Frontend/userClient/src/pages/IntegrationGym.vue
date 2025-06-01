<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
//@ts-expect-error not meant for ts
import katex from "katex";
import { cleanLatex } from "@/utils/cleanLatex";
import { calculateLatexFontSize } from "@/utils/calculateLatexFontSize";

const emit = defineEmits(["close"]);

const defaultFontSize = 60;
const latexFontSize = ref(`text-[${defaultFontSize}px]`);

const formula = computed(() => {
	const f = '\\[hahshshs\\]'
	console.log(f)
	latexFontSize.value = `text-[${calculateLatexFontSize(f, defaultFontSize)}px]`;
	return katex.renderToString(f, { throwOnError: false, displayMode: true });
});






onMounted(() => {
	
});
</script>

<template>
	<div
		class=""
	>
    <div
						class="bg-white flex justify-center items-center text-black w-[70vw] h-[30rem] rounded-xl mx-auto mt-[10rem]"
						:class="latexFontSize"
					>
        <div v-html="formula"></div>
    </div>
		
	</div>
</template>
