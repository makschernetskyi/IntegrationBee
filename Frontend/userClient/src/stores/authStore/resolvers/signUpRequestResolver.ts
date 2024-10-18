import {noAuthApi} from "@/api";


const API_SIGN_UP_URL = "/register/"

export async function signUpRequestResolver(this: any, firstName:string, lastName:string, email:string, school:string, password:string) {

    //setting default value for request info
    this.registerRequest = {
        status: 'pending',
        code: null,
        error: null,
        errorMSG: null,
    }

    const requestData = new FormData();
    requestData.set('first_name', firstName);
	//api uses second_name as last name
    requestData.set('second_name', lastName);
    requestData.set('email', email);
    requestData.set('school', school);
    requestData.set('password', password);

    try {
        this.registerRequest.status = 'pending';

        const response = await noAuthApi.post(API_SIGN_UP_URL, requestData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response)

        this.registerRequest.status = 'resolved';
        this.registerRequest.code = response.status;
        this.registerRequest.error = null;
        this.registerRequest.errorMSG = null;
    } catch (error) {
        //const errorStore = useErrorStore()

        //if(error.response.data.error && error.response.data.error[0] === "User with this email already exists."){
        //    errorStore.addError({text:"User with this email already exists."})
        //}else{
        //    errorStore.addError({text:"Error during registration. try later."})
        //}




        //this.registerRequest.status = 'rejected';
        //this.registerRequest.error = error;
        //this.registerRequest.errorMSG = error.message;
    }
}

