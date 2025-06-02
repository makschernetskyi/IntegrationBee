<script setup lang="ts">
import MenuButton from '@/components/MenuButton.vue';
import { useAuthStore } from '@/stores/authStore/authStore';

import {toRefs, ref} from "vue"
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUiStore } from '@/stores/uiStore/uiStore';

const uiStore = useUiStore()



const {isRulesVisible} = storeToRefs(uiStore)

const authStore = useAuthStore()
const {logout, getProfileData,} = authStore
const {isAuthenticated, profilePicture} = storeToRefs(authStore)

const router = useRouter()

const handleLogout = async () => {
	await logout()
	await getProfileData()
	router.push('/')
}

const isExpandableMenuVisible = ref(false)

// Modal state and functions
const showQuitModal = ref(false)
const pendingRoute = ref('')

const openQuitModal = (route: string) => {
	pendingRoute.value = route
	showQuitModal.value = true
	document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
}

const closeQuitModal = () => {
	showQuitModal.value = false
	pendingRoute.value = ''
	document.getElementsByTagName('body')[0].style.overflowY = 'unset'
}

const confirmQuit = () => {
	console.log('Confirming quit with route:', pendingRoute.value)
	const routeToNavigate = pendingRoute.value
	closeQuitModal()
	console.log('About to navigate to:', routeToNavigate)
	router.push(routeToNavigate)
		.then(() => {
			console.log('Navigation successful')
		})
		.catch((error) => {
			console.error('Navigation failed:', error)
		})
}

const handleNavigation = (route: string) => {
	openQuitModal(route)
}

document.addEventListener('click', ()=>{
	isExpandableMenuVisible.value = false
})

