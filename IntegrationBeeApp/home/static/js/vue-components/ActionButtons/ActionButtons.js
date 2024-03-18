import {useStore} from "../../store/index.js";

const {computed} = Vue
const {useRouter} = VueRouter


export default {
    components: {},
    setup() {

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
        <nav class="Header-ActionButtons">
                <router-link to="/" class="Header-ActionButtons-Button">
                    <span class="Header-ActionButtons-Button-text">Home</span>
                </router-link>
                <router-link to="/news" class="Header-ActionButtons-Button">
                    <span class="Header-ActionButtons-Button-text">News</span>
                </router-link>
                <router-link to="/competitions" class="Header-ActionButtons-Button">
                    <span class="Header-ActionButtons-Button-text">Competitions</span>
                </router-link>
                <router-link to="/contact" class="Header-ActionButtons-Button">
                    <span class="Header-ActionButtons-Button-text">Contact</span>
                </router-link>
                <!-- for not authenticated user -->
                <template v-if="!isAuth">
                    <router-link to="/signIn" class="Header-ActionButtons-Button Header-ActionButtons-SignInButton">
                        <span class="Header-ActionButtons-Button-text">Sign in</span>
                    </router-link>
                    <router-link to="/signUp" class="Header-ActionButtons-Button Header-ActionButtons-SignUpButton">
                        <span class="Header-ActionButtons-SignUpButton-text">Sign Up</span>
                    </router-link>
                </template>
                <!-- for authenticated user -->
                <template v-if="isAuth">
                    <router-link to="/profile" class="Header-ActionButtons-Button">
                        <span class="Header-ActionButtons-Button-text">profile</span>
                    </router-link>
                    <span to="/signOut" class="Header-ActionButtons-Button">
                        <button @click="logOut" class="Header-ActionButtons-Button-text logoutBtn">Log out</button>
                    </span>
                </template>
        </nav>
    `
}