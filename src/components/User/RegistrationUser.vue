<template>
    <div class="registration-user">
        <p class="text-h5">Olá {{ props.name  }}</p>
        <p class="text-subtitle-1"> falta pouco para esta usando os beneficios da nossa plataforma dentro do seu condominio <b>{{ condominia }}</b>.</p>
        <v-container class="steps">
            <v-row>
                <v-col
                    cols="4"
                    v-for="item in steps" :key="item.number"
                >
                    <span class="number"
                        :class="{
                            'active' : (current == item.number),
                            'active-green' : (current > item.number)
                        }"

                    >
                        {{ item.number }}

                    </span>

                    <div
                        v-if="item.number != steps.length"
                        class="steps-bar"
                        :class="{'active-bar-green' : (current > item.number)}"
                    ></div>
                </v-col>
            </v-row>
            <v-row></v-row>
        </v-container>
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

        <v-container v-if="current == 1">
            <v-row
                class="justify-center align-content-center" dense no-gutters
            >
                <!-- <v-col cols="12">
                    <h3 >
                        {{ etapaCom }}
                    </h3>
                </v-col> -->
                <v-col>
                    <v-card
                        class="mx-auto bg-secondary align-center"
                        width="auto"
                        prepend-icon="mdi-home"
                    >
                        <template v-slot:title>
                            {{ etapaCom }}
                        </template>

                        <v-card-text>
                            {{ data_apartament }}
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
                        @click="progresSteps(current)"
                        color="green"
                    >
                        avançar
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-if="current == 2">

            <v-card
                class="mx-auto bg-success align-center"
                width="auto"
                prepend-icon="mdi-account"
            >
                <template v-slot:title>
                    {{ etapaCom }}
                </template>

                <v-card-text>
                    <v-row class="d-flex justify-center">
                        <v-col>
                            <p class="ma-5">
                                <b>E-mail</b> <br/>
                                {{ email}}
                            </p>

                        </v-col>
                        <v-col>
                            <p class="ma-5">
                                <b>Data de nascimento</b> <br/>
                                {{ birthday }}
                            </p>

                        </v-col>
                        <v-col>
                            <p class="ma-5">
                                <b>CPF</b> <br/>
                                {{ person }}
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
                    <!-- <v-col cols="10">
                        <avatarUser
                            :avatar="'defatul-avatar.png'"
                        />
                    </v-col> -->
                    <v-col cols="4">
                        <v-text-field
                            v-model="newData.telephone"
                            :rules="[rules.telephoneMin, rules.required]"
                            label="Telefone"
                            variant="outlined"
                            :disabled="loadingForm"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            v-model="newData.phone"

                            :rules="[rules.phoneMin, rules.required]"
                            label="Celular"
                            required
                            variant="outlined"
                            :disabled="loadingForm"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                        <v-select
                            v-model="newData.genre"
                            :items="optionsGenre"
                            label="Sexo"
                            variant="outlined"
                            :disabled="loadingForm"
                        ></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-select
                            v-model="newData.notifications"
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

        </v-container>

        <v-container v-if="current == 3">
            {{ statusReq }}
            <v-row
                class="justify-center align-content-center" dense no-gutters
            >
                <h3>Crie uma senha </h3>
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
        </v-container>

        <div class="logo-sfb" style="background-position-y: bottom;"></div>
    </div>
</template>
<script setup>

import { localId } from '@/config/global'
import axios from 'axios'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
// const avatarUser = defineAsyncComponent(()=> import('@/components/Config/AvatarUser.vue'))
// eslint-disable-next-line no-undef
const props = defineProps({
    invitation_id:{type:Number},
    name:{type:String},
    email:{type:String},
    create_avatar:{type:String},
    apartment_id:{type:String},
    birthday:{type:String},
    person:{type:String},
    genre:{type:String},
    data_apartament:{type:String},
    condominia:{type:String},
    phone:{type:String},
    telephone:{type:String},
    notifications:{type:String},
    type:{type:String}
})
const steps = [
    { text:"Conferir dados relacionado ao seu apartamento.", number:1},
    { text:"Dados pessoais", number:2},
    { text:"Ultima etapa", number:3}
]
const valid = ref(true)
const show1 = ref(false)
const show2 = ref(false)
const password = ref('11111111')
const password_confirm = ref('11111111')
const current = ref(1)
const statusReq = ref('')
const router = useRouter()
const newData =ref({
    invitation_id:props.invitation_id,
    notifications:props.notifications,
    name: props.name,
    user_id:'',
    // telephone:props.telephone,
    // phone:props.phone,
    telephone:'11111111111',
    phone:'111111111111',
    genre:props.genre,
    birthday:props.birthday,
    person:props.person,
    apartment_id:props.apartment_id
})
const account = ref(null)
let etapaCom = computed({
    get: () => steps.filter(v => v.number === current.value)[0].text,
})
const backSteps = (e)=>{
    current.value = e-1
    if(current.value == 3){
        password.value = ''
        password_confirm.value = ''
    }

}
const progresSteps = (e) =>{
    current.value = e+1
}
const optionsGenre = [
    'Masculino', 'Feminino', 'Outro', 'Não informa'
]

