import {useSignInFormStore} from "./modules/signInForm.js";
import {useHomePageStore} from "./modules/homePage.js";
import {useNewsPageStore} from "./modules/newsPage.js";
import {useCompetitionsPageStore} from "./modules/competitionsPage.js";


export function useStore(){
    return {
        signIn: useSignInFormStore(),
        homePage: useHomePageStore(),
        newsPage: useNewsPageStore(),
        competitionsPage: useCompetitionsPageStore()
    }
}
