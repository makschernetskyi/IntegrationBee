import { defineStore } from "pinia";
import {getProfileDataRequestResolver} from "./resolvers/getProfileDataRequestResolver"
import { loginRequestResolver } from "./resolvers/loginRequestResolver";
import { signUpRequestResolver } from "./resolvers/signUpRequestResolver";
import { logoutResolver } from "./resolvers/logoutResolver";
import { noAuthApi } from "@/api";
import { useToastStore } from "../toastStore/toastStore";
import { AxiosError } from "axios";

type Competition = {
    date: string,
    name: string,
    result: string,
    link: string,
    id: number|string,
}


export const useAuthStore = defineStore('auth', {
	state: ()=>({
        isAuthenticated: false,
        firstName: null,
        lastName: null,
        email: null,
        dateJoined: null,
        institution: null,
        isAdmin: null,
        role: null as any,
        profilePicture: null,
        phoneNumber: null,
        programOfStudy: null,
        competitions: [] as Competition[],
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
        },
        passwordResetRequest: {
            status: null as null|string,
            code: null as null|number,
            error: null as any,
            errorMSG: null as string|null,
        }
    }),
    getters:{
      user: (state) => (
          {
              firstName: state.firstName,
              lastName: state.lastName,
              email: state.email,
              dateJoined: state.dateJoined,
              institution: state.institution,
              isAdmin: state.isAdmin,
              role: state.role,
              profilePicture: state.profilePicture,
              competitions: state.competitions,
              programOfStudy: state.programOfStudy
          }
      ),
      wins: (state): {golds: number, silvers: number, bronzes: number} =>{
        return {
            golds: state.competitions.reduce((accumulator, current)=>current.result === "Won" ? 1 : 0,0),
            silvers: state.competitions.reduce((accumulator, current)=>current.result === "2nd Place" ? 1 : 0,0),
            bronzes: state.competitions.reduce((accumulator, current)=>current.result === "Semifinalist" ? 1 : 0,0)
        }
      }
    },
	actions: {
		getProfileData: getProfileDataRequestResolver,
		requestLogin: loginRequestResolver,
		requestSignUp: signUpRequestResolver,
        logout: logoutResolver,
        resetStore() {
            this.isAuthenticated = false;
            this.firstName = null;
            this.lastName = null;
            this.email = null;
            this.dateJoined = null;
            this.institution = null;
            this.isAdmin = null;
            this.profilePicture = null;
            this.phoneNumber = null;
            this.programOfStudy = null;
            this.competitions = [];
            // Leave userDataRequest, registerRequest, and signInRequest unchanged
        },
        async resetPassword(newPassword: string, token: string){

            this.passwordResetRequest = {
                status: 'pending',
                code: null,
                error: null,
                errorMSG: null,
            }

            try{
                const response = await noAuthApi.post('/reset-password-confirm/', {
                    token: token,
                    new_password: newPassword
                })
                useToastStore().addToast({
                    type: 'success',
                    title: "Password successfuly reset",
                    message: ""
                })

                this.passwordResetRequest = {
                    status: 'resolved',
                    code: response.status,
                    error: null,
                    errorMSG: null,
                }

            }catch(err: any){
                useToastStore().addToast({
                    type: 'error',
                    title: "could not reset password",
                    message: "try again."
                })
                this.passwordResetRequest = {
                    status: 'resolved',
                    code: err.status,
                    error: err,
                    errorMSG: err.message,
                }
                throw err;
            }
        }
	}
})