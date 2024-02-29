<template>
    <div class="condominia-user">
        <p><b>Qual condominio ?</b></p>
        <loading-input
            v-if="loading"
        />
        <v-row>
            <v-col>
                <v-combobox
                    v-model="data.condominia_id"
                    :items="selectCondominia"
                    variant="solo"
                    :rules="[rules.required]"
                    v-if="!loading"
                ></v-combobox>
            </v-col>
        </v-row>
        <v-row v-if="data.condominia_id != ''">
            <v-col>
                <v-combobox
                    v-model="data.block"
                    :items="blocks"
                    item-value="id"
                    label="Selecione o Bloco"
                    variant="solo"
                    :rules="[rules.required]"

                ></v-combobox>
            </v-col>
            <v-col v-if="data.block != ''">
                <v-combobox
                    v-model="data.apartment_id"
                    :items="selectApartments"
                    item-value="id"
                    label="Selecione o Bloco"
                    variant="solo"
                    :rules="[rules.required]"

                ></v-combobox>
            </v-col>
        </v-row>

        <v-row class="justify-space-between" >
            <v-col cols="2">
                <v-btn
                    @click="this.$emit('status-view',  {view:'initial', data:''})"
                    color="red"

                >
                    Voltar
                </v-btn>
            </v-col>
            <v-col cols="2">

                <v-btn
                    @click="setData()"
                    color="green"
                    variant="text"
                >
                    Continuar
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script setup>
import { useFetch } from '@/config/composables/fetch'
import LoadingInput from '@/components/shared/LoadingInput.vue'
import {ref, watch}from 'vue'

    const  rules = {
        required: value => !!value || 'Obrigatorio.',
    }

    const {
        data:condominia,
        nameCondominias:selectCondominia,
        // apartments:selectApartment,
        // error:error,
        carregando:loading
    } = useFetch('/condominia')

    const data = ref({
        condominia_id:'',
        apartment_id:'',
        block:''
    })

    let condominioId = ref([])
    let selectApartments = ref([])
    let blocks = ref([])
    // eslint-disable-next-line no-undef
    const emitEvento = defineEmits(['condominia-data', 'status-view'])
    const setData = async()=>{
        emitEvento('condominia-data', { condominio:condominioId.value[0].name, apartament:data.value.apartment_id})
        emitEvento('status-view', {view : 'datacontrol', data:data.value.apartment_id.match(/-(.*?)-/g)[0]} )
    }

    watch(data.value,(n)=>{
        console.log('condominioId -> ',condominioId.value)

        condominioId.value = condominia.value.filter(item => item.name == n.condominia_id)
        console.log('condominioId ->', condominioId.value)
        condominioId.value[0].blocks.forEach(e => {
            blocks.value.push(e.name)
        });
        if(data.value.block != ''){
            console.log('condominia.value ->', condominia.value)
            let valor = condominia.value[0].blocks.filter(item => item.name == n.block)
            console.log('Valor ->', valor[0])
            valor[0].apartments.forEach(element => {
                console.log('element -> ', element)
                selectApartments.value.push(`-${element.id}- apto. nº ${element.number}`)
            });

        }
        // console.log('selectApartment', selectApartment.value)
    })



</script>
