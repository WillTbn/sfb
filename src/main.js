import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store'
import vuetify from './config/plugins/vuetify'
import { loadFonts } from './config/plugins/webfontloader'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faPhone, faCartShopping, faPlus, faTrash, faMinus, faBagShopping,
    faCheck
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vuetify/dist/vuetify-labs'
import '@/config/style/style.css'

loadFonts()
library.add([
  faPhone, faCartShopping, faPlus, 
  faTrash, faMinus, faBagShopping,faCheck
])

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
