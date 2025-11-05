<script setup lang="ts">
	import { toRefs } from 'vue';
	const props = defineProps({
		isMenuVisible: Boolean
	})
	const {isMenuVisible} = toRefs(props)
	const emit = defineEmits(['toggleMenuVisibility'])

	const handleClick = () => {
		emit('toggleMenuVisibility')
	};
</script>
<template>
	<button 
		class="flex flex-col justify-between cursor-pointer" 
		@click="handleClick"
		:aria-label="isMenuVisible ? 'Close menu' : 'Open menu'"
		:aria-expanded="isMenuVisible"
		type="button"
	>
		<div
			class="h-[15%] w-full bg-primary rounded-sm transition-all origin-left duration-1000"
			:class="{
				'rotate-45 -translate-y-1/2 scale-x-[1.41] bg-bg': isMenuVisible,
				//'bg-primary': !isMenuVisible,
				//'bg-primary': isMenuVisible 
			}"
			aria-hidden="true"
		/>
		<div
			class="h-[15%] w-[80%] bg-primary rounded-sm transition-all"
			:class="{ 'opacity-0': isMenuVisible }"
			aria-hidden="true"
		/>
		<div
			class="h-[15%] w-full bg-primary rounded-sm transition-all origin-left duration-1000"
			:class="{
				'-rotate-45 translate-y-1/2 scale-x-[1.41] bg-bg': isMenuVisible,
				//'bg-primary': !isMenuVisible,
				//'bg-primary': isMenuVisible 
			}"
			aria-hidden="true"
		/>
	</button>
</template>
