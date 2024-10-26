<script setup lang="ts">
import DefaultLayout from '@/layouts/Default.vue';

</script>
<template>
	<DefaultLayout>
		<div class="w-full px-[2rem] lg:px-[12rem] bg-screenBlack flex justify-center pt-[8rem] pb-[2rem] lg:pt-[16rem]">
			<h1 class="font-heading text-subtitle lg:text-title text-center text-pearl-white">
				Profile
			</h1>
		</div>

		<div class="w-full px-[2rem] lg:px-[12rem] bg-pearl-white flex flex-col justify-center py-[5rem]">

			<section class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-y-[4rem] lg:gap-y-0 lg:gap-x-[4rem] text-screenBlack font-body text-text-sm lg:text-body">

				<div class="flex flex-col items-center gap-[2rem]">
					<div class="w-full max-w-[30rem] flex justify-center items-center aspect-square relative before:absolute before:w-full before:h-full before:z-0 before:bg-gray-50 before:scale-[1.08] before:[clip-path:polygon(68.3%_3.46%,18.85%_10.88%,0.55%_57.42%,31.7%_96.54%,81.15%_89.12%,99.45%_42.58%)] before:[-webkit-clip-path:polygon(68.3%_3.46%,18.85%_10.88%,0.55%_57.42%,31.7%_96.54%,81.15%_89.12%,99.45%_42.58%)]">
						<div class="relative z-[2] w-[95%] aspect-square overflow-hidden [clip-path:polygon(68.3%_3.46%,18.85%_10.88%,0.55%_57.42%,31.7%_96.54%,81.15%_89.12%,99.45%_42.58%)] [-webkit-clip-path:polygon(68.3%_3.46%,18.85%_10.88%,0.55%_57.42%,31.7%_96.54%,81.15%_89.12%,99.45%_42.58%)]">
							<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuHm1FQ4-XKwrkURvfPNdc6863X3ua8gGYnw&s" alt="profile picture" class="w-full h-full object-cover">
						</div>
						<div 
							class="w-full h-full top-0 left-0 bg-primary absolute z-[1] [clip-path:polygon(68.3%_3.46%,18.85%_10.88%,0.55%_57.42%,31.7%_96.54%,81.15%_89.12%,99.45%_42.58%)] [-webkit-clip-path:polygon(68.3%_3.46%,18.85%_10.88%,0.55%_57.42%,31.7%_96.54%,81.15%_89.12%,99.45%_42.58%)]"
						/>
					</div>
					<button class="flex gap-[1rem] items-center">
						<p>change profile picture</p>
						<div class="h-full aspect-square">
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<g clip-path="url(#clip0_326_389)">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M26.8809 1.39611C27.443 0.625054 28.5237 0.455652 29.2948 1.01774L30.5831 1.95691C31.3541 2.51901 31.5235 3.59974 30.9614 4.3708L30.7528 4.65694C30.4718 5.04247 29.9314 5.12717 29.5459 4.84613L26.8615 2.8892C26.4759 2.60815 26.3912 2.06779 26.6723 1.68226L26.8809 1.39611ZM26.3667 3.56898C25.9811 3.28793 25.4408 3.37263 25.1597 3.75816L21.8781 8.25973L15.796 4.74823C14.9942 4.28529 14.0063 4.28529 13.2045 4.74823L3.23866 10.502C2.43682 10.9649 1.94287 11.8205 1.94287 12.7463V24.2539C1.94287 25.1797 2.43682 26.0353 3.23866 26.4982L8.5657 29.5738L9.06491 29.6986C9.16515 29.7237 9.26762 29.7277 9.36656 29.7123C9.72123 29.9466 14.4782 26.4085 14.4782 26.4085L10.9443 23.8323C10.9443 23.8323 9.76292 27.2979 9.41792 28.9111L3.73866 25.6322C3.24622 25.3479 2.94287 24.8225 2.94287 24.2539V12.7463C2.94287 12.1777 3.24622 11.6523 3.73866 11.368L13.7045 5.61425C14.1969 5.32994 14.8036 5.32994 15.296 5.61425L21.2857 9.07239L11.5519 22.4249C11.2709 22.8104 11.3556 23.3507 11.7411 23.6318L14.4256 25.5887C14.8111 25.8698 15.3515 25.7851 15.6325 25.3995L25.64 11.6716C25.9048 11.9609 26.0576 12.3428 26.0576 12.7463V24.2539C26.0576 24.8225 25.7543 25.3479 25.2618 25.6322L15.296 31.386C15.2748 31.3982 15.2534 31.4099 15.2318 31.4211L15.8372 32.2282L25.7618 26.4982C26.5637 26.0353 27.0576 25.1797 27.0576 24.2539V12.7463C27.0576 12.0204 26.754 11.3377 26.2363 10.8536L29.2403 6.73285C29.5213 6.34732 29.4366 5.80695 29.0511 5.52591L26.3667 3.56898Z" fill="#4D4D4D"/>
								</g>
								<defs>
								<clipPath id="clip0_326_389">
								<rect width="32" height="32" fill="white"/>
								</clipPath>
								</defs>
							</svg>
						</div>
					</button>
				</div>
				<div class="flex flex-col gap-[2rem] items-center lg:items-start text-center lg:text-left">
					<div>
						<p class="font-heading text-subtitle lg:text-title">
							Maksym Czarniecki
						</p>
					</div>
					<div class="flex flex-col lg:flex-row gap-[1rem] items-center">
						<span class="font-heading">email:</span>
						<p>maksym_czarniecki@integrationbee.at</p>
						<!--<button class="h-full aspect-square">
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
								<g clip-path="url(#clip0_326_389)">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M26.8809 1.39611C27.443 0.625054 28.5237 0.455652 29.2948 1.01774L30.5831 1.95691C31.3541 2.51901 31.5235 3.59974 30.9614 4.3708L30.7528 4.65694C30.4718 5.04247 29.9314 5.12717 29.5459 4.84613L26.8615 2.8892C26.4759 2.60815 26.3912 2.06779 26.6723 1.68226L26.8809 1.39611ZM26.3667 3.56898C25.9811 3.28793 25.4408 3.37263 25.1597 3.75816L21.8781 8.25973L15.796 4.74823C14.9942 4.28529 14.0063 4.28529 13.2045 4.74823L3.23866 10.502C2.43682 10.9649 1.94287 11.8205 1.94287 12.7463V24.2539C1.94287 25.1797 2.43682 26.0353 3.23866 26.4982L8.5657 29.5738L9.06491 29.6986C9.16515 29.7237 9.26762 29.7277 9.36656 29.7123C9.72123 29.9466 14.4782 26.4085 14.4782 26.4085L10.9443 23.8323C10.9443 23.8323 9.76292 27.2979 9.41792 28.9111L3.73866 25.6322C3.24622 25.3479 2.94287 24.8225 2.94287 24.2539V12.7463C2.94287 12.1777 3.24622 11.6523 3.73866 11.368L13.7045 5.61425C14.1969 5.32994 14.8036 5.32994 15.296 5.61425L21.2857 9.07239L11.5519 22.4249C11.2709 22.8104 11.3556 23.3507 11.7411 23.6318L14.4256 25.5887C14.8111 25.8698 15.3515 25.7851 15.6325 25.3995L25.64 11.6716C25.9048 11.9609 26.0576 12.3428 26.0576 12.7463V24.2539C26.0576 24.8225 25.7543 25.3479 25.2618 25.6322L15.296 31.386C15.2748 31.3982 15.2534 31.4099 15.2318 31.4211L15.8372 32.2282L25.7618 26.4982C26.5637 26.0353 27.0576 25.1797 27.0576 24.2539V12.7463C27.0576 12.0204 26.754 11.3377 26.2363 10.8536L29.2403 6.73285C29.5213 6.34732 29.4366 5.80695 29.0511 5.52591L26.3667 3.56898Z" fill="#4D4D4D"/>
								</g>
								<defs>
								<clipPath id="clip0_326_389">
								<rect width="32" height="32" fill="white"/>
								</clipPath>
								</defs>
							</svg>
						</button>-->
					</div>
					<div class="flex flex-col lg:flex-row gap-[1rem] items-center">
						<span class="font-heading">tel:</span>
						<div class="flex items-center gap-[1rem]">
							<p>+436787900063</p>
							<button class="h-full aspect-square">
								<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
									<g clip-path="url(#clip0_326_389)">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M26.8809 1.39611C27.443 0.625054 28.5237 0.455652 29.2948 1.01774L30.5831 1.95691C31.3541 2.51901 31.5235 3.59974 30.9614 4.3708L30.7528 4.65694C30.4718 5.04247 29.9314 5.12717 29.5459 4.84613L26.8615 2.8892C26.4759 2.60815 26.3912 2.06779 26.6723 1.68226L26.8809 1.39611ZM26.3667 3.56898C25.9811 3.28793 25.4408 3.37263 25.1597 3.75816L21.8781 8.25973L15.796 4.74823C14.9942 4.28529 14.0063 4.28529 13.2045 4.74823L3.23866 10.502C2.43682 10.9649 1.94287 11.8205 1.94287 12.7463V24.2539C1.94287 25.1797 2.43682 26.0353 3.23866 26.4982L8.5657 29.5738L9.06491 29.6986C9.16515 29.7237 9.26762 29.7277 9.36656 29.7123C9.72123 29.9466 14.4782 26.4085 14.4782 26.4085L10.9443 23.8323C10.9443 23.8323 9.76292 27.2979 9.41792 28.9111L3.73866 25.6322C3.24622 25.3479 2.94287 24.8225 2.94287 24.2539V12.7463C2.94287 12.1777 3.24622 11.6523 3.73866 11.368L13.7045 5.61425C14.1969 5.32994 14.8036 5.32994 15.296 5.61425L21.2857 9.07239L11.5519 22.4249C11.2709 22.8104 11.3556 23.3507 11.7411 23.6318L14.4256 25.5887C14.8111 25.8698 15.3515 25.7851 15.6325 25.3995L25.64 11.6716C25.9048 11.9609 26.0576 12.3428 26.0576 12.7463V24.2539C26.0576 24.8225 25.7543 25.3479 25.2618 25.6322L15.296 31.386C15.2748 31.3982 15.2534 31.4099 15.2318 31.4211L15.8372 32.2282L25.7618 26.4982C26.5637 26.0353 27.0576 25.1797 27.0576 24.2539V12.7463C27.0576 12.0204 26.754 11.3377 26.2363 10.8536L29.2403 6.73285C29.5213 6.34732 29.4366 5.80695 29.0511 5.52591L26.3667 3.56898Z" fill="#4D4D4D"/>
									</g>
									<defs>
									<clipPath id="clip0_326_389">
									<rect width="32" height="32" fill="white"/>
									</clipPath>
									</defs>
								</svg>
							</button>
						</div>
					</div>
					<div class="flex flex-col lg:flex-row gap-[1rem] items-center">
						<span class="font-heading">Institution:</span>
						<div class="flex items-center gap-[1rem]">
							<p>Universität Wien</p>
							<button class="h-full aspect-square">
								<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
									<g clip-path="url(#clip0_326_389)">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M26.8809 1.39611C27.443 0.625054 28.5237 0.455652 29.2948 1.01774L30.5831 1.95691C31.3541 2.51901 31.5235 3.59974 30.9614 4.3708L30.7528 4.65694C30.4718 5.04247 29.9314 5.12717 29.5459 4.84613L26.8615 2.8892C26.4759 2.60815 26.3912 2.06779 26.6723 1.68226L26.8809 1.39611ZM26.3667 3.56898C25.9811 3.28793 25.4408 3.37263 25.1597 3.75816L21.8781 8.25973L15.796 4.74823C14.9942 4.28529 14.0063 4.28529 13.2045 4.74823L3.23866 10.502C2.43682 10.9649 1.94287 11.8205 1.94287 12.7463V24.2539C1.94287 25.1797 2.43682 26.0353 3.23866 26.4982L8.5657 29.5738L9.06491 29.6986C9.16515 29.7237 9.26762 29.7277 9.36656 29.7123C9.72123 29.9466 14.4782 26.4085 14.4782 26.4085L10.9443 23.8323C10.9443 23.8323 9.76292 27.2979 9.41792 28.9111L3.73866 25.6322C3.24622 25.3479 2.94287 24.8225 2.94287 24.2539V12.7463C2.94287 12.1777 3.24622 11.6523 3.73866 11.368L13.7045 5.61425C14.1969 5.32994 14.8036 5.32994 15.296 5.61425L21.2857 9.07239L11.5519 22.4249C11.2709 22.8104 11.3556 23.3507 11.7411 23.6318L14.4256 25.5887C14.8111 25.8698 15.3515 25.7851 15.6325 25.3995L25.64 11.6716C25.9048 11.9609 26.0576 12.3428 26.0576 12.7463V24.2539C26.0576 24.8225 25.7543 25.3479 25.2618 25.6322L15.296 31.386C15.2748 31.3982 15.2534 31.4099 15.2318 31.4211L15.8372 32.2282L25.7618 26.4982C26.5637 26.0353 27.0576 25.1797 27.0576 24.2539V12.7463C27.0576 12.0204 26.754 11.3377 26.2363 10.8536L29.2403 6.73285C29.5213 6.34732 29.4366 5.80695 29.0511 5.52591L26.3667 3.56898Z" fill="#4D4D4D"/>
									</g>
									<defs>
									<clipPath id="clip0_326_389">
									<rect width="32" height="32" fill="white"/>
									</clipPath>
									</defs>
								</svg>
							</button>
						</div>
					</div>
					<div class="flex flex-col lg:flex-row gap-[1rem] items-center">
						<span class="font-heading">Program of studies:</span>
						<div class="flex items-center gap-[1rem]">
							<p>BSc Mathematics</p>
							<button class="h-full aspect-square">
								<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
									<g clip-path="url(#clip0_326_389)">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M26.8809 1.39611C27.443 0.625054 28.5237 0.455652 29.2948 1.01774L30.5831 1.95691C31.3541 2.51901 31.5235 3.59974 30.9614 4.3708L30.7528 4.65694C30.4718 5.04247 29.9314 5.12717 29.5459 4.84613L26.8615 2.8892C26.4759 2.60815 26.3912 2.06779 26.6723 1.68226L26.8809 1.39611ZM26.3667 3.56898C25.9811 3.28793 25.4408 3.37263 25.1597 3.75816L21.8781 8.25973L15.796 4.74823C14.9942 4.28529 14.0063 4.28529 13.2045 4.74823L3.23866 10.502C2.43682 10.9649 1.94287 11.8205 1.94287 12.7463V24.2539C1.94287 25.1797 2.43682 26.0353 3.23866 26.4982L8.5657 29.5738L9.06491 29.6986C9.16515 29.7237 9.26762 29.7277 9.36656 29.7123C9.72123 29.9466 14.4782 26.4085 14.4782 26.4085L10.9443 23.8323C10.9443 23.8323 9.76292 27.2979 9.41792 28.9111L3.73866 25.6322C3.24622 25.3479 2.94287 24.8225 2.94287 24.2539V12.7463C2.94287 12.1777 3.24622 11.6523 3.73866 11.368L13.7045 5.61425C14.1969 5.32994 14.8036 5.32994 15.296 5.61425L21.2857 9.07239L11.5519 22.4249C11.2709 22.8104 11.3556 23.3507 11.7411 23.6318L14.4256 25.5887C14.8111 25.8698 15.3515 25.7851 15.6325 25.3995L25.64 11.6716C25.9048 11.9609 26.0576 12.3428 26.0576 12.7463V24.2539C26.0576 24.8225 25.7543 25.3479 25.2618 25.6322L15.296 31.386C15.2748 31.3982 15.2534 31.4099 15.2318 31.4211L15.8372 32.2282L25.7618 26.4982C26.5637 26.0353 27.0576 25.1797 27.0576 24.2539V12.7463C27.0576 12.0204 26.754 11.3377 26.2363 10.8536L29.2403 6.73285C29.5213 6.34732 29.4366 5.80695 29.0511 5.52591L26.3667 3.56898Z" fill="#4D4D4D"/>
									</g>
									<defs>
									<clipPath id="clip0_326_389">
									<rect width="32" height="32" fill="white"/>
									</clipPath>
									</defs>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</section>
			<section class="flex flex-col gap-[2rem] py-[10rem] text-screenBlack font-body text-body">
				<div class="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-[4rem]">
					<h2 class="font-heading text-subtitle lg:text-title">
						Competitions history
					</h2>
					<!--places' counts-->
					<div class="flex gap-[3rem] items-center h-[4rem] lg:h-[7rem] font-heading text-body lg:text-subtitle">
						<!-- first places count-->
						<div class="flex gap-[1rem] items-center h-full drop-shadow-sm">
							<div class="aspect-square h-full flex items-center">
								<svg width="247" height="155" viewBox="0 0 247 155" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
									<g clip-path="url(#clip0_340_462)">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M131.058 31.6221L137.984 27.6229V9.20763L122.036 0L106.088 9.20763V27.6229L113.145 31.6968L83.6712 78.2648L46.0733 73.661L14.1108 55.8357L20.0195 50.338L18.492 36.6113L8.48221 30.7768L0 38.6691L1.52752 52.3958L7.2701 55.743L22.287 115.095C22.287 115.095 82.7879 130.516 122.036 130.441C160.69 130.368 220.251 115.095 220.251 115.095L239.986 58.6125L245.292 55.7967L247.366 42.1418L239.205 33.9178L228.97 39.3487L226.897 53.0036L231.149 57.2887L199.534 73.661L161.169 78.2648L131.058 31.6221ZM24.5889 125.838C24.5889 125.838 82.7528 140.881 122.036 140.416C160.216 139.965 217.182 125.838 217.182 125.838C217.182 125.838 214.113 135.045 211.811 138.114C209.509 141.184 159.034 154.773 122.036 154.995C83.5579 155.226 33.0292 141.951 30.7273 139.649C29.1927 138.114 24.5889 125.838 24.5889 125.838Z" fill="#FBC151"/>
									</g>
									<defs>
									<clipPath id="clip0_340_462">
									<rect width="247" height="155" fill="white"/>
									</clipPath>
									</defs>
								</svg>
							</div>
							<span>:</span>
							<span>1</span>
						</div>

						<!-- second places count-->
						<div class="flex gap-[1rem] items-center h-full">
							<div class="aspect-square h-full flex items-center p-3 drop-shadow-sm">
								<svg width="292" height="292" viewBox="0 0 292 292" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
									<path d="M90.4479 280.739C91.5597 282.138 93.3338 282.837 95.1014 282.573L234.389 261.766C236.156 261.502 237.648 260.315 238.303 258.653L289.943 127.523C290.597 125.862 290.316 123.978 289.206 122.58L201.552 12.2614C200.44 10.8622 198.666 10.1627 196.899 10.4267L57.6109 31.2345C55.8439 31.4984 54.352 32.6851 53.6973 34.3475L2.057 165.477C1.40286 167.138 1.68395 169.022 2.7945 170.42L90.4479 280.739Z" fill="#4D4D4D"/>
									<path d="M97.8056 269L227.806 249.561L276 127.061L194.194 24L64.1944 43.4394L16 165.939L97.8056 269Z" fill="#C8C8C8"/>
								</svg>

							</div>
							<span>:</span>
							<span>2</span>
						</div>

						<!-- third/fourth places count-->
						<div class="flex gap-[1rem] items-center h-full">
							<div class="aspect-square h-full flex items-center p-3 drop-shadow-sm">
								<svg width="292" height="292" viewBox="0 0 292 292" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
									<path d="M90.4479 280.739C91.5597 282.138 93.3338 282.837 95.1014 282.573L234.389 261.766C236.156 261.502 237.648 260.315 238.303 258.653L289.943 127.523C290.597 125.862 290.316 123.978 289.206 122.58L201.552 12.2614C200.44 10.8622 198.666 10.1627 196.899 10.4267L57.6109 31.2345C55.8439 31.4984 54.352 32.6851 53.6973 34.3475L2.057 165.477C1.40286 167.138 1.68395 169.022 2.7945 170.42L90.4479 280.739Z" fill="#CD7F32"/>
									<path d="M97.8056 269L227.806 249.561L276 127.061L194.194 24L64.1944 43.4394L16 165.939L97.8056 269Z" fill="#F5C37E"/>
								</svg>
							</div>
							<span>:</span>
							<span>1</span>
						</div>
					</div>
				</div>
				
				<div class="w-full bg-white-100 overflow-y-auto rounded relative text-text-sm lg:text-body">
					<div class="grid grid-cols-[1fr_3fr_2fr] py-[1rem] shadow-md sticky top-0 bg-pearl-white-50">
						<h3 class="text-center font-heading ">
							Date
						</h3>
						<h3 class="text-center font-heading ">
							Competition
						</h3>
						<h3 class="text-center font-heading ">
							Result
						</h3>
					</div>
					<div class="h-max max-h-[20rem] w-full text-text-xs lg:text-body">
						<div class="w-full h-max flex flex-col py-[1rem]">
							<a v-for="i in [...new Array(10).keys()]" :key="i" href="" class="grid grid-cols-[1fr_3fr_2fr] py-[1rem] lg:hover:bg-white-400">
								<p class="text-center font-body">
									1 Nov. 2025
								</p>
								<p class="text-center font-body ">
									Vienna 2024 Autumn Edition
								</p>
								<p class="text-center font-body ">
									Result
								</p>
							</a>
						</div>
					</div>
				</div>
			</section>

		</div>
		<div class="w-full flex items-end p-0 h-[6rem] bg-pearl-white">
			<div class="w-full h-[6rem] bottom-0 bg-screenBlack [clip-path:polygon(0_5rem,100%_0,100%_100%,0%_100%)] pb-[8rem] -mb-[1rem]"/>
		</div>
	</DefaultLayout>
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