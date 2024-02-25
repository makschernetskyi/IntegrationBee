import {useSignInFormStore} from "./modules/signInForm.js"
import {useHomePageStore} from "./modules/homePage.js"



export function useStore(){
    return {
        signIn: useSignInFormStore(),
        homePage: useHomePageStore()
    }
}
