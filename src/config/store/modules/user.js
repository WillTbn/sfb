import axios from "axios"
import {localId} from "../../global"
export default {
    state:{
        user:null,
        account:null
    },
    mutations:{
        setAccount(state, account){
            state.account = account
        },
        // setToken(state, payload){
        //     state.token = payload
        //     axios.defaults.headers.common['Authorization'] = `bearer ${payload.token}`
        // },
        setUser(state, payload){
            state.user = payload
        }
    },
    actions:{
        getDataAccount(context){
            if(!localStorage.getItem(localId+'account')){
                axios.get('account/'+context.state.user.id).then(json => {
                    context.commit('setAccount', json.data.response.account)
                    localStorage.setItem('user', [JSON.stringify( json.data.response.account)])
                }).catch(e=>console.log(e))
            }else{
                console.log('ESTOU NO ELSEIF EXISTE')
            }
        },
        Auth(context, data){
            axios.post('/auth/login', data)
            .then(json=>{
                context.commit('setUser', json.data.response.user)
                // context.commit('setToken', json.data.authorisation.token)
                console.log(json)

                localStorage.setItem(localId+'token', JSON.stringify(json.data.response.authorization.token))
            }).catch(e=>console.log(e))
        }
    }


}