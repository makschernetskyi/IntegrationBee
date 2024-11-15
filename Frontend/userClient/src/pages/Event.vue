<script setup lang="ts">

import CompetitionParticipatePanel from '@/components/CompetitionParticipatePanel.vue';
import GoldSponsorLogo from '@/components/GoldSponsorLogo.vue';
import TournamentBracket from '@/components/TournamentBracket.vue';
import DefaultLayout from '@/layouts/Default.vue';
import SilverSponsorLogo from '@/components/SilverSponsorLogo.vue';
import BronzeSponsorLogo from '@/components/BronzeSponsorLogo.vue';
import ParticipationForm from '@/components/ParticipationForm.vue';

import { onBeforeMount, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore/authStore';
import { useEventPageStore } from '@/stores/eventPageStore/eventPageStore';
import { sanitizeHtml } from '@/utils/htmlSanitizers';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';


const store = useEventPageStore()


const isParticipationFormShown = ref(false)

const {isAuthenticated} = storeToRefs(useAuthStore())


const route = useRoute()
const router = useRouter()
onBeforeMount(async()=>{
	try{
		store.$reset()
		await store.fetchEventData(route.params.id as string)
	}catch(e:any){
		//
		router.push('/events')
	}
})

const showParticipationForm = () =>{
	isParticipationFormShown.value = true
	//uncomment for production
	if(isAuthenticated){
		window.onbeforeunload = function() {
			return true;
		};
	}
}
const closeParticipationForm = () =>{
	const confirmResponse = !isAuthenticated.value || confirm("Are you sure you want to leave this form? All entered data will be lost")
	if(confirmResponse){
		isParticipationFormShown.value = false
		window.onbeforeunload = null
	}
}

</script>
<template>
	<DefaultLayout>
		<div class="w-full bg-screenBlack flex justify-center pt-[8rem] lg:pt-[10rem]">
			<div class="w-full h-[20rem] lg:h-[30rem] relative">
				<img :src="store.eventPictureSrc" alt="event preview photo" class="absolute z-[1] w-full h-full top-0 left-0 object-cover" draggable="false">
				<div class="absolute left-0 top-0 w-full h-full bg-secondary z-[2] bg-opacity-70"/>
				<div class="absolute left-0 top-0 w-full h-full flex justify-center items-center z-[3]">

					<div class="font-heading text-pearl-white w-max flex flex-col items-center">
						<h1 class="text-title lg:text-heading">Integration Bee</h1>
						<h2 class="text-body lg:text-subtitle flex gap-[1rem] text-primary">{{store.competitionName}} {{store.edition}}</h2>
					</div>

				</div>
			</div>
		</div>
		<div>
		
		<main class="w-full bg-screenBlack  text-screenBlack">
			<section class="px-[2rem] bg-pearl-white lg:px-[12rem] xl:px-[10vw] pt-[4rem] pb-[5rem] min-h-[64rem] flex flex-col lg:block">
				<div class="w-full lg:w-[48rem] lg:h-[60rem] lg:px-[6rem] pt-[2rem] pb-[6rem] lg:py-[2rem] relative lg:float-right">
					<CompetitionParticipatePanel :data="store.participatePanel" class="w-full h-full" @showParticipationForm="showParticipationForm"/>
				</div>
				<h2 class="font-heading text-title w-full text-center lg:text-left">
					{{ store.competitionName }}
					<br/>
					<span class="text-primary w-full text-center lg:text-left">
						{{ store.edition }}
					</span>
				</h2>
				<p class="font-body text-body mt-[3rem] w-full text-center lg:text-left" v-html="sanitizeHtml(store.description)"/>
				<template v-for="section, i in store.sections" :key="i">
					<h3 class="font-heading text-title mt-[3rem] w-full text-center lg:text-left">
						{{ section.title }}
					</h3>
					<p class="font-body text-body mt-[3rem] w-full text-center lg:text-left" v-html="sanitizeHtml(section.text)"/>
				</template>
				<h3 class="font-heading text-title mt-[3rem] w-full text-center lg:text-left">
					Tournament Bracket
				</h3>
				<div class="w-full">
					<TournamentBracket :data="store.tournamentBracket" class="w-full mt-[4rem] origin-center lg:scale-[0.9]"/>
				</div>
				
			</section>
			<!--sponsors-->
			<section class="w-full h-max bg-screenBlack overflow-x-hidden">
					<div :class="`w-full h-max relative flex justify-center items-center bg-pearl-white ${!(store.silverSponsors.length || store.bronzeSponsors.length || store.mainSponsorExists || store.mainSponsorExists) ? '[clip-path:polygon(0_0,100%_0,100%_calc(100%-5rem),0_100%)] pt-[10rem] pb-[15rem]' : 'py-[10rem]'}`">
						<div class="relative h-[10rem] w-full flex justify-center items-center">
							<!--TODO: change svg so vors on mobile-->
							<div class="w-full absolute top-[2rem] left-0 hidden lg:flex">
								<svg width="1439" height="46" viewBox="0 0 1439 46" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M1439 0.809456L1213.55 9.45089C1213.06 9.46978 1212.59 9.67003 1212.23 10.0132L1194.53 27.1656C1193.22 28.4422 1194.17 30.6707 1196 30.6004L1439 21.2864V0.809456Z" fill="#FBC151"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M0 45.4958L265.844 35.3061C266.355 35.2866 266.839 35.0721 267.196 34.7068L283.956 17.5904C285.221 16.2981 284.257 14.1234 282.45 14.1927L0 25.0188V45.4958Z" fill="#FBC151"/>
								</svg>
							</div>
							<h3 class="font-heading text-center text-title lg:text-heading text-screenBlack">
								Sponsors
							</h3>
						</div>
					</div>
					<!--Main sponsor-->
					<div v-if="store.mainSponsorExists" class="w-full h-max flex flex-col gap-[5rem] lg:gap-0 lg:grid lg:grid-cols-[1fr_25rem] lg:grid-rows-1 lg:gap-x-[10rem] px-[2rem] lg:px-[12rem] xl:px-[10vw] py-[12rem] bg-pearl-white [clip-path:polygon(0_0,100%_0,100%_calc(100%-5rem),0%_100%)]">
						<div class="flex flex-col gap-[4rem]">
							<h4 class="font-heading text-center text-title lg:text-heading">
								Main sponsor - Huawei
							</h4>
							<p class="font-body text-body lg:text-body text-center lg:text-left">
								Huawei is a leading global tech company, driving advancements in 5G networks, AI, and cloud solutions. With operations in over 170 countries, Huawei provides cutting-edge devices and infrastructure, connecting millions to smarter, faster technology.
							</p>
						</div>
						<div class="w-full h-full p-[20%] md:p-[30%] lg:p-0">
							<img 
								src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/1200px-Huawei_Standard_logo.svg.png"
								alt="main sponsor logo"
								class="w-full max-h-full"
							>
						</div>
					</div>
					<!-- Gold sponsors -->
					<template v-if="store.goldSponsors.length">
						<div v-if="store.silverSponsors.length || store.bronzeSponsors.length || store.mainSponsorExists" class="relative w-full h-max py-[12rem]">
							<div class="absolute left-[70%] md:left-[50%] lg:left-[70%] xl:left-[50%] 2xl:left-auto 2xl:right-0 xl:right-0 top-[43%]">
								<svg width="782" height="31" viewBox="0 0 782 31" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M782 0.926632L45.1191 9.80528C44.8717 9.80826 44.627 9.85712 44.3974 9.94936L2.16181 26.9214C0.107586 27.7469 0.717887 30.8037 2.9316 30.777L782 21.3901V0.926632Z" fill="#FBC151"/>
								</svg>
							</div>
							<div class="pl-[2rem] lg:pl-[12rem]">
								<h3 class="font-heading text-subtitle lg:text-heading text-pearl-white">
									Gold Sponsors
								</h3>
							</div>
						</div>
						<div v-else class="w-full h-[5rem]"/>
						<div class="px-[2rem] lg:px-[12rem] xl:px-[10vw]">
							<div class="flex flex-row justify-center lg:justify-between flex-wrap ">
								<GoldSponsorLogo v-for="(sponsor, i) in store.goldSponsors" :key="i" :logo-src="sponsor.logoSrc" :sponsor-name="sponsor.sponsorName" :index="i" :logo-size="sponsor.logoSize"/>
								<div class="h-[35rem] min-w-[35rem] flex items-center justify-center">
									<p class="font-heading text-subtitle lg:text-subtitle text-pearl-white text-center">Here could <br> be your logo</p>
								</div>
							</div>
						</div>
					</template>
					<!-- silver sponsors -->
					<template v-if="store.silverSponsors.length">
						<div class="relative w-full h-max py-[12rem] flex justify-end">
							<div class="absolute right-[70%] md:right-[50%] lg:right-[70%] xl:right-[60%] 2xl:left-0 top-[43%]">
								<svg width="701" height="29" viewBox="0 0 701 29" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M0 29.005L658.721 21.0681C658.981 21.065 659.237 21.0114 659.476 20.9102L699.536 3.9644C701.556 3.10981 700.926 0.0961456 698.733 0.122574L0 8.54158V29.005Z" fill="#FBC151"/>
							</svg>
							</div>
							<div class="pr-[2rem] lg:pr-[12rem]">
								<h3 class="font-heading text-subtitle lg:text-heading text-pearl-white">
									Silver Sponsors
								</h3>
							</div>
						</div>
						<div class="px-[2rem] lg:px-[12rem] xl:px-[10vw]">
							<div class="flex flex-row-reverse justify-center lg:justify-between flex-wrap ">
								<SilverSponsorLogo v-for="(sponsor, i) in store.silverSponsors" :key="i" :logo-src="sponsor.logoSrc" :sponsor-name="sponsor.sponsorName" :index="i" :logo-size="sponsor.logoSize"/>
								<div class="h-[30rem] min-w-[30rem] flex items-center justify-center">
									<p class="font-heading text-subtitle lg:text-subtitle text-pearl-white text-center">Here could <br> be your logo</p>
								</div>
							</div>
						</div>
					</template>

					<!-- bronze sponsors -->
					<template v-if="store.bronzeSponsors.length">
						<div class="relative w-full h-max py-[12rem]">
							<div class="absolute left-[70%] md:left-[50%] lg:left-[70%] xl:left-[50%] 2xl:left-auto 2xl:right-0 xl:right-0 top-[43%]">
								<svg width="782" height="31" viewBox="0 0 782 31" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M782 0.926632L45.1191 9.80528C44.8717 9.80826 44.627 9.85712 44.3974 9.94936L2.16181 26.9214C0.107586 27.7469 0.717887 30.8037 2.9316 30.777L782 21.3901V0.926632Z" fill="#FBC151"/>
								</svg>
							</div>
							<div class="pl-[2rem] lg:pl-[12rem]">
								<h3 class="font-heading text-subtitle lg:text-heading text-pearl-white">
									Bronze Sponsors
								</h3>
							</div>
						</div>
						<div class="px-[2rem] lg:px-[12rem] xl:px-[10vw]">
							<div class="flex justify-center lg:justify-between flex-wrap ">
								<BronzeSponsorLogo v-for="(sponsor, i) in store.bronzeSponsors" :key="i" :logo-src="sponsor.logoSrc" :sponsor-name="sponsor.sponsorName" :index="i" :logo-size="sponsor.logoSize"/>
								<div class="h-[25rem] min-w-[25rem] flex items-center justify-center">
									<p class="font-heading text-subtitle lg:text-subtitle text-pearl-white text-center ">Here could <br> be your logo</p>
								</div>
							</div>
						</div>
					</template>
			</section>
		</main>


		<!--ParticipationForm-->
		<transition
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div v-if="isParticipationFormShown && isAuthenticated" class="fixed z-[600] w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center transition-opacity duration-100" @click="closeParticipationForm">
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
				<!--Form itself-->
				<ParticipationForm @close-form="()=>{isParticipationFormShown = false}"/>
			</div>
		</transition>

		<!--You have to sign in first-->
		<transition
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div v-if="isParticipationFormShown && !isAuthenticated" class="fixed z-[600] w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center transition-opacity duration-100" @click="closeParticipationForm">
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

				<div class="w-[90%] md:w-[50rem] h-[40rem] md:h-[30rem] flex flex-col items-center justify-between py-[2rem] px-[4rem] bg-pearl-white rounded-3xl">
					<h3 class="font-heading text-subtitle text-screenBlack text-center">You have to log in first</h3>
					<p class="font-body text-body text-screenBlack text-center"> you need to be signed into your account in order to participate in the event.</p>
					<div class="w-full flex justify-center gap-[2rem]">
						<RouterLink to="/sign_up" class="rounded-2xl text-secondary lg:hover:bg-screenBlack-400 lg:hover:bg-opacity-15 w-[16rem] h-[6rem] lg:w-[18rem] lg:h-[6rem] flex justify-center items-center text-body font-semibold">Sign up</RouterLink>
						<RouterLink :to="`/sign_in?next=${route.path}`" class="rounded-2xl text-secondary bg-primary w-[16rem] h-[6rem] lg:w-[18rem] lg:h-[6rem] flex justify-center items-center text-body font-semibold">Sign in</RouterLink>
					</div>

				</div>
			</div>
		</transition>
		
	</div>
	</DefaultLayout>
</template>