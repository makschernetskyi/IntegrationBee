
const {ref} = Vue

export default {
    template: `
        <div class="NavigationMenu">
            <router-link to="/" @click="$emit('pageChosen')" class="NavigationMenu-Item" :class="{ 'NavigationMenu-Item--active': /^\\/(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}">Home</router-link>
            <router-link to="/news" @click="$emit('pageChosen')" class="NavigationMenu-Item" :class="{ 'NavigationMenu-Item--active': /^\\/news(?:\\/[^?#]*)?(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}">News</router-link>
            <router-link to="/competitions" @click="$emit('pageChosen')" class="NavigationMenu-Item" :class="{ 'NavigationMenu-Item--active': /^\\/competitions(?:\\/[^?#]*)?(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}"> Competitions</router-link>
            <router-link to="/contact" @click="$emit('pageChosen')" class="NavigationMenu-Item" :class="{ 'NavigationMenu-Item--active': /^\\/contact(?:\\/[^?#]*)?(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}">Contact</router-link>
        </div>
`
}