<script setup lang="ts">
import Footer from "@/components/Footer.vue"
import GamingHeader from "@/components/GamingHeader.vue"
import { ref } from "vue"
import { useUiStore } from "@/stores/uiStore/uiStore"
import { storeToRefs } from "pinia"

const uiStore = useUiStore()
const {isRulesVisible} = storeToRefs(uiStore)

</script>
<template>
    <div>
		<!-- button works better if we pass is-menu-visible="shouldMenuBeVisible"--> 
		<KeepAlive>
			<GamingHeader/>
		</KeepAlive>
		<main>
			<slot></slot>
		</main>
		<Footer/>
	</div>
</template>
