<script setup lang="ts">
import DefaultLayout from '@/layouts/Default.vue';
import { useImprintPageStore } from '@/stores/imprintPageStore/imprintPageStore';
import { onBeforeMount } from 'vue';

const store = useImprintPageStore()


onBeforeMount(()=>{
	store.fetchImprint()
})

</script>
<template>
	<DefaultLayout>
		<div class="w-full px-[2rem] lg:px-[12rem] bg-screenBlack flex justify-center pt-[8rem] pb-[2rem] lg:pt-[16rem]">
			<h1 class="font-heading text-subtitle lg:text-title text-center text-pearl-white">
				Imprint
			</h1>
		</div>
		<div class="w-full py-[10rem] lg:px-[12rem] bg-pearl-white" :v-html="store.text">
		</div>
	</DefaultLayout>
</template>