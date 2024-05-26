<script setup lang="ts">
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { computed } from '@vue/runtime-dom';
import { useIntegralsStore } from '@/store';

const emit = defineEmits(['submit']);

const props = defineProps(['id']);
const id = computed(() => props.id);

const name = defineModel('name', { default: '' });
const timePerIntegral = defineModel('timePerIntegral', { default: 180 });

const integralsStore = useIntegralsStore();

async function handleSubmit() {
	await integralsStore.addIntegralSeries({
		name: name.value,
		timePerIntegral: timePerIntegral.value,
	});
	emit('submit')
}
</script>
<template>
	<div class="flex w-full flex-row place-content-evenly items-center gap-4">
		<p>name:</p>
		<InputText
			class="h-[3rem] w-[10rem]"
			placeholder="name"
			v-model="name"
		></InputText>
		<p>time s.:</p>
		<InputNumber
			class="h-[3rem]"
			placeholder="time/integral"
			v-model="timePerIntegral"
		></InputNumber>
		<Button
			@click="handleSubmit"
			outlined
			class="h-[3rem] w-[3rem]"
		>
			<svg
				class="h-full w-full fill-primary-600"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 448 512"
			>
				<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
				<path
					d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
				/>
			</svg>
		</Button>
	</div>
</template>
