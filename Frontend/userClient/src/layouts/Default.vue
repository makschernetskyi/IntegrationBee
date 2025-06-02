<script setup lang="ts">
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import { useUiStore } from "@/stores/uiStore/uiStore";
import { storeToRefs } from "pinia";

const UiStore = useUiStore()
const {shouldMobileMenuBeVisible, isMobileMenuVisible} = storeToRefs(UiStore)

function toggleShouldMenuBeVisible(){
	if(shouldMobileMenuBeVisible.value === isMobileMenuVisible.value){
		UiStore.shouldMobileMenuBeVisible = !shouldMobileMenuBeVisible.value
		shouldMobileMenuBeVisible.value && (document.getElementsByTagName('body')[0].style.overflowY = 'hidden');
	}
}


</script>
<template>
	<div>
		<!-- button works better if we pass is-menu-visible="shouldMenuBeVisible"--> 
		<KeepAlive>
			<Header
				@switch-menu-visibility="toggleShouldMenuBeVisible">
			</Header>
		</KeepAlive>
		<slot></slot>
		<Footer></Footer>
		
	</div>
</template>