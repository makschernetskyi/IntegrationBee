// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [];

const router = createRouter({
	history: createWebHistory('/admin_page/'), // Set the base URL for all routes
	routes,
});

export { router };
