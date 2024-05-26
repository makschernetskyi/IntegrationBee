<!--<script setup lang="ts">-->
<!--import InputText from 'primevue/inputtext';-->
<!--import InputNumber from 'primevue/inputnumber';-->
<!--import Button from 'primevue/button';-->
<!--import { computed } from '@vue/runtime-dom';-->
<!--import { useIntegralsStore } from '@/store';-->
<!--import {onMounted, ref} from "vue";-->
<!--import DataView from "primevue/dataview";-->
<!--import {Integral} from "@/store/modules/Integrals/types.ts";-->

<!--const integralsStore = useIntegralsStore();-->

<!--defineEmits(['submit']);-->

<!--const props = defineProps(['id']);-->
<!--const id = computed(() => props.id);-->

<!--const seriesName = defineModel('seriesName', { default:  integralsStore.currentSeriesDetails.name});-->
<!--const timePerIntegral = defineModel('timePerIntegral', { default: integralsStore.currentSeriesDetails.timePerIntegral });-->

<!--const integralName = defineModel('integralName', {default: ''})-->
<!--const integralPosition = defineModel('integralPosition', {default:''})-->
<!--const integralIntegral = defineModel('integralIntegral', {default:''})-->
<!--const integralSolution = defineModel('integralSolution', {default:''})-->
<!--const integralDifficulty = defineModel('integralDifficulty', {default:''})-->
<!--const integralAuthor = defineModel('integralAuthor', {default:''})-->




<!--const chosenIntegral = ref(null)-->

<!--function choseIntegral(id:number){-->
<!--	const integral = integralsStore.currentSeriesDetails.integrals.find((integral: Integral) => integral.id === id)-->
<!--	if(integral){-->
<!--		integralName.value = integral.name-->
<!--		integralPosition.value = integral.position.toString()-->
<!--		integralIntegral.value = integral.integral-->
<!--		integralDifficulty.value = integral.difficulty.toString()-->
<!--		integralSolution.value = integral.solution?.solution || ''-->
<!--		integralAuthor.value = integral.author-->
<!--	}-->

<!--}-->

<!--onMounted(async()=>{-->
<!--	await integralsStore.fetchIntegralsSeries()-->
<!--})-->

<!--async function handleSubmit() {-->
<!--	// await integralsStore.addIntegralSeries({-->
<!--	// 	name: name.value,-->
<!--	// 	timePerIntegral: timePerIntegral.value,-->
<!--	// });-->
<!--}-->
<!--</script>-->
<!--<template>-->
<!--	<div class="grid w-full h-full grid-cols-[1fr_3fr]">-->
<!--		<DataView-->
<!--				paginator-->
<!--				:rows="8"-->
<!--				:value="integralsStore.currentSeriesDetails.integrals.toArray()"-->
<!--				data-key=""-->
<!--				class="h-full w-full"-->
<!--		>-->
<!--			<template #list="slotProps">-->
<!--				<div class="grid-nogutter grid">-->
<!--					<div-->
<!--							v-for="(item, index) in slotProps.items"-->
<!--							:key="index"-->
<!--							:class="{ 'border-top-1 surface-border': index !== 0 }"-->
<!--							class="h-12"-->
<!--					>-->
<!--						<button-->
<!--								class="h-full w-full"-->
<!--								:class="{-->
<!--									'rounded-sm bg-primary-100': chosenIntegral === item.id,-->
<!--								}"-->
<!--								@click="-->
<!--									() => {-->
<!--										chosenIntegral = item.id;-->
<!--									}-->
<!--								"-->
<!--						>-->
<!--							{{ item.name }}-->
<!--						</button>-->
<!--					</div>-->
<!--				</div>-->
<!--			</template>-->
<!--		</DataView>-->
<!--		<div>-->
<!--			<div>-->
<!--				<InputText placeholder="name"></InputText>-->
<!--				<InputNumber placeholder="time"></InputNumber>-->
<!--				<Button-->
<!--						@click="handleSubmit"-->
<!--						outlined-->
<!--						class="h-[3rem] w-[3rem]"-->
<!--				>-->
<!--					<svg-->
<!--							class="h-full w-full fill-primary-600"-->
<!--							xmlns="http://www.w3.org/2000/svg"-->
<!--							viewBox="0 0 448 512"-->
<!--					>-->
<!--						&lt;!&ndash;!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.&ndash;&gt;-->
<!--						<path-->
<!--								d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"-->
<!--						/>-->
<!--					</svg>-->
<!--				</Button>-->
<!--			</div>-->
<!--			<div>-->
<!--				<InputText placeholder="name"></InputText>-->
<!--				<InputText placeholder="position"></InputText>-->
<!--				<InputText placeholder="integral"></InputText>-->
<!--				<InputText placeholder="solution"></InputText>-->
<!--				<InputText placeholder="difficulty"></InputText>-->
<!--				<InputText placeholder="author"></InputText>-->
<!--				<Button-->
<!--						@click="handleSubmit"-->
<!--						outlined-->
<!--						class="h-[3rem] w-[3rem]"-->
<!--				>-->
<!--					<svg-->
<!--							class="h-full w-full fill-primary-600"-->
<!--							xmlns="http://www.w3.org/2000/svg"-->
<!--							viewBox="0 0 448 512"-->
<!--					>-->
<!--						&lt;!&ndash;!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.&ndash;&gt;-->
<!--						<path-->
<!--								d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"-->
<!--						/>-->
<!--					</svg>-->
<!--				</Button>-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!--</template>-->
