
import {defineStore} from 'pinia'
import Cookies from 'js-cookie';

import {requestSignIn} from "@/store/resolvers/requestSignIn.js";
import {requestRegister} from "@/store/resolvers/requestRegister.js";
import {getUserData} from "@/store/resolvers/getUserData.js";




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
        requestSignIn,
        requestRegister,
        getUserData,
        logout(){
            Cookies.remove('access')
            Cookies.set('refresh', "null")
        }

    }
})