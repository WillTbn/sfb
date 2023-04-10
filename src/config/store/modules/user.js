import axios from "axios"

export default {
    state:{
        account:localStorage.length <= 0 ? [] : JSON.parse( localStorage.getItem('user') ),
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODcvYXBpL2F1dGgvcmVnaXN0ZXIiLCJpYXQiOjE2ODEwOTAzMTUsIm5iZiI6MTY4MTA5MDMxNSwianRpIjoiVEtTSUtnTEgySWtOY2FFbiIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.MEel8IxKirrl2QKZcJhcwiwuDVBB-5XQ-3lnzRSJ0Gg'
    },
    mutations:{
        setAccount(state, account){
            state.account = account
        }
    },
    actions:{
        getDataAccount(context){
            if(!localStorage.getItem('user')){
                
                axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODcvYXBpL2F1dGgvcmVnaXN0ZXIiLCJpYXQiOjE2ODEwOTAzMTUsIm5iZiI6MTY4MTA5MDMxNSwianRpIjoiVEtTSUtnTEgySWtOY2FFbiIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.MEel8IxKirrl2QKZcJhcwiwuDVBB-5XQ-3lnzRSJ0Gg'
                axios.get('account/2').then(json => {
                    context.commit('setAccount', json.data.response.account)
                    localStorage.setItem('user', [JSON.stringify( json.data.response.account)])
                })
            }else{
                console.log('ESTOU NO ELSEIF EXISTE')
            }
            /*
            
            */
        }
    }


}