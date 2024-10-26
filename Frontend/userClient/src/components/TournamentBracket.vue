<script setup lang="ts">
import TournamentBracketItem from '@/components/TournamentBracketItem.vue'
import { TournamentBracket } from '@/stores/eventPageStore/eventPageStore';
import { toRefs } from "vue"

const props = defineProps<{
	data: TournamentBracket
}>()
const {data} = toRefs(props)

</script>
<template>
	<div class="grid grid-cols-[repeat(42,1fr)] grid-rows-[repeat(28,1fr)] aspect-[42/28] font-body text-screenBlack">
		<!--first 4 pairs left-->
		<TournamentBracketItem 
			class="col-start-1 row-start-1"
			:participant1="data.eightFinals[0].participant1"
			:participant2="data.eightFinals[0].participant2"
		/>
		<div class="row-start-[3] col-start-[5] row-span-2 col-span-4 border-t-2 border-r-2 border-screenBlack"/>
		<div class="row-start-[9] col-start-[5] row-span-2 col-span-4 border-b-2 border-r-2 border-screenBlack"/>
		<TournamentBracketItem 
			class="col-start-1 row-start-9"
			:participant1="data.eightFinals[1].participant1"
			:participant2="data.eightFinals[1].participant2"
		/>

		<TournamentBracketItem 
			class="col-start-1 row-start-[17]"
			:participant1="data.eightFinals[2].participant1"
			:participant2="data.eightFinals[2].participant2"
		/>
		<div class="row-start-[19] col-start-[5] row-span-2 col-span-4 border-t-2 border-r-2 border-screenBlack"/>
		<div class="row-start-[25] col-start-[5] row-span-2 col-span-4 border-b-2 border-r-2 border-screenBlack"/>
		<TournamentBracketItem 
			class="col-start-1 row-start-[25]"
			:participant1="data.eightFinals[3].participant1"
			:participant2="data.eightFinals[3].participant2"
		/>

		<!--next 2 pairs left-->
		
		<TournamentBracketItem 
			class="col-start-7 row-start-[5]"
			:participant1="data.quarterfinals[0].participant1"
			:participant2="data.quarterfinals[0].participant2"
		/>

		<div class="row-start-[7] col-start-[11] row-span-6 col-span-4 border-t-2 border-r-2 border-screenBlack"/>
		<div class="row-start-[17] col-start-[11] row-span-6 col-span-4 border-b-2 border-r-2 border-screenBlack"/>

		<TournamentBracketItem 
			class="col-start-7 row-start-[21]"
			:participant1="data.quarterfinals[1].participant1"
			:participant2="data.quarterfinals[1].participant2"
		/>

		<!--last pair left-->
		<TournamentBracketItem 
			class="col-start-[13] row-start-[13]"
			:participant1="data.semifinals[0].participant1"
			:participant2="data.semifinals[0].participant2"
		/>

		<!--RightSide-->


		<!--first 4 pairs right-->
		<TournamentBracketItem 
			class="col-start-[39] row-start-1"
			:participant1="data.eightFinals[4].participant1"
			:participant2="data.eightFinals[4].participant2"
		/>
		<div class="row-start-[3] col-start-[35] row-span-2 col-span-4 border-t-2 border-l-2 border-screenBlack"/>
		<div class="row-start-[9] col-start-[35] row-span-2 col-span-4 border-b-2 border-l-2 border-screenBlack"/>
		<TournamentBracketItem 
			class="col-start-[39] row-start-9"
			:participant1="data.eightFinals[5].participant1"
			:participant2="data.eightFinals[5].participant2"
		/>

		<TournamentBracketItem 
			class="col-start-[39] row-start-[17]"
			:participant1="data.eightFinals[6].participant1"
			:participant2="data.eightFinals[6].participant2"
		/>
		<div class="row-start-[19] col-start-[35] row-span-2 col-span-4 border-t-2 border-l-2 border-screenBlack"/>
		<div class="row-start-[25] col-start-[35] row-span-2 col-span-4 border-b-2 border-l-2 border-screenBlack"/>
		<TournamentBracketItem 
			class="col-start-[39] row-start-[25]"
			:participant1="data.eightFinals[7].participant1"
			:participant2="data.eightFinals[7].participant2"
		/>

		<!--next 2 pairs right-->
		
		<TournamentBracketItem 
			class="col-start-[33] row-start-[5]"
			:participant1="data.quarterfinals[2].participant1"
			:participant2="data.quarterfinals[2].participant2"
		/>

		<div class="row-start-[7] col-start-[29] row-span-6 col-span-4 border-t-2 border-l-2 border-screenBlack"/>
		<div class="row-start-[17] col-start-[29] row-span-6 col-span-4 border-b-2 border-l-2 border-screenBlack"/>

		<TournamentBracketItem 
			class="col-start-[33] row-start-[21]"
			:participant1="data.quarterfinals[3].participant1"
			:participant2="data.quarterfinals[3].participant2"
		/>

		<!--last pair right-->
		<TournamentBracketItem 
			class="col-start-[27] row-start-[13]"
			:participant1="data.semifinals[1].participant1"
			:participant2="data.semifinals[1].participant2"
		/>

		<!--finals-->

		<div class="col-start-[19] row-start-[9] lg:row-start-[10] col-span-6 row-span-3 flex justify-center items-center">
			<p class="text-center font-heading text-body lg:text-subtitle">
				Finals
			</p>
		</div>

		<TournamentBracketItem 
			class="col-start-[20] row-start-[13]"
			:participant1="data.finals[0].participant1"
			:participant2="data.finals[0].participant2"
		/>
		<div class="row-start-[15] col-start-[17] row-span-6 col-span-3 border-t-2 border-screenBlack"/>
		<div class="row-start-[15] col-start-[24] row-span-6 col-span-3 border-t-2 border-screenBlack"/>
	</div>
</template>