<script setup lang="ts">
import FormInput from '@/components/FormInput.vue';
import DefaultLayout from '@/layouts/Default.vue';
import { useSignUpPageStore } from '@/stores/signUpPageStore/signUpPageStore';

import {ref} from "vue";
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import CheckBox from '@/components/CheckBox.vue';

const testInputModel = ref('')

const store = useSignUpPageStore()
const {email, password, firstName, lastName, institution, isTermsAccepted, errors} = storeToRefs(store)


const router = useRouter();

const handleSubmit = async (e:any) =>{
	e.preventDefault();
	if(store.validateForm()){
		try{
			await store.initializeSignUp();
			router.push('/sign_in')
			store.$reset()
		}catch(error:any){

		}
	}
}

</script>
<template>
	<DefaultLayout>
		<div class="w-full h-[8rem] lg:h-[10rem] bg-screenBlack"/>
		<div class="w-full flex flex-col bg-pearl-white gap-[4rem] py-[5rem] text-body font-body text-screenBlack">
			<div class="flex items-center justify-between">
				<div class="w-[10vw] lg:w-[30vw] h-[4rem] rounded-r-[2px] bg-primary"/>
				<h1 class="font-heading text-subtitle lg:text-title text-center">
					Create new profile
				</h1>
				<div class="w-[10vw] lg:w-[30vw] h-[4rem] rounded-l-[2px] bg-primary"/>
			</div>
			<!--Form-->
			<div class="w-full flex justify-center">
				<form @submit="handleSubmit" class="w-full lg:w-[30%] px-[2rem] flex flex-col gap-[2rem]">
					<div class="flex flex-col w-full">
						<FormInput v-model="email" class="w-full" type="text" label="E-mail" name="email" :invalid="Boolean(errors.email)"/>
						<div v-if="errors.email" class="text-text-sm font-body text-red pl-[0rem]">{{errors.email}}</div>
					</div>
					<div class="flex flex-col w-full">
						<FormInput v-model="firstName" class="w-full" type="text" label="First Name" name="first name" :invalid="Boolean(errors.firstName)"/>
						<div v-if="errors.firstName" class="text-text-sm font-body text-red pl-[0rem]">{{errors.firstName}}</div>
					</div>
					<div class="flex flex-col w-full">
						<FormInput v-model="lastName" class="w-full" type="text" label="Last Name" name="last name" :invalid="Boolean(errors.lastName)"/>
						<div v-if="errors.lastName" class="text-text-sm font-body text-red pl-[0rem]">{{errors.lastName}}</div>
					</div>
					<div class="flex flex-col w-full">
						<FormInput v-model="institution" class="w-full" type="text" label="Institution" name="institution" :invalid="Boolean(errors.institution)"/>
						<div v-if="errors.institution" class="text-text-sm font-body text-red pl-[0rem]">{{errors.institution}}</div>
					</div>
					<div class="flex flex-col w-full">
						<FormInput v-model="password" class="w-full" type="password" label="Password" name="password" :invalid="Boolean(errors.password)"/>
						<div v-if="errors.password" class="text-text-sm font-body text-red pl-[0rem]">{{errors.password}}</div>
					</div>
					<div class="flex flex-col w-full gap-[1rem] py-[2rem]">
						<div class="flex items-center justify-center gap-[2rem]">
							<CheckBox v-model="isTermsAccepted"/>
							<p :class="`${errors.isTermsAccepted? 'text-red': 'text-screenBlack'}`">I accept <RouterLink to="/terms_of_use" class="underline lg:hover:text-primary lg:transition-colors">Terms of use</RouterLink></p>
						</div>
						<div v-if="errors.isTermsAccepted" class="text-text-sm font-body text-center text-red pl-[0rem]">{{errors.isTermsAccepted}}</div>
					</div>
					<div class="w-full flex justify-center mt-[4rem]">
						<button 
							class="overflow-hidden w-[90%] rounded-3xl font-heading text-subtitle pt-[0.8rem] pb-[0.6rem] relative bg-primary border-primary border-2 text-screenBlack after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-pearl-white after:transition-transform after:duration-200 after:will-change-transform after:origin-top after:scale-y-0 hover:after:scale-y-100"
							title="sign up"
							type="submit"
							:disabled="store.loading"
						>
							<span class="relative z-[2]">
								{{ store.loading ? "loading..." : "Sign Up" }}
							</span>
						</button>
					</div>
					<div class="flex text-center items-center flex-col text-body font-body gap-2">
						<p>already have an account?</p>
						<RouterLink to="sign_in" class="lg:hover:underline text-primary">click here to sign in</RouterLink>
					</div>
				</form>
			</div>
		</div>
		<div class="w-full flex items-end p-0 h-[6rem] bg-pearl-white">
			<div class="w-full h-[6rem] bottom-0 bg-screenBlack [clip-path:polygon(0_5rem,100%_0,100%_100%,0%_100%)] pb-[8rem] -mb-[1rem]"/>
		</div>
	</DefaultLayout>
</template>