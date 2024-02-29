import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store'
import vuetify from './config/plugins/vuetify'
import { loadFonts } from './config/plugins/webfontloader'
import { library } from '@fortawesome/fontawesome-svg-core'
import Toaster from '@meforma/vue-toaster';
import axios from 'axios'
import {
    faPhone, faCartShopping, faPlus, faTrash, faMinus, faBagShopping,
    faCheck, faXmark, faArrowLeft, faBars, faBeerMugEmpty,
    faBeer, faBottleWater
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vuetify/dist/vuetify-labs'
import './config/css/style.css'
import {baseStorage} from './config/global'

loadFonts()
library.add([
    faPhone, faCartShopping, faPlus,
    faTrash, faMinus, faBagShopping,faCheck,
    faXmark, faArrowLeft, faBars, faBeerMugEmpty,
    faBeer,faBottleWater
])


axios.defaults.headers.common['accept'] = 'application/json'
axios.defaults.baseURL = 'http://localhost:8088/api/'


const apps = createApp(App)
apps.config.productionTip = false
const DEFAULT_TITLE = 'Smart Fast Buy'
router.beforeEach((to, from, next) => {
    console.log(' to ->', to.name, ' from ->',from.name)
    // router.hasRoute(from.name)
    document.title = to.name != undefined ? `${DEFAULT_TITLE} -  ${to.name}` : DEFAULT_TITLE
    console.log('Origen -> ',document.location.origin)
    if(from.name == 'Login'){
        console.log('Estou aui dentro ')
        document.location.replace(document.location.origin)
    }
    next()
})

apps.config.globalProperties.$filters = {
    typeUser(value){


        let type = [
            { id:0, value:'cliente', codigo: 'C'},
            { id:1, value:'estoquista', codigo: 'N'},
            { id:2, value:'administrado', codigo: 'M'}
        ]
        let getValue = type.filter(e=>e.codigo == value)

        return getValue[0].value
    },
    moneyFilter(value){
        return `R$ ${parseFloat(value).toFixed(2)}`.replace('.', ',')
    },
    baseUrlPublic(value){
        return `${baseStorage}${value}`
    },
    genreSelect(value){
        let genre = ["Feminino","Masculino","Outro","Não Informa"]
        return genre.filter(e=> e.substring(0,1) == value)
    },
    notificationsSelect(value){
        return value == "A" ? true : false
    },
    firstName(value){
        return value.charAt(0).toUpperCase()+ value.substr(1)
    },
    countArray(value){
        return value.length
    },
    removeCaracter(value){
        return value.replace(/.?/,'').replace(/.$/,'')
    }
}

apps
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .use(store)
    .use(vuetify)
    .use(Toaster, {position:'top-right'}).provide('toast', apps.config.globalProperties.$toast)
.mount('#app')
