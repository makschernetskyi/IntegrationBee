<script setup lang="ts">
import Defaultlayout from "@/layouts/Default.vue"
import {ref, useTemplateRef} from 'vue'

const news: {title:string, content:string, date:string, pictureSrc: string|null, pictureAlt?:string, comments: any[]}[] = [
	{
		title: "Integration Bee 2024 Registration Open",
		content: "The much-awaited Integration Bee Vienna 2024 has opened its registration! Get ready to challenge your calculus skills in this exciting competition. Participants will compete in multiple rounds solving integral problems for a chance to win fantastic prizes. Don't miss out! solving integral problems for a chance to win fantastic prizes solving integral problems for a chance to win fantastic prizes solving integral problems for a chance to win fantastic prizes solving integral problems for a chance to win fantastic prizes solving integral problems for a chance to win fantastic prizes solving integral problems for a chance to win fantastic prizes solving integral problems for a chance to win fantastic prizessolving integral problems for a chance to win fantastic prizes solving integral problems for a chance to win fantastic prizes",
		date: "01. November 2024 14:00",
		pictureSrc: "https://images.stockcake.com/public/0/c/b/0cbad396-aeaf-4324-b837-be700315045d_large/students-studying-outdoors-stockcake.jpg",
		pictureAlt: "students in a park",
		comments: [{
			author: "Judy",
			text: "How do I log in?"
		},
		{
			author: "Judy",
			text: "How do I log in?"
		},
		{
			author: "Judy",
			text: "How do I log in?"
		}
	],
	},
	{
		title: "Formamind Partners with Local Universities",
		content: "Formamind has officially partnered with several universities in Austria to provide hands-on workshops and talks on modern software development practices. These events aim to bridge the gap between academic knowledge and industry requirements. Students can gain insights from professionals and participate in real-world projects, helping them prepare for careers in software development. Stay tuned for upcoming event dates and details on how to register!",
		date: "15. October 2024 10:30",
		pictureSrc: null,
		comments: [],
	},
	{
		title: "New AI-Powered Messenger App Launched",
		content: "Formamind has launched a new messenger app that uses AI for enhanced message management.",
		date: "05. October 2024 08:15",
		pictureSrc: null,
		comments: [],
	},
	{
		title: "Integration Bee 2024 Sponsors Announced",
		content: "We are proud to announce our sponsors for Integration Bee Vienna 2024! A big thanks to EY, Red Bull, and other incredible partners. Their contributions ensure the event's success and help us provide exciting prizes for participants.",
		date: "30. September 2024 12:45",
		pictureSrc: null,
		comments: [],
	},
	{
		title: "Vienna Math Faculty Hosts Career Fair",
		content: "The University of Vienna’s Math Faculty will host a career fair next month. Companies from various industries, including finance, software development, and data science, will be there to network with students. It's a perfect opportunity to explore job options and internships in the field.",
		date: "20. September 2024 09:00",
		pictureSrc: null,
		comments: [],
	}
];

const fullViewNews = ref<{title:string, content:string, date:string, pictureSrc: string|null, pictureAlt?:string, comments: any[]}|null>(
	null
)

const hidefullViewNews = () =>{
	fullViewNews.value = null
	document.getElementsByTagName('body')[0].style.overflowY='auto'
	document.removeEventListener('click', hidefullViewNews)
}

const showFullNews = (newsItem:any) =>{
	fullViewNews.value = newsItem
	document.getElementsByTagName('body')[0].style.overflowY='hidden'
	document.removeEventListener('click', hidefullViewNews)
	document.addEventListener('click', hidefullViewNews)
}

const fullScreenInput = useTemplateRef<HTMLTextAreaElement>('fullScreenInputRef')

function switchFocusToFullScreenInput(newsItem:any){
	//TODO: rewrite it so it makes more sense
	
	showFullNews(newsItem)

	setTimeout(()=>{
		if(fullScreenInput.value){
			fullScreenInput.value.scrollIntoView()
			fullScreenInput.value.focus()
		}
	},10)
	
}



