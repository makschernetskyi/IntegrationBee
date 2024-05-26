<script setup lang="ts">
import Button from 'primevue/button';
import DataView from 'primevue/dataview';
import { computed, onMounted } from '@vue/runtime-dom';
import { IntegralsStore, useIntegralsStore } from '@/store';
import AddIntegralSeriesPanel from '@/components/AddIntegralSeriesPanel.vue';
import { ref } from 'vue';
import EditIntegralSeriesPanel from "@/components/EditIntegralSeriesPanel.vue";

const integralsStore: IntegralsStore = useIntegralsStore();

const chosenSeries = computed(() => integralsStore.menuState.chosenSeriesId);

onMounted(async () => {
	await integralsStore.fetchIntegralsSeries();
});

const isAddSeriesSeen = ref(false);
const isEditSeriesSeen = ref(false);
</script>
<template>
	<div
		class="grid h-full w-full grid-cols-[minmax(400px,2fr)_1fr] grid-rows-1 px-40 py-4"
	>
		<div class="grid h-full w-full grid-rows-[3rem_1fr] p-4">
			<div class="grid h-[3rem] w-full grid-cols-[1fr_3rem]">
				<p class="flex items-center">Series</p>
				<button
					@click="
						() => {
							isAddSeriesSeen = true;
						}
					"
					class="h-[3rem] w-[3rem] p-3"
				>
					<svg
						class="h-full w-full"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
						<path
							d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
						/>
					</svg>
				</button>
			</div>
			<DataView
				paginator
				:rows="10"
				:value="integralsStore.series"
				data-key=""
				class="h-full w-full"
			>
				<template #list="slotProps">
					<div class="grid-nogutter grid">
						<div
							v-for="(item, index) in slotProps.items"
							:key="index"
							:class="{ 'border-top-1 surface-border': index !== 0 }"
							class="h-12"
						>
							<button
								class="h-full w-full"
								:class="{
									'rounded-sm bg-primary-100': chosenSeries === item.id,
								}"
								@click="
									() => {
										integralsStore.menuState.chosenSeriesId = item.id;
									}
								"
							>
								{{ item.name }}
							</button>
						</div>
					</div>
				</template>
			</DataView>
		</div>
		<div class="grid h-full w-full auto-rows-max gap-4 p-4">
			<!--			when clickable-->
			<router-link
				:to="`/integralSeries/${chosenSeries}`"
				v-if="chosenSeries !== null"
				class="grid h-[3rem] w-full grid-cols-[1fr_3rem] rounded-sm bg-surface-100 shadow-lg hover:border-surface-200 hover:bg-surface-200 dark:hover:border-surface-600 dark:hover:bg-surface-600"
			>
				<p
					class="flex h-full w-full items-center justify-center text-surface-900"
				>
					Present
				</p>
				<div class="h-[3rem] w-[3rem] p-2">
					<svg
						class="h-full w-full"
						version="1.1"
						id="_x32_"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="800px"
						height="800px"
						viewBox="0 0 512 512"
						xml:space="preserve"
					>
						<g>
							<path
								class="st0"
								d="M209.219,144.165c0.109-57.766-46.625-104.703-104.406-104.813C47.047,39.227,0.109,85.993,0,143.758
											s46.641,104.703,104.406,104.813S209.109,201.946,209.219,144.165z M68.422,143.899c0.031-19.984,16.281-36.156,36.25-36.125
											c20,0.047,36.156,16.281,36.125,36.266c-0.047,19.984-16.266,36.156-36.266,36.109C84.563,180.102,68.391,163.883,68.422,143.899z"
							/>
							<path
								class="st0"
								d="M328.109,248.571c57.781,0.109,104.703-46.625,104.813-104.406c0.109-57.766-46.625-104.703-104.406-104.813
											c-57.766-0.125-104.703,46.641-104.813,104.406S270.344,248.461,328.109,248.571z M328.391,107.774
											c19.984,0.047,36.141,16.281,36.109,36.266s-16.266,36.156-36.25,36.109s-36.156-16.266-36.125-36.25
											S308.406,107.743,328.391,107.774z"
							/>
							<path
								class="st0"
								d="M327.813,275.149H79.281c-12.625,0-22.859,10.234-22.859,22.859v151.796c0,12.609,10.234,22.844,22.859,22.844
											h248.531c12.625,0,22.859-10.234,22.859-22.844V298.008C350.672,285.383,340.438,275.149,327.813,275.149z"
							/>
							<path
								class="st0"
								d="M499.734,278.961c-7.609-4.609-17.094-4.906-24.984-0.781l-93.672,48.906
											c-8.406,4.375-13.672,13.078-13.672,22.563v47.813c0,9.484,5.266,18.171,13.672,22.562l93.672,48.906
											c7.891,4.125,17.375,3.828,24.984-0.781c7.609-4.625,12.266-12.891,12.266-21.797V300.743
											C512,291.852,507.344,283.586,499.734,278.961z"
							/>
						</g>
					</svg>
				</div>
			</router-link>

			<!--			when not clickable-->

			<div
				v-if="integralsStore.menuState.chosenSeriesId === null"
				class="grid h-[3rem] w-full grid-cols-[1fr_3rem] rounded-sm bg-surface-100 opacity-60 shadow-lg"
			>
				<p
					class="flex h-full w-full items-center justify-center text-surface-900"
				>
					Present
				</p>
				<div class="h-[3rem] w-[3rem] p-2">
					<svg
						class="h-full w-full"
						version="1.1"
						id="_x32_"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="800px"
						height="800px"
						viewBox="0 0 512 512"
						xml:space="preserve"
					>
						<g>
							<path
								class="st0"
								d="M209.219,144.165c0.109-57.766-46.625-104.703-104.406-104.813C47.047,39.227,0.109,85.993,0,143.758
											s46.641,104.703,104.406,104.813S209.109,201.946,209.219,144.165z M68.422,143.899c0.031-19.984,16.281-36.156,36.25-36.125
											c20,0.047,36.156,16.281,36.125,36.266c-0.047,19.984-16.266,36.156-36.266,36.109C84.563,180.102,68.391,163.883,68.422,143.899z"
							/>
							<path
								class="st0"
								d="M328.109,248.571c57.781,0.109,104.703-46.625,104.813-104.406c0.109-57.766-46.625-104.703-104.406-104.813
											c-57.766-0.125-104.703,46.641-104.813,104.406S270.344,248.461,328.109,248.571z M328.391,107.774
											c19.984,0.047,36.141,16.281,36.109,36.266s-16.266,36.156-36.25,36.109s-36.156-16.266-36.125-36.25
											S308.406,107.743,328.391,107.774z"
							/>
							<path
								class="st0"
								d="M327.813,275.149H79.281c-12.625,0-22.859,10.234-22.859,22.859v151.796c0,12.609,10.234,22.844,22.859,22.844
											h248.531c12.625,0,22.859-10.234,22.859-22.844V298.008C350.672,285.383,340.438,275.149,327.813,275.149z"
							/>
							<path
								class="st0"
								d="M499.734,278.961c-7.609-4.609-17.094-4.906-24.984-0.781l-93.672,48.906
											c-8.406,4.375-13.672,13.078-13.672,22.563v47.813c0,9.484,5.266,18.171,13.672,22.562l93.672,48.906
											c7.891,4.125,17.375,3.828,24.984-0.781c7.609-4.625,12.266-12.891,12.266-21.797V300.743
											C512,291.852,507.344,283.586,499.734,278.961z"
							/>
						</g>
					</svg>
				</div>
			</div>
			<Button
					@click="()=>{isEditSeriesSeen=true}"
				severity="secondary"
				class="h-3rem grid w-full grid-cols-[1fr_3rem] !p-0"
				raised
				:disabled="chosenSeries === null"
			>
				<p
					class="flex h-full w-full items-center justify-center text-surface-900"
				>
					Edit
				</p>
				<div class="h-[3rem] w-[3rem] p-3">
					<svg
						class="h-full w-full fill-black"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
						<path
							d="M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.8-9.2L288 94.6z"
						/>
					</svg>
				</div>
			</Button>
		</div>
	</div>
	<div
		v-if="isAddSeriesSeen"
		class="fixed left-1/2 top-1/2 z-20 h-[8rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 transform rounded-sm bg-surface-50 shadow-lg"
	>
		<div class="relative flex h-full w-full items-center">
			<button
				@click="
					() => {
						isAddSeriesSeen = false;
					}
				"
				class="absolute right-[-0.5rem] top-[-0.5rem] h-4 w-4"
			>
				<svg
					class="h-full w-full fill-surface-900"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
					<path
						d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
					/>
				</svg>
			</button>
			<AddIntegralSeriesPanel
				:id="chosenSeries"
				@submit="
					() => {
						isAddSeriesSeen = false;
					}
				"
			/>
		</div>
	</div>
