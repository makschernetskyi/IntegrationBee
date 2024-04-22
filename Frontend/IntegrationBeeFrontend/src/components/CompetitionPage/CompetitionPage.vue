<script setup>
    import {useStore} from "@/store/index.js";
    import {formatDateToString} from "@/utils/formatDateToString.js";
    import formatRichText from "@/utils/richTextFormatter.js";

    import  {useRouter} from 'vue-router';
    import {onMounted, computed, onBeforeUnmount} from 'vue'

    const placeholderImage = "/static/assets/IntegrationBeeLogo.svg"



    const competitionsStore = useStore().competitionsPage;
    const authStore = useStore().auth;
    const router = useRouter();
    const competitionId = router.currentRoute._value.params.id

    onMounted(()=>{
        competitionsStore.fetchCompetitionInfo(competitionId)
    })

    onBeforeUnmount(()=>{
        competitionsStore.resetCurrentCompetition()
    })

    const competitionInfo = computed({get: ()=>competitionsStore.currentCompetition})
    const requestInfo = computed(()=>competitionsStore.fetchCompetitionInfoRequest)
    const userInfo = computed({get: ()=>authStore.user})



    async function joinCompetition(id){
        await competitionsStore.signUpForCompetition(id)
        await authStore.getUserData()
        competitionsStore.resetCurrentCompetition()
        await competitionsStore.fetchCompetitionInfo(competitionId)
    }

    async function leaveCompetition(id){
        await competitionsStore.deregisterFromCompetition(id)
        await authStore.getUserData()
        competitionsStore.resetCurrentCompetition()
        await competitionsStore.fetchCompetitionInfo(competitionId)
    }

    const [user, competition] = [userInfo, competitionInfo];
    const isAuthenticated = computed(()=>authStore.isAuthenticated)
    const joined = computed(()=>isAuthenticated && competition.relatedCompetitionId && user.competitions.map(c=>c.id).includes(competition.relatedCompetitionId))

</script>
<template>
    <div class="Competition">
        <div class="Competition-Picture">
                <img :src="competition.pictureUrl ? competition.pictureUrl : placeholderImage" alt=""/>
        </div>
        <div class="Competition-MetaInfo">
            <div class="Competition-MetaInfo-Picture">
                <img :src="competition.pictureUrl ? competition.pictureUrl : placeholderImage" alt=""/>
            </div>
            <p class="Competition-MetaInfo-time">{{competition.date ? formatDateToString(competition.date) : null}}</p>
            <p class="Competition-MetaInfo-Location">
                <template v-if="!competition.locationUrl">{{competition.location}}</template>
                <a v-if="competition.locationUrl" :href="competition.locationUrl" target="_blank">{{competition.location}}</a>
            </p>
            <div :class="{'Competition-MetaInfo-Registration': true, 'Competition-MetaInfo-Registration--joined': joined && (!competitionInfo.maxParticipants || Number(competitionInfo.participants) < Number(competitionInfo.maxParticipants)) }">
                <template v-if="!competitionInfo.maxParticipants || Number(competitionInfo.participants) < Number(competitionInfo.maxParticipants)">
                    <p v-if="joined" class="Competition-MetaInfo-goingMessage">You are registered.</p>
                    <p v-if="!joined" class="Competition-MetaInfo-toParticipateMsg">To participate:</p>
                    <button v-if="isAuthenticated && competition.relatedCompetitionId && !user.competitions.map(c=>c.id).includes(competition.relatedCompetitionId)" class="Competition-MetaInfo-JoinBtn" @click="()=>joinCompetition(competition.relatedCompetitionId)">Join!</button>
                    <button v-if="isAuthenticated && competition.relatedCompetitionId && user.competitions.map(c=>c.id).includes(competition.relatedCompetitionId)" class="Competition-MetaInfo-LeaveBtn" @click="()=>leaveCompetition(competition.relatedCompetitionId)">Quit</button>
                    <router-link to="/signIn" v-if="!isAuthenticated" class="Competition-MetaInfo-signInLink">Sign in</router-link>
                </template>
                <template v-if="(competitionInfo.maxParticipants && Number(competitionInfo.participants) >= Number(competitionInfo.maxParticipants)) || (competitionInfo.relatedCompetitionId === null && requestInfo.status && requestInfo.status!== 'pending')">
                    <p class="Competition-MetaInfo-info">registration is closed</p>
                </template>
                <p v-if="competitionInfo.participants !== null" class="Competition-MetaInfo-info participantsCount">participants: {{competitionInfo.participants}}<template v-if="competitionInfo.maxParticipants !== null">/{{competitionInfo.maxParticipants}}</template></p>
            </div>
        </div>
        <h2 class="Competition-Header">{{competition.header}}</h2>
        <div class="Competition-Description">
            <h3>Details:</h3>
            <p class="Competition-Description-description" v-html="competition.description && formatRichText(competition.description)"></p>
        </div>
    </div>
</template>