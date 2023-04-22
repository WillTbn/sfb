<template>
    <v-main class="d-flex align-center justify-center vrow-login pa-2 ">
        <v-alert
            class="alert-v"
            closable
            :text=this.text
            type="error"
            v-if="this.text != ''"
        ></v-alert>
        <v-row class="justify-center align-content-center" dense no-gutters>
            <v-col
                cols="12"
                lg="4"
                sm="12"
                class="rounded-lg d-flex align-center" 
                
                :class="{'opacity-form' : this.loadingForm}"
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
                        :disabled="this.loadingForm"
                    ></v-text-field>
                    <v-text-field
                        :type="show1 ? 'text' : 'password'"
                        v-model="password"
                        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        outlined
                        label="Senha"
                        :disabled="this.loadingForm"
                        variant="solo"
                        @click:append-inner="show1 = !show1"
                    ></v-text-field>
                    <v-btn 
                        @click="authLogin" 
                        color="red"
                        v-if="!this.loadingForm"
                        :disabled="this.loadingForm"
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
    </v-main>
</template>
<script>
import axios from 'axios'
import { localId } from '@/config/global'
import LoadingInput from '@/components/shared/LoadingInput.vue'
export default {
    components:{LoadingInput},
    data () {
        return {
            valid: true,
            show1: false,
            show2: true,
            show3: false,
            show4: false,
            password: '',
            email:'',
            msg:false,
            text:'',
            loadingForm:false,
            show:false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => (`The email and password you entered don't match`),
                emailRequired: v => !!v || 'E-mail is required',
                emailValidated: v => /.+@.+/.test(v) || 'E-mail must be valid',
            },
        }
    },
    methods:{
        overlay(){
            this.loadingForm = true
            let self = this
            setTimeout(function(){
                self.loadingForm = false
            }, 4000)
        },
        authLogin(){
            this.overlay()
            this.$refs.form.validate()
            if(this.valid ){
                const user = { 
                    email: this.email,
                    password : this.password
                }
                this.text = ''
                axios.post('/auth/login', user)
                .then(json=>{
                    this.$store.commit('setUser', json.data.response.user)
                    // context.commit('setToken', json.data.authorisation.token)
                    console.log(json)
                    
                    localStorage.setItem(localId+'token', JSON.stringify(json.data.response.authorization.token))
                    this.$router.push({ name: 'Home'})
                })
                .catch(e=>{
                    console.log(e)
                    this.text = e.response.data.message
                })
            }else{
                this.$refs.form.validate()
                this.text = 'Campo e-mail e senha devem ser devidamente preenchidos!'
            }

            // this.$store.dispatch('Auth', user)
            

        }
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
