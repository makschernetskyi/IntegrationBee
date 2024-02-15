
const {defineStore} = Pinia;

export const useSignInFormStore = defineStore('signInForm', {
    state: ()=>({
        emailInputValue: "",
        passwordInputValue: ""
    }),
    getters:{
      getEmailInputValue(state) {
          return state.emailInputValue
      },
      getPasswordInputValue(state) {
          return state.passwordInputValue
      }
    },
    actions: {
        updateEmailInputValue(currentValue){
            this.emailInputValue = currentValue
        },
        updatePasswordInputValue(currentValue){
            this.passwordInputValue = currentValue
        }
    }
})