import { onBeforeMount, ref } from "vue"
import axios from "axios"
export function useFetch(url){
    const data = ref(null)
    const error = ref(null)
    const carregando = ref(true)

    const getInvites = async()=>{
        try{
            const req = await axios.get(url)

            data.value =  req.data.response.produtos

        }catch(err){
            error.value = "Erro ao obter informações da API."
        }finally{
            carregando.value = false
        }
    }
    // console.log('condominios', nameCondominia.value)
    onBeforeMount(async()=>{
        await getInvites()
    })

    return {
        data,
        error,
        carregando
    }
}
