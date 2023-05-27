<template>
    <v-main class="d-flex align-center justify-center pa-2 "
        :class="{'vrow-login' :  !props.token}"
    >
        <v-alert
            class="alert-v"
            closable
            :text=text
            type="error"
            v-if="text != ''"
        ></v-alert>
        <v-container class=""
            v-if="!props.token"
        >
            <v-row
                class="justify-center align-content-center" dense no-gutters
            >
                <v-col
                    cols="12"
                    lg="4"
                    sm="12"
                    class="rounded-lg d-flex align-center"

                    :class="{'opacity-form' : loadingForm}"
                >
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        class="control-input"
                    >

                        <v-text-field
                            v-model="email"
                            label="E-mail"
                            :rules="[rules.emailRequired, rules.emailValidated]"
                            color="success"
                            variant="solo"
                            :disabled="loadingForm"
                        ></v-text-field>
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
                        <v-btn
                            @click="authLogin"
                            color="red"
                            v-if="!loadingForm"
                            :disabled="loadingForm"
                        >
                            Entrar
                        </v-btn>
                        <div v-else class="control-input" >
                            <loading-input></loading-input>
                        </div>

                    </v-form>

                </v-col>
                <v-divider
                    :thickness="2"
                    class="border-opacity-100"
                    color="#212121"
                    vertical
                ></v-divider>
                <v-divider
                    :thickness="2"
                    class="border-opacity-100 d-lg-none mx-6 my-6"
                    color="#212121"
                    horizontal inset
                ></v-divider>
                <v-col cols="12" lg="6" sm="12" class="logo-sfb"></v-col>
            </v-row>
        </v-container>
        <registration-user
            v-if="status && !loading"
            :invitation_id="invite.id"
            :name="invite.name"
            :email="invite.email"
            :create_avatar="invite.create_avatar"
            :apartment_id="dataAuxiliary.apartment_id"
            :birthday="dataAuxiliary.birthday"
            :person="dataAuxiliary.person"
            :genre="dataAuxiliary.genre"
            :data_apartament="dataAuxiliary.data_apartament"
            :condominia="dataAuxiliary.condominia"
            :phone="dataAuxiliary.phone"
            :telephone="dataAuxiliary.telephone"
            :notifications="dataAuxiliary.notifications"
            :type="dataAuxiliary.type"
            @text-view="text = $event"
        >
        </registration-user>
        <loading-input v-if="loading"/>
    </v-main>
</template>
<script setup>
import axios from 'axios'
import { localId } from '@/config/global'
import { ref, defineAsyncComponent, onBeforeMount} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const LoadingInput = defineAsyncComponent(() => import('@/components/shared/LoadingInput.vue'))
const RegistrationUser = defineAsyncComponent(() => import('@/components/User/RegistrationUser.vue'))

// eslint-disable-next-line no-undef
const props = defineProps({
    token:{type: String},
    id:{type:String}
})
const valid = ref(true)
const show1 = ref(false)
const password = ref('')
const email = ref('')
const invite = ref('')
const text = ref('')
const loading = ref(true)
const status = ref(false)
const dataAuxiliary = ref()
const store = useStore()
const router = useRouter()
const redirectToPage = () =>{
    setTimeout(function() {
        let origin = window.location.origin
        window.location.replace(origin)
    }, 2000);
}

const getInvite = async() =>{
    try{
        const req = await axios.get(`/invite/${props.token}`)
        console.log(req)
        invite.value = req.data.response.invite
        dataAuxiliary.value = JSON.parse(invite.value.data)
        status.value = true
    }catch(error){
        text.value = error.response.data.message

        // useRouter().push({name: 'Login'})
        redirectToPage()
    }finally{
        loading.value = false
    }
}


onBeforeMount(async()=>{
    if(props.token){
        console.log('ESTOU AQUI ')
        await getInvite()
    }
    loading.value = false
})
const form = ref(null)

let loadingForm = ref(false)
const rules = {
    required: value => !!value || 'Required.',
    min: v => v.length >= 8 || 'Min 8 characters',
    emailMatch: () => (`The email and password you entered don't match`),
    emailRequired: v => !!v || 'E-mail is required',
    emailValidated: v => /.+@.+/.test(v) || 'E-mail must be valid',
}

let overlay = ()=>{
    loadingForm.value = true

    setTimeout(function(){
        loadingForm.value = false
    }, 4000)
}

const authLogin = async()=>{
    overlay()
    if(valid.value == true){
        const user = {
            email: email.value,
            password : password.value
        }
        axios.post('auth/login', user).then(json=>{
            store.commit('user/setUser', json.data.response.user)
            // this.$store.commit('user/setUser', json.data.response.user)
            console.log(json)

            localStorage.setItem(localId+'token', JSON.stringify(json.data.response.authorization.token))
            router.push({ name: 'Home'})
            // this.$router.push({ name: 'Home'})
        })
        .catch(e=>{
            console.log(e)
            text.value = e.response.data.message
        })
    }else{
        form.value.validate()
        text.value = 'Campo e-mail e senha devem ser devidamente preenchidos!'
    }
}
</script>
<style>

.control-input{
    width: 22rem;
    z-index: 9999;
}
.login{
    /* background-color: #f5eceba8; */
    padding: 3rem 5rem 3rem 5rem;margin-left: 5rem;
}
.alert-v{
    position:absolute !important;
    top: 2rem;
    left: 2rem;
}
.error-border{
    border: 2px solid #212121;
}

</style>
