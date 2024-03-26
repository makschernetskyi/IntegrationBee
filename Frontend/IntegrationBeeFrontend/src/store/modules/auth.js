import axios from 'axios'
import {defineStore} from 'pinia'
import Cookies from 'js-cookie';

import {useErrorStore} from "./error.js";

const API_SIGN_IN_URL = "/api/v2/login/"
const API_SIGN_UP_URL = "/api/v2/register/"
const API_USER_DATA_URL = "/api/v2/userData/"



export const useAuthStore = defineStore('auth', {
    state: ()=>({
        isAuthenticated: false,
        firstName: null,
        secondName: null,
        email: null,
        dateJoined: null,
        school: null,
        isAdmin: null,
        profilePicture: null,
        competitions: [],
        userDataRequest: {
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        },
        registerRequest: {
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        },
        signInRequest: {
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        }
    }),
    getters:{
      user: (state) => (
          {
              firstName: state.firstName,
              secondName: state.secondName,
              email: state.email,
              dateJoined: state.dateJoined,
              school: state.school,
              isAdmin: state.isAdmin,
              profilePicture: state.profilePicture,
              competitions: state.competitions
          }
      )
    },
    actions: {
        async requestSignIn(email, password) {
            this.signInRequest.status = 'pending';
            try {
                const requestData = new FormData();
                requestData.set('email', email);
                requestData.set('password', password);

                const response = await axios.post(API_SIGN_IN_URL, requestData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                });

                Cookies.set('access', response.data.access);
                Cookies.set('refresh', response.data.refresh);

                this.signInRequest.status = 'resolved';
                this.signInRequest.code = response.status; // Status code
                return response.data;
            } catch (error) {

                const errorStore = useErrorStore()
                if(error.response.data.detail === "No active account found with the given credentials"){
                    errorStore.addError({text:"Wrong email or password."})
                }else{
                    errorStore.addError({text:"Error during signing in. try later."})
                }


                this.signInRequest.status = 'rejected';
                this.signInRequest.code = error.response ? error.response.status : null; // Status code if available
                this.signInRequest.error = error;
                this.signInRequest.errorMSG = error.message;


                throw error;
            }
        },
        async requestRegister(firstName, lastName, email, school, password) {
            const requestData = new FormData();
            requestData.set('first_name', firstName);
            requestData.set('second_name', lastName);
            requestData.set('email', email);
            requestData.set('school', school);
            requestData.set('password', password);

            try {
                this.registerRequest.status = 'pending';

                const response = await axios.post(API_SIGN_UP_URL, requestData, {
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

                const errorStore = useErrorStore()

                if(error.response.data.error && error.response.data.error[0] === "User with this email already exists."){
                    errorStore.addError({text:"User with this email already exists."})
                }else{
                    errorStore.addError({text:"Error during registration. try later."})
                }




                this.registerRequest.status = 'rejected';
                this.registerRequest.error = error;
                this.registerRequest.errorMSG = error.message;
            }
        },

        async getUserData() {
            const accessToken = Cookies.get('access');
            this.userDataRequest.status = 'pending';
            try {
                const response = await axios.get(API_USER_DATA_URL, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                    withCredentials: true,
                });
                this.userDataRequest.status = 'resolved';
                this.userDataRequest.code = response.status;
                this.userDataRequest.errorMSG = null;

                const data = response.data;
                this.isAuthenticated = true;
                this.email = data.email;
                this.firstName = data.first_name;
                this.secondName = data.second_name;
                this.dateJoined = data.date_joined;
                this.school = data.school;
                this.isAdmin = data.is_admin;
                this.profilePicture = data.profilePicture;
                this.competitions = data.competitions;

                return data;
            } catch (error) {
                // Handle errors

                const errorStore = useErrorStore()
                if (error.response && error.response.status !== 401)
                    errorStore.addError({text:"Error has occurred while fetching profile data. Try again later."})

                this.userDataRequest.status = 'rejected';
                this.userDataRequest.code = error.response ? error.response.status : null; // Status code if available
                this.userDataRequest.error = error;
                this.userDataRequest.errorMSG = error.message;

                this.isAuthenticated = false;


                //throw error;
            }
        },
        logout(){
            Cookies.remove('access')
            Cookies.remove('refresh')
        }

    }
})