
const {defineStore} = Pinia;

const API_SIGN_IN_URL = "/api/v2/login/"
const API_USER_DATA_URL = "/api/v2/userData/"



export const useAuthStore = defineStore('auth', {
    state: ()=>({
        isAuthenticated: false,
        firstName: null,
        secondName: null,
        dateJoined: null,
        school: null,
        profilePicture: null,
        authRequest: {},
        registerRequest: {},
        signInRequest: {}
    }),
    getters:{
      user: (state) => (
          {
              firstName: state.firstName,
              secondName: state.secondName,
              dateJoined: state.dateJoined,
              school: state.school,
              profilePicture: state.profilePicture
          }
      )
    },
    actions: {
        async requestSignIn(email, password){
            const requestData = new FormData()
            requestData.set("email", email)
            requestData.set("password", password)
            const response = await  axios.post(API_SIGN_IN_URL, requestData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            Cookies.set('access', response.data.access)
            Cookies.set('refresh', response.data.refresh)
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
        async getUserData(){
            const accessToken = Cookies.get('access');
            let response;
            try{
                response = await axios.get(API_USER_DATA_URL, {
                    headers:{
                        Authorization: "Bearer " + accessToken
                    },
                    withCredentials: true
                })

            }catch (e) {
                console.log(e)
                return
            }

            const data = response.data

            console.log(response)

            this.isAuthenticated= true;
            this.firstName= data.first_name;
            this.secondName= data.second_name;
            this.dateJoined= data.date_joined;
            this.school= data.school;
            this.profilePicture= data.profilePicture;
            console.log("firstName: ", this.firstName)

        }

    }
})