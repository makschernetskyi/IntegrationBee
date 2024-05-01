import axios from "axios";
import {useErrorStore} from "@/store/modules/error.js";
import {noAuthApi} from "@/api/index.js";

const PAGES_URL = "/cms/pages/"
const PUBLIC_COMPETITION_URL = "/publicCompetition/"


export async function fetchCompetitionInfo(competitionId){

    try {
        // Reset the request status before making a new request
        this.fetchCompetitionInfoRequest = {
            status: 'pending',
            code: null,
            error: null,
            errorMSG: null,
        };

        const response = await noAuthApi.get(PAGES_URL, {
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


        if(competition.related_competition_id) {
            this.currentCompetition.relatedCompetitionId = competition.related_competition_id;

            const dbCompetitionResponse = await noAuthApi.get(PUBLIC_COMPETITION_URL, {
                params: {
                    id: this.currentCompetition.relatedCompetitionId
                }
            })

            //todo more error handling


            this.currentCompetition.maxParticipants = dbCompetitionResponse.data.max_participants
            this.currentCompetition.participants = dbCompetitionResponse.data.participants_count
        }

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

}