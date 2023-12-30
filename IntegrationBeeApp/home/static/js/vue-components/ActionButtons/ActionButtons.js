

export default {
    components: {},
    setup() {
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
                <router-link to="/signIn" class="Header-ActionButtons-Button Header-ActionButtons-SignInButton">
                    <span class="Header-ActionButtons-Button-text">Sign in</span>
                </router-link>
                <router-link to="/signUp" class="Header-ActionButtons-Button Header-ActionButtons-SignUpButton">
                    <span class="Header-ActionButtons-SignUpButton-text">Sign Up</span>
                </router-link>
        </nav>
    `
}