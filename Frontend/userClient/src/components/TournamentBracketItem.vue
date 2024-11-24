<script setup lang="ts">

const {participant1, participant2} = defineProps({
	participant1: String,
	participant2: String
})

</script>
<template>	
	<div class="row-span-4 col-span-4 grid grid-cols-1 grid-rows-3 text-text-xs lg:text-text-sm">
			<p class="flex justify-center items-center text-center border-b-2 border-screenBlack whitespace-nowrap">
				{{participant1}}
			</p>
			<div class="flex justify-center items-center">
				<p class="font-heading">vs</p>
			</div>
			<p class="flex justify-center items-center text-center border-t-2 border-screenBlack whitespace-nowrap">
				{{participant2}}
			</p>
		</div>
</template>