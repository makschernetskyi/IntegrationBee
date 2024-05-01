import {useErrorStore} from "@/store/modules/error.js";

import {api} from "@/api/index.js";

const COMPETITION_URL = "/competition/"

export async function signUpForCompetition(id){
    try {
        // Reset the request status before making a new request
        this.signUpForCompetitionRequest = {
            status: 'pending',
            code: null,
            error: null,
            errorMSG: null,
        };

        const requestData = new FormData();
        requestData.set('id', id);
        requestData.set('action', 'add');

        const response = await api.patch(COMPETITION_URL, requestData);

        // Update request status after successful response
        this.signUpForCompetitionRequest = {
            status: 'resolved',
            code: null,
            error: null,
            errorMSG: null,
        };

    } catch (error) {

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
}