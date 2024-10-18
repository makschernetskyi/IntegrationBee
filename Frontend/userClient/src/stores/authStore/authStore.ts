import { defineStore } from "pinia";
import {getProfileDataRequestResolver} from "./resolvers/getProfileDataRequestResolver"
import { loginRequestResolver } from "./resolvers/loginRequestResolver";
import { signUpRequestResolver } from "./resolvers/signUpRequestResolver";
import { logoutResolver } from "./resolvers/logoutResolver";



export const useAuthStore = defineStore('auth', {
	state: ()=>({
        isAuthenticated: false,
        firstName: null,
        lastName: null,
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
              lastName: state.lastName,
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
		getProfileData: getProfileDataRequestResolver,
		requestLogin: loginRequestResolver,
		requestSignUp: signUpRequestResolver,
        logout: logoutResolver
	}
})