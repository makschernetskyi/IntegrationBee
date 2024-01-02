


const {ref} = Vue

export default {
    setup(){
        const showContent = ref("false")
        return{
            showContent
        }
    },

    template: `
        <div class="SideNavigation-Menu">
            <router-link to="/"  class="SideNavigation-Menu-Item" :class="{ 'SideNavigation-Menu-Item--active': /^\\/(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}">Home</router-link>
            <router-link to="/news"  class="SideNavigation-Menu-Item" :class="{ 'SideNavigation-Menu-Item--active': /^\\/news(?:\\/[^?#]*)?(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}">News</router-link>
            <router-link to="/competitions"  class="SideNavigation-Menu-Item" :class="{ 'SideNavigation-Menu-Item--active': /^\\/competitions(?:\\/[^?#]*)?(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}"> Competitions</router-link>
            <router-link to="/contact"  class="SideNavigation-Menu-Item" :class="{ 'SideNavigation-Menu-Item--active': /^\\/contact(?:\\/[^?#]*)?(?:\\?.*)?(?:#.*)?$/.test($route.fullPath)}">Contact</router-link>
        </div>
`
}