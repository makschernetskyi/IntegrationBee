<script setup lang="ts">
import TournamentBracketItem from '@/components/TournamentBracketItem.vue';

</script>
<template>
	<div class="grid grid-cols-[repeat(42,1fr)] grid-rows-[repeat(28,1fr)] aspect-[42/28] font-body text-screenBlack">
		<!--first 4 pairs left-->
		<TournamentBracketItem 
			class="col-start-1 row-start-1"
			participant1="M.Czarniecki"
			participant2="G.Weissbier"
		/>
		<div class="row-start-[3] col-start-[5] row-span-2 col-span-4 border-t-2 border-r-2 border-screenBlack"/>
		<div class="row-start-[9] col-start-[5] row-span-2 col-span-4 border-b-2 border-r-2 border-screenBlack"/>
		<TournamentBracketItem 
			class="col-start-1 row-start-9"
			participant1="test1"
			participant2="test2"
		/>

		<TournamentBracketItem 
			class="col-start-1 row-start-[17]"
			participant1="test1"
			participant2="test2"
		/>
		<div class="row-start-[19] col-start-[5] row-span-2 col-span-4 border-t-2 border-r-2 border-screenBlack"/>
		<div class="row-start-[25] col-start-[5] row-span-2 col-span-4 border-b-2 border-r-2 border-screenBlack"/>
		<TournamentBracketItem 
			class="col-start-1 row-start-[25]"
			participant1="test1"
			participant2="test2"
		/>

		<!--next 2 pairs left-->
		
		<TournamentBracketItem 
			class="col-start-7 row-start-[5]"
			participant1="test1"
			participant2="test2"
		/>

		<div class="row-start-[7] col-start-[11] row-span-6 col-span-4 border-t-2 border-r-2 border-screenBlack"/>
		<div class="row-start-[17] col-start-[11] row-span-6 col-span-4 border-b-2 border-r-2 border-screenBlack"/>

		<TournamentBracketItem 
			class="col-start-7 row-start-[21]"
			participant1="test1"
			participant2="test2"
		/>

		<!--last pair left-->
		<TournamentBracketItem 
			class="col-start-[13] row-start-[13]"
			participant1="test1"
			participant2="test2"
		/>

		<!--RightSide-->


		<!--first 4 pairs left-->
		<TournamentBracketItem 
			class="col-start-[39] row-start-1"
			participant1="test1"
			participant2="test2"
		/>
		<div class="row-start-[3] col-start-[35] row-span-2 col-span-4 border-t-2 border-l-2 border-screenBlack"/>
		<div class="row-start-[9] col-start-[35] row-span-2 col-span-4 border-b-2 border-l-2 border-screenBlack"/>
		<TournamentBracketItem 
			class="col-start-[39] row-start-9"
			participant1="test1"
			participant2="test2"
		/>

		<TournamentBracketItem 
			class="col-start-[39] row-start-[17]"
			participant1="test1"
			participant2="test2"
		/>
		<div class="row-start-[19] col-start-[35] row-span-2 col-span-4 border-t-2 border-l-2 border-screenBlack"/>
		<div class="row-start-[25] col-start-[35] row-span-2 col-span-4 border-b-2 border-l-2 border-screenBlack"/>
		<TournamentBracketItem 
			class="col-start-[39] row-start-[25]"
			participant1="test1"
			participant2="test2"
		/>

		<!--next 2 pairs left-->
		
		<TournamentBracketItem 
			class="col-start-[33] row-start-[5]"
			participant1="test1"
			participant2="test2"
		/>

		<div class="row-start-[7] col-start-[29] row-span-6 col-span-4 border-t-2 border-l-2 border-screenBlack"/>
		<div class="row-start-[17] col-start-[29] row-span-6 col-span-4 border-b-2 border-l-2 border-screenBlack"/>

		<TournamentBracketItem 
			class="col-start-[33] row-start-[21]"
			participant1="test1"
			participant2="test2"
		/>

		<!--last pair left-->
		<TournamentBracketItem 
			class="col-start-[27] row-start-[13]"
			participant1="test1"
			participant2="test2"
		/>

		<!--finals-->

		<div class="col-start-[19] row-start-[9] lg:row-start-[10] col-span-6 row-span-3 flex justify-center items-center">
			<p class="text-center font-heading text-body lg:text-subtitle">
				Finals
			</p>
		</div>

		<TournamentBracketItem 
			class="col-start-[20] row-start-[13]"
			participant1="test1"
			participant2="test2"
		/>
		<div class="row-start-[15] col-start-[17] row-span-6 col-span-3 border-t-2 border-screenBlack"/>
		<div class="row-start-[15] col-start-[24] row-span-6 col-span-3 border-t-2 border-screenBlack"/>
	</div>
</template>