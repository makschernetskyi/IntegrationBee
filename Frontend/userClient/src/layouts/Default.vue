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
		<!-- Skip to main content link for accessibility -->
		<a href="#main" class="skip-link">Skip to main content</a>
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

<style scoped>
/* Skip link - hidden by default, visible when focused */
.skip-link {
	position: absolute;
	top: -40px;
	left: 0;
	background: #FBC151;
	color: #001D37;
	padding: 8px 16px;
	text-decoration: none;
	font-weight: bold;
	z-index: 10000;
	border-radius: 0 0 4px 0;
}

.skip-link:focus {
	top: 0;
}
</style>