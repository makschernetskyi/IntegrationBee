import {useSignInFormStore} from "./modules/signInForm.js";
import {useHomePageStore} from "./modules/homePage.js";
import {useNewsPageStore} from "./modules/newsPage.js";
import {useCompetitionsPageStore} from "./modules/competitionsPage.js";
import {useAuthStore} from "./modules/auth.js";


export function useStore(){
    return {
        signIn: useSignInFormStore(),
        homePage: useHomePageStore(),
        newsPage: useNewsPageStore(),
        competitionsPage: useCompetitionsPageStore(),
        auth: useAuthStore(),
    }
}

export {useAuthStore};
