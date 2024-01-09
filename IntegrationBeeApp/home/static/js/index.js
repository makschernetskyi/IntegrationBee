import Header from "./vue-components/Header/Header.js";
import Homepage from "./vue-components/Homepage/Homepage.js";
import Menu from "./vue-components/Menu/Menu.js";
import NewsPage from "./vue-components/NewsPage/NewsPage.js";
import SocialLinks from "./vue-components/SocialLinks/SocialLinks.js";
import CompetitionsPage from "./vue-components/CompetitionsPage/CompetitionsPage.js";

const { createApp, ref, onMounted, onUnmounted, toRef } = Vue





const Contact = {
    template: '<div>Contact</div>'
}
const SignIn = {
    template: '<div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; font-family: Poppins, sans-serif; font-size: 2rem; color: black; text-align: center; padding: 2rem;">Sign up first.</div>'
}
const SignUp = {
    template: '<div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; font-family: Poppins, sans-serif; font-size: 2rem; color: black; text-align: center; padding: 2rem;">Registration is not open yet.</div>'
}
const Competition = {
    template: '<div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; font-family: Poppins, sans-serif; font-size: 2rem; color: black; text-align: center; padding: 2rem;">Competition Id: {{$route.params.id}}</div>'
}


const routes = [
    { path: '/', component: Homepage },
    { path: '/news', component: NewsPage },
    { path: '/competitions', component: CompetitionsPage },
    { path: '/contact', component: Contact },
    { path: '/signIn', component: SignIn },
    { path: '/signUp', component: SignUp },
    { path: '/competition/:id', component: Competition}
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})


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


        const isMenuVisible = ref(false)
        const isMenuContentShown = ref(false)
        const toggleMenuVisibility = () =>{
            isMenuVisible.value = !isMenuVisible.value
        }
        return {
            isMenuVisible,
            windowSize,
            isMenuContentShown
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
            <router-view></router-view>
        </main>
        <SocialLinks/>
    `
}


const app = createApp(App)

app.use(router)
app.mount('#app')