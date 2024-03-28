import axios from 'axios'
import {defineStore} from 'pinia'
import Cookies from 'js-cookie';

import {useErrorStore} from "@/store/modules/error.js";


const PAGES_URL = "/api/v2/cms/pages/"
const COMPETITION_URL = "/api/v2/competition/"
const PUBLIC_COMPETITION_URL = "/api/v2/publicCompetition/"
const ALL_COMPETITIONS_URL = "/api/v2/allCompetitions/"

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
        async fetchCompetitionsPageInfo(){
            try {
                // Reset the request status before making a new request
                this.fetchCompetitionsPageInfoRequest = {
                    status: 'pending',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

                const response = await axios.get(PAGES_URL, {
                    params: {
                        type: "home.CompetitionsPage",
                        fields: "header"
                    }
                });

                const data = response.data;
                if (!data || !data.items || Object.keys(data.items).length === 0) {
                    console.error("No competitions page data received");
                    // Update request status indicating an error
                    this.fetchCompetitionsPageInfoRequest = {
                        status: 'rejected',
                        code: null,
                        error: "No competitions page data received",
                        errorMSG: "No competitions page data received",
                    };
                    return;
                }

                const pageInfo = data.items["0"];
                this.header = pageInfo.header;

                // Update request status after successful response
                this.fetchCompetitionsPageInfoRequest = {
                    status: 'resolved',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

            } catch (error) {
                console.error(error);

                // Update request status and error details if request fails
                this.fetchCompetitionsPageInfoRequest = {
                    status: 'rejected',
                    code: error.response?.status || null,
                    error: error,
                    errorMSG: error.message,
                };
            }
        },
        async fetchCompetitionsInfo(page, itemsPerPage=10) {
            try {
                // Reset the request status before making a new request
                this.fetchCompetitionsInfoRequest = {
                    status: 'pending',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

                const response = await axios.get(PAGES_URL, {
                    params: {
                        type: "home.Competition",
                        fields: "header,short_description,event_date,place,picture",
                        limit: itemsPerPage,
                        offset: itemsPerPage * (page - 1)
                    }
                });

                const data = response.data;
                if (!data || !data.items) {
                    console.error("No competition data received");
                    // Update request status indicating an error
                    this.fetchCompetitionsInfoRequest = {
                        status: 'rejected',
                        code: null,
                        error: "No competition data received",
                        errorMSG: "No competition data received",
                    };
                    return;
                }

                const competitions = data.items;
                competitions.forEach(item => {
                    this.competitions.push({
                        id: item.id,
                        header: item.header,
                        shortDescription: item.short_description,
                        date: new Date(item.event_date),
                        location: item.place,
                        pictureUrl: item.picture?.meta.download_url
                    });
                });

                // Update request status after successful response
                this.fetchCompetitionsInfoRequest = {
                    status: 'resolved',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

            } catch (error) {

                const errorStore = useErrorStore()
                errorStore.addError({text: "Error has occurred while fetching competitions page. Try again later."})

                // Update request status and error details if request fails
                this.fetchCompetitionsInfoRequest = {
                    status: 'rejected',
                    code: error.response?.status,
                    error: error,
                    errorMSG: error.message,
                };
            }

        },
        async fetchCompetitionInfo(competitionId){
            try {
                // Reset the request status before making a new request
                this.fetchCompetitionInfoRequest = {
                    status: 'pending',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

                const response = await axios.get(PAGES_URL, {
                    params: {
                        type: "home.Competition",
                        id: competitionId.toString(),
                        fields: "header,description,event_date,place,picture,place_maps_url,related_competition_id",
                    }
                });

                const data = response.data;
                if (!data || !data.items || data.items.length === 0) {
                    // Update request status indicating an error

                    const errorStore = useErrorStore()
                    errorStore.addError({text: "This competition does not exist."})

                    this.fetchCompetitionInfoRequest = {
                        status: 'rejected',
                        code: null,
                        error: "No competition data received",
                        errorMSG: "No competition data received",
                    };
                    return;
                }

                const competition = data.items[0];
                this.currentCompetition.id = competition.id;
                this.currentCompetition.header = competition.header;
                this.currentCompetition.description = competition.description;
                this.currentCompetition.date = new Date(competition.event_date);
                this.currentCompetition.location = competition.place;
                this.currentCompetition.locationUrl = competition.place_maps_url;
                this.currentCompetition.pictureUrl = competition.picture?.meta.download_url;
                this.currentCompetition.relatedCompetitionId = competition.related_competition_id;

                const dbCompetitionResponse = await axios.get(PUBLIC_COMPETITION_URL, {
                    params:{
                        id: this.currentCompetition.relatedCompetitionId
                    }
                })

                //todo more error handling


                this.currentCompetition.maxParticipants = dbCompetitionResponse.data.maxParticipants
                this.currentCompetition.participants = dbCompetitionResponse.data.participants_count

                // Update request status after successful response
                this.fetchCompetitionInfoRequest = {
                    status: 'resolved',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

            } catch (error) {

                const errorStore = useErrorStore()
                errorStore.addError({text: "Error has occurred while fetching the data of this competition"})

                // Update request status and error details if request fails
                this.fetchCompetitionInfoRequest = {
                    status: 'rejected',
                    code: error.response?.status,
                    error: error,
                    errorMSG: error.message,
                };
            }
        },
        async signUpForCompetition(id){
            try {
                // Reset the request status before making a new request
                this.signUpForCompetitionRequest = {
                    status: 'pending',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

                const accessToken = Cookies.get('access');
                const requestData = new FormData();
                requestData.set('id', id);
                requestData.set('action', 'add');

                const response = await axios.patch(COMPETITION_URL, requestData, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    }
                });

                console.log(response.data);

                // Update request status after successful response
                this.signUpForCompetitionRequest = {
                    status: 'resolved',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

            } catch (error) {
                console.error(error);

                // Check if the error is unauthorized
                if (error.response && error.response.status === 401) {
                    // Update request status for unauthorized error

                    const errorStore = useErrorStore()
                    errorStore.addError({text: "Unauthorized. please sign in first."})

                    this.signUpForCompetitionRequest = {
                        status: 'rejected',
                        code: 401,
                        error: error,
                        errorMSG: "Unauthorized: Please login again",
                    };
                } else {
                    // Update request status for other errors

                    const errorStore = useErrorStore()
                    errorStore.addError({text: "Could not sign up for this competition. Try again later."})

                    this.signUpForCompetitionRequest = {
                        status: 'rejected',
                        code: error.response?.status || null,
                        error: error,
                        errorMSG: error.message,
                    };
                }
            }
        },
        async deregisterFromCompetition(id){
            try {
                // Reset the request status before making a new request
                this.deregisterFromCompetitionRequest = {
                    status: 'pending',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

                const accessToken = Cookies.get('access');
                const requestData = new FormData();
                requestData.set('id', id);
                requestData.set('action', 'remove');

                const response = await axios.patch(COMPETITION_URL, requestData, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    }
                });

                // Update request status after successful response
                this.deregisterFromCompetitionRequest = {
                    status: 'resolved',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

            } catch (error) {
                console.error(error);

                // Check if the error is unauthorized
                if (error.response && error.response.status === 401) {
                    // Update request status for unauthorized error

                    const errorStore = useErrorStore()
                    errorStore.addError({text: "Unauthorized. please sign in first."})

                    this.deregisterFromCompetitionRequest = {
                        status: 'rejected',
                        code: 401,
                        error: error,
                        errorMSG: "Unauthorized: Please login again",
                    };
                } else {
                    // Update request status for other errors

                    const errorStore = useErrorStore()
                    errorStore.addError({text: "Could not deregister from the competition. try again later."})

                    this.deregisterFromCompetitionRequest = {
                        status: 'rejected',
                        code: error.response?.status || null,
                        error: error,
                        errorMSG: error.message,
                    };
                }
            }
        },
        async fetchAllDBCompetitions(){
            try {
                // Reset the request status before making a new request
                this.fetchAllDBCompetitionsRequest = {
                    status: 'pending',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

                const accessToken = Cookies.get('access');

                const response = await axios.get(ALL_COMPETITIONS_URL, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    }
                });

                // Update competitionsDB state after successful response
                this.competitionsDB = response.data;

                // Update request status after successful response
                this.fetchAllDBCompetitionsRequest = {
                    status: 'resolved',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

            } catch (error) {

                const errorStore = useErrorStore()
                errorStore.addError({text: "Error: Could not fetch competitions from the database."})

                // Update request status and error details if request fails
                this.fetchAllDBCompetitionsRequest = {
                    status: 'rejected',
                    code: error.response?.status || null,
                    error: error,
                    errorMSG: error.message,
                };
            }
        },
        async addCompetition(name, maxParticipants){
            try {
                // Reset the request status before making a new request
                this.addCompetitionRequest = {
                    status: 'pending',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

                const accessToken = Cookies.get('access');

                const requestData = new FormData();
                requestData.set("name", name);
                requestData.set("max_participants", maxParticipants);

                const response = await axios.post(COMPETITION_URL, requestData, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    }
                });

                // Update request status after successful response
                this.addCompetitionRequest = {
                    status: 'resolved',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

            } catch (error) {

                const errorStore = useErrorStore()
                errorStore.addError({text: "Error has occurred. Could not add a competition."})

                // Update request status and error details if request fails
                this.addCompetitionRequest = {
                    status: 'rejected',
                    code: error.response?.status || null,
                    error: error,
                    errorMSG: error.message,
                };
            }
        }
    }
})