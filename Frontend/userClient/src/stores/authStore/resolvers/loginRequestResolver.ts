import Cookies from "js-cookie";
import {noAuthApi} from "@/api";
import {useToastStore} from "@/stores/toastStore/toastStore"

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

        useToastStore().addToast({
            type:'success',
            title: "Successfully logged in!",
            message: ''
        })

        return response.data;
    } catch (error:any) {

        const toastStore = useToastStore()
        if(error.response.data.detail === "No active account found with the given credentials"){
            
            toastStore.addToast({
                type:'error',
                title: "Wrong e-mail or password",
                message: 'try again'
            })

        }else{
            toastStore.addToast({
                type:'error',
                title: "Could not sign in",
                message: 'try again later.'
            })
        }


        this.signInRequest.status = 'rejected';
        this.signInRequest.code = error.response ? error.response.status : null; // Status code if available
        this.signInRequest.error = error;
        this.signInRequest.errorMSG = error.message;


        throw error;
    }
}