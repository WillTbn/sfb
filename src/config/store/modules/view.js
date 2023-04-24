export default {
    namespaced: true,
    state:{
        viewBag:false,
        userconfig:false,
        viewConfig:false,
        login: false,
        loading:true
    },
    mutations:{
        setViewBag(state, payload){
            state.viewBag = payload
        },
        userConfig(state, payload){
            state.userconfig = payload
        },
        setViewConfig(state, payload){
            state.viewConfig = payload
        },
        setViewLogin(state, payload){
            state.login = payload
        },
        setLoading(state, payload){
            state.loading = payload
        }
    },
    actions:{
        setUserConfig(context, status){
            context.commit('userConfig', status)
        },
        setLogin(context, status){
            context.commit('setViewLogin', status)
        }
    }
}
