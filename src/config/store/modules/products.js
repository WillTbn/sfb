import axios from 'axios'
export default {
    namespaced: true,
    state: {
        data:'',
        loading:true
    },
    mutations: {
        setProducts(state, products){
            state.data = products
        },
        setLoading(state, payload){
            state.loading = payload
        }
    },
    actions: {
        getProducts(context){
            
            axios.get('product').then(json =>{
                if(!json.error){
                    context.commit('setProducts', json.data.response.produtos)
                    console.log(json)
                }
            })
            .catch(error=>console.log(error))
            .finally(context.commit('setLoading', false))

        }
    },
}