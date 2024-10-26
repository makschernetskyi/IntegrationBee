<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUiStore } from "./stores/uiStore/uiStore";
import MobileMenu from "@/components/MobileMenu.vue"
import Toast from "./components/Toast.vue";

const UiStore = useUiStore()
const {shouldMobileMenuBeVisible, isMobileMenuVisible} = storeToRefs(UiStore)

function toggleShouldMenuBeVisible(){
	if(shouldMobileMenuBeVisible.value === isMobileMenuVisible.value){
		UiStore.shouldMobileMenuBeVisible = !shouldMobileMenuBeVisible.value
		shouldMobileMenuBeVisible.value && (document.getElementsByTagName('body')[0].style.overflowY = 'hidden');
	}
}
function endMenuAction(){
	UiStore.isMobileMenuVisible = shouldMobileMenuBeVisible.value;
	!isMobileMenuVisible.value && (document.getElementsByTagName('body')[0].style.overflowY = 'unset');
	
}


</script>
<template>
<router-view>
</router-view>
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
			v-if="isMobileMenuVisible || shouldMobileMenuBeVisible" 
			:should-menu-be-visible="shouldMobileMenuBeVisible"
			@end-action="endMenuAction"
			@close-menu="toggleShouldMenuBeVisible"
		/>
	</transition>
</teleport>

<Toast/>

</template>
