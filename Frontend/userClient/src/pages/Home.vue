<script setup lang="ts">
	import DefaultLayout from "@/layouts/Default.vue"
	import VideoPlayer from "@/components/VideoPlayer.vue";

	const videoOptions =  {
        autoplay: false,
        controls: true,
        sources: [
        	{
            	src: 'https://youtu.be/1c6uazlr3Eo',
            	type: 'video/youtube'
        	}
    	]
    }

	const mainSponsorExists = true;
	const goldSponsors: {logoSrc: string, sponsorName: string, logoSize: string}[] = [
		{
			logoSrc: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pepsi_2023.svg",
			sponsorName: "Pepsi",
			logoSize: "80",
		},
		{
			logoSrc: "https://i.ibb.co/R0M0c2r/f7c4e79795462376574a59ec122228e9.png",
			sponsorName: "EY",
			logoSize: "60",
		},
		
	]

</script>
<template>
	<DefaultLayout>
		<div class="top-0 h-max bg-screenBlack overflow-x-hidden">
			<!-- first welcome section -->
			<section class="top-0 flex justify-start items-center lg:min-h-[40rem] h-[111vh] bg-home-bg px-[2rem] lg:px-[12rem] bg-no-repeat bg-cover [clip-path:polygon(0_0,100%_0,100%_90%,0%_100%)] relative">
				<div class="flex flex-col font-body text-pearl-white gap-[3rem] w-full">
					<div class="flex flex-col gap-0" data-aos="fade-right" data-aos-offset="0">
						<h1 class="font-heading text-title lg:text-heading">INTEGRATION BEE</h1>
						<h2 class="font-heading text-primary text-subtitle lg:text-title">AUSTRIA</h2>
						<h3 class="text-body lg:text-title">come integrate<br/>and bee integrated</h3>
					</div>
					<div class="flex justify-between md:justify-start items-center w-full md:gap-[2.4rem] lg:text-body">
						<!-- sign in and learn more buttons -->
						<a href="" class="rounded-2xl text-secondary bg-primary w-[16rem] h-[6rem] lg:w-[18rem] lg:h-[6rem] flex justify-center items-center text-body font-semibold">Sign in</a>
						<a href="" class="border-pearl-white border-2 rounded-2xl w-[16rem] h-[6rem] lg:w-[18rem] lg:h-[6rem] flex justify-center items-center text-body font-semibold overflow-hidden signUpBtn">
							<p class="relative">Learn More</p>
							<div class="signUpBtn_Bg bg-pearl-white hidden lg:flex"/>
						</a>
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
			<section class="w-full h-max grid grid-cols-1 lg:grid-cols-[4fr_5fr] gap-[6rem] lg:gap-[4rem] px-[2rem] lg:px-[12rem] py-[10rem]">
				<div class="w-full h-max flex justify-center items-center">
					<div class="text-pearl-white flex flex-col items-center lg:items-start gap-[2rem]">
						<h3 class="font-heading text-title" data-aos="fade-up">
							What is It
						</h3>
						<p class="font-base text-body text-center lg:text-left" data-aos="fade-up">
							Integration Bee is an integral solving competition pioneered in 1981 by Andy Bernoff, a mathematics student at MIT. 16 people participate, each round 2 of them solve integrals on time, until there is only one winner. The idea was implemented in different universities around the world and we brought it to Austria!
							Here is a video example of our last competitions
						</p>
					</div>
				</div>
				<!-- video example -->
				<div class="flex justify-center items-center w-full lg:px-[3rem]">
					<video-player :options="videoOptions" class=" rounded-[30px] lg:rounded-3xl w-full aspect-video border-pearl-white border-4 box-content"/>
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
							<div class="left-0">
								<svg width="752" height="82" viewBox="0 0 752 82" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full -scale-x-[1]">
									<path d="M752 0H0L106.578 82H752V0Z" fill="#FBC151"/>
								</svg>
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
							<h4 class="font-heading text-subtitle lg:text-title">Set up an account</h4>
							<div class="h-[4px] bg-primary w-full"/>
							<p class="font-body text-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, sit?</p>
						</div>
					</div>

					<div class="grid grid-cols-[4rem_1fr] grid-rows-1 gap-x-[1rem] text-pearl-white">
						<div class="relative pt-[calc(6rem)] z-[1]">
							<svg width="49" height="45" viewBox="0 0 49 45" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full aspect-square">
								<path d="M34.0532 0.508602L48.3827 19.7613L38.8741 41.7973L15.036 44.5807L0.706578 25.328L10.2152 3.29193L34.0532 0.508602Z" fill="#FBC151"/>
							</svg>
						</div>
						<div class="grid grid-cols-1 grid-rows-[7rem_4px_auto] gap-[1rem] h-full" data-aos="fade-up">
							<h4 class="font-heading text-subtitle lg:text-title">Choose an event</h4>
							<div class="h-[4px] bg-primary w-full"/>
							<p class="font-body text-body">On page “Events” find a competition you want to participate in and click “Request participation”</p>
						</div>
					</div>

					<div class="grid grid-cols-[4rem_1fr] grid-rows-1 gap-x-[1rem] text-pearl-white">
						<div class="relative pt-[calc(6rem)] z-[1]">
							<svg width="49" height="45" viewBox="0 0 49 45" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full aspect-square">
								<path d="M34.0532 0.508602L48.3827 19.7613L38.8741 41.7973L15.036 44.5807L0.706578 25.328L10.2152 3.29193L34.0532 0.508602Z" fill="#FBC151"/>
							</svg>
						</div>
						<div class="grid grid-cols-1 grid-rows-[7rem_4px_auto] gap-[1rem] h-full" data-aos="fade-up" data-aos-offset="-50">
							<h4 class="font-heading text-subtitle lg:text-title">join it</h4>
							<div class="h-[4px] bg-primary w-full"/>
							<p class="font-body text-body">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, sit?</p>
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
			<section class="w-full h-max grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-[4rem] lg:px-[12rem] pb-[10rem] lg:py-[5rem] relative gap-y-3">
				
				<div>
					<div class="flex flex-col justify-center h-[45rem] relative w-full">
						<div class="flex flex-col items-end gap-[2rem] absolute lg:-left-[12rem] pr-[4rem] w-full">
							<h2 class="text-white font-heading text-title lg:text-heading text-center lg:text-right w-full pl-[2rem] lg:pl-[12rem]">
								Our next event:
							</h2>
							<div class="left-0">
								<svg width="752" height="82" viewBox="0 0 752 82" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full -scale-x-[1]">
									<path d="M752 0H0L106.578 82H752V0Z" fill="#FBC151"/>
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div class="w-full h-max px-[2rem] lg:px-[0]" data-aos="fade-left">
					<a href="" class="w-full h-max lg:h-[45rem] bg-pearl-white rounded-[40px] grid grid-cols-1 lg:grid-cols-[5fr_4fr] auto-rows-auto lg:grid-rows-[5fr_5fr] cursor-pointer">
						<div class="font-heading flex flex-col justify-center items-start p-[2rem]">
							<h4 class="text-screen-black text-subtitle lg:text-title text-left ">
								Integration Bee Vienna 2024
							</h4>
							<h5 class="text-primary text-subtitle lg:text-title text-left">
								Autumn Edition
							</h5>
						</div>
						<div class="flex justify-center lg:justify-end items-start p-[2rem]">
							<div class="w-[90%] lg:w-[100%] h-min rounded-[20px] overflow-hidden shadow-[-1.5rem_1.5rem_0px_0px_#FBC151]">
								<img src="https://i.ibb.co/vjSc7m2/DSC00228-1.jpg" alt="last event picture" class="w-full">
							</div>
						</div>
						<div class="lg:col-span-2 px-[2rem] py-[4rem] lg:py-[0] h-full w-full flex items-center">
							<p class="font-body text-body text-center lg:text-left">
								Get ready for the Integration Bee Vienna Autumn 2024! A fun, fast-paced math competition where you and your friends can battle it out solving integrals. Bring your best, enjoy the buzz, and see if you’ve got what it takes to win!
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
					<div class="w-full flex flex-col items-start gap-[2rem]" data-aos="fade-up">
						<h4 class="font-heading text-subtitle lg:text-title relative after:absolute after:left-0 after:top-[2rem] lg:after:top-[4rem] after:-z-10 after:w-full after:h-[2rem] lg:after:h-[3rem] after:bg-primary after:-skew-x-[30deg] after:scale-x-[1.1] after:translate-x-2 after:-rotate-[2deg]">
							>Fight the math
						</h4>
						<p class="font-body text-body  lg:text-body lg:font-semibold" data-aos="fade-up">
							Doing math is fun and integrals are not an exception. The beauty of math is when you sit in front of a problem and that little light suddenly turns on above your head. Except this time the consequence of that light bulb is a whole room cheering for you!
						</p>
					</div>
					<div class="w-full flex flex-col items-start gap-[2rem]" data-aos="fade-up">
						<h4 class="font-heading text-subtitle lg:text-title relative after:absolute after:left-0 after:top-[2rem] lg:after:top-[4rem] after:-z-10 after:w-full after:h-[2rem] lg:after:h-[3rem] after:bg-primary after:-skew-x-[30deg] after:scale-x-[1.1] after:translate-x-2 after:-rotate-[2deg]">
							>Fight the math
						</h4>
						<p class="font-body text-body  lg:text-body lg:font-semibold" data-aos="fade-up">
							Doing math is fun and integrals are not an exception. The beauty of math is when you sit in front of a problem and that little light suddenly turns on above your head. Except this time the consequence of that light bulb is a whole room cheering for you!
						</p>
					</div>
					<div class="w-full flex flex-col items-start gap-[2rem]" data-aos="fade-up">
						<h4 class="font-heading text-subtitle lg:text-title relative after:absolute after:left-0 after:top-[2rem] lg:after:top-[4rem] after:-z-10 after:w-full after:h-[2rem] lg:after:h-[3rem] after:bg-primary after:-skew-x-[30deg] after:scale-x-[1.1] after:translate-x-2 after:-rotate-[2deg]">
							>Fight the math
						</h4>
						<p class="font-body text-body  lg:text-body lg:font-semibold" data-aos="fade-up">
							Doing math is fun and integrals are not an exception. The beauty of math is when you sit in front of a problem and that little light suddenly turns on above your head. Except this time the consequence of that light bulb is a whole room cheering for you!
						</p>
					</div>
				</div>
			</section>
			<!--Sponsors-->
			<section class="w-full h-max bg-screenBlack">
				<div class="w-full h-max relative flex justify-center items-center py-[10rem]">
					<div class="relative h-[10rem] w-full flex justify-center items-center">
						<!--TODO: change svg so vors on mobile-->
						<div class="w-full absolute top-[2rem] left-0 hidden lg:flex">
							<svg width="1439" height="46" viewBox="0 0 1439 46" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="aspect-auto w-full">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M1439 0.80957L1212.78 9.48034L1190.78 30.8006L1439 21.2865V0.80957Z" fill="#FBC151"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M0 45.4956L266.639 35.2754L287.471 14L0 25.0186V45.4956Z" fill="#FBC151"/>
							</svg>
						</div>
						<h3 class="font-heading text-center text-subtitle lg:text-heading text-pearl-white">
							Sponsors of the season
						</h3>
					</div>
				</div>
				<!--Main sponsor-->
				<div v-if="mainSponsorExists" class="w-full h-max flex flex-col gap-[5rem] lg:gap-0 lg:grid lg:grid-cols-[1fr_25rem] lg:grid-rows-1 lg:gap-x-[10rem] px-[2rem] lg:px-[12rem] py-[12rem] bg-pearl-white [clip-path:polygon(0_5rem,100%_0,100%_calc(100%-5rem),0%_100%)]">
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
						<div v-for="(sponsor, i) in goldSponsors" :key="i" data-aos="fade-left" :data-aos-delay="i*50" data-aos-offset="20" class="relative w-[35rem] h-[35rem]">
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
						<div v-for="(sponsor, i) in goldSponsors" :key="i" data-aos="fade-left" :data-aos-delay="i*50" data-aos-offset="20" class="relative w-[30rem] h-[30rem]">
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
						<div v-for="(sponsor, i) in goldSponsors" :key="i" data-aos="fade-left" :data-aos-delay="i*50" data-aos-offset="20" class="relative w-[25rem] h-[25rem]">
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
						<a href="www.intagram.com" class="aspect-square h-[6rem] lg:h-[10rem] hover:scale-110 hover:rotate-12 transition-all duration-75">
							<svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M12.584 0H91.416C98.3424 0 104 5.69591 104 12.646V91.354C104 98.3145 98.332 104 91.416 104H12.584C5.6576 104 0 98.3041 0 91.354V12.646C0 5.68546 5.668 0 12.584 0ZM11.232 42.8186H21.6216C20.54 45.9853 19.9472 49.3715 19.9472 52.904C19.9472 70.3262 34.2992 84.4458 52 84.4458C69.7008 84.4458 84.0528 70.3262 84.0528 52.904C84.0528 49.382 83.46 45.9853 82.3784 42.8186H92.768V86.6092C92.768 89.7132 90.2408 92.2424 87.1624 92.2424H16.4112C13.5616 92.2424 11.232 89.9013 11.232 87.0377V42.8186ZM75.6496 10.3049H87.724C90.4488 10.3049 92.6848 12.5519 92.6848 15.2901V26.567C92.6848 29.3052 90.4488 31.5522 87.724 31.5522H75.6496C72.9248 31.5522 70.6888 29.3052 70.6888 26.567V15.2901C70.6888 12.5519 72.9248 10.3049 75.6496 10.3049ZM52.0312 30.6848C63.5232 30.6848 72.8416 39.8609 72.8416 51.1691C72.8416 62.4773 63.5232 71.6535 52.0312 71.6535C40.5392 71.6535 31.2208 62.4773 31.2208 51.1691C31.2208 39.8609 40.5392 30.6848 52.0312 30.6848Z" fill="#FBC151"/>
							</svg>							
						</a>
						<a href="www.facebook.com" class="aspect-square h-[6rem] lg:h-[10rem] hover:scale-110 hover:rotate-12 transition-all duration-75">
							<svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<path d="M98.2597 0H5.74031C4.21789 0 2.75782 0.604781 1.6813 1.6813C0.604781 2.75782 0 4.21789 0 5.74031L0 98.2597C0 99.7821 0.604781 101.242 1.6813 102.319C2.75782 103.395 4.21789 104 5.74031 104H55.5547V63.7812H42.0469V48.0391H55.5547V36.4609C55.5547 23.0283 63.7589 15.7137 75.7453 15.7137C81.4836 15.7137 86.4175 16.1403 87.8516 16.3231V30.3611H79.5844C73.0641 30.3611 71.8006 33.4587 71.8006 38.0067V48.0391H87.3884L85.3572 63.7812H71.8006V104H98.2556C99.0098 104.001 99.7567 103.852 100.454 103.564C101.151 103.276 101.784 102.853 102.317 102.32C102.851 101.787 103.274 101.154 103.563 100.457C103.851 99.7606 104 99.0139 104 98.2597V5.74031C104 4.21789 103.395 2.75782 102.319 1.6813C101.242 0.604781 99.7821 0 98.2597 0Z" fill="#FBC151"/>
							</svg>
						</a>
						<a href="www.facebook.com" class="aspect-square h-[6rem] lg:h-[10rem] hover:scale-110 hover:rotate-12 transition-all duration-75">
							<svg width="94" height="84" viewBox="0 0 94 84" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<path d="M6.46107 36.1617C31.6988 24.3084 48.5239 16.4933 56.9364 12.7177C80.9839 1.93636 85.9747 0.0638868 89.2342 0.000562376C89.951 -0.0119458 91.547 0.179093 92.5884 1.08763C93.454 1.85324 93.6974 2.88865 93.8192 3.61489C93.9274 4.34113 94.0762 5.99633 93.9544 7.2884C92.656 22.0466 87.0161 57.86 84.1488 74.3901C82.9451 81.3845 80.5511 83.7294 78.2384 83.9584C73.2071 84.4571 69.393 80.3767 64.524 76.9363C56.9094 71.5507 52.6084 68.1995 45.2103 62.9452C36.6624 56.8727 42.2077 53.5346 47.0767 48.0805C48.3481 46.6528 70.502 24.9312 70.9213 22.961C70.9754 22.7145 71.0295 21.7958 70.5156 21.3116C70.0151 20.826 69.2713 20.9922 68.7303 21.1235C67.9593 21.3101 55.8003 29.9842 32.2127 47.1443C28.7638 49.7022 25.6395 50.949 22.8263 50.8834C19.7426 50.8119 13.7916 48.9992 9.36895 47.4505C3.95894 45.5503 -0.35554 44.5455 0.0231604 41.3183C0.212511 39.6383 2.36299 37.9189 6.46107 36.1617Z" fill="#FBC151"/>
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
	p{
		/* secondary color */
		color: rgb(0, 29, 55);
	}
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