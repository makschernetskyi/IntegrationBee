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
        class="menu-button flex flex-col items-center justify-between cursor-pointer h-[3rem] w-[3rem]" 
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
        <span class="menu-btn-label sr-only text-pearl-white text-text-sm">Menu</span>
	</button>
</template>
<style scoped>
.menu-button:focus-visible .menu-btn-label,
.menu-button:focus .menu-btn-label {
    position: static;
    width: auto;
    height: auto;
    clip: auto;
    clip-path: none;
    white-space: nowrap;
    margin-top: 0.25rem;
}
</style>
