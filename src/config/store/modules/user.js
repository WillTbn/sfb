import axios from "axios"
import {localId} from "../../global"
export default {
    namespaced: true,
    state:{
        user:[],
        account:!localStorage.getItem(`${localId}account`) ? [] : JSON.parse(localStorage.getItem(`${localId}account`)),
        auth:false
    },
    getters:{
        statusView(state){
            if(state.user.length === 0){
                return 'notAuth'
            }
            else if(state.user.type === 'N'){
                return 'authClient'
            }
            console.log('statusView -> ',state.user.type)
            return 'auth'
        }
    },
    mutations:{
        setAccount(state, payload){
            state.account = payload
        },
        // setToken(state, payload){
        //     state.token = payload
        //     axios.defaults.headers.common['Authorization'] = `bearer ${payload.token}`
        // },
        setUser(state, payload){
            state.user = payload
        },
        setAuth(state, payload){
            state.auth = payload
        }
    },
    actions:{
        getDataAccount(context){
            if(context.state.account.length <= 0){
                console.log('ESTOU NO AQUI')
                axios.get('account/'+context.state.user.id).then(json => {
                    context.commit('setAccount', json.data.response.account)
                   
                    localStorage.setItem(localId+'account', [JSON.stringify( json.data.response.account)])
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
        },
        logout(context){
            localStorage.removeItem(`${localId}account`)
            localStorage.removeItem(`${localId}token`)
            context.commit('setUser', [])
            document.location.replace(document.location.origin)
            
        }
    }


}