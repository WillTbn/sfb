<template>
    <div class="">
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
        <v-card
            class="mx-auto bg-success align-center"
            width="auto"
            prepend-icon="mdi-account"
        >
            <template v-slot:title>
                {{ etapa }}
            </template>

            <v-card-text>
                <v-row class="d-flex justify-center">
                    <v-col>
                        <p class="ma-5">
                            <b>E-mail</b> <br/>
                            {{ inviteData.email}}
                        </p>

                    </v-col>
                    <v-col>
                        <p class="ma-5">
                            <b>Data de nascimento</b> <br/>
                            {{ inviteData.data.birthday }}
                        </p>

                    </v-col>
                    <v-col>
                        <p class="ma-5">
                            <b>CPF</b> <br/>
                            {{ inviteData.data.person }}
                        </p>

                    </v-col>
                </v-row>

            </v-card-text>

        </v-card>

        <p class="text-caption">Se os dados estiverem errados comunique a portaria, iremos corrigi-los.</p>
        <p class="text-caption" color="red">Essencial que os dados estajam corretos para melhor experiencia em nossa plataforma.</p>

        <v-form ref="form" v-model="valid" lazy-validation>
            <h4 class="mt-4 mb-6">Dados que podem ser editados por voce:</h4>
            <v-row>
                <v-col cols="4">
                    <v-text-field
                        v-model="dataAccount.telephone"
                        :rules="[rules.telephoneMin, rules.required]"
                        label="Telefone"
                        variant="outlined"
                        :disabled="loadingForm"
                    ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        v-model="dataAccount.phone"

                        :rules="[rules.phoneMin, rules.required]"
                        label="Celular"
                        required
                        variant="outlined"
                        :disabled="loadingForm"
                    ></v-text-field>
                </v-col>

                <v-col cols="4">
                    <v-select
                        v-model="dataAccount.genre"
                        :items="optionsGenre"
                        label="Sexo"
                        variant="outlined"
                        :disabled="loadingForm"
                    ></v-select>
                </v-col>
                <v-col cols="4">
                    <v-select
                        v-model="dataAccount.notifications"
                        :items="['Aceito', 'Recusado']"
                        label="Notificações"
                        variant="outlined"
                        :disabled="loadingForm"
                    ></v-select>
                </v-col>
            </v-row>
        </v-form>

        <v-row
            class="justify-space-between pa-5" dense no-gutters
        >
            <v-col cols="2">
                <v-btn
                @click="backSteps(current)"
                color="red"

            >
                Voltar
            </v-btn>
            </v-col>
            <v-col cols="2">
                <v-btn
                    @click="validateAccount()"
                    color="green"
                >
                    avançar
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
// import { mapState, toRefs } from 'vuex';

// const { account } = toRefs(mapState(['account']));

const store = useStore()

const inviteData = computed(()=> store.state.register.invite)

const dataAccount = ref({
    name:inviteData.value.name,
    person:inviteData.value.data.person,
    telephone:inviteData.value.data.telephone,
    phone:inviteData.value.data.phone,
    genre:inviteData.value.data.genre,
    birthday:inviteData.value.data.birthday,
    notifications:inviteData.value.data.notifications,
    apartment_id:inviteData.value.data.apartment_id,
})

// eslint-disable-next-line no-undef
const props = defineProps({
    etapa:{type:String},
    current_local:{type:Number}
})
let loadingForm = ref(false)
const rules = {
    required: value => !!value || 'Required.',
    min: v => v.length >= 8 || 'Min 8 characters',
    emailMatch: () => (`The email and password you entered don't match`),
    emailRequired: v => !!v || 'E-mail is required',
    emailValidated: v => /.+@.+/.test(v) || 'E-mail must be valid',
    telephoneMin: v => v.length == 11 || '11 digitos',
    phoneMin: v => v.length == 12 || '12 digitos',
}
// eslint-disable-next-line no-undef
const emitEvento = defineEmits(['current-data', 'status-req', 'personal-data'])
const valid = ref(true)

const form = ref(null)
const backSteps = ()=>{
    emitEvento('current-data', props.current_local-1)
}
const optionsGenre = [
    'Masculino', 'Feminino', 'Outro', 'Não informa'
]
const validateAccount = async() =>{

    emitEvento('status-req', 'Verificando dados!')
    if(valid.value == true){
        store.commit('register/setAccount', dataAccount.value)
        setTimeout(function(){
            loadingForm.value = false
            emitEvento('current-data', props.current_local+1)
         }, 1000)

    }else{
        form.value.validate()
        emitEvento('status-req', 'Erro, verifique os dados')

    }
}


</script>
<style>
</style>

