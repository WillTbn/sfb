export default {
    state:{
        viewBag:false,
        userconfig:false,
        viewConfig:false
    },
    mutations:{
        setViewBag(state, viewBag){
            state.viewBag = viewBag
        },
        userConfig(state, userconfig){
            state.userconfig = userconfig
        },
        setViewConfig(state, viewConfig){
            state.viewConfig = viewConfig
        }
    },
    actions:{
        setUserConfig(context, status){
            context.commit('userConfig', status)
        }
    }
}
