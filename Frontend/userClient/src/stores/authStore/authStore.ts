import { defineStore } from "pinia";
import {getProfileDataRequestResolver} from "./resolvers/getProfileDataRequestResolver"
import { loginRequestResolver } from "./resolvers/loginRequestResolver";
import { signUpRequestResolver } from "./resolvers/signUpRequestResolver";
import { logoutResolver } from "./resolvers/logoutResolver";

type Competition = {
    date: string,
    name: string,
    result: string,
    link: string,
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
              profilePicture: state.profilePicture,
              competitions: state.competitions,
              programOfStudy: state.programOfStudy
          }
      )
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
        }
	}
})