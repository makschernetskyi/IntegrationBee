import {useSignInFormStore} from "./modules/signInForm.js";
import {useHomePageStore} from "./modules/homePage.js";
import {useNewsPageStore} from "./modules/newsPage.js";


export function useStore(){
    return {
        signIn: useSignInFormStore(),
        homePage: useHomePageStore(),
        newsPage: useNewsPageStore()
    }
}
