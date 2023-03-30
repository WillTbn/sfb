import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    products:[],
    shoppingCart:[],
  },
  getters: {
    valorTotal(state) {
        return state.shoppingCart.map(p=>p.quantity *p.value)
            .reduce((total, atual)=> total+atual, 0)
    }
  },
  mutations: {
    setProducts(state, products){
        state.products = products
    },
    setCart(state, purchase){
        let item ={ 
           "item": purchase.name,
           "quantity": purchase.quantity,
           "value": purchase.quantity * purchase.price
        }
        state.shoppingCart.push(item)
    }
  },
  actions: {
    getProducts(context){
        const url = 'http://localhost:8087/api/product'
        axios.defaults.headers.common['accept'] = 'application/json'
        console.log('OLA')
        axios.get(url).then(json =>{
            if(!json.error){
                context.commit('setProducts', json.data.response.produtos)
                console.log(json)
            }
        }).catch(error=>console.log(error))

    }
  },
  modules: {
  }
})
