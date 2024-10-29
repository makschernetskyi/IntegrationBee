<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue"
import VideoPlayer from "@/components/VideoPlayer.vue";
import { useAuthStore } from "@/stores/authStore/authStore";
import { onMounted, watchEffect, ref } from "vue"
import { useHomePageStore } from "@/stores/homePageStore/homePageStore";
import { sanitizeHtml } from "@/utils/htmlSanitizers";

const store = useHomePageStore()



const videoOptions = ref({
  autoplay: false,
  controls: true,
  sources: [
    {
      src: store.videoUrl,
      type: 'video/youtube'
    }
  ]
});

watchEffect(() => {
  videoOptions.value = {
    autoplay: false,
    controls: true,
    sources: [
      {
        src: store.videoUrl,
        type: 'video/youtube'
      }
    ]
  };
});

const {isAuthenticated} = useAuthStore()


</script>
<template>
	<DefaultLayout>
		<div class="top-0 h-max bg-screenBlack overflow-x-hidden">
			<!-- first welcome section -->
			<section 
				class="top-0 flex justify-start pt-[30vh] md:pt-0 md:items-center lg:min-h-[40rem] h-[111vh] px-[2rem] lg:px-[12rem] bg-no-repeat bg-cover [clip-path:polygon(0_0,100%_0,100%_90%,0%_100%)] relative"
				:style="{backgroundImage: `url(${store.titleBackgroundImage})`}"
			>
				<div class="flex flex-col font-body text-pearl-white gap-[3rem] w-full">
					<div class="flex flex-col gap-0" data-aos="fade-right" data-aos-offset="0">
						<h1 class="font-heading text-title lg:text-heading">INTEGRATION BEE</h1>
						<h2 class="font-heading text-primary text-subtitle lg:text-title">AUSTRIA</h2>
						<h3 class="text-body lg:text-title" v-html="sanitizeHtml(store.slogan)"/>
					</div>
					<div class="flex justify-between md:justify-start items-center w-full md:gap-[2.4rem] lg:text-body">
						<!-- sign in/events and learn more buttons -->
						<RouterLink v-if="!isAuthenticated" to="/sign_in" class="rounded-2xl text-secondary bg-primary w-[16rem] h-[6rem] lg:w-[18rem] lg:h-[6rem] flex justify-center items-center text-body font-semibold">Sign in</RouterLink>
						<RouterLink v-if="isAuthenticated" to="/events" class="rounded-2xl text-secondary bg-primary w-[16rem] h-[6rem] lg:w-[18rem] lg:h-[6rem] flex justify-center items-center text-body font-semibold">Events</RouterLink>

						<RouterLink to="#about" class="border-pearl-white border-2 rounded-2xl w-[16rem] h-[6rem] lg:w-[18rem] lg:h-[6rem] flex justify-center items-center text-body font-semibold overflow-hidden lg:hover:text-screenBlack signUpBtn">
							<p class="relative">Learn More</p>
							<div class="signUpBtn_Bg bg-pearl-white hidden lg:flex"/>
						</RouterLink>
					</div>
				</div>
				<!-- arrow down (animated) -->
				<div class="w-[5rem] aspect-square absolute left-[calc(50vw-2.5rem)] bottom-[max(15rem,20vh)] stroke-primary down-arrow">
					<svg width="61" height="34" viewBox="0 0 61 34" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
						<path d="M1.58545 1.35022L30.7674 30.5322L59.1498 2.14972" stroke-width="3.7689"/>
					</svg>
				</div>
			</section>
			<!-- what is it section -->
			<section id="about" class="w-full h-max scroll-pt-[30rem] grid grid-cols-1 lg:grid-cols-[4fr_5fr] gap-[6rem] lg:gap-[4rem] px-[2rem] lg:px-[12rem] py-[10rem]">
				<div class="w-full h-max flex justify-center items-center">
					<div class="text-pearl-white flex flex-col items-center lg:items-start gap-[2rem]">
						<h3 class="font-heading text-title" data-aos="fade-up">
							What is It
						</h3>
						<p class="font-base text-body text-center lg:text-left" data-aos="fade-up">
							{{store.whatIsItContent}}
						</p>
					</div>
				</div>
				<!-- video example -->
				<div class="flex justify-center items-center w-full lg:px-[3rem]">
					<video-player :options="videoOptions" class="rounded-[30px] lg:rounded-3xl w-full aspect-video border-pearl-white border-4 box-content"/>
				</div>
			</section>
			<!-- steps to participate -->
			<section class="w-full h-max grid grid-cols-1 lg:grid-cols-[4fr_5fr] gap-y-[10rem] lg:gap-[4rem] lg:px-[12rem] pt-[5rem] lg:py-[5rem] relative lg:gap-y-3">
				
				<div>
					<div class="flex flex-col justify-center lg:h-[75rem] relative ">
						<div class="flex flex-col items-end gap-[2rem] lg:absolute -left-[12rem] pr-[4rem]">
							<h2 class="text-white font-heading text-title lg:text-heading text-center lg:text-right w-full pl-[2rem] lg:pl-[12rem]">
								3 steps to participate
							</h2>
							<div class="w-full flex justify-start">
								<div class="w-auto h-auto">
									<svg width="749" height="82" viewBox="0 0 749 82" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full -scale-x-[1]">
										<path d="M749 0H2.8793C0.9697 0 0.146249 2.42068 1.65973 3.58513L103.039 81.5851C103.389 81.8541 103.818 82 104.259 82H749V0Z" fill="#FBC151"/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="w-full h-max grid grid-cols-1 auto-rows-[25rem] gap-y-[2rem] relative px-[2rem] lg:px-[0rem]">
					<div class="grid grid-cols-[4rem_1fr] grid-rows-1 gap-x-[1rem] text-pearl-white">
						<div class="relative pt-[calc(6rem)] z-[1]">
							<svg width="49" height="45" viewBox="0 0 49 45" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full aspect-square">
								<path d="M34.0532 0.508602L48.3827 19.7613L38.8741 41.7973L15.036 44.5807L0.706578 25.328L10.2152 3.29193L34.0532 0.508602Z" fill="#FBC151"/>
							</svg>
						</div>
						<div class="grid grid-cols-1 grid-rows-[7rem_4px_auto] gap-[1rem] h-full" data-aos="fade-up">
							<h4 class="font-heading text-subtitle lg:text-title">
								{{ store.stepsToParticipate[0]?.title }}
							</h4>
							<div class="h-[4px] bg-primary w-full"/>
							<p class="font-body text-body">
								{{ store.stepsToParticipate[0]?.description }}
							</p>
						</div>
					</div>

					<div class="grid grid-cols-[4rem_1fr] grid-rows-1 gap-x-[1rem] text-pearl-white">
						<div class="relative pt-[calc(6rem)] z-[1]">
							<svg width="49" height="45" viewBox="0 0 49 45" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full aspect-square">
								<path d="M34.0532 0.508602L48.3827 19.7613L38.8741 41.7973L15.036 44.5807L0.706578 25.328L10.2152 3.29193L34.0532 0.508602Z" fill="#FBC151"/>
							</svg>
						</div>
						<div class="grid grid-cols-1 grid-rows-[7rem_4px_auto] gap-[1rem] h-full" data-aos="fade-up">
							<h4 class="font-heading text-subtitle lg:text-title">
								{{store.stepsToParticipate[1]?.title}}
							</h4>
							<div class="h-[4px] bg-primary w-full"/>
							<p class="font-body text-body">
								{{ store.stepsToParticipate[1]?.description }}	
							</p>
						</div>
					</div>

					<div class="grid grid-cols-[4rem_1fr] grid-rows-1 gap-x-[1rem] text-pearl-white">
						<div class="relative pt-[calc(6rem)] z-[1]">
							<svg width="49" height="45" viewBox="0 0 49 45" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full aspect-square">
								<path d="M34.0532 0.508602L48.3827 19.7613L38.8741 41.7973L15.036 44.5807L0.706578 25.328L10.2152 3.29193L34.0532 0.508602Z" fill="#FBC151"/>
							</svg>
						</div>
						<div class="grid grid-cols-1 grid-rows-[7rem_4px_auto] gap-[1rem] h-full" data-aos="fade-up" data-aos-offset="-50">
							<h4 class="font-heading text-subtitle lg:text-title">
								{{ store.stepsToParticipate[2]?.title }}
							</h4>
							<div class="h-[4px] bg-primary w-full"/>
							<p class="font-body text-body">
								{{ store.stepsToParticipate[2]?.description }}
							</p>
						</div>
					</div>

					<div class="absolute top-[calc(8rem+2px)] left-[calc(4rem-3px)] lg:left-[calc(2rem-3px)] z-0 w-[6px] h-[calc(54rem+2px)]">
						<svg viewBox="0 0 6 507" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full h-full">
							<path d="M3 0V507" stroke="#FBC151" stroke-width="5" stroke-dasharray="6 6"/>
						</svg>
					</div>

				</div>
			</section>
			<!-- next event -->
			<section class="w-full h-max grid grid-cols-1 xl:grid-cols-[4fr_6fr] gap-[4rem] lg:px-[12rem] pb-[10rem] lg:py-[5rem] relative gap-y-3">
				
				<div>
					<div class="flex flex-col justify-center h-[45rem] relative w-full">
						<div class="flex flex-col items-end gap-[2rem] absolute lg:-left-[12rem] pr-[4rem] w-full">
							<h2 class="text-white font-heading text-title lg:text-heading text-center lg:text-right w-full pl-[2rem] lg:pl-[12rem]">
								Our next event:
							</h2>
							<div class="w-full flex justify-start">
								<div>
									<svg width="469" height="82" viewBox="0 0 469 82" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
										<path d="M0 0H466.793C468.478 0 469.408 1.95593 468.344 3.26264L404.847 81.2626C404.467 81.7292 403.898 82 403.296 82H0V0Z" fill="#FBC151"/>
									</svg>
								</div>
							</div>
							
						</div>
					</div>
				</div>
				<div class="w-full h-max px-[2rem] lg:px-[0]" data-aos="fade-left">
					<a href="" class="w-full h-max lg:h-[45rem] bg-pearl-white rounded-[40px] grid grid-cols-1 md:grid-cols-[5fr_4fr] auto-rows-auto md:grid-rows-[5fr_5fr] cursor-pointer">
						<div class="font-heading flex flex-col justify-center items-start p-[2rem]">
							<h4 class="text-screen-black text-subtitle md:text-title text-left ">
								{{ store.nextEvent?.title }}
							</h4>
							<h5 class="text-primary text-subtitle md:text-title text-left">
								{{ store.nextEvent?.edition }}
							</h5>
						</div>
						<div class="flex justify-center md:justify-end items-start p-[2rem]">
							<div class="w-[90%] md:w-[100%] h-min rounded-[20px] overflow-hidden shadow-[-1.5rem_1.5rem_0px_0px_#FBC151]">
								<img :src="store.nextEvent?.imageSrc" alt="last event picture" class="w-full">
							</div>
						</div>
						<div class="md:col-span-2 px-[2rem] py-[4rem] lg:py-[0] h-full w-full flex items-center">
							<p class="font-body text-body text-center lg:text-left">
								{{ store.nextEvent?.description }}
							</p>	
						</div>
					</a>
				</div>
			</section>
			<!--Why participate section-->
			<section class="bg-pearl-white text-screenBlack px-[2rem] lg:px-[12rem] flex flex-col gap-[6rem] lg:gap-[10rem] py-[10rem] lg:py-[15rem] [clip-path:polygon(0_5rem,100%_0,100%_calc(100%-5rem),0%_100%)]">
				<div class="w-full flex justify-center">
					<h3 class="font-heading text-subtitle lg:text-heading text-center relative after:absolute after:left-0 after:top-[2rem]  lg:after:top-[7.5rem] after:-z-10 after:w-full after:h-[2rem] lg:after:h-[3rem] after:bg-primary after:-skew-x-[30deg] after:scale-x-[1.1] after:translate-x-2 after:-rotate-[2deg]">
						Why Participate?
					</h3>
				</div>
				<div class="flex flex-col gap-[4rem]">
					<div v-for="reason, i in store.whyParticipate" :key="i" class="w-full flex flex-col items-start gap-[2rem]" data-aos="fade-up">
						<h4 class="font-heading text-subtitle lg:text-title relative after:absolute after:left-0 after:top-[2rem] lg:after:top-[4rem] after:-z-10 after:w-full after:h-[2rem] lg:after:h-[3rem] after:bg-primary after:-skew-x-[30deg] after:scale-x-[1.1] after:translate-x-2 after:-rotate-[2deg]">
							>{{ reason.title }}
						</h4>
						<p class="font-body text-body  lg:text-body lg:font-semibold" data-aos="fade-up">
							{{ reason.description }}
						</p>
					</div>
				</div>
			</section>
			<!--Sponsors-->
			<section class="w-full h-max bg-screenBlack">
				<div class="w-full h-max relative flex justify-center items-center py-[10rem]">
					<div class="relative h-[10rem] w-full flex justify-center items-center">
						<!--TODO: change svg so works on mobile-->
						<div class="w-full absolute top-[2rem] left-0 hidden xl:flex">
							<svg width="1439" height="46" viewBox="0 0 1439 46" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M1439 0.809456L1213.55 9.45089C1213.06 9.46978 1212.59 9.67003 1212.23 10.0132L1194.53 27.1656C1193.22 28.4422 1194.17 30.6707 1196 30.6004L1439 21.2864V0.809456Z" fill="#FBC151"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M0 45.4958L265.844 35.3061C266.355 35.2866 266.839 35.0721 267.196 34.7068L283.956 17.5904C285.221 16.2981 284.257 14.1234 282.45 14.1927L0 25.0188V45.4958Z" fill="#FBC151"/>
							</svg>
						</div>
						<h3 class="font-heading text-center text-subtitle lg:text-heading text-pearl-white">
							Sponsors of the season
						</h3>
					</div>
				</div>
				<!--Main sponsor-->
				<div v-if="store.mainSponsorExists" class="w-full h-max flex flex-col gap-[5rem] lg:gap-0 lg:grid lg:grid-cols-[1fr_25rem] lg:grid-rows-1 lg:gap-x-[10rem] px-[2rem] lg:px-[12rem] py-[12rem] bg-pearl-white [clip-path:polygon(0_5rem,100%_0,100%_calc(100%-5rem),0%_100%)]">
					<div class="flex flex-col gap-[4rem]">
						<h4 class="font-heading text-center text-title lg:text-heading">
							Main Sponsor - {{ store.mainSponsor?.sponsorName }}
						</h4>
						<p class="font-body text-body lg:text-body text-center lg:text-left">
							{{ store.mainSponsor?.description }}
						</p>
					</div>
					<div class="w-full h-full p-[20%] lg:p-0">
						<img 
							:src="store.mainSponsor?.logoSrc"
							alt="main sponsor logo"
							class="w-full max-h-full"
						>
					</div>
				</div>
				<!-- Gold sponsors -->
				<template v-if="store.goldSponsors.length">
					<!-- if there is no silver or bronze sponsors then golden sponsors are just sponsors-->
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
					<div class="px-[2rem] lg:px-[12rem]">
						<div class="flex flex-row justify-center lg:justify-between flex-wrap ">
							<div v-for="(sponsor, i) in store.goldSponsors" :key="i" data-aos="fade-left" :data-aos-delay="i*50" data-aos-offset="20" class="relative w-[35rem] h-[35rem]">
								<!-- background hexagon -->
								<div class="w-full h-full absolute z-[1]">
									<svg width="485" height="485" viewBox="0 0 485 485" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full h-full">
										<path d="M315.567 73.0906L425.715 221.082L352.624 390.468L169.386 411.863L59.2388 263.872L132.329 94.4854L315.567 73.0906Z" fill="#FBC151"/>
										<path d="M309.567 91.0447L407.668 222.852L342.571 373.714L179.372 392.769L81.2699 260.962L146.367 110.1L309.567 91.0447Z" fill="#F2F1F0"/>
									</svg>
								</div>
								<!-- foreground logo and text -->
								<div class="absolute top-0 left-0 w-full h-full grid grid-cols-1 grid-rows-[3fr_2fr] z-[2]">
									<div class="relative w-full h-full">
										<div class="absolute z-[3] w-full h-full top-0 left-[4rem]">
											<div class="relative h-full aspect-square flex justify-center items-center">
												<div class="rounded-full absolute z-[3] h-full w-full top-0 left-0 bg-pearl-white shadow"/>
												<img :src="sponsor.logoSrc" :alt="`${sponsor.sponsorName} logo`" class="relative z-[4]" :style="{width: `${sponsor.logoSize}%`, height: `${sponsor.logoSize}%`}">
											</div>
										</div>
									</div>
									<div class="relative z-[4] w-full flex justify-center items-start pt-[1rem]">
										<p class="font-heading text-subtitle lg:text-subtitle text-screenBlack">{{ sponsor.sponsorName }}</p>
									</div>
								</div>
								
							</div>
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
					<div class="px-[2rem] lg:px-[12rem]">
						<div class="flex flex-row-reverse justify-center lg:justify-between flex-wrap ">
							<div v-for="(sponsor, i) in store.silverSponsors" :key="i" data-aos="fade-left" :data-aos-delay="i*50" data-aos-offset="20" class="relative w-[30rem] h-[30rem]">
								<!-- background hexagon -->
								<div class="w-full h-full absolute z-[1]">
									<svg width="372" height="372" viewBox="0 0 372 372" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full h-full">
										<path d="M242.067 56.0666L326.559 169.588L270.492 299.522L129.934 315.933L45.4412 202.412L101.508 72.4782L242.067 56.0666Z" fill="#757575"/>
										<path d="M237.463 69.839L312.715 170.946L262.78 286.67L137.593 301.287L62.3406 200.18L112.276 84.4558L237.463 69.839Z" fill="#F2F1F0"/>
									</svg>
								</div>
								<!-- foreground logo and text -->
								<div class="absolute top-0 left-0 w-full h-full grid grid-cols-1 grid-rows-[3fr_2fr] z-[2]">
									<div class="relative w-full h-full">
										<div class="absolute z-[3] w-full h-full top-0 left-[4rem]">
											<div class="relative h-full aspect-square flex justify-center items-center">
												<div class="rounded-full absolute z-[3] h-full w-full top-0 left-0 bg-pearl-white shadow"/>
												<img :src="sponsor.logoSrc" :alt="`${sponsor.sponsorName} logo`" class="relative z-[4]" :style="{width: `${sponsor.logoSize}%`, height: `${sponsor.logoSize}%`}">
											</div>
										</div>
									</div>
									<div class="relative z-[4] w-full flex justify-center items-start pt-[1rem]">
										<p class="font-heading text-body lg:text-subtitle text-screenBlack">{{ sponsor.sponsorName }}</p>
									</div>
								</div>
								
							</div>
							<div class="h-[30rem] min-w-[30rem] flex items-center justify-center">
								<p class="font-heading text-subtitle lg:text-subtitle text-pearl-white text-center">Here could <br> be your logo</p>
							</div>
						</div>
					</div>
				</template>
				<!-- bronze sponsors -->
				
				<template v-if="store.bronzeSponsors.length">
					<div class="relative w-full h-max py-[12rem] overflow-x-hidden">
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
					<div class="px-[2rem] lg:px-[12rem]">
						<div class="flex justify-center lg:justify-between flex-wrap ">
							<div v-for="(sponsor, i) in store.bronzeSponsors" :key="i" data-aos="fade-left" :data-aos-delay="i*50" data-aos-offset="20" class="relative w-[25rem] h-[25rem]">
								<!-- background hexagon -->
								<div class="w-full h-full absolute z-[1]">
									<svg width="293" height="293" viewBox="0 0 293 293" fill="none" xmlns="http://www.w3.org/2000/svg" preserve-aspect-ratio="none" class="w-full h-full">
										<path d="M190.66 44.16L257.209 133.574L213.049 235.914L102.34 248.84L35.7908 159.426L79.9508 57.0863L190.66 44.16Z" fill="#CD7F32"/>
										<path d="M187.034 55.0074L246.306 134.643L206.975 225.791L108.373 237.304L49.1018 157.668L88.4324 66.5201L187.034 55.0074Z" fill="#F2F1F0"/>
									</svg>
								</div>
								<!-- foreground logo and text -->
								<div class="absolute top-0 left-0 w-full h-full grid grid-cols-1 grid-rows-[3fr_2fr] z-[2]">
									<div class="relative w-full h-full">
										<div class="absolute z-[3] w-full h-full top-0 left-[4rem]">
											<div class="relative h-full aspect-square flex justify-center items-center">
												<div class="rounded-full absolute z-[3] h-full w-full top-0 left-0 bg-pearl-white shadow"/>
												<img :src="sponsor.logoSrc" :alt="`${sponsor.sponsorName} logo`" class="relative z-[4]" :style="{width: `${sponsor.logoSize}%`, height: `${sponsor.logoSize}%`}">
											</div>
										</div>
									</div>
									<div class="relative z-[4] w-full flex justify-center items-start pt-[1rem]">
										<p class="font-heading text-body lg:text-body text-screenBlack">{{ sponsor.sponsorName }}</p>
									</div>
								</div>
								
							</div>
							<div class="h-[25rem] min-w-[25rem] flex items-center justify-center">
								<p class="font-heading text-subtitle lg:text-subtitle text-pearl-white text-center ">Here could <br> be your logo</p>
							</div>
						</div>
					</div>
				</template>
			</section>
			<!-- social media -->
			<section class="w-full px-[2rem] lg:px-[12rem] h-max py-[10rem] flex flex-col gap-[5rem] lg:gap-0 lg:grid lg:grid-cols-2">
				<div class="w-full flex text-center lg:text-left justify-center lg:justify-start items-center">
					<h4 class="font-heading text-title lg:text-heading text-pearl-white relative z-[2]">
						<span class="relative z-[2] after:absolute after:left-0 after:top-[4rem] lg:after:top-[8rem] after:-z-[1] after:w-full after:h-[3rem] after:bg-primary after:-skew-x-[30deg] after:scale-x-[1.1] after:translate-x-2 after:-rotate-[2deg]">
							Follow us
						</span> 
						<br> 
						on social Media
					</h4>
				</div>
				<div class="flex lg:flex-row justify-center items-center w-full">
					<div class="flex gap-[5rem]">
						<a v-for="(socialMedia, i) in store.socialMediaLinks" :key="i" :href="socialMedia.url" class="aspect-square h-[6rem] lg:h-[10rem] lg:hover:scale-110 lg:hover:rotate-12 transition-all duration-75">
							<svg v-if="socialMedia.platform == 'instagram'" width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M12.584 0H91.416C98.3424 0 104 5.69591 104 12.646V91.354C104 98.3145 98.332 104 91.416 104H12.584C5.6576 104 0 98.3041 0 91.354V12.646C0 5.68546 5.668 0 12.584 0ZM11.232 42.8186H21.6216C20.54 45.9853 19.9472 49.3715 19.9472 52.904C19.9472 70.3262 34.2992 84.4458 52 84.4458C69.7008 84.4458 84.0528 70.3262 84.0528 52.904C84.0528 49.382 83.46 45.9853 82.3784 42.8186H92.768V86.6092C92.768 89.7132 90.2408 92.2424 87.1624 92.2424H16.4112C13.5616 92.2424 11.232 89.9013 11.232 87.0377V42.8186ZM75.6496 10.3049H87.724C90.4488 10.3049 92.6848 12.5519 92.6848 15.2901V26.567C92.6848 29.3052 90.4488 31.5522 87.724 31.5522H75.6496C72.9248 31.5522 70.6888 29.3052 70.6888 26.567V15.2901C70.6888 12.5519 72.9248 10.3049 75.6496 10.3049ZM52.0312 30.6848C63.5232 30.6848 72.8416 39.8609 72.8416 51.1691C72.8416 62.4773 63.5232 71.6535 52.0312 71.6535C40.5392 71.6535 31.2208 62.4773 31.2208 51.1691C31.2208 39.8609 40.5392 30.6848 52.0312 30.6848Z" fill="#FBC151"/>
							</svg>
							<svg v-if="socialMedia.platform == 'facebook'" width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<path d="M98.2597 0H5.74031C4.21789 0 2.75782 0.604781 1.6813 1.6813C0.604781 2.75782 0 4.21789 0 5.74031L0 98.2597C0 99.7821 0.604781 101.242 1.6813 102.319C2.75782 103.395 4.21789 104 5.74031 104H55.5547V63.7812H42.0469V48.0391H55.5547V36.4609C55.5547 23.0283 63.7589 15.7137 75.7453 15.7137C81.4836 15.7137 86.4175 16.1403 87.8516 16.3231V30.3611H79.5844C73.0641 30.3611 71.8006 33.4587 71.8006 38.0067V48.0391H87.3884L85.3572 63.7812H71.8006V104H98.2556C99.0098 104.001 99.7567 103.852 100.454 103.564C101.151 103.276 101.784 102.853 102.317 102.32C102.851 101.787 103.274 101.154 103.563 100.457C103.851 99.7606 104 99.0139 104 98.2597V5.74031C104 4.21789 103.395 2.75782 102.319 1.6813C101.242 0.604781 99.7821 0 98.2597 0Z" fill="#FBC151"/>
							</svg>
							<svg v-if="socialMedia.platform == 'telegram'" width="94" height="84" viewBox="0 0 94 84" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<path d="M6.46107 36.1617C31.6988 24.3084 48.5239 16.4933 56.9364 12.7177C80.9839 1.93636 85.9747 0.0638868 89.2342 0.000562376C89.951 -0.0119458 91.547 0.179093 92.5884 1.08763C93.454 1.85324 93.6974 2.88865 93.8192 3.61489C93.9274 4.34113 94.0762 5.99633 93.9544 7.2884C92.656 22.0466 87.0161 57.86 84.1488 74.3901C82.9451 81.3845 80.5511 83.7294 78.2384 83.9584C73.2071 84.4571 69.393 80.3767 64.524 76.9363C56.9094 71.5507 52.6084 68.1995 45.2103 62.9452C36.6624 56.8727 42.2077 53.5346 47.0767 48.0805C48.3481 46.6528 70.502 24.9312 70.9213 22.961C70.9754 22.7145 71.0295 21.7958 70.5156 21.3116C70.0151 20.826 69.2713 20.9922 68.7303 21.1235C67.9593 21.3101 55.8003 29.9842 32.2127 47.1443C28.7638 49.7022 25.6395 50.949 22.8263 50.8834C19.7426 50.8119 13.7916 48.9992 9.36895 47.4505C3.95894 45.5503 -0.35554 44.5455 0.0231604 41.3183C0.212511 39.6383 2.36299 37.9189 6.46107 36.1617Z" fill="#FBC151"/>
							</svg>
							<svg v-if="socialMedia.platform == 'youtube'" width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M2.33362 12.8257L24.7014 1.95364L23.8585 0.21936L1.49067 11.0914C0.500216 11.5728 -0.0546888 12.6492 0.127692 13.7352L4.12639 37.5467C4.30877 38.6327 5.18484 39.4688 6.27821 39.6003L30.9704 42.5694L31.2006 40.6549L6.50842 37.6858C6.26433 37.6564 6.06876 37.4698 6.02804 37.2273L2.02935 13.4159C1.98863 13.1734 2.11251 12.9331 2.33362 12.8257ZM27.2481 13.8903L36.8813 21.7174H11.7123V23.6457H36.8813L27.2481 31.4727L28.464 32.9693L40.2049 23.4298L41.1259 22.6815L40.2049 21.9332L28.464 12.3938L27.2481 13.8903Z" fill="#FBC151"/>
							</svg>					
						</a>
					</div>
				</div>
			</section>
		</div>
	</DefaultLayout>
</template>
<style scoped lang="pcss">

.signUpBtn{
	position: relative;
	.signUpBtn_Bg{
		position: absolute;
		left: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		z-index: 30;
		transform: scaleY(0);
		transform-origin: bottom;
		transition: transform .1s;
	}
	p{
		transition: color .1s;
		z-index: 31;
	}
}

.signUpBtn:hover{
	.signUpBtn_Bg{
		transform: scaleY(1);
	}
}

.down-arrow{
	transition: all .1s;
	animation-name: arrow-down-movement;
	animation-duration: 2.5s;
	animation-iteration-count: infinite;
	animation-delay: 2s;
	opacity: 0;
}

@keyframes arrow-down-movement{
	0%{
		transform: translateY(0);
		opacity: 0;
	}
	20%{
		transform: translateY(0);
		opacity: 1;
	}
	70%{
		opacity: 0.9
	}
	100%{
		transform: translateY(50%);
		opacity:0
	}
}


</style>