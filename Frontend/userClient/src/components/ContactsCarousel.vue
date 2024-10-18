<script setup lang="ts">
import {ref} from 'vue'


const itemsNumber = 2
const itemShown = ref(0)

const showNextCard = () =>{
	if(itemShown.value < itemsNumber-1){
		itemShown.value+=1
	}
}

const showPrevCard = () =>{
	if(itemShown.value > 0){
		itemShown.value-=1
	}
}

</script>
<template>
	<div class="w-full h-[50rem] flex justify-between">
		<div class="h-full flex items-center justify-center w-[4rem]">
			<button class="w-full aspect-square" @click="showPrevCard">
				<svg width="22" height="41" viewBox="0 0 22 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full -scale-x-100">
					<path d="M2 1L19.5 20.5L2 39" stroke="#FBC151" stroke-width="3"/>
				</svg>
			</button>
		</div>
		<div class="w-[80vw] h-full overflow-x-hidden flex">
			<div class="h-full w-max flex transition-transform duration-300" :style="{'transform': `translateX(-${itemShown*80}vw)`}">
				<div class="w-[80vw] flex flex-col items-center gap-[2rem]">
					<div class="h-[20rem] aspect-square overflow-hidden rounded-full">
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuHm1FQ4-XKwrkURvfPNdc6863X3ua8gGYnw&s" alt="" class="w-full h-full">
					</div>
					<div class="w-full text-center flex justify-center font-heading text-subtitle">
						<p>Maksym Czarniecki</p>
					</div>
					<div class="w-full text-center flex flex-col items-center font-body text-text-sm font-semibold">
						<p>tel.</p>
						<a href="">+436787900063</a>
					</div>
					<div class="w-full text-center flex flex-col items-center font-body text-text-sm font-semibold">
						<p>email</p>
						<a href="">maksym_czarniecki@integrationbee.at</a>
					</div>
					<div class="w-full text-center flex flex-col items-center font-body text-text-sm font-semibold">
						<p>linkedin</p>
						<a href="">in/maksym-czarniecki</a>
					</div>
				</div>
				<div class="w-[80vw] flex flex-col items-center gap-[2rem]">
					<div class="h-[20rem] aspect-square overflow-hidden rounded-full">
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuHm1FQ4-XKwrkURvfPNdc6863X3ua8gGYnw&s" alt="" class="w-full h-full">
					</div>
					<div class="w-full text-center flex justify-center font-heading text-subtitle">
						<p>Maksym Czarniecki</p>
					</div>
					<div class="w-full text-center flex flex-col items-center font-body text-text-sm font-semibold">
						<p>tel.</p>
						<a href="">+436787900063</a>
					</div>
					<div class="w-full text-center flex flex-col items-center font-body text-text-sm font-semibold">
						<p>email</p>
						<a href="">maksym_czarniecki@integrationbee.at</a>
					</div>
					<div class="w-full text-center flex flex-col items-center font-body text-text-sm font-semibold">
						<p>linkedin</p>
						<a href="">in/maksym-czarniecki</a>
					</div>
				</div>
			</div>
		</div>
		<div class="h-full flex items-center justify-center w-[4rem]">
			<button class="w-full aspect-square" @click="showNextCard">
				<svg width="22" height="41" viewBox="0 0 22 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
					<path d="M2 1L19.5 20.5L2 39" stroke="#FBC151" stroke-width="3"/>
				</svg>
			</button>
		</div>
	</div>
</template>