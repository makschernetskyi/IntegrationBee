<script setup lang="ts">
import FormInput from '@/components/FormInput.vue';
import DefaultLayout from '@/layouts/Default.vue';

import {ref} from "vue";

import { useSignInPageStore } from '@/stores/signInPage.vue/signInPageStore';
import { storeToRefs } from 'pinia';

const store = useSignInPageStore()
const {email, password, errors} = storeToRefs(store)

const handleSubmit = (e:any)=>{
	e.preventDefault();
	if(store.validateForm()){
		store.initializeAuth()
	}
	
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
						<FormInput :v-model="email" class="w-full" type="text" label="E-mail" name="email" :invalid="Boolean(errors.email)"/>
						<div v-if="errors.email" class="text-text-sm font-body text-red pl-[0rem]">{{errors.email}}</div>
					</div>
					<div class="flex flex-col w-full">
						<FormInput :v-model="password" class="w-full" type="password" label="Password" name="password" :invalid="Boolean(errors.password)"/>
						<div v-if="errors.password" class="text-text-sm font-body text-red pl-[0rem]">{{errors.password}}</div>
					</div>
					
					<div class="w-full flex justify-center mt-[5rem]">
						<button 
							class="overflow-hidden w-[90%] rounded-3xl font-heading text-subtitle pt-[0.8rem] pb-[0.6rem] relative bg-primary border-primary border-2 text-screenBlack after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-pearl-white after:transition-transform after:duration-200 after:will-change-transform after:origin-top after:scale-y-0 hover:after:scale-y-100"
							title="sign in"
							type="submit"
						>
							<span class="relative z-[2]">
								Sign in
							</span>
						</button>
					</div>
					<div class="flex text-center items-center flex-col text-body font-body gap-2 mt-[1rem]">
						<RouterLink to="password_recovery" class="lg:hover:underline text-screen-black">
							Forgot password?
						</RouterLink>
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
	</DefaultLayout>
</template>