</script>
<template>
	<div class="fixed top-0 w-full px-[1rem] lg:px-[2rem] xl:px-[10vw] font-body z-30 h-[8rem] lg:h-[10rem] text-secondary py-4">
		<div class="w-full h-full bg-screenBlack lg:bg-pearl-white lg:bg-opacity-90 lg:backdrop-blur-sm rounded-xl lg:rounded-3xl shadow-md px-8 lg:px-6">
			<div class="relative h-full flex items-center justify-between font-heading text-subtitle">
                <div>
                    <a href="#" draggable="false" class="flex items-center gap-3 lg:hover:bg-screenBlack-400 lg:hover:bg-opacity-15 lg:transition-all lg:duration-100 rounded-[10px] px-2 py-2" @click.prevent="handleNavigation('/')">
                        <span class="h-[3rem] w-[3rem] lg:h-[4rem] lg:w-[4rem]">
                            <svg width="41" height="41" viewBox="0 0 41 41" class="w-full h-full stroke-pearl-white lg:stroke-screenBlack" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.04098 21V38.5H32.6311V21M2 17.5L20 2L38.5 17.5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </a>
                </div>
                <div class="flex items-center gap-4">
                    <a href="#" draggable="false" class="flex items-center gap-3 lg:hover:bg-screenBlack-400 lg:hover:bg-opacity-15 lg:transition-all lg:duration-100 rounded-[10px] px-4 py-2" @click.prevent="handleNavigation('/rankings')">
                        <span class="h-[3rem] w-[3rem] lg:h-[4rem] lg:w-[4rem] p-1">
                            <svg width="37" height="36" viewBox="0 0 37 36" class="w-full h-full fill-pearl-white lg:fill-screenBlack" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="22" height="10" rx="2"/>
                                <rect y="13" width="32" height="10" rx="2"/>
                                <rect y="26" width="37" height="10" rx="2"/>
                            </svg>
                        </span>
                        <p class="hidden lg:flex">Leaderboards</p>
                    </a>
                    <button
                        title="show rules"
                        aria-label="show rules"
                        class="flex items-center gap-3 lg:hover:bg-screenBlack-400 lg:hover:bg-opacity-15 lg:transition-all lg:duration-100 rounded-[5px] rounded-[10px] px-4 py-2"
                        @click="isRulesVisible = !isRulesVisible"
						draggable="false"
                    >
                        <span class="h-[3rem] w-[3rem] lg:h-[4rem] lg:w-[4rem]">
                            <svg width="58" height="53" viewBox="0 0 58 53" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M55.5488 23.1529L45.1348 47.8804L18.5146 51.2232L2.30762 29.8423L12.7217 5.11478L39.3418 1.77103L55.5488 23.1529Z" class="stroke-pearl-white lg:stroke-screenBlack" stroke-width="2.89231"/>
                                <path d="M26.6406 30.9964C26.6406 30.018 26.7861 29.0925 27.0769 28.2199C27.3943 27.3209 27.9628 26.2896 28.7825 25.1261C29.7344 23.7776 30.3822 22.6141 30.726 21.6357C31.0697 20.6574 31.2416 19.6261 31.2416 18.542C31.2416 17.5901 31.0565 16.9026 30.6863 16.4795C30.3161 16.03 29.7741 15.8052 29.0601 15.8052C28.3462 15.8052 27.8041 16.03 27.4339 16.4795C27.0637 16.9026 26.8786 17.5901 26.8786 18.542V21.5564H22.7536V18.8196C22.7536 16.572 23.2957 14.8533 24.3798 13.6634C25.464 12.447 27.0505 11.8388 29.1395 11.8388C31.2548 11.8388 32.8546 12.447 33.9387 13.6634C35.0493 14.8533 35.6046 16.572 35.6046 18.8196C35.6046 20.036 35.3799 21.2127 34.9303 22.3497C34.5073 23.4603 33.7669 24.7163 32.7092 26.1177C31.863 27.2548 31.2681 28.2067 30.9243 28.9735C30.607 29.7139 30.4484 30.4411 30.4484 31.155V32.6622H26.6406V30.9964ZM26.4423 35.7957H30.6467V40H26.4423V35.7957Z" class="fill-pearl-white lg:fill-screenBlack"/>
                            </svg>
                        </span>
                        <p class="hidden lg:flex">
                            Rules
						</p>
                    </button>
                    <a href="#" draggable="false" class="flex items-center gap-3 lg:hover:bg-screenBlack-400 lg:hover:bg-opacity-15 lg:transition-all lg:duration-100 rounded-[5px] rounded-[10px] px-4 py-2" @click.prevent="handleNavigation('/myprofile')">
                        <span class="h-[3rem] w-[3rem] lg:h-[4rem] lg:w-[4rem]">
                            <svg width="45" height="43" viewBox="0 0 45 43" class="w-full h-full fill-pearl-white lg:fill-screenBlack" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.40254 24.0217L10.2674 5.35599L30.3648 2.83425L42.5974 18.9783L37.1086 32.005V31.958C37.1086 31.2435 36.7274 30.5833 36.1086 30.226L24.2332 23.3698C23.6144 23.0125 22.852 23.0125 22.2332 23.3698L10.3579 30.226C9.73907 30.5833 9.35787 31.2435 9.35787 31.958V33.201L2.40254 24.0217ZM9.75597 36.9234L0.539109 24.7595C0.323346 24.4747 0.275887 24.0965 0.414609 23.7673L8.69674 4.11108C8.83547 3.78185 9.1393 3.55163 9.49378 3.50715L30.6576 0.851605C31.0121 0.807124 31.3634 0.955141 31.5791 1.23989L44.4608 18.2405C44.6766 18.5253 44.724 18.9035 44.5853 19.2327L36.9516 37.3498L36.5273 38.3569L36.3032 38.8889C36.1645 39.2181 35.8606 39.4484 35.5061 39.4928L34.9398 39.5639C34.9376 39.5642 34.9354 39.5645 34.9332 39.5647L14.9151 42.0765C14.9127 42.0768 14.9102 42.0771 14.9077 42.0775L14.3423 42.1484C13.9878 42.1929 13.6366 42.0449 13.4208 41.7601L13.0799 41.3102C13.0773 41.3068 13.0747 41.3034 13.0721 41.2999L9.76379 36.9338C9.76117 36.9304 9.75856 36.9269 9.75597 36.9234ZM22.2333 9.90211C22.8521 9.54484 23.6145 9.54484 24.2333 9.90211L28.065 12.1143C28.6838 12.4716 29.065 13.1318 29.065 13.8464V18.2708C29.065 18.9853 28.6838 19.6456 28.065 20.0028L24.2333 22.2151C23.6145 22.5723 22.8521 22.5723 22.2333 22.2151L18.4016 20.0028C17.7828 19.6456 17.4016 18.9853 17.4016 18.2708V13.8464C17.4016 13.1318 17.7828 12.4716 18.4016 12.1143L22.2333 9.90211Z"/>
                            </svg>
                        </span>
                        <p class="hidden lg:flex">Profile</p>
                    </a>
                </div>
			</div>
		</div>
	</div>

	<!-- Quit Game Confirmation Modal -->
	<div v-if="showQuitModal" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[502]" @click="closeQuitModal">
		<div class="bg-white rounded-3xl p-8 max-w-[50rem] w-full mx-4 text-screenBlack font-body" @click.stop>
			<div class="flex flex-col gap-8 text-center">
				<div class="flex justify-center">
					<div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
				</div>
				<div>
					<h3 class="font-heading text-subtitle text-screenBlack mb-2">Quit Game?</h3>
					<p class="text-body text-gray-600">Are you sure you want to quit the game? Your progress might be lost.</p>
				</div>
				<div class="flex gap-4">
					<button
						draggable="false"
						@click="closeQuitModal"
						class="flex-1 bg-gray-200 text-screenBlack py-3 px-6 rounded-xl font-heading text-body lg:hover:bg-gray-300 transition-colors duration-100"
					>
						Stay
					</button>
					<button
						draggable="false"
						@click="confirmQuit"
						class="flex-1 bg-red-500 text-white py-3 px-6 rounded-xl font-heading text-body lg:hover:bg-red-600 transition-colors duration-100"
					>
						Quit Game
					</button>
				</div>
			</div>
		</div>
	</div>
</template>