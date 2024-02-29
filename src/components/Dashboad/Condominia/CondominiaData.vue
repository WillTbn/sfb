<template>
    <div class="condominia-data" >
        <loading-input
            v-if="loading"
        />

        <div v-if="apartments.length > 0">
            <v-container class="testeTable">
                <div v-if="condominia">
                    {{condominia.name}}
                </div>
                <v-table

                    height="300px"
                >
                    <thead>
                        <tr>
                            <th class="text-left">
                                Número
                            </th>
                            <th class="text-left">
                                Bloco
                            </th>
                            <th class="text-left">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in apartments"
                            :key="item.id"
                        >
                            <td>{{ item.number }}</td>
                            <td>{{ item.block }}</td>
                            <td>
                                <v-row>
                                    <v-col cols="auto">
                                        <v-btn density="default" icon="mdi-open-in-new"></v-btn>
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
        <div  v-if="apartments.length <= 0 && !loading">
            <v-container >

                <v-row class=" d-flex justify-center">
                    <v-col cols="auto">
                        <div v-if="condominia">
                            {{condominia.name}}
                        </div>
                    </v-col>
                    <v-col cols="12">

                        <v-alert
                            v-model="alert"
                            border="start"
                            variant="tonal"
                            closable
                            close-label="Condominio não tem apartamento cadastrado"
                            color="deep-purple-accent-4"
                            title="Não tem apartamento cadastrado"
                        >
                            <p> Muito importante que os dados do apartamento seja verificado com os responsaveis do condomio.</p>
                            <p>Divergências pode acarreta em exclusão sem aviso previo.</p>
                        </v-alert>

                    </v-col>
                </v-row>

            </v-container>
        </div>
        <v-dialog
            v-model="dialog"
            persistent
            width="1024"
        >
            <template v-slot:activator="{ props }">

                <v-col
                    cols="auto"
                    v-for="item in inputs"
                    :key="item.id"
                >
                    <v-btn
                        v-bind="props"
                        append-icon="mdi-plus-thick"
                        size="large"
                        elevation="4"
                        color="green"
                        @click="setDialog(item.value)"
                    >
                        {{item.name}}
                    </v-btn>
                </v-col>
            </template>
            <v-card style="overflow: hidden;padding: 10px 0px;">
                <v-row justify="end">
                    <v-col cols="1">
                        <v-btn
                            class="ma-2"
                            variant="text"
                            icon="mdi-close-circle-outline"
                            color="red-lighten-2"
                            @click="dialog = false"
                        ></v-btn>

                    </v-col>
                </v-row>
                <create-apartment
                    :condominia="condominia.name"
                    v-if="createType == 'C'"
                />

                <block-control
                    v-if="createType == 'V'"
                />
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import LoadingInput from '@/components/shared/LoadingInput.vue'
import { useFetch } from '../../../config/composables/Condominiums/OneFetch'
import { ref } from 'vue';
import CreateApartment from '@/components/Dashboad/Condominia/CreateApartment.vue'
import BlockControl from '@/components/Dashboad/Condominia/BlockControl.vue'

const { data:condominia, apartments:apartments, carregando:loading} = useFetch('/condominia/')
const alert = ref(true)
const dialog = ref(false)
const createType = ref()

const setDialog = (item) =>{
    dialog.value = true
    createType.value = item
}
const inputs = [
    {
        id:0,
        name: 'Somente um',
        value:'C',
        description: 'Aqui você vai adicionar a um bloco existe ou cria um bloco um apartamento.',
        help: 'Adicionar somente um apartamento',
        disabled: false
    },
    {
        id:1,
        name: 'Bloco inteiro',
        value:'V',
        description: 'Aqui você irá adicionar em um bloco existem ou não em um intervalo de apartamentos.',
        help:'Ex.: bloco a2, apartamentos de 101 a 110',
        disabled: false
    }
]

</script>
