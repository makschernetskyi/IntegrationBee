<script setup lang="ts">
//@ts-expect-error vscode doesnt recognize types
import MobileMenuLink from "./MobileMenuLink.vue"
import {ref, watch, defineProps, defineEmits, toRefs, onMounted} from 'vue'

const props = defineProps({
	shouldMenuBeVisible: {type: Boolean},
	isMenuVisible: {type: Boolean},
})
const {shouldMenuBeVisible, isMenuVisible} = toRefs(props)

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
					<MobileMenuLink to="/" :isShown="linksShown>=1" :disabled="shouldMenuBeVisible!=isMenuVisible" @close-menu="emit('closeMenu')">home</MobileMenuLink>
					
					<MobileMenuLink to="/events" :isShown="linksShown>=2" :disabled="shouldMenuBeVisible!=isMenuVisible" @close-menu="emit('closeMenu')">events</MobileMenuLink>
					
					<MobileMenuLink to="/news" :isShown="linksShown>=3" :disabled="shouldMenuBeVisible!=isMenuVisible" @close-menu="emit('closeMenu')">news</MobileMenuLink>
					
					<MobileMenuLink to="/contact" :isShown="linksShown>=4" :disabled="shouldMenuBeVisible!=isMenuVisible" @close-menu="emit('closeMenu')">contact</MobileMenuLink>
				</ul>
			</div>
</template>