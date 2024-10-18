<script setup lang="ts">
import MenuButton from '@/components/MenuButton.vue';

import {toRefs} from "vue"

const props = defineProps({
	isMenuVisible: Boolean,
})

const {isMenuVisible} = toRefs(props)

const emit = defineEmits(['switchMenuVisibility'])

</script>
<template>
	<div class="fixed top-0 w-full lg:px-[12rem] font-body z-30 h-[6rem] lg:h-[10rem] text-secondary lg:py-4">
		<div class="w-full h-full bg-screenBlack lg:bg-pearl-white lg:bg-opacity-90 lg:backdrop-blur-sm overflow-hidden lg:rounded-3xl shadow-md px-8 lg:px-6">
			<div class="relative h-full flex justify-center items-center ">
				
				<!-- mobile-only menu button-->
				 <teleport to='body'>
					<div class="fixed left-[1rem] top-[0.5rem] h-[5rem] lg:hidden flex z-[500] p-[1rem]">
						<MenuButton :is-menu-visible="isMenuVisible" @toggle-menu-visibility="emit('switchMenuVisibility')"/>
					</div>
				</teleport>
				
				<!-- invisible on mobile-->
				<div class="absolute left-0 h-full hidden lg:flex">
					<!-- logo on the bookmark -->
					<RouterLink to="/" class="relative flex justify-center items-center h-full">
						<div class="p-3">
							<svg width="69" height="68" viewBox="0 0 69 68" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full aspect-square">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M59.4828 33.7849L51.3108 54.5169L25.3814 58.3861L9.06592 37.8652L13.2027 27.3704C14.3404 27.2488 15.5733 27.1797 16.906 27.1797C22.0917 27.1797 26.0562 28.9823 30.2511 30.8896C34.9633 33.0321 39.9662 35.3068 47.3172 35.3068C52.2665 35.3068 56.3178 34.6415 59.4828 33.7849Z" fill="#FBC151"/>
								<path d="M19.7919 14.8718L43.9564 11.266L59.1614 30.3902L50.2019 53.1202L26.0374 56.726L10.8324 37.6018L19.7919 14.8718Z" stroke="#001D37" stroke-width="3.09071"/>
								<path d="M1.70068 31.8987C1.70068 31.8987 5.89532 27.1797 16.9062 27.1797C27.9172 27.1797 33.4226 35.3068 47.3174 35.3068C61.2121 35.3068 68.0284 30.0635 68.0284 30.0635" stroke="#001D37" stroke-width="3.09071"/>
							</svg>
						</div>
					</RouterLink>
				</div>
				
				<!-- invisible on mobile-->
				<div class="hidden lg:flex justify-center items-center gap-[2rem] lg:text-body">
					<!-- links to pages -->
					<RouterLink to="/events" class="hover:bg-screenBlack-400 hover:bg-opacity-15 transition-all duration-100 px-[1.5rem] py-[0.8rem] rounded-2xl cursor-pointer">events</RouterLink>
					<RouterLink to="/news" class="hover:bg-screenBlack-400  hover:bg-opacity-15 transition-all duration-100 px-[1.5rem] py-[0.8rem] rounded-2xl">news</RouterLink>
					<RouterLink to="/contact" class="hover:bg-screenBlack-400  hover:bg-opacity-15 transition-all duration-100 px-[1.5rem] py-[0.8rem] rounded-2xl">contact</RouterLink>
				</div>
				<!-- invisible on mobile-->
				<div class="hidden lg:flex absolute right-0 items-center gap-[2rem] text-body">
					<!-- sign in and sign up buttons -->
						<a href="" class="px-[2.4rem] py-[1rem] rounded-2xl text-pearl-white bg-primary font-semibold">Sign in</a>
						<a href="" class="px-[2.4rem] py-[1rem] h-max w-max hover:bg-screenBlack-400 hover:bg-opacity-15 rounded-2xl signUpBtn">
							<p class="relative">Sign up</p>
							<!--<div class="signUpBtn_Bg bg-pearl-white"/>-->
						</a>
				</div>

				<!-- mobile login btn-->
				<div class="flex lg:hidden absolute right-0 items-center gap-[2rem] text-body">

					<div class="relative h-[6rem] aspect-square">
						<svg width="63" height="62" viewBox="0 0 63 62" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="h-full w-full">
							<path d="M32.2333 18.3248L38.065 21.6917V28.4255L32.2333 31.7924L26.4017 28.4255V21.6917L32.2333 18.3248Z" fill="#FBC151"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M46.1086 45.9774L45.079 48.421L22.7695 51.2203L18.3579 45.3981V39.8033L32.2333 31.7924L46.1086 39.8033V45.9774Z" fill="#FBC151"/>
							<path d="M10.2965 33.1605L18.5942 13.4675L39.7977 10.807L52.7035 27.8395L44.4058 47.5325L23.2023 50.193L10.2965 33.1605Z" stroke="#FBC151" stroke-width="1.93077"/>
						</svg>
					</div>


				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="pcss">

/*.signUpBtn{
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
		
		color: rgb(0, 29, 55);
	}
	.signUpBtn_Bg{
		transform: scaleY(1);
	}
}
*/


</style>