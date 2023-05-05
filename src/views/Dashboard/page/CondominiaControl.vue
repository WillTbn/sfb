<template>
    <div class="condominia-control">
        <v-alert
            class="alert-v"
            closable
            :text=error.value
            type="error"
            v-if="error"
        ></v-alert>
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
        <v-container class="testeTable">
            <loading-input
                v-if="loading"
            />
            <v-table
                v-else
                height="300px"
            >
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
        </v-container>
    </div>
</template>
<script setup>
import {  inject } from 'vue'
const  rules = {
    required: value => !!value || 'Obrigatorio.'
}

import axios from 'axios'
import { ref } from 'vue';
// useFetch
import {useFetch} from '../../../config/composables/fetch'
import LoadingInput from '@/components/shared/LoadingInput.vue';


const {data:condominios, error:error, carregando:loading} = useFetch('/condominia')

const toast = inject('toast')

console.log('ideia -> ', condominios.value)
const name = ref('')
const adicionarCondominio = async()=>{

    await axios.post('/condominia/created', { 'name': name.value}).then(res=> {
            name.value = ''
            toast.show(res.data.message, {type: `${res.data.status}`})
            // Atualizando as variáveis reativas
            condominios.value.push(res.data.response.condominio)
        })
        .catch(error=>toast.show(error.request.response.message, {type: `${error.request.response.status}`}))
        .finally(()=>{
            // const {data:condominiosAtualizados} = useFetch('/condominia')
            // condominios.value = condominiosAtualizados
            // console.log(condominios.value)
        })

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
