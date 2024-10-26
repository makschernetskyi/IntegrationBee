<script setup lang="ts">
import ContactsCarousel from '@/components/ContactsCarousel.vue';
import DefaultLayout from '@/layouts/Default.vue';
import { useContactPageStore } from '@/stores/contactPageStore/contactPageStore';

const store = useContactPageStore()

</script>
<template>
	<DefaultLayout>
		<div class="w-full px-[2rem] lg:px-[12rem] bg-screenBlack flex justify-center pt-[8rem] pb-[2rem] lg:pt-[16rem]">
			<h1 class="font-heading text-subtitle lg:text-title text-center text-pearl-white">
				{{ store.title }}
			</h1>
		</div>

		<div class="w-full py-[5rem] bg-pearl-white flex flex-col gap-[5rem] text-screenBlack font-body">
			<section class="w-full px-[2rem] lg:px-[12rem] flex flex-col gap-[2rem]">
				<h2 class="font-heading text-title flex justify-center lg:justify-start w-full">About us</h2>
				<p class="text-center lg:text-left w-full text-body">
					{{ store.aboutUsText }}
				</p>
			</section>
			<section class="w-full px-[2rem] lg:px-[12rem] flex flex-col gap-[2rem]">
				<h2 class="font-heading text-title flex justify-center lg:justify-start w-full">
					Contact us
				</h2>
				<div class="text-center lg:text-left w-full text-body flex flex-col items-center lg:items-start">
					<p>General Inqueries:</p>
					<div class="flex flex-col md:flex-row gap-[1rem]">
						<p class="font-semibold">
							email:
						</p>
						<a :href="`mailto:${store.generalInqueriesEmail}`" class="underline">
							{{ store.generalInqueriesEmail }}
						</a>
					</div>
				</div>
			</section>
			<section class="w-full px-[2rem] lg:px-[12rem] hidden lg:flex flex-col gap-[2rem]">
				<div v-for="(member, i) in store.teamMembers" :key="i" class="w-full h-[22rem] bg-white-100 overflow-hidden rounded-3xl flex flex-row">
					<div class="h-full aspect-square">
						<img :src="member.imageSrc" :alt="`photo of ${member.name}`" class="w-full h-full">
					</div>
					<div class="h-full flex-1 flex flex-col justify-between p-[2rem] text-screenBlack text-body">
						<div class="flex flex-col">
							<p class="font-heading text-subtitle">
								{{ member.name }}
							</p>
							<p class="font-heading text-primary">
								{{ member.role }}
							</p>
						</div>
						<div class="flex flex-col">
							<div v-if="member.tel" class="flex gap-[1rem]">
								<p class="font-semibold">
									tel:
								</p>
								<a :href="'tel:'+member.tel" class="">
									{{ member.tel }}
								</a>
							</div>
							<div v-if="member.email" class="flex gap-[1rem]">
								<p class="font-semibold">
									email:
								</p>
								<a :href="'mailto:' + member.email">
									{{ member.email }}
								</a>
							</div>
							<div v-if="member.linkedin" class="flex gap-[1rem]">
								<p class="font-semibold">
									linkedin:
								</p>
								<a :href="'www.linkedin.com/' + member.linkedin">
									{{ member.linkedin }}
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section class="w-full h-max px-[2rem] lg:px-[12rem] flex lg:hidden gap-[2rem]">
				<ContactsCarousel :teamMembers="store.teamMembers"/>
			</section>
		</div>

		<div class="w-full flex items-end leading-[0] p-0 h-[7rem] bg-pearl-white border-b-screenBlack">
			<div class="w-full h-[5rem] bottom-0 bg-screenBlack [clip-path:polygon(0_5rem,100%_0,100%_100%,0%_100%)] pb-[8rem] -mb-[1rem]"/>
		</div>
	</DefaultLayout>
</template>