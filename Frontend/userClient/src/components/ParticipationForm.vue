<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import FormInput from '@/components/FormInput.vue';
import VoiceInput from '@/components/VoiceInput.vue';
import { useParticipationFormStore } from '@/stores/participationFormStore/participationFormStore';
import { storeToRefs } from 'pinia';

const store = useParticipationFormStore()
const {firstName, lastName, phoneNumber, emergencyPhoneNumber, studyProgram, namePronunciation, errors} = storeToRefs(store)



onBeforeMount(()=>{
	document.getElementsByTagName('body')[0].style.overflowY = "hidden"
})
onUnmounted(()=>{
	document.getElementsByTagName('body')[0].style.overflowY = "unset"
})

const handleSubmit = (e: any) =>{
	e.preventDefault();
	if(store.validateForm()){
		//TODO: submit here
	}
}


</script>
<template>
	<form @submit="handleSubmit" class="w-[90vw] lg:w-[80vw] xl:w-[50vw] min-h-[60rem] h-[80vh] lg:h-[80vh] bg-pearl-white rounded-3xl py-8 px-[4rem] overflow-y-auto font-body text-body" @click="(event)=>event.stopImmediatePropagation()">
		<div class="w-full h-[max] flex flex-col gap-[2rem] items-center">
			<h3 class="text-subtitle lg:text-title font-heading text-center">
				Registration
			</h3>
			<h4 class="text-center">
				You almost there! Please provide some additional information before proceeding.
			</h4>
			<div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-[2rem] gap-y-[2rem]">
				<div class="flex flex-col">
					<FormInput v-model="phoneNumber" label="Phone Number*" :invalid="Boolean(errors.phoneNumber)"/>
					<div v-if="errors.phoneNumber" class="text-text-sm font-body text-red pl-[0rem]">{{errors.phoneNumber}}</div>
				</div>
				<div class="flex flex-col">
					<FormInput v-model="emergencyPhoneNumber" label="Emergency phone number*" :invalid="Boolean(errors.emergencyPhoneNumber)"/>
					<div v-if="errors.emergencyPhoneNumber" class="text-text-sm font-body text-red pl-[0rem]">{{errors.emergencyPhoneNumber}}</div>
				</div>
				<div class="flex flex-col">
					<FormInput v-model="studyProgram" label="Study Program*" :invalid="Boolean(errors.studyProgram)"/>
					<div v-if="errors.studyProgram" class="text-text-sm font-body text-red pl-[0rem]">{{errors.studyProgram}}</div>
				</div>
				<div class="flex flex-col">
					<VoiceInput v-model="namePronunciation" label="Name pronunciation" :invalid="Boolean(errors.namePronunciation)"/>
					<div v-if="errors.namePronunciation" class="text-text-sm font-body text-red pl-[0rem]">{{errors.namePronunciation}}</div>
				</div>
				<h5 class="font-heading pl-[2rem] mt-[5rem]">
					Additional info:
				</h5>
				<textarea 
					placeholder="Anything else you want us to know?" 
					class="w-full lg:col-span-2 rounded resize-none h-[10rem] py-4 px-8"
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