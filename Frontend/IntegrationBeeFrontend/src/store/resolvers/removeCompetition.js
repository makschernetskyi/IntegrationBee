import {useErrorStore} from "@/store/modules/error.js";

import {api} from "@/api/index.js";

const COMPETITION_URL = "/competition/"

export async function removeCompetition(id){
    try {
        // Reset the request status before making a new request
        this.addCompetitionRequest = {
            status: 'pending',
            code: null,
            error: null,
            errorMSG: null,
        };



        const response = await api.delete(COMPETITION_URL, {
            params: {
                id: id
            }
        });

        this.competitionsDB = this.competitionsDB.filter(item=>item.id!==id)

        // Update request status after successful response
        this.removeCompetitionRequest = {
            status: 'resolved',
            code: null,
            error: null,
            errorMSG: null,
        };

    } catch (error) {

        const errorStore = useErrorStore()
        errorStore.addError({text: "Error has occurred. Could not remove a competition."})

        // Update request status and error details if request fails
        this.removeCompetitionRequest = {
            status: 'rejected',
            code: error.response?.status || null,
            error: error,
            errorMSG: error.message,
        };
    }
}