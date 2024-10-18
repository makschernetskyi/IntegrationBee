<script setup lang="ts">
import ContactsCarousel from '@/components/ContactsCarousel.vue';
import DefaultLayout from '@/layouts/Default.vue';

</script>
<template>
	<DefaultLayout>
		<div class="w-full px-[2rem] lg:px-[12rem] bg-screenBlack flex justify-center pt-[8rem] pb-[2rem] lg:pt-[16rem]">
			<h1 class="font-heading text-subtitle lg:text-title text-center text-pearl-white">
				Contact to our team
			</h1>
		</div>

		<div class="w-full py-[5rem] bg-pearl-white flex flex-col gap-[5rem] text-screenBlack font-body">
			<section class="w-full px-[2rem] lg:px-[12rem] flex flex-col gap-[2rem]">
				<h2 class="font-heading text-title flex justify-center lg:justify-start w-full">About us</h2>
				<p class="text-center lg:text-left w-full text-body">
					Our project began as an idea of a team of Austrian Students, who had nothing better to do than organizing these events. We are helped by a great team of volunteers. If you feel you want to engage with our community, visit our events, participate or even help or sponsor us, feel free to do so!
				</p>
			</section>
			<section class="w-full px-[2rem] lg:px-[12rem] flex flex-col gap-[2rem]">
				<h2 class="font-heading text-title flex justify-center lg:justify-start w-full">
					Contact us
				</h2>
				<div class="text-center lg:text-left w-full text-body flex flex-col items-center lg:items-start">
					<p>General Inqueries:</p>
					<div class="flex gap-[1rem]">
						<p class="font-semibold">
							email:
						</p>
						<a href="mailto:info@integrationbee.at" class="underline">
							info@integrationbee.at
						</a>
					</div>
				</div>
			</section>
			<section class="w-full px-[2rem] lg:px-[12rem] hidden lg:flex flex-col gap-[2rem]">
				<div class="w-full h-[22rem] bg-white-100 overflow-hidden rounded-3xl flex flex-row">
					<div class="h-full aspect-square">
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuHm1FQ4-XKwrkURvfPNdc6863X3ua8gGYnw&s" alt="" class="w-full h-full">
					</div>
					<div class="h-full flex-1 flex flex-col justify-between p-[2rem] text-screenBlack text-body">
						<div class="flex flex-col">
							<p class="font-heading text-subtitle">
								Maksym Czarniecki
							</p>
							<p class="font-heading text-primary">
								Founder • Organization & technical information
							</p>
						</div>
						<div class="flex flex-col">
							<div class="flex gap-[1rem]">
								<p class="font-semibold">
									tel:
								</p>
								<a href="" class="">
									+436877900063
								</a>
							</div>
							<div class="flex gap-[1rem]">
								<p class="font-semibold">
									email:
								</p>
								<a href="mailto:maksym_czarniecki@integrationbee.at">
									maksym_czarniecki@integrationbee.at
								</a>
							</div>
							<div class="flex gap-[1rem]">
								<p class="font-semibold">
									linkedin:
								</p>
								<a href="mailto:maksym_czarniecki@integrationbee.at">
									in/maksym-czarniecki
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section class="w-full h-max px-[2rem] lg:px-[12rem] flex lg:hidden gap-[2rem]">
				<ContactsCarousel/>
			</section>
		</div>

		<div class="w-full flex items-end p-0 h-[8rem] bg-pearl-white">
			<div class="w-full h-[5rem] bottom-0 bg-screenBlack [clip-path:polygon(0_5rem,100%_0,100%_100%,0%_100%)]"/>
		</div>
	</DefaultLayout>
</template>