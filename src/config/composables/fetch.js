import { onBeforeMount, ref } from "vue"
import axios from "axios"
export function useFetch(url){
    const data = ref(null)
    const error = ref(null)
    const carregando = ref(true)
    const nameCondominias = ref([])
    const apartments = ref([])

    const getCondominios = async()=>{
        try{
            const req = await axios.get(url)

            // messageApi(req)

            data.value =  req.data.response.condominio
            req.data.response.condominio.forEach(element => {
                nameCondominias.value.push(element.name)
            });
            req.data.response.condominio.forEach(element => {
                apartments.value.push(element.apartments)
            });
            // console.log('data', data.value)
        }catch(err){
            error.value = "Erro ao obter informações da API."
        }finally{
            carregando.value = false
        }
    }
    // console.log('condominios', nameCondominia.value)
    onBeforeMount(async()=>{
        await getCondominios()
    })

    return {
        data,
        error,
        nameCondominias,
        apartments,
        carregando
    }
}
