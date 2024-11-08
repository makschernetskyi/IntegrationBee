<script setup lang="ts">
import DefaultLayout from '@/layouts/Default.vue';
import { useImprintPageStore } from '@/stores/imprintPageStore/imprintPageStore';
import { useTermsOfUsePageStore } from '@/stores/termsOfUsePageStore/termsOfUsePageStore';
import { onBeforeMount } from 'vue';

const store = useTermsOfUsePageStore()


onBeforeMount(()=>{
	store.fetchTermsOfUse()
})

</script>
<template>
	<DefaultLayout>
		<div class="w-full px-[2rem] lg:px-[12rem] xl:px-[10vw] bg-screenBlack flex justify-center pt-[8rem] pb-[2rem] lg:pt-[16rem]">
			<h1 class="font-heading text-subtitle lg:text-title text-center text-pearl-white">
				Terms of use
			</h1>
		</div>
		<div class="w-full py-[10rem] px-[2rem] lg:px-[12rem] xl:px-[10vw] bg-pearl-white font-body text-body" v-html="store.text"/>
	</DefaultLayout>
</template>