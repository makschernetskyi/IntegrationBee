<script setup lang="ts">
import {ref, watch, defineProps, defineEmits, toRefs, onMounted} from 'vue'

const props = defineProps({
	shouldMenuBeVisible: Boolean
})
const {shouldMenuBeVisible} = toRefs(props)

const emit = defineEmits(['endAction', 'closeMenu'])

const linksNumber = 4;
const linksShown = ref(0)

const toggleInternalVisibility = ()=>{
	const t = setInterval( ()=>{
		if((shouldMenuBeVisible.value && linksShown.value <= linksNumber) || (!shouldMenuBeVisible.value && linksShown.value > 0)){
			// +/- 1 depending on the direction
			linksShown.value += (+shouldMenuBeVisible.value)*2 - 1
		}else{
			clearInterval(t)
			emit('endAction')
		}
	}, 100 + 100*(Number(shouldMenuBeVisible.value)))
}

onMounted(toggleInternalVisibility)

watch(shouldMenuBeVisible, toggleInternalVisibility)


</script>
<template>
	<div class="z-[100] will-change-transform origin-left fixed left-0 top-0 bg-secondary bg-opacity-90 w-full h-full flex justify-center lg:justify-start lg:pl-[20vw] pt-[30vh]">
				<ul class="flex flex-col items-center gap-[2rem] lg:text-subtitle-lg text-pearl-white font-body font-semibold">
					<transition
						enter-from-class="[transform:rotateY(90deg)]"
						enter-active-class="transition-all duration-200"
						enter-to-class="[transform:rotateY(0deg)]"
						leave-from-class="[transform:rotateY(0deg)]"
						leave-active-class="transition-all duration-200"
						leave-to-class="[transform:rotateY(90deg)]"
					>
						<li v-if="linksShown>=1" class="origin-left">
							<RouterLink to="/" @click="emit('closeMenu')" class="cursor-pointer text-subtitle">home</RouterLink>
						</li>
					</transition>
					
					<transition
						enter-from-class="[transform:rotateY(90deg)]"
						enter-active-class="transition-all duration-200"
						enter-to-class="[transform:rotateY(0deg)]"
						leave-from-class="[transform:rotateY(0deg)]"
						leave-active-class="transition-all duration-200"
						leave-to-class="[transform:rotateY(90deg)]"
					>
						<li v-if="linksShown>=2" class="origin-left">
							<RouterLink to="/events" @click="emit('closeMenu')" class="cursor-pointer text-subtitle">events</RouterLink>
						</li>
					</transition>
					<transition
						enter-from-class="[transform:rotateY(90deg)]"
						enter-active-class="transition-all duration-200"
						enter-to-class="[transform:rotateY(0deg)]"
						leave-from-class="[transform:rotateY(0deg)]"
						leave-active-class="transition-all duration-200"
						leave-to-class="[transform:rotateY(90deg)]"
					>
						<li v-if="linksShown>=3" class="origin-left">
							<RouterLink to="/news" @click="emit('closeMenu')" class="cursor-pointer text-subtitle">news</RouterLink>
						</li>
					</transition>
					<transition
						enter-from-class="[transform:rotateY(90deg)]"
						enter-active-class="transition-all duration-200"
						enter-to-class="[transform:rotateY(0deg)]"
						leave-from-class="[transform:rotateY(0deg)]"
						leave-active-class="transition-all duration-200"
						leave-to-class="[transform:rotateY(90deg)]"
					>
						<li v-if="linksShown>=4" class="origin-left">
							<RouterLink to="/contact" @click="emit('closeMenu')" class="cursor-pointer text-subtitle">contact</RouterLink>
						</li>
					</transition>
				</ul>
			</div>
</template>