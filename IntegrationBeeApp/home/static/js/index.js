import Header from "./vue-components/Header/Header.js"



const { createApp, ref, onMounted, onUnmounted } = Vue


const Home = {
    template: '<div>This is the Home page</div>'
}
const News = {
    template: '<div>This is the News page</div>'
}
const Competitions = {
    template: '<div>Competitions page</div>'
}
const SignIn = {
    template: '<div>sign in page</div>'
}
const SignUp = {
    template: '<div>sign up page</div>'
}


const routes = [
    { path: '/', component: Home },
    { path: '/news', component: News },
    { path: '/competitions', component: Competitions },
    { path: '/signIn', component: SignIn },
    { path: '/signUp', component: SignUp }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})



const App = {
    components:{
        Header
    },
    template: `
        <Header/>
        <main>
            <router-view></router-view>
        </main>
    `
}


createApp(App).use(router).mount('#app')