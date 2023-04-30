import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../../views/Auth.vue'
import HomeView from '../../views/HomeView.vue'
import CheckoutView from '../../views/CheckoutView.vue'
import DashHome from '../../views/Dashboard/page/DashHome.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Auth,
        meta: { transition: 'slide-right' },
    },
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: { transition: 'slide-right' },
    },

    {
        path: '/checkout',
        name: 'Checkout',
        component: CheckoutView,
        meta: { transition: 'slide-left' },
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../../views/AboutView.vue')
    },
    {
        path: '/DashHome',
        name: 'DashHome',
        component: DashHome,
        meta: { transition: 'slide-right' },
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
