import { createStore } from 'vuex'

import products from './modules/products';
import view from './modules/view';
import shopping from './modules/shopping'
import user from './modules/user';

export default createStore({
    state: {
        /*
        user:{
            "name":"Jorge Nunes",
            "email":"jlbnunes@live.com",
            "avatar":"http://localhost:8087/jorgenunes.jpg", 
            "token": "usodsaoiuieas2u1293sdoakdiu12"
        }
        */
        
    },
    getters: {
       
    },
    mutations: {
        
    },
    modules: {
        user,
        products,
        view,
        shopping, 
    }
})
