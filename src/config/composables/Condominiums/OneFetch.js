import { onBeforeMount, ref } from "vue"
import axios from "axios"
import { useRoute } from "vue-router"
export function useFetch(url){
    const data = ref(null)
    const error = ref(null)
    const carregando = ref(true)
    const apartments = ref([])
    const router = useRoute()

    const getCondominios = async()=>{
        try{
            const req = await axios.get(url+router.params.id)

            // messageApi(req)

            data.value =  req.data.response.condominio[0]
            apartments.value = req.data.response.condominio[0].apartments

            // console.log('data', data.value)
        }catch(err){
            error.value = "Erro ao obter informações da API."
        }finally{
            carregando.value = false
        }
    }
    // console.log('condominios', nameCondominia.value)
    onBeforeMount(async()=>{
        await getCondominios(1)
    })

    return {
        data,
        error,
        apartments,
        carregando
    }
}
