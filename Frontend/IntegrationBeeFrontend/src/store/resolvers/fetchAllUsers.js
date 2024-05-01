import Cookies from "js-cookie";
import axios from "axios";
import {useErrorStore} from "@/store/modules/error.js";

import {api} from "@/api/index.js";

const ALL_USERS_URL = "/allUsers/"

export async function fetchAllUsers() {
    try {
    // Reset the request status before making a new request
    this.fetchAllUsersRequest = {
        status: 'pending',
        code: null,
        error: null,
        errorMSG: null,
    };

    const accessToken = Cookies.get('access');
    const response = await api.get(ALL_USERS_URL);

    // Update allUsers state after successful response
    this.allUsers = response.data;

    // Update request status after successful response
    this.fetchAllUsersRequest = {
        status: 'resolved',
        code: null,
        error: null,
        errorMSG: null,
    };

    } catch (error) {

        const errorStore = useErrorStore();
        errorStore.addError({text: 'Error occurred while fetching users, could not fetch users'})

        // Update request status and error details if request fails
        this.fetchAllUsersRequest = {
            status: 'rejected',
            code: error.response?.status || null,
            error: error,
            errorMSG: error.message,
        };
    }
}