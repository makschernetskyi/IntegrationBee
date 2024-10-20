<script setup lang="ts">
const {logoSrc, sponsorName, index} = defineProps({
	logoSrc: {type: String},
	sponsorName: {type: String},
	index: {type: Number, required: true},
	logoSize: {type: Number, required: true}
})
</script>
<template>
	<div data-aos="fade-left" :data-aos-delay="index*50" data-aos-offset="20" class="relative w-[30rem] h-[30rem]">
		<!-- background hexagon -->
		<div class="w-full h-full absolute z-[1]">
			<svg width="372" height="372" viewBox="0 0 372 372" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full h-full">
				<path d="M242.067 56.0666L326.559 169.588L270.492 299.522L129.934 315.933L45.4412 202.412L101.508 72.4782L242.067 56.0666Z" fill="#757575"/>
				<path d="M237.463 69.839L312.715 170.946L262.78 286.67L137.593 301.287L62.3406 200.18L112.276 84.4558L237.463 69.839Z" fill="#F2F1F0"/>
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
				<p class="font-heading text-body lg:text-subtitle text-screenBlack">{{ sponsorName }}</p>
			</div>
		</div>
	</div>
							
</template>