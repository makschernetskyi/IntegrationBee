import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from './stores/authStore/authStore.ts'

//animation on scroll
import aos from './plugins/aos.ts'

//masonry for tiles in news page
import MasonryWall from '@yeger/vue-masonry-wall'

//pages components
import Home from "./pages/Home.vue"
import Events from './pages/Events.vue'
import News from './pages/News.vue'
import Contact from "./pages/Contact.vue"
import Event from './pages/Event.vue'

//set up pinia store manager
const pinia = createPinia();
const app = createApp(App)
app.use(pinia)

//vue router configuration
const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{path: '/', component: Home, name: "home"},
        {path: '/events', component: Events, name: "events"},
        {path: '/news', component: News, name: 'news'},
        {path: '/contact', component: Contact, name: 'contact'},
        {path: '/event/:id', component: Event, name: 'event'}
	],
})

//handling protected routes

const protectedRoutes = ['profile']
const adminRoutes = ['admin']

router.beforeEach(async (to, from, next) => {

    const authStore = useAuthStore()


	// if user data was not requested - make the request
    if(authStore.userDataRequest.status == null){
        
        await authStore.getProfileData()
    }

    const isAuthenticated = authStore.isAuthenticated

    const isAdmin = authStore.user.isAdmin

	// if user data was requested and user is not logged in
	// and wants to see a protected route - redirect to login page
    if( protectedRoutes.includes(to.name as string) && !isAuthenticated && to.name !== 'sign_in'){
        next('/signIn') 
        return
    }

	// redirect non admins to home page when trying access admin-only routes
    if( adminRoutes.includes(to.name as string) && (!isAuthenticated || !isAdmin) && to.name !== 'home'){
        next('/')
        return
    }
	// handle the case when trying to access log in page while being
	// signed up
    if( ['sign_in', 'sign_up'].includes(to.name as string) && isAuthenticated ){
        next('/events')
        return
    }

    next()


})
app.use(router)

//animation on scroll
app.use(aos)

//masonry tiles for news
app.use(MasonryWall)

app.mount('#app')
