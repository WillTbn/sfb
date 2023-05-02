<template>
    <div class="data-user">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
        <v-row>
            <v-col cols="6" class="text-subtitle-2 font-weight-black mb-1">Nome Completo
                <v-text-field
                    v-model="this.data.name"
                    :rules="[rules.nameRequired, rules.min]"
                    color="success"
                    variant="solo"
                    :disabled="this.loadingForm"
                ></v-text-field>
            </v-col>
            <v-col cols="3" class="text-subtitle-2 font-weight-black mb-1">E-mail
                <v-text-field
                    v-model="this.data.email"

                    :rules="[rules.emailRequired, rules.emailValidated]"
                    color="success"
                    variant="solo"
                    :disabled="this.loadingForm"
                ></v-text-field>

            </v-col>
            <v-col cols="3" class="text-subtitle-2 font-weight-black mb-1">CPF
                <v-text-field
                    v-model="this.data.person"
                    :rules="[rules.required, rules.personValidated]"
                    color="success"
                    variant="solo"
                    :disabled="this.loadingForm"
                ></v-text-field>
            </v-col>
            <v-col cols="4" class="text-subtitle-2 font-weight-black mb-1">Data de nascimento
                <v-text-field
                    v-model="this.data.birthday"
                    :rules="[rules.required]"
                    color="success"
                    variant="solo"
                    :disabled="this.loadingForm"
                ></v-text-field>

            </v-col>
            <v-col cols="4" class="text-subtitle-2 font-weight-black mb-1">Sexo
                <v-combobox
                    v-model="this.data.genre"
                    :items="this.optionsGenre"
                    variant="solo"
                    :rules="[rules.required]"
                    :disabled="this.loadingForm"
                ></v-combobox>

            </v-col>
            <v-col cols="4" class="text-subtitle-2 font-weight-black mb-1">Notificações
                <v-combobox
                    v-model="this.data.notifications"
                    :items="['Aceito', 'Recusado']"
                    variant="solo"
                    :rules="[rules.required]"
                    :disabled="this.loadingForm"
                ></v-combobox>

            </v-col>
        </v-row>
            <v-row class="justify-space-between"  v-if="!this.loadingForm">
                <v-col cols="2">
                    <v-btn
                        @click="this.$emit('status-one',  '')"
                        color="red"
                        icon="mdi-send"
                        variant="text"
                    >
                        Voltar
                    </v-btn>
                </v-col>
                <v-col cols="2">

                    <v-btn
                        @click="sentNewUser"
                        color="green"

                        :disabled="this.loadingForm"
                        icon="mdi-send"
                        variant="text"
                    >
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
<script>

import LoadingInput from '@/components/shared/LoadingInput.vue'
export default{
    name:"DataUser",
    components:{LoadingInput},
    data() {
        return{
            valid: true,
            loadingForm:false,
            data:{
                name:'',
                email:'',
                person:'',
                genre:'',
                birthday:'',
                notifications:'',
                telephone:'',
                phone:'',
                apartment_id:''
            },
            optionsGenre:[
                'Masculino', 'Feminino', 'Outro', 'Não informa'
            ],
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                nameRequired:  v => !!v || 'Nome completo obrigatório.',
                emailMatch: () => (`The email and password you entered don't match`),
                emailRequired: v => !!v || 'E-mail is required',
                emailValidated: v => /.+@.+/.test(v) || 'E-mail must be valid',
                personValidated: v => v.length == 11 || 'Tem que conter 11 números',

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
        sentNewUser(){
            this.overlay()
            this.$refs.form.validate()
            if(this.valid ){
                // const user = {
                //     nome: this.name,
                //     email: this.email,
                //     password : this.password
                // }
                this.text = ''
                console.log('UserData ->', this.data)
                // axios.post('/auth/login', user)
                // .then(json=>{
                //     this.$store.commit('user/setUser', json.data.response.user)
                //     // context.commit('setToken', json.data.authorisation.token)
                //     console.log(json)

                //     localStorage.setItem(localId+'token', JSON.stringify(json.data.response.authorization.token))
                //     this.$router.push({ name: 'Home'})
                // })
                // .catch(e=>{
                //     console.log(e)
                //     this.text = e.response.data.message
                // })
            }else{
                this.$refs.form.validate()
                this.text = 'Campos devem ser devidamente preenchidos!'
            }

            // this.$store.dispatch('Auth', user)


        }
    }
}
</script>
