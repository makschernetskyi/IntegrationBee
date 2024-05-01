import {useErrorStore} from "@/store/modules/error.js";

import {api} from "@/api/index.js";

const COMPETITION_URL = "/competition/"

export async function deregisterFromCompetition(id){
    try {
        // Reset the request status before making a new request
        this.deregisterFromCompetitionRequest = {
            status: 'pending',
            code: null,
            error: null,
            errorMSG: null,
        };

        const requestData = new FormData();
        requestData.set('id', id);
        requestData.set('action', 'remove');

        const response = await api.patch(COMPETITION_URL, requestData);

        // Update request status after successful response
        this.deregisterFromCompetitionRequest = {
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
}