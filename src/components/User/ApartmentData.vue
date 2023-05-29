<template>
    <v-row
        class="justify-center align-content-center apartment-data" dense no-gutters
    >
        <v-overlay
            :model-value="loadingForm"
            class="align-center justify-center"
        >
            <v-progress-circular
                color="red"
                indeterminate
                size="194"
            >{{statusReq}}</v-progress-circular>

        </v-overlay>
        <v-col>
            <v-card
                class="mx-auto bg-secondary align-center"
                width="auto"
                prepend-icon="mdi-home"
            >
                <template v-slot:title>
                    {{ props.etapa }}
                </template>

                <v-card-text>
                    {{ data_apartment }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <p class="text-caption">Se os dados estiverem errados comunique a portaria, iremos corrigi-los.</p>
    <p class="text-caption" color="red">Essencial que os dados estajam corretos para melhor experiencia em nossa plataforma.</p>
    <v-row
        class="justify-end pa-5" dense no-gutters
    >
        <v-col cols="2">
            <v-btn
                @click="mutationsSteps(current_local)"
                color="green"
            >
                avançar
            </v-btn>
        </v-col>
    </v-row>
</template>
<script setup>
import { ref } from "vue"

const statusReq = ref('')
const loadingForm = ref(false)
// eslint-disable-next-line no-undef
const props = defineProps({
    etapa:{type:String},
    data_apartment:{type:String},
    current_local:{type:Number}
})

// eslint-disable-next-line no-undef
const emitEvento = defineEmits(['current-data' ])
const mutationsSteps = (value)=>{
    loadingForm.value = true

    setTimeout(function(){
        loadingForm.value = false
        let soma = value+1
        emitEvento('current-data', soma)
        statusReq.value = 'carrengado..'
    }, 1000)
}
</script>
<style>
</style>
