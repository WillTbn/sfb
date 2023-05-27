import { onBeforeMount, ref } from "vue"
import axios from "axios"

export function useFetch(url, token){
    const data = ref(null)
    const error = ref(null)
    const carregando = ref(true)
    let redirect = ref(null)
    let status = ''


    const getInvites = async()=>{
        try{
            // console.log(axios.get(`${url}${id}`,))
            const req = await axios.get(`${url}${token}` )
            console.log(req)
            data.value =  req.data.response.invite

        }catch(err){
            redirect.value = true
            error.value = err.response.data.message
            console.log('error API->',err)
            console.log('API redirect ->', redirect.value)
            status = err.response.status
            console.log('API status ->', status.value)
        }finally{
            carregando.value = false
        }
    }
    const getNot = async()=>{
        console.log('ESTOU NO GET NOT')
        error.value = ''
        carregando.value = false
        redirect.value = true

    }

    // console.log('condominios', nameCondominia.value)
    onBeforeMount(async()=>{
       (token) ? await getInvites() : await getNot()
    })

    return {
        data,
        error,
        carregando,
        redirect,
        status,
    }
}
