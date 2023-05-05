import { inject } from 'vue'
import axios from 'axios'
import { ref, onMounted } from 'vue';
export const condominiaMix = {
    setup(){

        // import {messageApi} from '../../../config/global';


        const toast = inject('toast')

        const condominios = ref([])
        const name = ref('')
        const buscarCondominio = async()=>{
            const req = await axios.get('/condominia')

            // messageApi(req)
            return req.data.response.condominio
        }
        onMounted(async() => {
            condominios.value = await buscarCondominio()

        })
        // eslint-disable-next-line no-unused-vars
        const adicionarCondominio = async()=>{

            await axios.post('/condominia/created', { 'name': name.value})
            // await axios.post('/condominia/created', name.value)
                .then(res=> {
                    name.value = ''
                    toast.show(res.data.message, {type: `${res.data.status}`})
                })
                .catch(error=>
                    toast.show(error.response.data.message, {type: `${error.response.data.status}`})
                )

            condominios.value = await buscarCondominio()

        }

    }
}
