import {api, BASE_URL} from "@/api"
import { useToastStore } from "@/stores/toastStore/toastStore";
import { formatDateToLocal } from "@/utils/formatDateToLocal";

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
        this.lastName = data.last_name;
        this.phoneNumber = data.phone_number
        this.dateJoined = data.registration_date;
        this.institution = data.institution;
        this.isAdmin = data.role === "Admin";
        this.programOfStudy = data.program_of_study
        this.profilePicture = data.profile_picture;
        this.competitions = data.competitions.map((competition:any)=>({
            date: formatDateToLocal(competition.event_date),
            name: competition.name,
            result: competition.status,
            link: `/event/${competition.page_id}`,
            id: competition.id
        }));

        console.log(this.$state)

        //return data;
    } catch (error:any) {
        this.isAuthenticated = false;
        const toastStore = useToastStore()

        this.userDataRequest.status = 'rejected';
        this.userDataRequest.code = error.status;
        this.userDataRequest.errorMSG = error.message;

        // Handle errors
        if(error.status !== 401){
            toastStore.addToast({
                type: "error",
                title: "error has occured",
                message: "could not fetch your profile data, try again later."
            })
        }

    }
}