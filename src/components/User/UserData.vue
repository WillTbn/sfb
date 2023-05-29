<template>
    <!-- <div class=""> -->
    <v-row
        class="justify-center align-content-center" dense no-gutters
    >
        <h3>
            {{ props.etapa }}

        </h3>
        <v-col
            cols="12"

            class="rounded-lg d-flex align-center"
        >
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="control-input"
            >
                <v-text-field
                    :type="show1 ? 'text' : 'password'"
                    v-model="password"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    outlined
                    label="Senha"
                    :disabled="loadingForm"
                    variant="solo"
                    @click:append-inner="show1 = !show1"
                ></v-text-field>
                <v-text-field
                    :type="show2 ? 'text' : 'password_confirm'"
                    v-model="password_confirm"
                    :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min, rules.passwordMatch]"
                    outlined
                    label="Confirma senha"
                    :disabled="loadingForm"
                    variant="solo"
                    @click:append-inner="show2 = !show2"
                ></v-text-field>
                <v-btn
                    @click="backSteps(current)"
                    color="red"

                >
                    Voltar
                </v-btn>
                <v-btn
                    @click="registerPassword"
                    color="green"
                    v-if="!loadingForm"
                    :disabled="loadingForm"
                >
                    Finalizar
                </v-btn>


            </v-form>

        </v-col>
    </v-row>
    <!-- </div> -->
</template>
<script setup>
import axios from "axios"
import {  computed, ref } from "vue"
import { useRouter } from "vue-router";
import { useStore } from "vuex"
import { localId } from "../../config/global";


const form = ref(null)
const show1 = ref(false)
const show2 = ref(false)
const valid = ref(true)
const password = ref('')
const password_confirm = ref('')
const store = useStore()
const loadingForm = ref(false)
const router = useRouter()
// eslint-disable-next-line no-undef
const props = defineProps({
    etapa:{type:String},
    current_local:{type:Number}
})

const inviteData = computed(() => store.state.register.invite)
const userData = computed(() => store.state.register.user)
const accountData = computed(()=> store.state.register.account)

// eslint-disable-next-line no-undef
const emitEvento = defineEmits(['current-data', 'status-req', 'text-view'])
const backSteps = ()=>{
    emitEvento('current-data', props.current_local-1)
}
const rules = {
    required: value => !!value || 'Required.',
    min: v => v.length >= 8 || 'Min 8 characters',
    passwordMatch: v => v == password.value  || 'Password confirme não esta igual o campo Password',
}

const setUser =  async() => {
    emitEvento('status-req', 'Registrando Usuário...')
    loadingForm.value = true
    try{
        const req = await axios.post('auth/register', {...userData.value})
        store.commit('register/setUserId', req.data.response.user.id)

        axios.defaults.headers.common['Authorization'] = `Bearer ${req.data.response.authorization.token}`
        localStorage.setItem(localId+'token', JSON.stringify(req.data.response.authorization.token))
        emitEvento('status-req', 'Usuário setado...')
    }catch(err){
        console.log('errror -> ', err)
        emitEvento('text-view', 'erro, catch')
    }finally{
        loadingForm.value = true
    }
}

const setAccountLocal =  async() => {
    emitEvento('status-req', 'Registrando dados...')
    loadingForm.value = true
    try{

        const req = await axios.post('account/created', {...accountData.value})
        emitEvento('status-req', req.data.response.message)
        emitEvento('text-view', 'Seja bem vindo!')
        router.push({ name: 'Home'})
    }catch(err){
        console.log('errror -> ', err)
        emitEvento('text-view', err.response.data.message)
    }finally{
        console.log('OI')
    }

}

const registerPassword = async() => {
    emitEvento('status-req', 'Validando dados...')
    if(valid.value == true){
        const data = {
            email:inviteData.value.email,
            type:inviteData.value.data.type,
            password:password.value,
            password_confirm:password_confirm.value
        }
        emitEvento('status-req', 'Registrando...')
        store.commit('register/setUser', data)

        await setUser()

        await setAccountLocal(0)

    }else{
        form.value.validate()
        emitEvento('text-view', 'Erro, verifique os dados')
    }
}


</script>
<style>
</style>

