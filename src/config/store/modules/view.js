export default {
    state:{
        viewBag:false,
        userconfig:false,
        viewConfig:false,
        login: null,
        loading:true
    },
    mutations:{
        setViewBag(state, viewBag){
            state.viewBag = viewBag
        },
        userConfig(state, userconfig){
            state.userconfig = userconfig
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
