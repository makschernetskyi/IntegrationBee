<script setup lang="ts">
const {logoSrc, sponsorName, index} = defineProps({
	logoSrc: {type: String},
	sponsorName: {type: String},
	index: {type: Number, required: true},
	logoSize: {type: Number, required: true}
})
</script>
<template>
	<div data-aos="fade-left" :data-aos-delay="index*50" data-aos-offset="20" class="relative w-[35rem] h-[35rem]">
		<!-- background hexagon -->
		<div class="w-full h-full absolute z-[1]">
			<svg width="485" height="485" viewBox="0 0 485 485" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full h-full">
				<path d="M315.567 73.0906L425.715 221.082L352.624 390.468L169.386 411.863L59.2388 263.872L132.329 94.4854L315.567 73.0906Z" fill="#FBC151"/>
				<path d="M309.567 91.0447L407.668 222.852L342.571 373.714L179.372 392.769L81.2699 260.962L146.367 110.1L309.567 91.0447Z" fill="#F2F1F0"/>
			</svg>
		</div>
		<!-- foreground logo and text -->
		<div class="absolute top-0 left-0 w-full h-full grid grid-cols-1 grid-rows-[3fr_2fr] z-[2]">
			<div class="relative w-full h-full">
				<div class="absolute z-[3] w-full h-full top-0 left-[4rem]">
					<div class="relative h-full aspect-square flex justify-center items-center">
						<div class="rounded-full absolute z-[3] h-full w-full top-0 left-0 bg-pearl-white shadow"/>
						<img :src="logoSrc" :alt="`${sponsorName} logo`" class="relative z-[4]" :style="{width: `${logoSize}%`, height: `${logoSize}%`}">
					</div>
				</div>
			</div>
			<div class="relative z-[4] w-full flex justify-center items-start pt-[1rem]">
				<p class="font-heading text-subtitle lg:text-subtitle text-screenBlack">{{ sponsorName }}</p>
			</div>
		</div>
	</div>
</template>