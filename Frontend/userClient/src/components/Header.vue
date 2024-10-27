<script setup lang="ts">
import MenuButton from '@/components/MenuButton.vue';
import { useAuthStore } from '@/stores/authStore/authStore';

import {toRefs} from "vue"

const props = defineProps({
	isMenuVisible: Boolean,
})

const {isMenuVisible} = toRefs(props)

const emit = defineEmits(['switchMenuVisibility'])

const {isAuthenticated, profilePicture, logout} = useAuthStore()

</script>
<template>
	<div class="fixed top-0 w-full lg:px-[2rem] xl:px-[12rem] font-body z-30 h-[6rem] lg:h-[10rem] text-secondary lg:py-4">
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
				<!--visible only for  not authenticated usets-->
				<template v-if="!isAuthenticated">
					<!-- invisible on mobile-->
					<div class="hidden lg:flex absolute right-0 items-center gap-[2rem] text-body">
						<!-- sign in and sign up buttons -->
							<RouterLink to="/sign_in" class="px-[2.4rem] py-[1rem] rounded-2xl text-pearl-white bg-primary font-semibold">
								Sign in
							</RouterLink>
							<RouterLink to="/sign_up" class="px-[2.4rem] py-[1rem] h-max w-max hover:bg-screenBlack-400 hover:bg-opacity-15 rounded-2xl signUpBtn">
								<p class="relative">Sign up</p>
								<!--<div class="signUpBtn_Bg bg-pearl-white"/>-->
							</RouterLink>
					</div>

					<!-- mobile login btn-->
					<div class="flex lg:hidden absolute right-0 items-center gap-[2rem] text-body">
						<RouterLink to="/sign_in" class="relative h-[4rem] aspect-square">
							<svg width="45" height="43" viewBox="0 0 45 43" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M2.40254 24.0217L10.2674 5.35599L30.3648 2.83425L42.5974 18.9783L37.1086 32.005V31.958C37.1086 31.2435 36.7274 30.5833 36.1086 30.226L24.2332 23.3698C23.6144 23.0125 22.852 23.0125 22.2332 23.3698L10.3579 30.226C9.73907 30.5833 9.35787 31.2435 9.35787 31.958V33.201L2.40254 24.0217ZM9.75597 36.9234L0.539109 24.7595C0.323346 24.4747 0.275887 24.0965 0.414609 23.7673L8.69674 4.11108C8.83547 3.78185 9.1393 3.55163 9.49378 3.50715L30.6576 0.851605C31.0121 0.807124 31.3634 0.955141 31.5791 1.23989L44.4608 18.2405C44.6766 18.5253 44.724 18.9035 44.5853 19.2327L36.9516 37.3498L36.5273 38.3569L36.3032 38.8889C36.1645 39.2181 35.8606 39.4484 35.5061 39.4928L34.9398 39.5639C34.9376 39.5642 34.9354 39.5645 34.9332 39.5647L14.9151 42.0765C14.9127 42.0768 14.9102 42.0771 14.9077 42.0775L14.3423 42.1484C13.9878 42.1929 13.6366 42.0449 13.4208 41.7601L13.0799 41.3102C13.0773 41.3068 13.0747 41.3034 13.0721 41.2999L9.76379 36.9338C9.76117 36.9304 9.75856 36.9269 9.75597 36.9234ZM22.2333 9.90211C22.8521 9.54484 23.6145 9.54484 24.2333 9.90211L28.065 12.1143C28.6838 12.4716 29.065 13.1318 29.065 13.8464V18.2708C29.065 18.9853 28.6838 19.6456 28.065 20.0028L24.2333 22.2151C23.6145 22.5723 22.8521 22.5723 22.2333 22.2151L18.4016 20.0028C17.7828 19.6456 17.4016 18.9853 17.4016 18.2708V13.8464C17.4016 13.1318 17.7828 12.4716 18.4016 12.1143L22.2333 9.90211Z" fill="#FBC151"/>
							</svg>
						</RouterLink>
					</div>
				</template>
				<template v-if="isAuthenticated">
					<!-- invisible on mobile-->
					<div class="hidden lg:flex absolute right-0 items-center gap-[2rem] text-body">
						<!-- sign in and sign up buttons -->

						<RouterLink to="/myprofile" class="px-[2.4rem] py-[1rem] h-max w-max hover:bg-screenBlack-400 hover:bg-opacity-15 rounded-2xl signUpBtn">
							<p class="relative">profile</p>
						</RouterLink>
						<button @click="logout" class="px-[2.4rem] py-[1rem] h-max w-max hover:bg-screenBlack-400 hover:bg-opacity-15 rounded-2xl signUpBtn">
							<p class="relative">log out</p>
						</button>
					</div>

					<!-- mobile login btn-->
					<div class="flex lg:hidden absolute right-0 items-center gap-[2rem] text-body">
						<RouterLink to="/myprofile" class="relative h-[4rem] aspect-square">
							<svg v-if="!profilePicture" width="45" height="43" viewBox="0 0 45 43" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M2.40254 24.0217L10.2674 5.35599L30.3648 2.83425L42.5974 18.9783L37.1086 32.005V31.958C37.1086 31.2435 36.7274 30.5833 36.1086 30.226L24.2332 23.3698C23.6144 23.0125 22.852 23.0125 22.2332 23.3698L10.3579 30.226C9.73907 30.5833 9.35787 31.2435 9.35787 31.958V33.201L2.40254 24.0217ZM9.75597 36.9234L0.539109 24.7595C0.323346 24.4747 0.275887 24.0965 0.414609 23.7673L8.69674 4.11108C8.83547 3.78185 9.1393 3.55163 9.49378 3.50715L30.6576 0.851605C31.0121 0.807124 31.3634 0.955141 31.5791 1.23989L44.4608 18.2405C44.6766 18.5253 44.724 18.9035 44.5853 19.2327L36.9516 37.3498L36.5273 38.3569L36.3032 38.8889C36.1645 39.2181 35.8606 39.4484 35.5061 39.4928L34.9398 39.5639C34.9376 39.5642 34.9354 39.5645 34.9332 39.5647L14.9151 42.0765C14.9127 42.0768 14.9102 42.0771 14.9077 42.0775L14.3423 42.1484C13.9878 42.1929 13.6366 42.0449 13.4208 41.7601L13.0799 41.3102C13.0773 41.3068 13.0747 41.3034 13.0721 41.2999L9.76379 36.9338C9.76117 36.9304 9.75856 36.9269 9.75597 36.9234ZM22.2333 9.90211C22.8521 9.54484 23.6145 9.54484 24.2333 9.90211L28.065 12.1143C28.6838 12.4716 29.065 13.1318 29.065 13.8464V18.2708C29.065 18.9853 28.6838 19.6456 28.065 20.0028L24.2333 22.2151C23.6145 22.5723 22.8521 22.5723 22.2333 22.2151L18.4016 20.0028C17.7828 19.6456 17.4016 18.9853 17.4016 18.2708V13.8464C17.4016 13.1318 17.7828 12.4716 18.4016 12.1143L22.2333 9.90211Z" fill="#FBC151"/>
							</svg>
							<div v-if="profilePicture" class="relative w-full h-full flex justify-center items-center">
								<div class="relative z-[2] w-[90%] aspect-square overflow-hidden [clip-path:polygon(68.3%_3.46%,18.85%_10.88%,0.55%_57.42%,31.7%_96.54%,81.15%_89.12%,99.45%_42.58%)] [-webkit-clip-path:polygon(68.3%_3.46%,18.85%_10.88%,0.55%_57.42%,31.7%_96.54%,81.15%_89.12%,99.45%_42.58%)]">
									<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuHm1FQ4-XKwrkURvfPNdc6863X3ua8gGYnw&s" alt="profile picture" class="w-full h-full object-cover">
								</div>
								<div 
									class="w-full h-full top-0 left-0 bg-primary absolute z-[1] [clip-path:polygon(68.3%_3.46%,18.85%_10.88%,0.55%_57.42%,31.7%_96.54%,81.15%_89.12%,99.45%_42.58%)] [-webkit-clip-path:polygon(68.3%_3.46%,18.85%_10.88%,0.55%_57.42%,31.7%_96.54%,81.15%_89.12%,99.45%_42.58%)]"
								/>
							</div>
						</RouterLink>
						<!--logout mobile-->
						<button @click="logout" class="relative h-[4rem] aspect-square">
							<svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M2.33362 12.8257L24.7014 1.95364L23.8585 0.21936L1.49067 11.0914C0.500216 11.5728 -0.0546888 12.6492 0.127692 13.7352L4.12639 37.5467C4.30877 38.6327 5.18484 39.4688 6.27821 39.6003L30.9704 42.5694L31.2006 40.6549L6.50842 37.6858C6.26433 37.6564 6.06876 37.4698 6.02804 37.2273L2.02935 13.4159C1.98863 13.1734 2.11251 12.9331 2.33362 12.8257ZM27.2481 13.8903L36.8813 21.7174H11.7123V23.6457H36.8813L27.2481 31.4727L28.464 32.9693L40.2049 23.4298L41.1259 22.6815L40.2049 21.9332L28.464 12.3938L27.2481 13.8903Z" fill="#FBC151"/>
							</svg>
						</button>
					</div>
				</template>
				
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