<script setup lang="ts">
import DefaultLayout from '@/layouts/Default.vue';
import { useEventsPageStore } from '@/stores/eventsPageStore/eventsPageStore';
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';


const store = useEventsPageStore()
const {searchQuery} = storeToRefs(store)

onBeforeMount(()=>{
	(async()=>await store.fetchEvents())()
})

const handleSearchClick = async () =>{
	store.fetchEvents(1, searchQuery.value)
}


</script>
<template>
	<DefaultLayout>
		<div class="w-full px-[2rem] lg:px-[12rem] bg-screenBlack flex justify-center pt-[8rem] pb-[2rem] lg:pt-[16rem]">
			<h1 class="font-heading text-subtitle lg:text-title text-center text-pearl-white">
				{{store.title}}
			</h1>
		</div>
		<div class="w-full px-[2rem] lg:px-[12rem] bg-pearl-white flex flex-col justify-center py-[5rem]">
			<!-- searchbar NOT IMPLEMENTED IN BACKEND YET-->
			<!-- <div class="w-full">
				<div class="w-full h-[5rem] rounded-3xl bg-white-100 grid grid-cols-[1fr_5rem]">
					<input v-model="searchQuery" type="text" placeholder="Find Compeition you are looking for..." class="font-body text-body px-[2rem] rounded-l-3xl w-full h-full bg-white-100 outline-none"/>
					<button @click="handleSearchClick" class="w-full h-full aspect-square p-3">
						<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
							<circle cx="17.2961" cy="17.2961" r="15.7961" stroke="#242424" stroke-width="3"/>
							<path d="M27.5071 30.454L30.4541 27.507L43.598 40.651C43.9886 41.0415 43.9886 41.6746 43.5981 42.0652L42.0652 43.598C41.6747 43.9885 41.0415 43.9885 40.651 43.598L27.5071 30.454Z" fill="#242424"/>
						</svg>
					</button>
				</div>
			</div> -->

			<div class="w-full grid grid-cols-1 lg:grid-cols-3 auto-rows-auto gap-y-[2rem] lg:gap-x-[2rem] px-[2rem] py-[5rem] overflow-x-hidden">
				<RouterLink v-for="event in store.events" :to="`/event/${event.id}`" >
					<div class="w-full flex flex-col gap-[1rem] text-screenBlack p-4" data-aos="fade-left">
						<div class="w-full aspect-[8/5] overflow-hidden rounded-3xl relative">
							<img :src="event.pictureSrc" alt="" :class="`w-full h-full object-cover`">
							<div  v-if="event.status == 'past'" class="w-full h-full flex justify-end items-end absolute top-0 left-0 z-[10]">
								<div class="w-full bg-white-100 bg-opacity-70 backdrop-blur-sm flex justify-center items-center px-[2rem]">
									<span class="font-heading text-subtitle lg:text-title text-screenBlack">
										PAST
									</span>
								</div>
								
							</div>
						</div>
						<div class="flex flex-col w-full px-[1rem]">
							<h2 class="font-heading text-subtitle lg:text-title relative w-max">
								{{event.name}}
								<span v-if="event.status === 'ongoing'" class="absolute top-0 right-0 translate-x-[100%] text-body lg:text-subtitle text-[#EE1100]">
									LIVE!
								</span>
							</h2>
							<h3 
								:class="`font-heading text-subtitle lg:text-title relative
								${event.status == 'past' ? 'text-gray-300 ' : 'text-primary'}` "
								>
								{{event.edition}}
							</h3>
						</div>
						<div class="flex flex-col w-full px-[1rem] gap-[1rem]">
							<div class="grid grid-cols-[3rem_1fr]  grid-rows-1 w-full gap-[1rem]">
								<div class="flex justify-center items-center w-full">
									<div class="h-[3rem] aspect-square">
										<svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
											<path d="M15 42L2 22.5L15 27L28 22.5L15 42Z" fill="#4D4D4D"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM15 23C19.4183 23 23 19.4183 23 15C23 10.5817 19.4183 7 15 7C10.5817 7 7 10.5817 7 15C7 19.4183 10.5817 23 15 23Z" fill="#4D4D4D"/>
										</svg>
									</div>
								</div>
								<p class="font-body text-body text-gray">
									{{ event.location }}
								</p>
							</div>
							<div class="grid grid-cols-[3rem_1fr]  grid-rows-1 w-full gap-[1rem]">
								<div class="flex justify-center items-center w-full">
									<div class="h-[2.5rem] aspect-square">
										<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
											<circle cx="15.0807" cy="15.0807" r="14.2581" stroke="#4D4D4D" stroke-width="1.64516"/>
											<path d="M15.0806 6.85486V15.6291L19.1935 20.0162" stroke="#4D4D4D" stroke-width="2.06682"/>
										</svg>
									</div>
								</div>
								<p class="font-body text-body text-gray">
									{{ event.date }}
								</p>
							</div>
						</div>
						
					</div>
				</RouterLink>
			</div>

			<!--<div>
				pagination here
			</div>-->

			<div class="w-full px-[2rem] lg:px-[12rem] flex justify-center py-[10rem]">
				<p class="font-body text-body lg:text-subtitle text-center">
					Want to host a competition at your university?<br>
					contact us at <a href="mailto:info@integrationbee.at?subject=Competition%20organization%20request" class="underline ">info@integrationbee.at</a>
				</p>
			</div>

		</div>
		<div class="w-full flex items-end p-0 h-[7rem] bg-pearl-white">
			<div class="w-full h-[6rem] bottom-0 bg-screenBlack [clip-path:polygon(0_5rem,100%_0,100%_100%,0%_100%)] pb-[8rem] -mb-[1rem]"/>
		</div>
		
	</DefaultLayout>
</template>