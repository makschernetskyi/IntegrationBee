import Header from "./vue-components/Header/Header.js"
import Homepage from "./vue-components/Homepage/Homepage.js"
import Menu from "./vue-components/Menu/Menu.js"


const { createApp, ref, onMounted, onUnmounted } = Vue



const News = {
    template: '<div>This is the News page</div>'
}
const Competitions = {
    template: '<div>Competitions page</div>'
}
const Contact = {
    template: '<div>Contact</div>'
}
const SignIn = {
    template: '<div>sign in page</div>'
}
const SignUp = {
    template: '<div>sign up page</div>'
}


const routes = [
    { path: '/', component: Homepage },
    { path: '/news', component: News },
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
        <transition>
            <Menu v-if="isMenuVisible && (windowSize < 1000)" @page-chosen="toggleMenuVisibility"/>
        </transition>
        <main>
            <router-view></router-view>
        </main>
    `
}


createApp(App).use(router).mount('#app')