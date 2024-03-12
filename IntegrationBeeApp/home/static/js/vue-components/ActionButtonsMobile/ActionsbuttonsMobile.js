
import {useStore} from "../../store/index.js";

export default {
    setup(){
        const isAuth = useStore().auth.isAuthenticated

        return {
            isAuth
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
                <router-link to="/signOut" class="Header-ActionButtons-Button Header-ActionButtons-SignUpButton">
                    <span class="Header-ActionButtons-SignUpButton-text">log out</span>
                </router-link>
            </template>
        </nav>
    `
}