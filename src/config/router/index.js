import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../../views/AuthView.vue'
import HomeView from '../../views/HomeView.vue'
import CheckoutView from '../../views/CheckoutView.vue'
import DashHome from '../../views/Dashboard/page/DashHome.vue'
import UsersCentral from '../../views/Dashboard/page/UsersCentral.vue'
import CondominiaHome from '../../views/Dashboard/page/CondominiaHome.vue'
import ProductControl from '../../views/Dashboard/page/ProductControl.vue'
import PageaNotFound from '../../views/PageNotFound.vue'

import CondomniaData from '../../components/Dashboad/Condominia/CondominiaData.vue'
import CondominiaControl from '../../components/Dashboad/Condominia/CondominiaControl.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: AuthView,
        props:true,
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
        path: '/Dashboard',
        name: 'Dashboard',
        component:  DashHome,
        meta: { transition: 'slide-right' },
    },
    {
        path: '/Usuarios',
        name: 'Usuarios',
        component: UsersCentral,
        meta: { transition: 'slide-right' },
    },
    {
        path: '/Condominios',
        name: 'Condominios',
        component: CondominiaHome,
        props:true,
        meta: { transition: 'slide-right' },
        children:[
            {path: '', component:CondominiaControl, name:'Controle condominios', props:true},
            {path: ':id', component:CondomniaData, name:'Condominio', props:true}
        ]
    },
    {
        path: '/Produtos',
        name: 'Produtos',
        component: ProductControl,
        meta: { transition: 'slide-right' },
    },
    {
        path:'/:pathMatch(.*)',
        component:PageaNotFound
    }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
