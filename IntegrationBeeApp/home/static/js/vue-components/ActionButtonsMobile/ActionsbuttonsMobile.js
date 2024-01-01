

export default {
    setup(){},
    template: `
        <nav class="Header-ActionButtonsMobile">
            <router-link to="/signIn" class="Header-ActionButtons-Button Header-ActionButtons-SignInButton">
                <span class="Header-ActionButtons-Button-text">Sign in</span>
            </router-link>
            <router-link to="/signUp" class="Header-ActionButtons-Button Header-ActionButtons-SignUpButton">
                <span class="Header-ActionButtons-SignUpButton-text">Sign Up</span>
            </router-link>
        </nav>
    `
}