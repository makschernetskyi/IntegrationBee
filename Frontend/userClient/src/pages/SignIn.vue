<script setup lang="ts">
import FormInput from '@/components/FormInput.vue';
import DefaultLayout from '@/layouts/Default.vue';

import {onBeforeUnmount, onMounted, ref} from "vue";

import { useSignInPageStore } from '@/stores/signInPage.vue/signInPageStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useToastStore } from '@/stores/toastStore/toastStore';

const store = useSignInPageStore()
const {email, password, errors, resetPasswordEmail} = storeToRefs(store)

const route = useRoute()
const query = route.query

onMounted(()=>{
	if(query && query.emailVerified && query.emailVerified=='true')
	useToastStore().addToast({
		type: 'success',
		title: "Email verified",
		message: "Your email was successfully verified. You can sign into your account now.",
		duration: 10000
	})
})

const handleSubmit = (e:any)=>{
	e.preventDefault();
	if(store.validateForm()){
		let next = '/myprofile'
		if('next' in query && query.next?.toString() !== undefined){
			next = query.next?.toString()
		}
		store.initializeAuth(next as string)
	}
}

const isPasswordRecoveryShown = ref(false)


const showPasswordRecovery = () =>{
	isPasswordRecoveryShown.value = true
	document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
}
function closePasswordRecovery (){
	isPasswordRecoveryShown.value = false
	document.getElementsByTagName('body')[0].style.overflowY = 'unset'

}


</script>
<template>
	<DefaultLayout>
		<div class="w-full h-[8rem] lg:h-[10rem] bg-screenBlack"/>
		<div class="w-full flex flex-col bg-pearl-white gap-[4rem] py-[5rem] text-body font-body text-screenBlack">
			<div class="flex items-center justify-between">
				<div class="w-[10vw] lg:w-[30vw] h-[4rem] bg-primary"/>
				<h1 class="font-heading text-subtitle lg:text-title text-center">
					Sign in
				</h1>
				<div class="w-[10vw] lg:w-[30vw] h-[4rem] bg-primary"/>
			</div>
			<!--Form-->
			<div class="w-full flex justify-center">
				<form @submit="handleSubmit" class="w-full lg:w-[30%] px-[2rem] flex flex-col gap-[2rem]">
					<div class="flex flex-col w-full">
						<FormInput v-model="email" class="w-full" type="text" label="E-mail" name="email" :invalid="Boolean(errors.email)"/>
						<div v-if="errors.email" class="text-text-sm font-body text-red pl-[0rem]">{{errors.email}}</div>
					</div>
					<div class="flex flex-col w-full">
						<FormInput v-model="password" class="w-full" type="password" label="Password" name="password" :invalid="Boolean(errors.password)"/>
						<div v-if="errors.password" class="text-text-sm font-body text-red pl-[0rem]">{{errors.password}}</div>
					</div>
					
					<div class="w-full flex justify-center gap-[2rem] mt-[5rem]">
						<RouterLink 
							to="/sign_up"
							class="overflow-hidden w-[90%] rounded-3xl font-heading text-subtitle pt-[0.8rem] pb-[0.6rem] text-primary lg:hidden flex justify-center"
							title="sign in"
						>
							<span class="relative z-[2]">
								Sign up
							</span>
						</RouterLink>
						
						<button 
							class="overflow-hidden w-[90%] rounded-3xl font-heading text-subtitle pt-[0.8rem] pb-[0.6rem] relative bg-primary border-primary border-2 text-screenBlack after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-pearl-white after:transition-transform after:duration-200 after:will-change-transform after:origin-top after:scale-y-0 lg:hover:after:scale-y-100"
							title="sign in"
							type="submit"
							:disabled="store.loading"
						>
							<span class="relative z-[2]">
								{{store.loading ? "loading..." : "sign in"}}
							</span>
						</button>
						
						
					</div>
					<div class="flex text-center items-center flex-col text-body font-body gap-2 mt-[1rem]">
						<button @click="showPasswordRecovery" type="button" class="lg:hover:underline text-screen-black">
							Forgot password?
						</button>
					</div>
					<!--<div class="flex text-center items-center flex-col text-body font-body gap-2 mt-[2rem]">
						<p>not registered yet?</p>
						<RouterLink to="sign_up" class="lg:hover:underline text-primary">create an account</RouterLink>
					</div>-->
				</form>
			</div>
		</div>
		<div class="w-full flex items-end p-0 h-[6rem] bg-pearl-white">
			<div class="w-full h-[6rem] bottom-0 bg-screenBlack [clip-path:polygon(0_5rem,100%_0,100%_100%,0%_100%)] pb-[8rem] -mb-[1rem]"/>
		</div>
		<!-- reset password modal -->
		<div v-if="isPasswordRecoveryShown" @click="closePasswordRecovery" class="fixed w-full h-full top-0 left-0 z-[500] bg-screenBlack bg-opacity-40">

			<!--close btn-->
				<button class="absolute right-[4rem] top-[4rem] aspect-square w-[2rem] lg:w-[4rem] rounded-full transition-all">
					<svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
						<g clip-path="url(#clip0_286_9)">
						<rect x="-2.67847" y="6.51398" width="13" height="184.075" rx="6.5" transform="rotate(-45 -2.67847 6.51398)" fill="#F2F1F0"/>
						<rect x="127.482" y="-2.67841" width="13" height="184.075" rx="6.5" transform="rotate(45 127.482 -2.67841)" fill="#F2F1F0"/>
						</g>
						<defs>
						<clipPath id="clip0_286_9">
						<rect width="134" height="134" fill="white"/>
						</clipPath>
						</defs>
					</svg>
				</button>

				<div @click="(e:any)=>e.stopImmediatePropagation()" class="absolute w-[90vw] md:w-[40rem] h-[30rem] rounded-3xl shadow-lg left-[50%] -translate-x-[50%] top-[calc(50%-15rem)] bg-pearl-white flex flex-col justify-center items-center text-screenBlack text-body font-body px-[2rem]">
					<div class="flex flex-col w-full justify-center items-center gap-8">
						<h3 class="font-heading text-subtitle">Password recovery</h3>
						<div class="flex flex-col items-start gap-4 w-ful">
							<p>provide your email.</p>
							<input v-model="resetPasswordEmail" type="text" placeholder="email" class="px-6 py-4 outline-none rounded-2xl w-full">
							<p v-if="store.resetPasswordEmailError" class="text-red">
								{{ store.resetPasswordEmailError }}
							</p>
						</div>
						<div class="flex justify-end w-full">
							<button 
								@click="store.initializePasswordReset"
								:class="`px-6 py-4 rounded-2xl font-semibold transition-colors ${resetPasswordEmail ? 'bg-primary lg:hover:bg-transparent' : 'bg-gray-200'}`"
								:disabled="!resetPasswordEmail"
							>
								recover
							</button>
						</div>
					</div>
				</div>

		</div>
	</DefaultLayout>
</template>