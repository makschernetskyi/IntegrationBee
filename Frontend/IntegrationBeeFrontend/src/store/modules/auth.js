
import {defineStore} from 'pinia'

const API_SIGN_IN_URL = "/api/v2/login/"
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
        registerRequest: {},
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
            // Handle errors
                console.error('Error during sign in:', error);

                this.signInRequest.status = 'rejected';
                this.signInRequest.code = error.response ? error.response.status : null; // Status code if available
                this.signInRequest.error = error;
                this.signInRequest.errorMSG = error.message;


                throw error;
            }
        },
        async requestRegister(dataPlaceholder){
            // const requestData = new FormData()
            // const response = await  axios.post(API_SIGN_IN_URL, requestData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            // Cookies.set('acccess', response.data.access)
            // Cookies.set('refresh', response.data.refresh)
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
                if (error.response && error.response.status !== 401)
                    console.error('Error while fetching user data:', error);
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