import {useStore} from "../../store/index.js";

const {computed} = Vue

export default {
    components: {},
    setup() {

        const isAuth = computed({get: ()=>useStore().auth.isAuthenticated})

        return {
            isAuth
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
                    <router-link to="/signOut" class="Header-ActionButtons-Button">
                        <span class="Header-ActionButtons-Button-text">Log out</span>
                    </router-link>
                </template>
        </nav>
    `
}