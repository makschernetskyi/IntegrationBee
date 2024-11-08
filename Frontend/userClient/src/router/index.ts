//pages components
import Home from "@/pages/Home.vue"
import Events from '@/pages/Events.vue'
import News from '@/pages/News.vue'
import Contact from "@/pages/Contact.vue"
import Event from '@/pages/Event.vue'
import Profile from '@/pages/Profile.vue'
import SignUp from '@/pages/SignUp.vue'
import SignIn from '@/pages/SignIn.vue'
import Imprint from "@/pages/Imprint.vue"
import TermsOfUse from "@/pages/TermsOfUse.vue"
import PasswordReset from "@/pages/PasswordReset.vue"

import { createRouter, createWebHashHistory, createWebHistory  } from 'vue-router'
import { useAuthStore } from '@/stores/authStore/authStore.ts'



const router = createRouter({
	history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
            el: to.hash,
            behavior: 'smooth', // Optional: Adds smooth scrolling effect
            top: 100 
            };
        } else {
            return { top: 0, left: 0 };
        }
    },
	routes: [
		{path: '/', component: Home, name: "home"},
        {path: '/events', component: Events, name: "events"},
        {path: '/news', component: News, name: 'news'},
        {path: '/contact', component: Contact, name: 'contact'},
        {path: '/event/:id', component: Event, name: 'event'},
        {path: '/myProfile', component: Profile, name: 'profile'},
        {path: '/sign_up', component: SignUp, name: "sign_up"},
        {path: '/sign_in', component: SignIn, name: "sign_in"},
        {path: '/imprint', component: Imprint, name: "imprint"},
        {path: '/terms_of_use', component: TermsOfUse, name: "terms_of_use"},
        {path: '/reset_password', component: PasswordReset, name: 'reset_password'},
        {path: '*', redirect: {name: 'home'}, name: 'not_found'}
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
        next('/sign_in') 
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

export {router}