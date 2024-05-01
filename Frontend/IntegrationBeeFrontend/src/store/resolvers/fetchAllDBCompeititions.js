import Cookies from "js-cookie";
import axios from "axios";
import {useErrorStore} from "@/store/modules/error.js";

import {api} from "@/api/index.js";

const ALL_COMPETITIONS_URL = "/allCompetitions/"

export async function fetchAllDBCompetitions(){
    try {
        // Reset the request status before making a new request
        this.fetchAllDBCompetitionsRequest = {
            status: 'pending',
            code: null,
            error: null,
            errorMSG: null,
        };

        const response = await api.get(ALL_COMPETITIONS_URL);

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
}