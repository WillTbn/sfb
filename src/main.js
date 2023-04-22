import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store'
import vuetify from './config/plugins/vuetify'
import { loadFonts } from './config/plugins/webfontloader'
import { library } from '@fortawesome/fontawesome-svg-core'
import axios from 'axios'
import { 
    faPhone, faCartShopping, faPlus, faTrash, faMinus, faBagShopping,
    faCheck, faXmark, faArrowLeft, faBars, faBeerMugEmpty,
    faBeer, faBottleWater
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vuetify/dist/vuetify-labs'
import '@/config/style/style.css'
import {baseStorage} from './config/global'

loadFonts()
library.add([
    faPhone, faCartShopping, faPlus, 
    faTrash, faMinus, faBagShopping,faCheck,
    faXmark, faArrowLeft, faBars, faBeerMugEmpty,
    faBeer,faBottleWater
])
const DEFAULT_TITLE = 'Smart Fast Buy'
router.beforeEach((to, from, next) => {
    console.log(to.name, from.name)
    router.hasRoute(from.name)
    document.title = to.name != undefined ? `${DEFAULT_TITLE} -  ${to.name}` : DEFAULT_TITLE
    next()
})



const apps = createApp(App)


apps.config.globalProperties.$filters = { 
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
    }
}

axios.defaults.headers.common['accept'] = 'application/json'
axios.defaults.baseURL = 'http://localhost:8087/api/'

apps
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
