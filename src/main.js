import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store'
import vuetify from './config/plugins/vuetify'
import { loadFonts } from './config/plugins/webfontloader'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faPhone, faCartShopping, faPlus, faTrash, faMinus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



loadFonts()
library.add([faPhone, faCartShopping, faPlus, faTrash, faMinus])

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
