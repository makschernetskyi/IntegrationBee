<script setup lang="ts">

import CompetitionParticipatePanel from '@/components/CompetitionParticipatePanel.vue';
import GoldSponsorLogo from '@/components/GoldSponsorLogo.vue';
import TournamentBracket from '@/components/TournamentBracket.vue';
import DefaultLayout from '@/layouts/Default.vue';
//@ts-ignore: literally don't know why there is a typescript error
import SilverSponsorLogo from '@/components/SilverSponsorLogo.vue';
import BronzeSponsorLogo from '@/components/BronzeSponsorLogo.vue';
import ParticipationForm from '@/components/ParticipationForm.vue';

import { ref } from 'vue';

const mainSponsorExists = true;

const goldSponsors: {logoSrc: string, sponsorName: string, logoSize: number}[] = [
		{
			logoSrc: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pepsi_2023.svg",
			sponsorName: "Pepsi",
			logoSize: 80,
		},
		{
			logoSrc: "https://i.ibb.co/R0M0c2r/f7c4e79795462376574a59ec122228e9.png",
			sponsorName: "EY",
			logoSize: 60,
		},
		
	]

const {competitionName, edition} = {
	competitionName: "Vienna 2024",
	edition: "Autumn Edition"
}
const description = "is your chance to become the Master Integrator! This time, we’re introducing fresh, complex problems, updated rules, and a more dynamic tournament format to challenge your skills like never before. Compete against fellow enthusiasts, rise through the rounds, and showcase your expertise in integrals. It’s not just about solving problems. It’s about proving your mastery."

const sections = [
	{
		header: "How to participate",
		text: `Create an account on this website and log in.
			Already logged in?
			now just click yellow “participate” button and follow the instructions
			When the registration opens - “participate” button will be active and it will turn yellow`
	},
	{
		header: "Who can participate",
		text: `Only students can participate this includes both - university and highschool students. Take note, if you are under 18 y.o. - you are still allowed to participate however you would need to bring a written consent from a legal guardian e.g. parent.`
	}
]

const isParticipationFormShown = ref(false)


