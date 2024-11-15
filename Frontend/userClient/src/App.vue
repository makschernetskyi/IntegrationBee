<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUiStore } from "./stores/uiStore/uiStore";
import MobileMenu from "@/components/MobileMenu.vue"
import Toast from "./components/Toast.vue";
import { onBeforeMount, ref } from "vue";
import { useHomePageStore } from "./stores/homePageStore/homePageStore";
import { useNewsPageStore } from "./stores/newsPageStore/newsPageStore";
import { useContactPageStore } from "./stores/contactPageStore/contactPageStore";
import { useEventsPageStore } from "./stores/eventsPageStore/eventsPageStore";
import LoadingScreen from "./components/LoadingScreen.vue";
import CookieBanner from "./components/CookieBanner.vue";



const isLoading = ref(true)

// onBeforeMount(()=>{
// 	Promise.all([
// 		useHomePageStore().fetchHomePageData(),
// 		useNewsPageStore().fetchNewsPage(),
// 		useContactPageStore().fetchContactData(),
// 		useEventsPageStore().fetchTitle(),
// 	]).finally(()=>{
// 		isLoading.value = false
// 	})

// })
isLoading.value = false




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
	<transition
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
	>
		<LoadingScreen v-if="isLoading" class="transition-all"/>
	</transition>
	
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
				:is-menu-visible="isMobileMenuVisible"
			/>
		</transition>
		<CookieBanner/>
	</teleport>
	<Toast/>

</template>
