import {defineStore} from 'pinia'

import {fetchCompetitionsPageInfo} from "@/store/resolvers/fetchCompetitionsPageInfo.js";
import {fetchCompetitionsInfo} from "@/store/resolvers/fetchCompetitionsInfo.js";
import {fetchCompetitionInfo} from "@/store/resolvers/fetchCompetitionInfo.js";
import {signUpForCompetition} from "@/store/resolvers/signUpForCompetition.js";
import {deregisterFromCompetition} from "@/store/resolvers/deregisterFromCompetition.js";
import {fetchAllDBCompetitions} from "@/store/resolvers/fetchAllDBCompeititions.js";
import {addCompetition} from "@/store/resolvers/addCompetition.js";
import {removeCompetition} from "@/store/resolvers/removeCompetition.js";


export const useCompetitionsPageStore = defineStore('competitionsPage', {
    state: ()=>({
        header: null,
        currentCompetition:{
            id: null,
            header: null,
            description: null,
            date: null,
            location: null,
            locationUrl: null,
            pictureUrl: null,
            relatedCompetitionId: null,
            maxParticipants: null,
            participants: null,
        },
        competitions:[],
        competitionsDB: [],
        fetchCompetitionInfoRequest:{
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        },
        fetchCompetitionsPageInfoRequest:{
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        },
        fetchCompetitionsInfoRequest:{
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        },
        addCompetitionRequest: {
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        },
        removeCompetitionRequest: {
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        }
    }),
    getters:{
        pastCompetitions(state){
            return state.competitions.filter(competition=>new Date(competition.date) < Date.now()).sort((competition1, competition2)=> competition2.date - competition1.date)
        },
        upcomingCompetitions(state){
            return state.competitions.filter(competition=>new Date(competition.date) >= Date.now()).sort((competition1, competition2)=>  competition1.date - competition2.date)
        }
    },
    actions: {
        fetchCompetitionsPageInfo,
        fetchCompetitionsInfo,
        fetchCompetitionInfo,
        signUpForCompetition,
        deregisterFromCompetition,
        fetchAllDBCompetitions,
        addCompetition,
        removeCompetition,
        resetCurrentCompetition(){
            this.currentCompetition = {
                id: null,
                header: null,
                description: null,
                date: null,
                location: null,
                locationUrl: null,
                pictureUrl: null,
                relatedCompetitionId: null,
                maxParticipants: null,
                participants: null,
            }
        }
    }
})