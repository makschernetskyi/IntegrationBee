import Cookies from "js-cookie";
import {noAuthApi} from "@/api";

const API_SIGN_IN_URL = "/login/"


export async function loginRequestResolver(this:any, email:string, password:string) {
    //setting default value for request info
    this.signInRequest = {
        status: 'pending',
        code: null,
        error: null,
        errorMSG: null,
    }

    try {
        const requestData = new FormData();
        requestData.set('email', email);
        requestData.set('password', password);

        const response = await noAuthApi.post(API_SIGN_IN_URL, requestData);

        Cookies.set('access', response.data.access);
        Cookies.set('refresh', response.data.refresh);

        this.signInRequest.status = 'resolved';
        this.signInRequest.code = response.status; // Status code
        return response.data;
    } catch (error) {

        //const errorStore = useErrorStore()
        //if(error.response.data.detail === "No active account found with the given credentials"){
        //    errorStore.addError({text:"Wrong email or password."})
        //}else{
        //    errorStore.addError({text:"Error during signing in. try later."})
        //}


        //this.signInRequest.status = 'rejected';
        //this.signInRequest.code = error.response ? error.response.status : null; // Status code if available
        //this.signInRequest.error = error;
        //this.signInRequest.errorMSG = error.message;


        //throw error;
    }
}