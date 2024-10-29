import {api} from "@/api"
import { useToastStore } from "@/stores/toastStore/toastStore";

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
        this.isAuthenticated = true;
        this.email = data.email;
        this.firstName = data.first_name;
        this.lastName = data.second_name;
        this.phoneNumber = data.phone_number
        this.dateJoined = data.registration_date;
        this.institution = data.institution;
        this.isAdmin = data.role === "Admin";
        this.programOfStudy = data.program_of_study
        this.profilePicture = data.profile_picture;
        this.competitions = data.competitions;

        //return data;
    } catch (error:any) {
        this.isAuthenticated = false;
        console.log(error)
        // Handle errors

        const toastStore = useToastStore()
        //toastStore.addToast({
        //    type: 'error',
        //    title: "Error has occured",
        //    message: "could not fetch profile data"
        //})

    }
}