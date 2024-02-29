<template>
    <div class="block-control">
        <v-form ref="form" v-model="valid"  lazy-validation class="text-form">
            <v-row class="pa-6">
                <v-col class="v-around-flex-12" cols="12">
                    <h2> Adicionar apartamentos por andares</h2>
                    <v-icon
                        size="large"
                        color="green-darken-2"
                        icon="mdi-office-building-marker"
                    ></v-icon>
                </v-col>
                <v-col>
                    <p>Nome do bloco</p>
                    <v-text-field
                        v-model="data.block"
                        :rules="[rules.required]"
                        :disabled="loadingForm"
                        density="compact"
                        variant="underlined"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <p>Andar dos apartamentos</p>
                    <v-text-field
                        v-model="data.walk"
                        :rules="[rules.required,rules.numberValidation]"
                        :disabled="loadingForm"
                        density="compact"
                        variant="underlined"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <p>Primeiro número do Andar</p>
                    <v-text-field
                        v-model="data.apartment_start"
                        :rules="[rules.required, rules.numberValidation]"
                        :disabled="loadingForm"
                        density="compact"
                        variant="underlined"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <p>Ultimo número do Andar</p>
                    <v-text-field
                        v-model="data.apartment_finally"
                        :rules="[rules.required, rules.numberValidation, rules.numberRange]"
                        :disabled="loadingForm"
                        density="compact"
                        variant="underlined"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-form>
        <v-row justify="end">
            <v-col
               cols="2"
            >
                 <v-btn
                    color="green ma-2"
                    append-icon="mdi-send"
                    @click="setblock"
                    :disabled="loadingForm"
                >
                    Enviar
                </v-btn>
            </v-col>

        </v-row>
    </div>
</template>
<script setup>
import axios from "axios"
import { ref, inject } from "vue"

const toast = inject('toast')
const data = ref({
    block: '',
    walk:'',
    apartment_start: '',
    apartment_finally: '',


})

const  rules= {
    required: value => !!value || 'Obrigatorio.',
    min: v => v.length >= 8 || 'Minino 8 caracteres',
    nameRequired:  v => !!v || 'Nome completo obrigatório.',
    numberRange: v => rangeVerify(v) || 'Não pode ser meno que o campo primeiro número do bloco.',
    personValidated: v => v.length == 11 || 'Tem que conter 11 números',
    numberValidation: v => /^\d+$/.test(v) || "Somente números são permitidos",

}
let loadingForm = ref( false)
const form = ref(null)
const valid = ref(true)
const rangeVerify = (v) =>{
    return v >=  data.value.apartment_start ? true : false
}
const setblock = async() =>{
    loadingForm.value = true
    if(valid.value == true){
        try{
            const req = await axios.post('apartment/block', data.value)

            toast.show(req.data.message, {type: 'success'})

            console.log('DADOS a envia ->', data)

        }catch(err){
            console.log(err)
            toast.show(err.response.data.message, {type:err.response.data.status})
        }finally{
            loadingForm.value = false
        }
    }else{
        loadingForm.value = false
        form.value.validate()
    }
}

// let overlay = ()=>{
//     loadingForm.value = true

//     setTimeout(function(){
//         loadingForm.value = false
//     }, 4000)
// }
</script>
<style>
.v-around-flex-12{
    /* min-height: 100px;
    margin: 1.2rem 0px; */
    display: flex;
    align-content: flex-start;

}
.text-form{
    text-transform: uppercase;
    -webkit-text-stroke: thin;
    letter-spacing: 0.06rem;
    font-variant-caps: unicase;
}
</style>
