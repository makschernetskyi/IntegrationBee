<script setup lang="ts">
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import { useUiStore } from "@/stores/uiStore/uiStore";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted } from "vue";

const UiStore = useUiStore()
const {shouldMobileMenuBeVisible, isMobileMenuVisible} = storeToRefs(UiStore)

function toggleShouldMenuBeVisible(){
	if(shouldMobileMenuBeVisible.value === isMobileMenuVisible.value){
		UiStore.shouldMobileMenuBeVisible = !shouldMobileMenuBeVisible.value
		shouldMobileMenuBeVisible.value && (document.getElementsByTagName('body')[0].style.overflowY = 'hidden');
	}
}

// Close mobile menu when resizing to desktop breakpoint (1024px = lg in Tailwind)
function handleResize() {
	if (window.innerWidth >= 1024 && shouldMobileMenuBeVisible.value) {
		UiStore.shouldMobileMenuBeVisible = false
		document.getElementsByTagName('body')[0].style.overflowY = ''
	}
}

onMounted(() => {
	window.addEventListener('resize', handleResize)
	// Close menu if it's open on desktop on initial load
	if (window.innerWidth >= 1024 && shouldMobileMenuBeVisible.value) {
		UiStore.shouldMobileMenuBeVisible = false
		document.getElementsByTagName('body')[0].style.overflowY = ''
	}
})

onUnmounted(() => {
	window.removeEventListener('resize', handleResize)
})

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