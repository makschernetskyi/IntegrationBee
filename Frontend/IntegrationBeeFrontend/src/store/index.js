import {useSignInFormStore} from "./modules/signInForm.js";
import {useHomePageStore} from "./modules/homePage.js";
import {useNewsPageStore} from "./modules/newsPage.js";
import {useCompetitionsPageStore} from "./modules/competitionsPage.js";
import {useAuthStore} from "./modules/auth.js";
import {useAdminStore} from "./modules/admin.js";
import {useSignUpPageStore} from "./modules/signUpPage.js"
import {useErrorStore} from "@/store/modules/error.js";
import {useContactsPageStore} from "@/store/modules/contactsPage.js";
import {useSuccessMessagesStore} from "@/store/modules/successMessages.js";


export function useStore(){
    return {
        signIn: useSignInFormStore(),
        homePage: useHomePageStore(),
        newsPage: useNewsPageStore(),
        competitionsPage: useCompetitionsPageStore(),
        auth: useAuthStore(),
        admin: useAdminStore(),
        signUpPage: useSignUpPageStore(),
        error: useErrorStore(),
        contactsPage: useContactsPageStore(),
        successMessages: useSuccessMessagesStore(),
    }
}

export {useAuthStore};