const showParticipationForm = () =>{
	isParticipationFormShown.value = true
	//uncomment for production
	window.onbeforeunload = function() {
		return true;
	};
}
const closeParticipationForm = () =>{
	const confirmResponse = confirm("Are you sure you want to leave this form? All entered data will be lost")
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
				<img src="https://imgix.bustle.com/uploads/shutterstock/2022/1/10/a336ba51-3cc8-4f5e-935b-9ac7f7b05271-shutterstock-2008512365.jpg?w=400&h=300&fit=crop&crop=faces&q=50&dpr=2" alt="" class="absolute z-[1] w-full h-full top-0 left-0 object-cover" draggable="false">
				<div class="absolute left-0 top-0 w-full h-full bg-secondary z-[2] bg-opacity-70"/>
				<div class="absolute left-0 top-0 w-full h-full flex justify-center items-center z-[3]">

					<div class="font-heading text-pearl-white w-max flex flex-col items-center">
						<h1 class="text-title lg:text-heading">Integration Bee</h1>
						<h2 class="text-body lg:text-subtitle flex gap-[1rem] text-primary">{{competitionName}} {{edition}}</h2>
					</div>

				</div>
			</div>
		</div>
		<div>
		
		<main class="w-full bg-screenBlack  text-screenBlack">
			<section class="px-[2rem] bg-pearl-white lg:px-[12rem] pt-[4rem] pb-[5rem] min-h-[64rem] flex flex-col lg:block">
				<div class="w-full lg:w-[48rem] lg:h-[60rem] lg:px-[6rem] pt-[2rem] pb-[6rem] lg:py-[2rem] relative lg:float-right">
					<CompetitionParticipatePanel class="w-full h-full" @showParticipationForm="showParticipationForm"/>
				</div>
				<h2 class="font-heading text-title w-full text-center lg:text-left">
					{{ competitionName }}
					<br/>
					<span class="text-primary w-full text-center lg:text-left">
						{{ edition }}
					</span>
				</h2>
				<p class="font-body text-body mt-[3rem] w-full text-center lg:text-left">
					{{ description }}
				</p>
				<template v-for="section, i in sections" :key="i">
					<h3 class="font-heading text-title mt-[3rem] w-full text-center lg:text-left">
						{{ section.header }}
					</h3>
					<p class="font-body text-body mt-[3rem] w-full text-center lg:text-left">
						{{ section.text }}
					</p>
				</template>
				<h3 class="font-heading text-title mt-[3rem] w-full text-center lg:text-left">
					Tournament Bracket
				</h3>
				<TournamentBracket class="w-full mt-[4rem]"/>
			</section>
			<!--sponsors-->
			<section class="w-full h-max bg-screenBlack overflow-x-hidden">
					<div class="w-full h-max relative flex justify-center items-center py-[10rem] bg-pearl-white">
						<div class="relative h-[10rem] w-full flex justify-center items-center">
							<!--TODO: change svg so vors on mobile-->
							<div class="w-full absolute top-[2rem] left-0 hidden lg:flex">
								<svg width="1439" height="46" viewBox="0 0 1439 46" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="aspect-auto w-full">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M1439 0.80957L1212.78 9.48034L1190.78 30.8006L1439 21.2865V0.80957Z" fill="#FBC151"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M0 45.4956L266.639 35.2754L287.471 14L0 25.0186V45.4956Z" fill="#FBC151"/>
								</svg>
							</div>
							<h3 class="font-heading text-center text-title lg:text-heading text-screenBlack">
								Sponsors
							</h3>
						</div>
					</div>
					<!--Main sponsor-->
					<div v-if="mainSponsorExists" class="w-full h-max flex flex-col gap-[5rem] lg:gap-0 lg:grid lg:grid-cols-[1fr_25rem] lg:grid-rows-1 lg:gap-x-[10rem] px-[2rem] lg:px-[12rem] py-[12rem] bg-pearl-white [clip-path:polygon(0_0,100%_0,100%_calc(100%-5rem),0%_100%)]">
						<div class="flex flex-col gap-[4rem]">
							<h4 class="font-heading text-center text-title lg:text-heading">
								Main sponsor - Huawei
							</h4>
							<p class="font-body text-body lg:text-body text-center lg:text-left">
								Huawei is a leading global tech company, driving advancements in 5G networks, AI, and cloud solutions. With operations in over 170 countries, Huawei provides cutting-edge devices and infrastructure, connecting millions to smarter, faster technology.
							</p>
						</div>
						<div class="w-full h-full p-[20%] lg:p-0">
							<img 
								src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/1200px-Huawei_Standard_logo.svg.png"
								alt="main sponsor logo"
								class="w-full max-h-full"
							>
						</div>
					</div>
					<!-- Gold sponsors -->
					<div class="relative w-full h-max py-[12rem]">
						<div class="absolute right-0 top-[45%] w-[40%] h-[3rem] lg:h-auto lg:w-[50%]">
							<svg width="790" height="31" viewBox="0 0 790 31" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full h-full">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M790 0.926633L52.7448 9.80979L0.246527 30.9058L790 21.3901V0.926633Z" fill="#FBC151"/>
							</svg>
						</div>
						<div class="pl-[2rem] lg:pl-[12rem]">
							<h3 class="font-heading text-subtitle lg:text-heading text-pearl-white">
								Gold Sponsors
							</h3>
						</div>
					</div>
					<div class="px-[2rem] lg:px-[12rem]">
						<div class="flex flex-row justify-center lg:justify-between flex-wrap ">
							<GoldSponsorLogo v-for="(sponsor, i) in goldSponsors" :key="i" :logo-src="sponsor.logoSrc" :sponsor-name="sponsor.sponsorName" :index="i" :logo-size="sponsor.logoSize"/>
							<div class="h-[35rem] min-w-[35rem] flex items-center justify-center">
								<p class="font-heading text-subtitle lg:text-subtitle text-pearl-white text-center">Here could <br> be your logo</p>
							</div>
						</div>
					</div>
					<!-- silver sponsors -->

					<div class="relative w-full h-max py-[12rem] flex justify-end">
						<div class="absolute left-0 top-[45%] w-[30%] lg:w-[50%]">
							<svg width="709" height="29" viewBox="0 0 709 29" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M0 29.005L659.114 21.0634L708.908 -2.53662e-05L0 8.54158V29.005Z" fill="#FBC151"/>
							</svg>
						</div>
						<div class="pr-[2rem] lg:pr-[12rem]">
							<h3 class="font-heading text-subtitle lg:text-heading text-pearl-white">
								Silver Sponsors
							</h3>
						</div>
					</div>
					<div class="px-[2rem] lg:px-[12rem]">
						<div class="flex flex-row-reverse justify-center lg:justify-between flex-wrap ">
							<SilverSponsorLogo v-for="(sponsor, i) in goldSponsors" :key="i" :logo-src="sponsor.logoSrc" :sponsor-name="sponsor.sponsorName" :index="i" :logo-size="sponsor.logoSize"/>
							<div class="h-[30rem] min-w-[30rem] flex items-center justify-center">
								<p class="font-heading text-subtitle lg:text-subtitle text-pearl-white text-center">Here could <br> be your logo</p>
							</div>
						</div>
					</div>

					<!-- bronze sponsors -->
					
					<div class="relative w-full h-max py-[12rem]">
						<div class="absolute right-0 top-[45%] w-[30%] h-[3rem] lg:h-auto lg:w-[50%]">
							<svg width="790" height="31" viewBox="0 0 790 31" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full h-full">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M790 0.926633L52.7448 9.80979L0.246527 30.9058L790 21.3901V0.926633Z" fill="#FBC151"/>
							</svg>
						</div>
						<div class="pl-[2rem] lg:pl-[12rem]">
							<h3 class="font-heading text-subtitle lg:text-heading text-pearl-white">
								Bronze Sponsors
							</h3>
						</div>
					</div>
					<div class="px-[2rem] lg:px-[12rem]">
						<div class="flex justify-center lg:justify-between flex-wrap ">
							<BronzeSponsorLogo v-for="(sponsor, i) in goldSponsors" :key="i" :logo-src="sponsor.logoSrc" :sponsor-name="sponsor.sponsorName" :index="i" :logo-size="sponsor.logoSize"/>
							<div class="h-[25rem] min-w-[25rem] flex items-center justify-center">
								<p class="font-heading text-subtitle lg:text-subtitle text-pearl-white text-center ">Here could <br> be your logo</p>
							</div>
						</div>
					</div>
			</section>
		</main>


		<!--ParticipationForm-->
		<transition
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div v-if="isParticipationFormShown" class="fixed z-[600] w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center transition-opacity duration-100" @click="closeParticipationForm">
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
				<ParticipationForm/>
			</div>
		</transition>
		
	</div>
	</DefaultLayout>
</template>