let loadingForm = ref(false)
const rules = {
    required: value => !!value || 'Required.',
    min: v => v.length >= 8 || 'Min 8 characters',
    emailMatch: () => (`The email and password you entered don't match`),
    emailRequired: v => !!v || 'E-mail is required',
    emailValidated: v => /.+@.+/.test(v) || 'E-mail must be valid',
    passwordMatch: v => v == password.value  || 'Password confirme não esta igual o campo Password',
    telephoneMin: v => v.length == 11 || '11 digitos',
    phoneMin: v => v.length == 12 || '12 digitos',
}
let overlay = ()=>{
    loadingForm.value = true

    setTimeout(function(){
        loadingForm.value = false
    }, 4000)
}
// eslint-disable-next-line no-undef
const emitEvento = defineEmits(['text-view'])

const form = ref(null)

const validatePassword = () =>{
    if(password.value !== password_confirm.value){
        emitEvento('text-view', 'Erro, senha e confirma senha não batem!')

        return false
    }
    return true
}

const validateAccount = () =>{
    overlay()
    statusReq.value = 'Verificando dados'
    if(valid.value == true){

        account.value = {
            ...newData.value
        }
        console.log('ACCOUNT ->', account)
        progresSteps(current.value)
    }else{
        form.value.validate()
        emitEvento('text-view', 'Erro, verifique os dados')
        console.log('newData ->', newData.value)
    }
}
const formatData = (dateA) =>{
    let parDate = dateA.split('/')
    var day = parDate[0]
    var month = parDate[1]
    var year = parDate[2]

    var formatWorld = year+ '-'+ month+ '-'+day

    return formatWorld

}
const genreFilter = computed({
    get: () => newData.value.genre.charAt(0)
})
const notiFilter = computed({
    get: () => newData.value.notifications.charAt(0)
})
const bith = computed({
    get: () => {
        if(!newData.value.birthday.includes('-')){
            return formatData(newData.value.birthday.substring(0,2)+'/'+newData.value.birthday.substring(4,2)+'/'+newData.value.birthday.substring(4,8))
        }
        return newData.value.birthday
    }
})
const setUser =  async() => {
    newData.value.notifications = notiFilter.value
    newData.value.genre = genreFilter.value
    newData.value.birthday = bith.value
    const user = {

        email: props.email,
        password : password.value,
        password_confirm: password_confirm.value,
        type: props.type
    }
    statusReq.value = 'Registrando Usuário'
    try{
        const req = await axios.post('auth/register', {...user})

        newData.value.user_id =  req.data.response.user.id
        axios.defaults.headers.common['Authorization'] = `Bearer ${req.data.response.authorization.token}`
        localStorage.setItem(localId+'token', JSON.stringify(req.data.response.authorization.token))
        statusReq.value = 'Usuário setado'
    }catch(err){
        console.log('errror -> ', err)
        emitEvento('text-view', 'erro, catch')
    }finally{
        loadingForm.value = false
    }
}

const setAccountLocal =  async() => {
    statusReq.value = 'Registrando dados'

    try{

        const req = await axios.post('account/created', {...newData.value})

        statusReq.value = req.data.response.message
        router.push({ name: 'Home'})
        emitEvento('text-view', 'Seja bem vindo!')
    }catch(err){
        console.log('errror -> ', err)
        emitEvento('text-view', err.response.data.message)
    }finally{
        console.log('OI')
    }

}

const registerPassword = async()=>{
    overlay()

    statusReq.value = 'Validando dados...'
    console.log('data -> ',props.data)

    if(valid.value == true && validatePassword()){
        statusReq.value = 'Registrando...'


        await setUser();
        console.log('ESPERA ->', newData.value)
        if(newData.value.user_id){
            await setAccountLocal()
        }else{
            console.log('ERRROOOOO')
        }

    }else{
        console.log('this -> ',  form.value)
        form.value.validate()
        // this.$refs.form.validate()
        emitEvento('text-view', 'Erro, verifique os dados')
    }
}
</script>
<style>
.steps .v-col{
    padding: 2rem;
    display: -webkit-box;
}
.steps span{
    height: 4rem;
    width: 4rem;
    display: grid;
    border-radius: 50%;
    /* margin: 1.7rem; */
    border: solid 3px gray;
    opacity: 0.2;
    justify-content: space-around;
    align-items: center;
    justify-items: center;
}

.active{
    border: solid 3px green !important;
    opacity: 1 !important;
}
.active-green{
    border: solid 3px red !important;
    color: red;
    opacity: 0.7 !important;
}
.active-bar-green{
    background-color: red  !important;
    /* border: solid 3px green !important; */
    opacity: 1 !important;
}

.steps-bar{
    width: 100%;
    height: 10px;
    margin:auto;
    background-color: gray;
    opacity: 0.2;

}
</style>
