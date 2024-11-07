<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import DefaultLayout from '@/layouts/Default.vue';
import FormInput from '@/components/FormInput.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore/authStore';
import { useToastStore } from '@/stores/toastStore/toastStore';

const route = useRoute()
const router = useRouter()

const inputRef = ref('')
const store = useAuthStore()

const handleConfirm = async () =>{
	try{
		if(!route.query['token']){
			useToastStore().addToast({
				type: 'error',
				title: "Action not allowed",
				message: "You cannot perform this action, go to sign in page and request resetting a password"
			})
			return
		}
		await store.resetPassword(inputRef.value, route.query['token'] as string)
		router.push('/sign_in')
	}catch(err){

	}
}

</script>
<template>
	<DefaultLayout>
		<div class="w-full px-[2rem] lg:px-[12rem] xl:px-[10vw] bg-screenBlack flex justify-center pt-[8rem] pb-[2rem] lg:pt-[16rem]">
		</div>
		<div class="bg-pearl-white py-[10rem] flex flex-col items-center justify-center font-body text-body text-screenBlack px-[2rem] lg:px-[12rem] xl:px-[10vw]">
			<div class="w-full lg:w-[30vw] flex flex-col items-center gap-[2rem]">
				<h1 class="font-heading text-subtitle lg:text-title">Reset password</h1>
				<p>provide new password</p>
				<FormInput v-model="inputRef" type="password" label="new password" class="w-full"/>
				<button 
				@click="handleConfirm"
				:class="`w-full text-subtitle font-heading rounded-2xl pt-4 pb-2 ${!inputRef ? 'bg-gray-200' : 'bg-primary'}`"
				:disabled="store.passwordResetRequest.status == 'loading' || !inputRef"
				:title="!inputRef ? 'new password not provided' : 'confirm'"
				type="button"
				>
					{{ store.passwordResetRequest.status !='loading' ? 'confirm' : 'loading...' }}
				</button>
			</div>
		</div>
	</DefaultLayout>
</template>