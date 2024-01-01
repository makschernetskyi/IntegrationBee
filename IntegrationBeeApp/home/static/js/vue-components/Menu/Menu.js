
const {ref} = Vue

export default {
    template: `
        <div class="NavigationMenu" @click="$emit('pageChosen')">
            <router-link to="/"  class="NavigationMenu-Item" :class="{ 'NavigationMenu-Item--active': /^\\/(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}">Home</router-link>
            <router-link to="/news"  class="NavigationMenu-Item" :class="{ 'NavigationMenu-Item--active': /^\\/news(?:\\/[^?#]*)?(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}">News</router-link>
            <router-link to="/competitions"  class="NavigationMenu-Item" :class="{ 'NavigationMenu-Item--active': /^\\/competitions(?:\\/[^?#]*)?(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}"> Competitions</router-link>
            <router-link to="/contact"  class="NavigationMenu-Item" :class="{ 'NavigationMenu-Item--active': /^\\/contact(?:\\/[^?#]*)?(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}">Contact</router-link>
        </div>
`
}