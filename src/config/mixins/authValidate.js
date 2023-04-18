import axios from "axios"
import { localId } from "../global"
import { mapState, mapGetters } from 'vuex'
export default {
    data(){
        return {
            validated:false
        }
    },
    computed:{
        ...mapState(['view', 'shopping', 'user']),
        ...mapGetters(['valorTotal', 'productTotal'])
    },
    methods: {
        async validateToken(){
            console.log('INICIALIZANDO')
            const json = localStorage.getItem(localId+'token')
            const token = JSON.parse(json)

            if(!token){
                console.log('ESTOU VERIFICANDO TOKEN LOCALMENTE')
                this.validated = false
                this.$router.push({name: 'Login'})
                return
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const resToken = await axios.post('/auth/validateToken', token)
            if(resToken.data.response.user){
                console.log('UUUUUHHH RETORNOU ALGO > API')
                this.$store.dispatch('setLogin', true)
                console.log('restoken ',resToken)
                let loggedUser = resToken.data.response.user
                this.$store.commit('setUser', loggedUser)
                this.$store.dispatch('getDataAccount')
                this.$store.commit('setLoading', false)
                this.validated = true
                this.$router.push({ name: 'Home'})
            }else{
                delete axios.defaults.headers.common['Authorization']
                this.validated = true
            }
        }
    },
    created() {
        this.validateToken()
    },
}