<template>
    <v-main class="d-flex align-center justify-center vrow-login ">
        <div class="login rounded-lg">
           
            <div class="control-input">
                <v-text-field
                    v-model="email"
                    label="E-mail"
                    :rules="[rules.emailRequired, rules.emailValidated]"
                    solo-inverted
                ></v-text-field>
                <v-text-field
                    :type="show1 ? 'text' : 'password'"
                    v-model="password"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    outlined
                    label="Senha"
                    
                    @click:append-inner="show1 = !show1"
                ></v-text-field>
                <v-btn @click="authLogin" color="red">
                    Entrar
                </v-btn>
            </div>
        </div>
    </v-main>
</template>
<script>
import axios from 'axios'
import { localId } from '@/config/global'
    export default {
        data () {
            return {
                show1: false,
                show2: true,
                show3: false,
                show4: false,
                password: '',
                email:'',
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
            authLogin(){
                const user = { 
                    email: this.email,
                    password : this.password
                }
                axios.post('/auth/login', user)
                .then(json=>{
                    this.$store.commit('setUser', json.data.response.user)
                    // context.commit('setToken', json.data.authorisation.token)
                    console.log(json)

                    localStorage.setItem(localId+'token', JSON.stringify(json.data.response.authorization.token))
                    this.$router.push({ name: 'Home'})
                }).catch(e=>console.log(e))

                // this.$store.dispatch('Auth', user)
                

            }
        }
    }
</script>
<style>

.control-input{
    width: 22rem;
}
.login{
    background-color: #f5eceba8;
    padding: 2rem 5rem 2rem 5rem;
}
</style>
