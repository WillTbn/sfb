import axios from 'axios'
export default {
    state: {
        data:[],        
    },
    mutations: {
        setProducts(state, products){
            state.data = products
        },
    },
    actions: {
        getProducts(context){
            
            axios.get('product').then(json =>{
                if(!json.error){
                    context.commit('setProducts', json.data.response.produtos)
                    console.log(json)
                }
            }).catch(error=>console.log(error))

        }
    },
}