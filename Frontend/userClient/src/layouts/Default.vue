<script setup lang="ts">
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import MobileMenu from "@/components/MobileMenu.vue";


import {ref} from 'vue';

const shouldMenuBeVisible = ref(false)
const isMenuVisible = ref(false)

function toggleShouldMenuBeVisible(){
	if(shouldMenuBeVisible.value === isMenuVisible.value){
		shouldMenuBeVisible.value = !shouldMenuBeVisible.value
	}
}


</script>
<template>
	<div>
		<!-- button works better if we pass is-menu-visible="shouldMenuBeVisible"--> 
		<Header
			:is-menu-visible="shouldMenuBeVisible"
			@switch-menu-visibility="toggleShouldMenuBeVisible"
		/>
		<slot></slot>
		<Footer></Footer>
		<teleport to='body'>
			<transition
				enter-from-class="opacity-0"
				enter-active-class="transition-all duration-200"
				enter-to-class="opacity-1"
				leave-from-class="opacity-1"
				leave-active-class="transition-all duration-200"
				leave-to-class="opacity-0"
			>
				<MobileMenu
					v-if="isMenuVisible || shouldMenuBeVisible" 
					:should-menu-be-visible="shouldMenuBeVisible"
					@end-action="()=>{isMenuVisible = shouldMenuBeVisible}"
					@close-menu="toggleShouldMenuBeVisible"
				/>
			</transition>
			
		</teleport>
	</div>
</template>