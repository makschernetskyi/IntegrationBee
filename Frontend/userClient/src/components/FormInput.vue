<script setup lang="ts">
import { toRefs, ref } from 'vue';

const props = defineProps({
	modelValue: {type: String},
	label: {type: String},
	type: {type: String},
	name: {type: String},
	invalid: {type: Boolean},
})
const {modelValue, label, invalid} = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const localType = ref(props.type)

function toggleInputType(){
	if(localType.value == "password"){
		localType.value = "text"
	}else{
		localType.value = "password"
	}
}

const randomId = "input" + Math.floor(Math.random()*100000).toString()
</script>
<template>
	<div class="relative h-[8rem] flex justify-start items-end text-body text-screenBlack">
		<div :class="{
			'h-[50%] relative w-full border-b-2 has-[:focus]:border-b-primary transition-all duration-100': true,
			'border-b-red': invalid,
			'border-b-screenBlack': !invalid
			}">
			<input 
				:type="localType"
				:value="modelValue"
				@input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
				:class="`w-full h-full outline-none font-body bg-pearl-white pl-[2rem] peer ${type == 'password' ? 'pr-[7rem]': 'pr-[2rem]'}`"
				placeholder=" "
				:id="randomId"
				:name="name"
				autocomplete="true"
			>
			<label :for="randomId" :class="{
					'px-[2rem] font-heading absolute w-full h-full top-0 left-0 justify-start items-center pointer-events-none peer-focus:-translate-y-[100%] transition-all duration-100 peer-[:not(:placeholder-shown)]:-translate-y-[100%] peer-[:autofill]:-translate-y-[100%] whitespace-nowrap': true,
					'peer-focus:text-primary': !invalid,
					'text-red': invalid
				}">
				{{label}}
			</label>
			<button type="button" v-if="type == 'password'" @click="toggleInputType" aria-label="toggle password visibility (click to toggle password visibility)" class="absolute h-full aspect-square right-[2rem] top-0 flex justify-center items-center fill-screenBlack lg:hover:fill-primary group p-2">
				<svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full fill-inherit">
					<g clip-path="url(#clip0_352_208)">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M0.0429876 8.08552C2.14476 3.3236 6.90809 0 12.4477 0C17.9873 0 22.7506 3.32361 24.8524 8.08552C24.9097 8.21538 24.9097 8.36367 24.8524 8.49353C22.7506 13.2554 17.9873 16.579 12.4477 16.579C6.90809 16.579 2.14476 13.2554 0.0429875 8.49353C-0.0143292 8.36367 -0.0143291 8.21538 0.0429876 8.08552ZM18.9045 8.42096C18.9045 12.0544 15.959 14.9999 12.3255 14.9999C8.69205 14.9999 5.74656 12.0544 5.74656 8.42096C5.74656 4.78751 8.69205 1.84201 12.3255 1.84201C15.959 1.84201 18.9045 4.78751 18.9045 8.42096ZM17.6513 8.42109C17.6513 11.3625 15.2668 13.7469 12.3255 13.7469C9.38409 13.7469 6.99964 11.3625 6.99964 8.42109C6.99964 5.47973 9.38409 3.09528 12.3255 3.09528C15.2668 3.09528 17.6513 5.47973 17.6513 8.42109ZM14.6023 4.70419C14.713 4.68767 14.8241 4.73146 14.8937 4.81906L16.2905 6.57566C16.3602 6.66326 16.3778 6.78138 16.3367 6.88551L15.5139 8.97343C15.4728 9.07756 15.3794 9.15189 15.2687 9.16842L13.049 9.49975C12.9383 9.51627 12.8272 9.47248 12.7576 9.38488L11.3608 7.62828C11.2911 7.54067 11.2735 7.42256 11.3145 7.31843L12.1374 5.2305C12.1785 5.12637 12.2719 5.05205 12.3826 5.03552L14.6023 4.70419Z" />
					</g>
					<defs>
					<clipPath id="clip0_352_208">
					<rect width="25" height="16.5789" fill="white"/>
					</clipPath>
					</defs>
				</svg>
				<div class="absolute w-full h-full top-0 left-0 pointer-events-none">
					<div class="relative w-full h-full">
						<div class="absolute w-full h-full top-0 left-0 origin-center scale-[1] flex justify-center items-center z-[10] rotate-45">
							<transition
								enter-from-class="scale-x-0"
								enter-active-class="transition-tranform duration-150"
								enter-to-class="scale-x-1"
								leave-from-class="scale-x-1"
								leave-active-class="transition-tranform duration-150 origin-right"
								leave-to-class="scale-x-0 "
							>
								<div v-if="localType == 'text'" class="h-[2px] w-full bg-screenBlack origin-left box-content rounded will-change-transform lg:group-hover:bg-primary"/>
							</transition>
						</div>
					</div>
				</div>
				
			</button>
		</div>
	</div>
</template>
<style lang="pcss">

</style>