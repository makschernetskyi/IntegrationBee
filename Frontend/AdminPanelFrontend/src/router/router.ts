import {
	createRouter,
	createWebHistory,
	NavigationGuardNext,
	RouteLocationNormalized,
	RouteRecordRaw,
} from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import MainMenu from '@/pages/MainMenu.vue';
import IntegralSeries from '@/pages/IntegralSeriesPresentation.vue';
import { AuthStore, useAuthStore } from '@/store';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/login/',
		component: LoginPage,
		name: 'login',
	},
	{
		path: '/',
		component: MainMenu,
		name: 'menu',
	},
	{
		path: '/integrals',
		component: () => import('@/pages/IntegralsMenu.vue'),
		name: 'integrals',
	},
	{
		path: '/integralSeries/:id',
		component: IntegralSeries,
		name: 'integralSeries',
	},
];

const router = createRouter({
	history: createWebHistory('/admin_page/'), // Set the base URL for all routes
	routes,
});

router.beforeEach(
	async (
		to: RouteLocationNormalized,
		_: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		const authStore: AuthStore = useAuthStore();

		if (authStore.requestsInfo.getUserData.state === null) {
			await authStore.getUserData();
		}

		if (to.name !== 'login' && authStore.user.role !== 'ADMIN') {
			next('/login');
			return;
		}

		if (to.name === 'login' && authStore.user.role === 'ADMIN') {
			next('/');
			return;
		}
		next();
	}
);

export { router };
