import { RouteRecordRaw } from 'vue-router';
import MainLayoutVue from 'layouts/MainLayout.vue';
import { ROUTE_NAME } from './const';
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainLayoutVue,
        children: [
            { name: ROUTE_NAME.MAIN, path: '', component: () => import('pages/Index.vue') },
            { name: ROUTE_NAME.DESTINATIONS, path: 'destinations', component: () => import('pages/Destinations.vue') }
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue'),
    },
];

export default routes;
