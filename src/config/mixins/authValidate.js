import { defineComponent } from 'vue';
import axios from "axios"
import { localId } from "../global"
import { mapState, mapGetters } from 'vuex'
export default defineComponent({
    data(){
        return {
            validated:false
        }
    },
    computed:{
        ...mapState('view', ['loading', 'login']),
        ...mapState('user', ['account', 'user']),
        ...mapState(['view', 'shopping']),
        ...mapGetters(['valorTotal', 'productTotal'])
    },
    methods: {
        async validateToken(){
            console.log('INICIALIZANDO')
            const json = localStorage.getItem(localId+'token')
            const token = JSON.parse(json)

            if(!token){
                console.log('ESTOU VERIFICANDO TOKEN LOCALMENTE', this.loading)
                console.log(2+2)
                this.validated = false
                this.$store.commit('view/setLoading', false)
                this.$router.push({name: 'Login'})
                return
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const resToken = await axios.post('/auth/validateToken', token)
            if(resToken.data.response.user){
                console.log('UUUUUHHH RETORNOU ALGO > API')
                this.$store.commit('view/setViewLogin', true)
                console.log('restoken ',resToken)
                let loggedUser = resToken.data.response.user
                this.$store.commit('user/setUser', loggedUser )
                this.$store.dispatch('user/getDataAccount')
                this.$store.commit('view/setLoading', false)
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
    }
});