<!--	<div-->
<!--			v-if="isEditSeriesSeen"-->
<!--			class="fixed left-1/2 top-1/2 z-20 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 transform rounded-sm bg-surface-50 shadow-lg"-->
<!--	>-->
<!--		<div class="relative flex h-full w-full items-center">-->
<!--			<button-->
<!--					@click="-->
<!--					() => {-->
<!--						isEditSeriesSeen = false;-->
<!--					}-->
<!--				"-->
<!--					class="absolute right-[-0.5rem] top-[-0.5rem] h-4 w-4"-->
<!--			>-->
<!--				<svg-->
<!--						class="h-full w-full fill-surface-900"-->
<!--						xmlns="http://www.w3.org/2000/svg"-->
<!--						viewBox="0 0 512 512"-->
<!--				>-->
<!--					&lt;!&ndash;!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.&ndash;&gt;-->
<!--					<path-->
<!--							d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"-->
<!--					/>-->
<!--				</svg>-->
<!--			</button>-->
<!--			<EditIntegralSeriesPanel-->
<!--					:id="chosenSeries"-->
<!--					@submit="-->
<!--					() => {-->
<!--						isEditSeriesSeen = false;-->
<!--					}-->
<!--				"-->
<!--			/>-->
<!--		</div>-->
<!--	</div>-->
</template>
<style scoped lang="postcss"></style>
