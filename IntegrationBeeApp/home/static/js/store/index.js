import {useSignInFormStore} from "./modules/signInForm.js"




export function useStore(){
    return {
        signIn: useSignInFormStore()
    }
}
