<script setup lang="ts">
import {toRefs, ref,watch, computed} from "vue"
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { useRoute } from "vue-router";
import { ParticipatePanelData, useEventPageStore } from "@/stores/eventPageStore/eventPageStore";
import { sanitizeHtml } from "@/utils/htmlSanitizers";
import { useAuthStore } from "@/stores/authStore/authStore";
import { storeToRefs } from "pinia";

const props = defineProps<{
	data: ParticipatePanelData
}>()

const {data} = toRefs(props)

const eventPageStore = useEventPageStore();
const {competitionId} = storeToRefs(eventPageStore)

const {deregisterParticipant, fetchEventData}= eventPageStore
const {competitions, getProfileData} = useAuthStore()

const zoom = ref(data.value.zoom)

const emit = defineEmits(['showParticipationForm'])

const isParticipating = computed(()=>competitions.find(competition=>competition.id == competitionId.value))

const handleCancellation = async() =>{
	if(confirm("Are you sure you want to cancel your participation?")){
		await deregisterParticipant()
		await getProfileData()
	}
}

</script>
<template>
	<div class="flex flex-col gap-[2rem]">
		<!-- map -->
		<div v-if="data.coordinates[0]!==0 || data.coordinates[1]!==0" class="w-full h-[20rem] overflow-hidden rounded-xl hidden lg:flex z-[2]">
			<l-map :use-global-leaflet="false" class="h-full w-full" ref="map" v-model="zoom" v-model:zoom="zoom" :center="data.coordinates">
				<l-tile-layer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					layer-type="base"
					name="OpenStreetMap"
				></l-tile-layer>
				<l-marker :lat-lng="data.coordinates">
					<l-icon :icon-size="[0,0]" :icon-anchor="[25,50]" class="bg-transparent">
						<img src="https://i.postimg.cc/3RJGQqj2/location-Marker.png">
					</l-icon>
				</l-marker>
			</l-map>
		</div>
		<!-- date & time -->
		<div class="w-full grid grid-cols-[4rem_1fr]">
			<div class="flex justify-center items-start pt-[0.2rem] w-full">
				<div class="h-[3rem] aspect-square">
					<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
						<circle cx="15.0807" cy="15.0807" r="14.2581" stroke="#4D4D4D" stroke-width="1.64516"/>
						<path d="M15.0806 6.85486V15.6291L19.1935 20.0162" stroke="#4D4D4D" stroke-width="2.06682"/>
					</svg>
				</div>
			</div>
			<p class="font-body text-body lg:text-text-sm text-gray" v-html="sanitizeHtml(data.date)"/>
		</div>

		<!--location-->
		<div class="w-full grid grid-cols-[4rem_1fr] max-w-full">
			<div class="flex justify-center items-start w-full">
				<div class="h-[4rem] aspect-square">
					<svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
						<path d="M15 42L2 22.5L15 27L28 22.5L15 42Z" fill="#4D4D4D"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM15 23C19.4183 23 23 19.4183 23 15C23 10.5817 19.4183 7 15 7C10.5817 7 7 10.5817 7 15C7 19.4183 10.5817 23 15 23Z" fill="#4D4D4D"/>
					</svg>
				</div>
			</div>
			<a :href="data.locationMapsUrl" target="_blank" class="font-body text-body lg:text-text-sm text-gray max-w-full lg:hover:underline" v-html="sanitizeHtml(data.location)"/>
		</div>
		<div v-if="!data.isRegistrationOpen" class="w-full flex justify-center items-center">
			<p class="text-body font-body text-gray-400">
				{{ data.reasonRegistrationClosed }}
			</p>
		</div>
		<div class="w-full flex justify-center items-center">
			<button
				v-if="!isParticipating"
				:class="{
					'overflow-hidden rounded-[20px] font-heading text-title  px-[4rem] pt-[0.6rem] pb-[0.4rem] relative ' : true,
					'bg-gray-100 text-gray-400 cursor-default' : !data.isRegistrationOpen,
					'bg-primary border-primary border-4 text-screenBlack after:absolute after:w-full after:h-full after:top-0 after:left-0 after:hidden lg:after:flex after:bg-pearl-white lg:hover:after:scale-y-0 after:transition-transform after:duration-200 after:will-change-transform after:origin-top' : data.isRegistrationOpen,
				}"
				:title="data.isRegistrationOpen ? 'take part' : 'registration isn\'t open'"
				@click="()=>data.isRegistrationOpen && emit('showParticipationForm')"
			>
				<span class="relative z-[2]">
					Participate
				</span>
			</button>

			<button
				v-else
				:class="{
					'overflow-hidden rounded-[20px] font-heading text-title  px-[4rem] pt-[0.6rem] pb-[0.4rem] relative ' : true,
					'bg-gray-100 text-gray-400 cursor-default' : !data.isRegistrationOpen,
					'bg-red border-red border-4 text-pearl-white lg:hover:text-screenBlack' : data.isRegistrationOpen,
				}"
				:title="data.isRegistrationOpen ? 'cancel participation' : 'deregistration is closed'"
				@click="handleCancellation"
			>
				<span class="relative z-[2]">
					Cancel
				</span>
			</button>

		</div>
		<div class="w-full flex justify-center items-center">
			<p class="text-body font-body">
				Participants: {{ data.participantsCount }}
			</p>
		</div>
	</div>
</template>