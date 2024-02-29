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
                        <th class="text-left">
                            Ações
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
                        <td>
                            <v-row>
                                <v-col cols="auto">
                                    <v-btn density="default" @click="letsGo(item.id)" icon="mdi-open-in-new"></v-btn>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn density="default" icon="mdi-plus"></v-btn>
                                </v-col>
                            </v-row>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>
    </div>
</template>
<script setup>

import axios from 'axios'
import { ref } from 'vue';
import {useRouter} from 'vue-router'
import {useFetch} from '../../../config/composables/fetch'
import LoadingInput from '@/components/shared/LoadingInput.vue';
import {  inject } from 'vue'
// useFetch

const  rules = {
    required: value => !!value || 'Obrigatorio.'
}


const {data:condominios, error:error, carregando:loading} = useFetch('/condominia/getAll')

const toast = inject('toast')

console.log('ideia -> ', condominios.value)
const router = useRouter()
const letsGo = (id)=>{
    console.log('Aqui esta o id-> ',id)
    router.push({path:'/Condominios/'+id, params:{id}})
}
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

</script>
<style>

.testeTable{
    width: 80%;
}
</style>
