import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../../views/Auth.vue'
import HomeView from '../../views/HomeView.vue'
import CheckoutView from '../../views/CheckoutView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: Auth
    },

    {
        path: '/checkout',
        name: 'Checkout',
        component: CheckoutView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting 
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../../views/AboutView.vue')
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