</script>
<template>
	<Defaultlayout>
		<div class="w-full px-[2rem] lg:px-[12rem] bg-screenBlack flex justify-center pt-[8rem] pb-[2rem] lg:pt-[16rem]">
			<h1 class="font-heading text-subtitle lg:text-title text-center text-pearl-white">
				News of our community
			</h1>
		</div>
		<div class="w-full px-[2rem] lg:px-[12rem] bg-pearl-white flex flex-col justify-center py-[5rem]">

			<MasonryWall :items="news" :max-columns="2" :column-width="300" :gap="16">
				<template #default="{ item : newsItem, index }">
					<div class="item bg-white flex flex-col gap-[2rem] p-8 rounded-[2.5rem] text-body font-body cursor-pointer text-screenBlack" @click="(event)=>{event.stopPropagation();showFullNews(newsItem)}">
						<div class="grid md:grid-cols-[1fr_20rem] grid-cols-1 gap-x-[1rem]">
							<h2 class="font-semibold">{{newsItem.title}}</h2>
							<p class="md:flex flex-wrap text-right text-body hidden">{{ newsItem.date }}</p>
						</div>
						<div class="md:hidden flex">
							<p class="flex flex-wrap text-right text-body">{{ newsItem.date }}</p>
						</div>
						<div>
							<p>{{newsItem.content.split('').slice(0,300).join('')}}</p>
							<template v-if="newsItem.content.length > 300">
								<br>
								<p>
									Click to see more...
								</p>
							</template>
						</div>
						<div v-if="newsItem.pictureSrc" class="w-full max-h-[50rem] overflow-hidden rounded-[1.5rem]">
							<img :src="newsItem.pictureSrc" :alt="newsItem.pictureAlt" class="w-full">
						</div>
						<!--comments-->
						<div class="text-text-sm w-full flex flex-col gap-[2rem]">
							<div v-if="newsItem.comments.length" class="w-full bg-pearl-white py-[2rem] px-[1rem] rounded-[1.5rem]">
								<div>
									{{newsItem.comments.at(-1).author}} : {{newsItem.comments.at(-1).text}}
								</div>
							</div>
							<div class="w-full h-[4rem] flex flex-row gap-[1rem]">
								<input type="text" @click="(event)=>{event.stopImmediatePropagation();switchFocusToFullScreenInput(newsItem)}" @touchstart="(event)=>{event.stopImmediatePropagation();switchFocusToFullScreenInput(newsItem)}"  placeholder="leave your comment" class="flex-1 h-full px-[1rem] border-2 rounded-[1.5rem] border-screenBlack-400">
								<button>
									<svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M27.0877 0.459628L0.819375 6.77175C-0.104884 6.99385 -0.22705 8.25886 0.637627 8.65372L10.2695 13.0522C10.5715 13.1901 10.9222 13.1691 11.2056 12.9963L21.0078 7.01824L13.6037 15.5091C13.3689 15.7783 13.2956 16.1523 13.4113 16.4903L16.4965 25.502C16.7948 26.3731 18.0122 26.4123 18.3659 25.5622L28.2446 1.81605C28.5587 1.06092 27.8829 0.268539 27.0877 0.459628Z" fill="#FBC151"/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</template>
			</MasonryWall>

		</div>
		<div class="w-full flex items-end p-0 h-[7rem] bg-pearl-white">
			<div class="w-full h-[5rem] bottom-0 bg-screenBlack [clip-path:polygon(0_5rem,100%_0,100%_100%,0%_100%)]"/>
		</div>
		
		<!-- modal full screeen view --> 
		<div v-if="fullViewNews" class="fixed top-0 left-0 w-full h-full bg-black-100 bg-opacity-40 flex justify-center items-center z-[501]">
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
			<!--news content-->
			<div class="w-full justify-center overflow-y-auto h-[100vh] px-[2rem] pt-[6rem] lg:pt-0">
				<div class="w-full min-h-full h-max flex justify-center items-center py-[4rem]">
					<div class="item bg-white flex flex-col gap-[2rem] p-8 rounded-[2.5rem] text-body font-body overflow-auto text-screenBlack w-full md:w-[70rem]" @click="(event)=>{event.stopPropagation()}">
						<div class="grid md:grid-cols-[1fr_20rem] grid-cols-1 gap-x-[1rem]">
							<h2 class="font-semibold">{{fullViewNews.title}}</h2>
							<p class="md:flex flex-wrap text-right text-body hidden">{{ fullViewNews.date }}</p>
						</div>
						<div class="md:hidden flex">
							<p class="flex flex-wrap text-right text-body">{{ fullViewNews.date }}</p>
						</div>
						<div>
							<p>{{fullViewNews.content}}</p>
						</div>
						<div v-if="fullViewNews.pictureSrc" class="w-full h-max max-h-[50rem] overflow-hidden rounded-[0.7rem]">
							<img :src="fullViewNews.pictureSrc" :alt="fullViewNews.pictureAlt" class="w-full">
						</div>
						<!--comments-->
						<div class="text-text-sm w-full flex flex-col gap-[2rem]">
							<div v-if="fullViewNews.comments.length" class="w-full bg-pearl-white py-[2rem] px-[1rem] rounded-[1.5rem] max-h-[10rem] overflow-y-auto">
								<div class="w-full flex flex-col gap-[1rem]">
									<div v-for="comment in fullViewNews.comments">
										{{comment.author}} : {{comment.text}}
									</div>
								</div>
							</div>
							<div class="w-full h-[4rem] flex flex-row gap-[1rem]">
								<textarea placeholder="leave your comment" ref="fullScreenInputRef" class="resize-none scrollbar-hidden flex-1 pt-[1rem] h-full px-[1rem] border-2 rounded-[1.5rem] border-screenBlack-400"/>
								<button>
									<svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M27.0877 0.459628L0.819375 6.77175C-0.104884 6.99385 -0.22705 8.25886 0.637627 8.65372L10.2695 13.0522C10.5715 13.1901 10.9222 13.1691 11.2056 12.9963L21.0078 7.01824L13.6037 15.5091C13.3689 15.7783 13.2956 16.1523 13.4113 16.4903L16.4965 25.502C16.7948 26.3731 18.0122 26.4123 18.3659 25.5622L28.2446 1.81605C28.5587 1.06092 27.8829 0.268539 27.0877 0.459628Z" fill="#FBC151"/>
									</svg>
								</button>
							</div>
						</div>
					</div>
					
				</div>
			</div>
			
		</div>
	</Defaultlayout>
</template>
<style scoped lang="pcss">


.scrollbar-hidden {
  overflow: auto; /* Allow scrolling */
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For IE and Edge */
}

.scrollbar-hidden::-webkit-scrollbar {
  width: 0;
  height: 0;
}

</style>