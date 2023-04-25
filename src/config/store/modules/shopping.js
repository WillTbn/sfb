import {localId} from "../../global"
export default {
    namespaced: true,
    state: {
        cart:!localStorage.getItem(`${localId}cart`) ? [] : JSON.parse(localStorage.getItem(`${localId}cart`)),
        
    },
    getters: {
        valorTotal(state) {
            let total = 0;
            let pro = state.cart
            if(pro.length > 0){
                for (let i = 0; i < pro.length; i++) {
                    total += pro[i].value;
                }
            }
            let formatNumber = parseFloat(total).toFixed(2).toString().replace(".", ",")

            console.log('Valor Total -> ', formatNumber)
            return formatNumber
        },
        productTotal(state){
            let total = 0;
            
            let pro = state.cart
            
            console.log('PRO ', typeof pro)
            console.log('promise', pro)
            // Object.values(context.state.cart)[0]
            if(pro.length > 0){
                for (let i = 0; i <  pro.length; i++) {
                    total += pro[i].quantity;
                    console.log("count product's cart")
                }
            }
            console.log('TIPO ', typeof total)
            console.log('TOTAL ', total)
            return total
        }
    },
    mutations: {
        setCart(state, payload){
            state.cart = [payload]
            console.log('state', state.cart)
            localStorage.setItem( `${localId}cart`, JSON.stringify(state.cart))
        },
        setPlus(state, payload){
            let productIndex = state.cart.indexOf(state.cart.find(element => element.id == payload.id))
            state.cart[productIndex].quantity = payload.quantity
            state.cart[productIndex].value =  payload.value
            // localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        setPushCart(state, payload){
            // console.log('PAYLOAD', payload)
            state.cart.push(payload)
        },
        setProducts(state, products){
            state.products = products
        },
        deleteProductCart(state, id){
            let item = state.cart.indexOf(state.cart.find(element => element.id == id))
            state.cart.splice(item, 1)
            // localStorage.setItem('cart', JSON.stringify(state.cart))

        },
        
    },
    actions: {
        setState(context, item){
            if( Object.values(context.state.cart)[0] == null){
               
                console.log('Estou no setState if', context.state.cart)
                context.commit('setCart', item)
                
            }else if(context.state.cart.some(e => e.id == item.id)) {
                console.log('Estou no setState if ELSE', context.state.cart)
               context.commit('setPlus', item)                        
            }else{
                console.log('Estou no setState ELSE', context.state.cart)
                context.commit('setPushCart', item) 
            }
            localStorage.setItem('cart', JSON.stringify(context.state.cart))
        },
        setLocalStorage(context, item){
            context.commit('setCart', item)
        },
        deleteLocalStorage(name){
            localStorage.removeItem(name)
        }
    },
}