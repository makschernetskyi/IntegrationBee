<script setup lang="ts">

const {logoSrc, sponsorName, index} = defineProps({
	logoSrc: {type: String},
	sponsorName: {type: String},
	index: {type: Number, required: true},
	logoSize: {type: Number, required: true}
})

</script>
<template>
	<div data-aos="fade-left" :data-aos-delay="index*50" data-aos-offset="20" class="relative w-[25rem] h-[25rem]">
		<!-- background hexagon -->
		<div class="w-full h-full absolute z-[1]">
			<svg width="293" height="293" viewBox="0 0 293 293" fill="none" xmlns="http://www.w3.org/2000/svg" preserve-aspect-ratio="none" class="w-full h-full">
				<path d="M190.66 44.16L257.209 133.574L213.049 235.914L102.34 248.84L35.7908 159.426L79.9508 57.0863L190.66 44.16Z" fill="#CD7F32"/>
				<path d="M187.034 55.0074L246.306 134.643L206.975 225.791L108.373 237.304L49.1018 157.668L88.4324 66.5201L187.034 55.0074Z" fill="#F2F1F0"/>
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
				<p class="font-heading text-body lg:text-body text-screenBlack">{{ sponsorName }}</p>
			</div>
		</div>
		
	</div>
</template>