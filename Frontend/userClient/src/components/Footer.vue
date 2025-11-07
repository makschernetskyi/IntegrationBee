<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore/authStore';


const {isAuthenticated} = useAuthStore()

</script>
<template>
	<footer class="w-full bg-screenBlack px-[2rem] lg:px-[12rem] xl:px-[10vw]">
		<div class="w-full py-[5rem]">
			<div class="w-full h-[3px] bg-pearl-white"/>
		</div>
		<div class="w-full flex flex-col gap-[8rem] lg:gap-0 lg:grid lg:grid-cols-[2fr_3fr] py-[4rem]">
			<div class="flex justify-center lg:justify-start items-center">
				<nav aria-label="Sitemap">
					<ul class="flex flex-col gap-[2rem] text-center lg:text-left font-body text-pearl-white text-body lg:text-body">
						<li>
							<RouterLink to="/" class="relative after:bg-pearl-white after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:scale-x-[0] after:transition-all after:duration-100 after:origin-left after:will-change-transform hover:after:scale-x-[1]">
								Home
							</RouterLink>
						</li>
						<li>
							<RouterLink to="/games" class="relative after:bg-pearl-white after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:scale-x-[0] after:transition-all after:duration-100 after:origin-left after:will-change-transform hover:after:scale-x-[1]">
								Games
							</RouterLink>
						</li>
						<li>
							<RouterLink to="/events" class="relative after:bg-pearl-white after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:scale-x-[0] after:transition-all after:duration-100 after:origin-left after:will-change-transform hover:after:scale-x-[1]">
								Events
							</RouterLink>
						</li>
						<li>
							<RouterLink to="/news" class="relative after:bg-pearl-white after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:scale-x-[0] after:transition-all after:duration-100 after:origin-left after:will-change-transform hover:after:scale-x-[1]">
								News
							</RouterLink>
						</li>
						<li>
							<RouterLink to="/contact" class="relative after:bg-pearl-white after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:scale-x-[0] after:transition-all after:duration-100 after:origin-left after:will-change-transform hover:after:scale-x-[1]">
								Contact
							</RouterLink>
						</li>
						<!--login and signup for not authenticated users-->
						<template v-if="!isAuthenticated">
							<li>
								<RouterLink to="/sign_in" class="relative after:bg-pearl-white after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:scale-x-[0] after:transition-all after:duration-100 after:origin-left after:will-change-transform hover:after:scale-x-[1]">
									Sign in
								</RouterLink>
							</li>
							<li>
								<RouterLink to="/sign_up" class="relative after:bg-pearl-white after:absolute after:w-full after:h-[3px] after:bottom-0 after:left-0 after:scale-x-[0] after:transition-all after:duration-100 after:origin-left after:will-change-transform hover:after:scale-x-[1]">
									Sign up
								</RouterLink>
							</li>
						</template>
					</ul>
				</nav>
			</div>
			<div class="w-full flex items-center justify-center lg:justify-end">
				<div class="flex flex-col items-end text-pearl-white">
					<p class="font-heading text-subtitle lg:text-title">
						Integration Bee
					</p>
					<p class="font-heading text-primary text-body lg:text-subtitle">
						Austria
					</p>
					<p class="font-body text-body lg:text-subtitle text-right">
						come integrate <br>
						and bee integrated
					</p>
				</div>
			</div>
		</div>
		<div class="w-full flex flex-col gap-[4rem] lg:gap-0 lg:flex-row flex-wrap justify-center lg:justify-between text-pearl-white text-body lg:text-body py-[5rem]">
			<div class="hidden lg:flex">
				<p>© {{ new Date().getFullYear() }} JugendWAVE All Rights Reserved.</p>
			</div>
            <div class="flex justify-between lg:justify-end gap-[4rem]">
                <RouterLink to="/imprint" class="underline underline-offset-4 decoration-pearl-white">
					impressum
				</RouterLink>
                <RouterLink to="/terms_of_use" class="underline underline-offset-4 decoration-pearl-white">
					terms of use
				</RouterLink>
			</div>
			<div class="lg:hidden flex">
				<p class="text-center">© 2024 JugendWAVE All Rights Reserved.</p>
			</div>
		</div>
		<div class="w-full flex justify-center items-center text-pearl-white-50 text-body text-center lg:text-body font-body py-[4rem]">
            <p>
				this page was created by
                <a href="https://www.formamind.com" target="_blank" class="underline underline-offset-4 decoration-pearl-white">
					Formamind
				</a>
			</p>
		</div>
	</footer>
</template>