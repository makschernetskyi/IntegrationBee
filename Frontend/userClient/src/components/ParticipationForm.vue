<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import FormInput from '@/components/FormInput.vue';
import VoiceInput from '@/components/VoiceInput.vue';


	onBeforeMount(()=>{
		document.getElementsByTagName('body')[0].style.overflowY = "hidden"
	})
	onUnmounted(()=>{
		document.getElementsByTagName('body')[0].style.overflowY = "unset"
	})


</script>
<template>
	<form class="w-[90vw] lg:w-[50vw] min-h-[60rem] h-[80vh] lg:h-[80vh] bg-pearl-white rounded-3xl py-8 px-[4rem] overflow-y-auto font-body text-body" @click="(event)=>event.stopImmediatePropagation()">
		<div class="w-full h-[max] flex flex-col gap-[2rem] items-center">
			<h3 class="text-subtitle lg:text-title font-heading text-center">
				Registration
			</h3>
			<h4 class="text-center">
				You almost there! Please provide some additional information before proceeding.
			</h4>
			<div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-[2rem] gap-y-[2rem]">
				<div class="flex flex-col">
					<FormInput label="First Name*"/>
					<div v-if="false" class="text-text-sm font-body text-red pl-[0rem]">something went wrong</div>
				</div>
				<div class="flex flex-col">
					<FormInput label="Last Name*"/>
					<div v-if="false" class="text-text-sm font-body text-red pl-[0rem]">something went wrong</div>
				</div>
				<div class="flex flex-col">
					<FormInput label="Phone Number*"/>
					<div v-if="false" class="text-text-sm font-body text-red pl-[0rem]">something went wrong</div>
				</div>
				<div class="flex flex-col">
					<FormInput label="Emergency phone number*"/>
					<div v-if="false" class="text-text-sm font-body text-red pl-[0rem]">something went wrong</div>
				</div>
				<div class="flex flex-col">
					<FormInput label="Study Program*"/>
					<div v-if="false" class="text-text-sm font-body text-red pl-[0rem]">something went wrong</div>
				</div>
				<div class="flex flex-col">
					<VoiceInput label="Name pronunciation"/>
					<div v-if="false" class="text-text-sm font-body text-red pl-[0rem]">something went wrong</div>
				</div>
				<h5 class="font-heading pl-[2rem] mt-[2rem]">
					Additional info:
				</h5>
				<textarea 
					placeholder="Anything else you want us to know?" 
					class="w-full lg:col-span-2 rounded resize-none h-[8rem] py-4 px-8"
				/>
				<button 
					class="mt-[2rem] lg:col-start-2 overflow-hidden w-[100%] rounded-3xl font-heading text-subtitle pt-[0.8rem] pb-[0.6rem] relative bg-primary border-primary border-2 text-screenBlack after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-pearl-white after:transition-transform after:duration-200 after:will-change-transform after:origin-top after:scale-y-0 hover:after:scale-y-100"
					title="sign up"
					type="submit"
				>
					<span class="relative z-[2]">
						Send
					</span>
				</button>
			</div>
		</div>
	</form>
</template>