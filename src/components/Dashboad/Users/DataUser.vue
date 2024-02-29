<template>
    <div class="data-user">
        <p class="py-2"><b>Dados pessoais do usuário</b></p>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-row>
                <v-col cols="6" class="text-subtitle-2  mb-1">Nome Completo
                    <v-text-field
                        v-model="data.name"
                        :rules="[rules.nameRequired, rules.min]"
                        color="success"
                        variant="solo"
                        :disabled="loadingForm"
                    ></v-text-field>
                </v-col>
                <v-col cols="3" class="text-subtitle-2  mb-1">E-mail
                    <v-text-field
                        v-model="data.email"

                        :rules="[rules.emailRequired, rules.emailValidated]"
                        color="success"
                        variant="solo"
                        :disabled="loadingForm"
                    ></v-text-field>

                </v-col>
                <v-col cols="3" class="text-subtitle-2  mb-1">CPF
                    <v-text-field
                        v-model="data.person"
                        :rules="[rules.required, rules.personValidated]"
                        color="success"
                        variant="solo"
                        :disabled="loadingForm"
                    ></v-text-field>
                </v-col>
                <v-col cols="4" class="text-subtitle-2  mb-1">Data de nascimento
                    <v-text-field
                        v-model="data.birthday"
                        :rules="[rules.required]"
                        color="success"
                        variant="solo"
                        :disabled="loadingForm"
                    ></v-text-field>

                </v-col>
                <v-col cols="4" class="text-subtitle-2 mb-1">Sexo
                    <v-combobox
                        v-model="data.genre"
                        :items="optionsGenre"
                        variant="solo"
                        :rules="[rules.required]"
                        :disabled="loadingForm"
                    ></v-combobox>

                </v-col>
                <v-col cols="4" class="text-subtitle-2 mb-1">Notificações
                    <v-combobox
                        v-model="data.notifications"
                        :items="['Aceito', 'Recusado']"
                        variant="solo"
                        :rules="[rules.required]"
                        :disabled="loadingForm"
                    ></v-combobox>

                </v-col>
            </v-row>
            <v-row class="justify-space-between"  v-if="!loadingForm">
                <v-col cols="2">
                    <v-btn
                        color="red"
                        prepend-icon="mdi-keyboard-backspace"
                        @click="this.$emit('status-view',  'initial')"
                    >
                        <template v-slot:prepend>
                            <v-icon></v-icon>
                        </template>
                        Voltar
                    </v-btn>
                </v-col>
                <v-col cols="2">
                    <v-btn

                        color="green"
                        append-icon="mdi-send"
                        @click="sentNewUser"
                        :disabled="loadingForm"
                    >
                        <template v-slot:append>
                            <v-icon></v-icon>
                        </template>
                        Enviar
                    </v-btn>
                </v-col>
            </v-row>
            <div v-else class="control-input" >
                <loading-input></loading-input>
            </div>

        </v-form>
    </div>
</template>
<script setup>

import { defineAsyncComponent, ref } from 'vue'

const  rules= {
    required: value => !!value || 'Obrigatorio.',
    min: v => v.length >= 8 || 'Minino 8 caracteres',
    nameRequired:  v => !!v || 'Nome completo obrigatório.',
    emailMatch: () => (`O e-mail e a senha digitados não coincidem`),
    emailRequired: v => !!v || 'E-mail e obrigatorio',
    emailValidated: v => /.+@.+/.test(v) || 'E-mail deve ser válido',
    personValidated: v => v.length == 11 || 'Tem que conter 11 números',

}
const LoadingInput = defineAsyncComponent(() => import('@/components/shared/LoadingInput.vue'))

// `defineProps` is a compiler macro and no longer needs to be imported.
// eslint-disable-next-line no-undef
const props = defineProps({
    apartment_id:{
        type:String,
        required: true
    }
})



let data = ref({
    name:'',
    email:'',
    person:'',
    genre:'',
    birthday:'',
    notifications:'',
    telephone:'',
    phone:'',
    apartment_id:props.apartment_id
})

const optionsGenre = [
    'Masculino', 'Feminino', 'Outro', 'Não informa'
]
let valid = ref( true)
let loadingForm = ref( false)

let overlay = ()=>{
    loadingForm.value = true

    setTimeout(function(){
        loadingForm.value = false
    }, 4000)
}
// `defineProps` is a compiler macro and no longer needs to be imported.
// eslint-disable-next-line no-undef
const emitEvento = defineEmits(['data-account', 'status-view'])
const sentNewUser = async()=>{
    overlay()
    emitEvento('data-account',data.value)
    emitEvento('status-view','usardetails')
    console.log('data -> ',data.value)
}
</script>
