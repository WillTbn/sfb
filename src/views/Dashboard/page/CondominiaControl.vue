<template>
    <div class="condominia-control">
        <v-container class="teste">

            <v-row >
                <v-col cols="6" class="text-subtitle-2  mb-1">Nome Do condominio
                    <v-text-field
                        v-model="name"
                        :rules="[rules.required]"
                        color="success"
                        variant="solo"

                    ></v-text-field>
                </v-col>
            </v-row>
            <v-btn
                @click="adicionarCondominio"
                color="red"

            >
                Cadastra
            </v-btn>

        </v-container>
        <v-contanter class="testeTable">
            <v-table height="300px">
                <thead>
                    <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Quantidades de apartamentos
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in condominios"
                        :key="item.name"
                    >
                        <td>{{ item.name }}</td>
                        <td>{{ $filters.countArray( item.apartments) }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-contanter>
    </div>
</template>
<script setup>
import { inject } from 'vue'

import axios from 'axios'
import { ref, onMounted } from 'vue';
// import {messageApi} from '../../../config/global';


const toast = inject('toast')
const  rules = {
    required: value => !!value || 'Obrigatorio.'
}

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
// const adicionarCondominio = () =>{
//     const req = axios.post('/condominia/created', name.value)
//     console.log(req)
//     toast.show(messageApi(req))
//     // toast.success(req.data.message)
//     // condominios.value = buscarCondominio()
// }

</script>
<style>

.testeTable{
    width: 80%;
}
</style>
