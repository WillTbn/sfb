import { defineComponent } from 'vue';
import axios from "axios"
import { localId } from "../global"
import { mapState } from 'vuex'
export default defineComponent({
    data(){
        return {
            validated:false,
            queryToken:'',
            queryId:''
        }
    },
    computed:{
        ...mapState('view', ['loading', 'login']),
        ...mapState('user', ['account', 'user', 'auth']),
        ...mapState(['view', 'shopping']),
    },
    methods: {
        format(e){
            let tmp = ''
            let getVars = {};
            console.log('format ->',e)
            e.forEach(function(v){
                tmp = v.split('=');
                console.log('tmp ->',tmp)
                if(tmp.length == 2)
                getVars[tmp[0]] = tmp[1];
            });
            return getVars;
        },
        pegarURL(){
            let uri = window.location.href.split('?');
            if (uri.length >= 2)
            {
                let dataURL = this.format(uri[1].split('&'))

                this.queryToken = dataURL.token

                this.queryId = dataURL.id
            }
        },
        async validateToken(){
            console.log('INICIALIZANDO')
            const json = localStorage.getItem(localId+'token')
            const token = JSON.parse(json)

            if(!token){
                console.log('ESTOU VERIFICANDO TOKEN LOCALMENTE', this.loading)
                this.validated = false
                this.$store.commit('view/setLoading', false)
                // aqui é um ponto essencial do novo reload ao fazer login
                if(this.queryToken){
                    this.$router.push({name: 'Login', query:{token:this.queryToken}})
                }else{
                    this.$router.push({name: 'Login'})
                }

                return
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            // const resToken = await axios.post('/auth/validateToken', token)
            // if(resToken.data.response.user){
            //     this.$store.commit('view/setViewLogin', true)

            //     let loggedUser = resToken.data.response.user
            //     this.$store.commit('user/setUser', loggedUser )
            //     this.$store.dispatch('user/getDataAccount')
            //     this.$store.commit('view/setLoading', false)
            //     this.$store.commit('user/setAuth', true)
            //     this.validated = true
            //     if(loggedUser.type === 'M'){
            //         this.$router.options.history.location != '/' ? '' : this.$router.push('Dashboard')
            //     }

            // }else{
            //     delete axios.defaults.headers.common['Authorization']
            //     this.validated = true
            // }
        }
    },
    created() {
        this.pegarURL()
        this.validateToken()
    }
});
