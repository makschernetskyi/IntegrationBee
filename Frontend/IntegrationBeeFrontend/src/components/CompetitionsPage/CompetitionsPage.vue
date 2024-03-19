<script setup>

    import CompetitionsItem from "./CompetitionsItem.vue"
    import {formatDateToString} from "@/utils/formatDateToString.js"
    import {useStore} from "@/store/index.js";

    import {onMounted, onBeforeUnmount} from 'vue';

    const ITEMS_PER_PAGE = 10



    const store = useStore().competitionsPage

    const searchParams = new URLSearchParams(window.location.hash.split('/').pop());
    let pageNumber = 1
    console.log(searchParams.get("page"))
    if(searchParams.has("page")){
        pageNumber = searchParams.get("page")
    }


    onMounted(async ()=>{
        await Promise.all([store.fetchCompetitionsPageInfo(), store.fetchCompetitionsInfo(pageNumber, ITEMS_PER_PAGE)])
    })

    onBeforeUnmount(()=>{
        store.$reset()
    })




</script>
<template>
    <div class="CompetitionsPage">
        <section v-if="store.upcomingCompetitions.length" class="CompetitionsPage-Competitions CompetitionsPage-Competitions--upcoming">
            <h1 class="CompetitionsPage-Competitions-header">Upcoming Competitions:</h1>
            <div class="CompetitionsPage-Competitions-Feed">
                <CompetitionsItem v-for="competition in store.upcomingCompetitions" :title="competition.header" :description="competition.shortDescription" :date="formatDateToString(competition.date)" :location="null" :locationName="competition.location" :id="competition.id" :icon="competition.pictureUrl"/>
            </div>
        </section>
        <section v-if="store.pastCompetitions.length" class="CompetitionsPage-Competitions CompetitionsPage-Competitions--past">
            <h1 class="CompetitionsPage-Competitions-header">Past Competitions:</h1>
            <div class="CompetitionsPage-Competitions-Feed">
                <CompetitionsItem v-for="competition in store.pastCompetitions" :title="competition.header" :description="competition.shortDescription" :date="formatDateToString(competition.date)" :location="null" :locationName="competition.location" :id="competition.id" :icon="competition.pictureUrl"/>
            </div>
        </section>

    </div>
</template>