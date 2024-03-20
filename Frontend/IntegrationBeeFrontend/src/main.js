
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";

//components
import Menu from '@/components/Menu/Menu.vue'
import Header from "@/components/Header/Header.vue";
import SocialLinks from "@/components/SocialLinks/SocialLinks.vue";
import NewsPage from "@/components/NewsPage/NewsPage.vue";
import CompetitionsPage from "@/components/CompetitionsPage/CompetitionsPage.vue";
import ProfilePage from "@/components/ProfilePage/ProfilePage.vue";
import CompetitionPage from "@/components/CompetitionPage/CompetitionPage.vue";
import SignInPage from "@/components/SignInPage/SignInPage.vue";
import AdminPage from "@/components/AdminPage/AdminPage.vue";
import HomePage from "@/components/HomePage/Homepage.vue"

//styles
import './styles/index.sass'

//other imports
import {onMounted, onUnmounted, ref, toRef} from "vue";
import {createApp} from 'vue/dist/vue.esm-bundler';

//initializing pinia
const pinia = createPinia();

//store
import {useStore} from "@/store/index.js";
import Homepage from "@/components/HomePage/Homepage.vue";


//placeholders for future pages
const Contact = {
    template: '<div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; font-family: Poppins, sans-serif; font-size: 2rem; color: black; text-align: center; padding: 2rem;">Contacts</div>'
}

const SignUp = {
    template: '<div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; font-family: Poppins, sans-serif; font-size: 2rem; color: black; text-align: center; padding: 2rem;">Registration is not open yet.</div>'
}

//router with lazy loading
const routes = [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/news', component: NewsPage, name: 'news' },
    { path: '/competitions', component: CompetitionsPage, name: 'competitions'},
    { path: '/contact', component: Contact, name: "contact" },
    { path: '/signIn', component: SignInPage, name: 'sign_in' },
    { path: '/signUp', component: SignUp, name: 'sign_up' },
    { path: '/competition/:id', component: CompetitionPage, name: 'competition'},
    { path: '/profile', component: ProfilePage, name: 'profile'},
    { path: '/admin', component: AdminPage, name: 'admin'}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

//protected routes

const protectedRoutes = ['profile']
const adminRoutes = ['admin']

router.beforeEach(async (to, from, next) => {

    const authStore = useStore().auth

    if(useStore().auth.userDataRequest.status == null){
        await authStore.getUserData()
    }

    const isAuthenticated = authStore.isAuthenticated

    const isAdmin = authStore.user.isAdmin

    if( protectedRoutes.includes(to.name) && !isAuthenticated && to.name !== 'sign_in'){
        next('/signIn')
        return
    }

    if( adminRoutes.includes(to.name) && (!isAuthenticated || !isAdmin) && to.name !== 'home'){
        next('/')
        return
    }

    next()


})




//menuContainer for the menu component is here because otherwise for some reason transitions don't work

const MenuContainer = {
    props: ["isMenuContentShown"],
    components: {
        Menu
    },
    setup(props){
        const isMenuContentShown = toRef(props, "isMenuContentShown")
        return {isMenuContentShown}
    },
    template: `
        <div class="SideNavigation">
            <transition @after-leave="$emit('closeMenu')">
                <Menu v-if="isMenuContentShown" @click = "$emit('closeMenuContent')"/>
            </transition>
        </div>
    `
}


const App = {
    components:{
        Header,
        Menu,
        SocialLinks,
        MenuContainer
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

        const authStore = useStore().auth;


        // onBeforeMount(
        //     ()=>{
        //         authStore.getUserData()
        //     }
        // )



        const isMenuVisible = ref(false)
        const isMenuContentShown = ref(false)
        const toggleMenuVisibility = () =>{
            isMenuVisible.value = !isMenuVisible.value
        }
        return {
            isMenuVisible,
            windowSize,
            isMenuContentShown,
        }
    },
    methods:{
        toggleMenuVisibility(){
            if(this.isMenuVisible){
                this.isMenuContentShown = false
                document.body.style.overflow = "auto"
            }else{
                this.isMenuVisible = true
                document.body.style.overflow = "hidden"
            }

        },
        toggleBodyOverflow(){
            if(this.isMenuVisible)
                document.body.style.overflow = "hidden"
            else
                document.body.style.overflow = "auto"
        }
    },
    template: `
        <Header @menu-visibility-btn-click="toggleMenuVisibility" :isMenuVisible="isMenuVisible"/>
        
        <Teleport to="body">
        <transition @after-enter="isMenuContentShown = true">
            <MenuContainer v-if="isMenuVisible && (windowSize < 1000)"  :isMenuContentShown="isMenuContentShown" @close-menu="isMenuVisible = false; toggleBodyOverflow()" @close-menu-content="isMenuContentShown = false"/>
        </transition>
        </Teleport>

        <main>
            <router-view v-slot="{ Component }">
                <transition name="page-fade" mode="out-in">
                    <component :is="Component"></component>
                </transition>
            </router-view>
        </main>
        <SocialLinks/>
    `
}




const app =createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
