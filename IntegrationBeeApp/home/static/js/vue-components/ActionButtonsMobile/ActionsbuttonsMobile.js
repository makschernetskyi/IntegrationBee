
import {useStore} from "../../store/index.js";

const {computed} = Vue
const {useRouter} = VueRouter

export default {
    setup(){
        const authStore = useStore().auth

        const isAuth = computed({get: ()=>authStore.isAuthenticated})

        const router = useRouter()

        const logOut = async () =>{
            authStore.logout()
            await authStore.getUserData()
            router.push('/')
        }

        return {
            isAuth,
            logOut
        }
    },
    template: `
        <nav class="Header-ActionButtonsMobile">
            <!-- for not authenticated user -->
            <template v-if="!isAuth">
                <router-link to="/signIn" class="Header-ActionButtons-Button Header-ActionButtons-SignInButton">
                    <span class="Header-ActionButtons-Button-text">Sign in</span>
                </router-link>
                <router-link to="/signUp" class="Header-ActionButtons-Button Header-ActionButtons-SignUpButton">
                    <span class="Header-ActionButtons-SignUpButton-text">Sign Up</span>
                </router-link>
            </template>
            <template v-if="isAuth">
                <router-link to="/profile" class="Header-ActionButtons-Button Header-ActionButtons-SignInButton">
                    <span class="Header-ActionButtons-Button-text">profile</span>
                </router-link>
                <span to="/signOut" class="Header-ActionButtons-Button">
                    <button @click="logOut" class="Header-ActionButtons-Button-text logoutBtn logoutBtn--mobile">
                        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 16.9998L21 11.9998M21 11.9998L16 6.99982M21 11.9998H9M12 16.9998C12 17.2954 12 17.4432 11.989 17.5712C11.8748 18.9018 10.8949 19.9967 9.58503 20.2571C9.45903 20.2821 9.31202 20.2985 9.01835 20.3311L7.99694 20.4446C6.46248 20.6151 5.69521 20.7003 5.08566 20.5053C4.27293 20.2452 3.60942 19.6513 3.26118 18.8723C3 18.288 3 17.5161 3 15.9721V8.02751C3 6.48358 3 5.71162 3.26118 5.12734C3.60942 4.3483 4.27293 3.75442 5.08566 3.49435C5.69521 3.29929 6.46246 3.38454 7.99694 3.55503L9.01835 3.66852C9.31212 3.70117 9.45901 3.71749 9.58503 3.74254C10.8949 4.00297 11.8748 5.09786 11.989 6.42843C12 6.55645 12 6.70424 12 6.99982" stroke="#202020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </span>
            </template>
        </nav>
    `
}