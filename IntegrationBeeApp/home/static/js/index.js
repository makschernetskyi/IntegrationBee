import Header from "./vue-components/Header/Header.js";
import Homepage from "./vue-components/Homepage/Homepage.js";
import Menu from "./vue-components/Menu/Menu.js";
import NewsPage from "./vue-components/NewsPage/NewsPage.js";

const { createApp, ref, onMounted, onUnmounted } = Vue




const Competitions = {
    template: '<div>Competitions page</div>'
}
const Contact = {
    template: '<div>Contact</div>'
}
const SignIn = {
    template: '<div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; font-family: Poppins, sans-serif; font-size: 2rem; color: black; text-align: center; padding: 2rem;">Sign up first.</div>'
}
const SignUp = {
    template: '<div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; font-family: Poppins, sans-serif; font-size: 2rem; color: black; text-align: center; padding: 2rem;">Registration is not open yet.</div>'
}


const routes = [
    { path: '/', component: Homepage },
    { path: '/news', component: NewsPage },
    { path: '/competitions', component: Competitions },
    { path: '/contact', component: Contact },
    { path: '/signIn', component: SignIn },
    { path: '/signUp', component: SignUp }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})



const App = {
    components:{
        Header,
        Menu
    },
    setup(){

        const windowSize = ref(window.innerWidth)

        const handleResize = () => {
          windowSize.value = window.innerWidth;
        };

        onMounted( () => window.addEventListener("resize", ()=>{
            handleResize()
        }))
        onUnmounted( () => window.removeEventListener("resize", ()=>{
            handleResize()
        }))


        const isMenuVisible = ref(false)
        const toggleMenuVisibility = () =>{
            isMenuVisible.value = !isMenuVisible.value
        }
        return {
            isMenuVisible,
            windowSize
        }
    },
    methods:{
        toggleMenuVisibility(){
            this.isMenuVisible = !this.isMenuVisible
            if(this.isMenuVisible)
                document.getElementsByTagName("body")[0].style.overflow = "hidden"
            else
                document.getElementsByTagName("body")[0].style.overflow = "auto"
        }
    },
    template: `
        <Header @menu-visibility-btn-click="toggleMenuVisibility" :isMenuVisible="isMenuVisible"/>
        
        <div class="SideNavigation">
            <transition>
                <Menu v-if="isMenuVisible && (windowSize < 1000)" @page-chosen="toggleMenuVisibility"/>
            </transition>
        </div>
        <main>
            <router-view></router-view>
        </main>
    `
}


createApp(App).use(router).mount('#app')