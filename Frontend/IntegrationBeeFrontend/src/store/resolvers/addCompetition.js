import Cookies from "js-cookie";
import axios from "axios";
import {useErrorStore} from "@/store/modules/error.js";

import {api} from "@/api/index.js";

const COMPETITION_URL = "/competition/"

export async function addCompetition(name, maxParticipants){
    try {
        // Reset the request status before making a new request
        this.addCompetitionRequest = {
            status: 'pending',
            code: null,
            error: null,
            errorMSG: null,
        };


        const requestData = new FormData();
        requestData.set("name", name);
        if(maxParticipants){
            requestData.set("max_participants", maxParticipants);
        }

        const response = await api.post(COMPETITION_URL, requestData);

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