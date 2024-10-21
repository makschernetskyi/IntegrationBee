import {api} from "@/api"

const API_USER_DATA_URL = "/userData/"

export async function getProfileDataRequestResolver(this: any) {

    //setting default value for request info
    this.userDataRequest = {
        status: 'pending',
        code: null,
        error: null,
        errorMSG: null,
    }
    try {
        const response = await api.get(API_USER_DATA_URL);
        this.userDataRequest.status = 'resolved';
        this.userDataRequest.code = response.status;
        this.userDataRequest.errorMSG = null;

        const data = response.data;
        this.isAuthenticated = false;
        this.email = data.email;
        this.firstName = data.first_name;
        this.lastName = data.second_name;
        this.dateJoined = data.date_joined;
        this.school = data.school;
        this.isAdmin = data.is_admin;
        this.profilePicture = data.profilePicture;
        this.competitions = data.competitions;

        return data;
    } catch (error) {
        // Handle errors

        //const errorStore = useErrorStore()
        //if (error.response && error.response.status !== 401)
        //    errorStore.addError({text:"Error has occurred while fetching profile data. Try again later."})
        //if (error.response && error.response.status === 401)
        //    this.isAuthenticated = false;

        //this.userDataRequest.status = 'rejected';
        //this.userDataRequest.code = error.response ? error.response.status : null; // Status code if available
        //this.userDataRequest.error = error;
        //this.userDataRequest.errorMSG = error.message;

    }
}