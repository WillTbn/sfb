import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        products:[],
        shoppingCart:localStorage.length <= 0 ? [] : JSON.parse( localStorage.getItem('cart') ),
        user:{
            "name":"Jorge Nunes",
            "email":"jlbnunes@live.com",
            "avatar":"http://localhost:8087/jorgenunes.jpg", 
            "token": "usodsaoiuieas2u1293sdoakdiu12"
        },
        viewBag:false,
        
    },
    getters: {
        valorTotal(state) {
            return state.shoppingCart.map(p=>p.quantity *p.value)
                .reduce((total, atual)=> total+atual, 0)
        },
        EstadoCart(state){
            return state.shoppingCart
        }
    },
    mutations: {
        setProducts(state, products){
            state.products = products
        },
        setCart(state, purchase){

            if(state.shoppingCart.length <= 0 ){
                let item = { ...purchase}
                state.shoppingCart.push(item)
            }else if(state.shoppingCart.some(id => id.id == purchase.id)) {
                let productIndex = state.shoppingCart.indexOf(state.shoppingCart.find(element => element.id == purchase.id))
                state.shoppingCart[productIndex].quantity = purchase.quantity
                state.shoppingCart[productIndex].value =  purchase.value
                
                //localStorage.setItem('cart', [JSON.stringify(state.shoppingCart)])
                // item.value: 33.00 + purchase.value
                
            }else{
                state.shoppingCart.push(purchase)
            }
            localStorage.setItem('cart', [JSON.stringify(state.shoppingCart)])
            
        },
        deleteProductCart(state, id){
            let item = state.shoppingCart.indexOf(state.shoppingCart.find(element => element.id == id))
            state.shoppingCart.splice(item, 1)
            localStorage.setItem('cart', [JSON.stringify(state.shoppingCart)])

        },
        setViewBag(state, viewBag){
            state.viewBag = viewBag
        }
    },
    actions: {
        setLocalStorage(context, item){
            context.commit('setCart', item)
        },
        deleteLocalStorage(name){
            localStorage.removeItem(name)
        },
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
