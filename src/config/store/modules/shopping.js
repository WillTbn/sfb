export default {
    state: {
        cart:localStorage.length <= 0 ? [] : JSON.parse( localStorage.getItem('cart') ),
        
    },
    getters: {
        valorTotal(state) {
            let total = 0;
            if(state.cart.length > 0){
                for (let i = 0; i < state.cart.length; i++) {
                    total += state.cart[i].value;
                }
            }
            return total.toFixed(2).toString().replace(".", ",")
        },
        productTotal(state){
            let total = 0;
            if(state.cart.length > 0){
                for (let i = 0; i < state.cart.length; i++) {
                    total += state.cart[i].quantity;
                }
            }
            return total
        },
        EstadoCart(state){
            return state.cart
        }
    },
    mutations: {
        setProducts(state, products){
            state.products = products
        },
        setCart(state, purchase){

            if(state.cart.length <= 0 ){
                let item = { ...purchase}
                state.cart.push(item)
            }else if(state.cart.some(id => id.id == purchase.id)) {
                let productIndex = state.cart.indexOf(state.cart.find(element => element.id == purchase.id))
                state.cart[productIndex].quantity = purchase.quantity
                state.cart[productIndex].value =  purchase.value                
            }else{
                state.cart.push(purchase)
            }
            localStorage.setItem('cart', [JSON.stringify(state.cart)])
            
        },
        deleteProductCart(state, id){
            let item = state.cart.indexOf(state.cart.find(element => element.id == id))
            state.cart.splice(item, 1)
            localStorage.setItem('cart', [JSON.stringify(state.cart)])

        }
    },
    actions: {
        
        setLocalStorage(context, item){
            context.commit('setCart', item)
        },
        deleteLocalStorage(name){
            localStorage.removeItem(name)
        }
    },
}