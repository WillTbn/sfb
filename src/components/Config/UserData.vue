<template>
    <v-row justify="center">
        <v-dialog
            v-model="this.userconfig"
            persistent
            max-width="600px"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
                Open Dialog
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Dados pessoais</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <avatar-user/>
                    <v-row class="d-flex justify-center">
                        <!--
                        <v-col cols="6">
                                 Aqui vai o avatar!!! 
                                </v-col>
                            </v-row>
                            <v-row>
                    -->
                    <v-col
                            cols="12"
                        >
                            <v-text-field
                                v-model="this.user.name"
                                label="Nome e sobrenome*"
                                required
                                :rules="nameRules"
                            ></v-text-field>
                        </v-col>
                        <!-- Alteraveis -->

                        <v-col
                            cols="6"
                            sm="6"
                            class="pa-4"
                        >
                            <label for="birthay" class="">Data de Nascimento*</label>
                            <input 
                                class="border rounded" 
                                type="date" 
                                name="birthday"
                                :value="this.account.birthday" 
                                id="birthday"
                                :rules="birthdayRules"
                            >
                        </v-col>
                        <v-col
                            class="d-flex"
                            cols="12"
                            sm="6"
                        >
                            <v-select
                                :items="genre"
                                label="sexo*"
                                dense
                                solo
                               
                                v-model="$filters.genreSelect(this.account.genre)[0]"
                            ></v-select>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="this.account.phone"
                                label="Celular ou Telefone secundario"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-checkbox
                            :value="$filters.notificationsSelect(this.account.notifications)[0]"
                            label="Aceitar receber notificações"
                            color="indigo darken-3"
                            v-model="checkbox"
                            hide-details
                        ></v-checkbox>
                    </v-row>
                    
                    <!-- DISABLED -->
                        <v-row>
                            <!-- <disable-form
                                :condominioName="this.account.condominia.name"
                                :apartmentNumber="this.account.apartment.number"
                                :apartmentBlock="this.account.apartment.block"
                                :userEmail="this.account.user.email"
                                :accountPerson="this.account.person"
                            ></disable-form> -->
                            <v-col cols="6" sm="12" md="6">
                                <v-text-field
                                    v-model="this.account.condominia.name"
                                    label="Condominio"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    v-model="this.account.apartment.number"
                                    label="Nº apartamento"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    v-model="this.account.apartment.block"
                                    label="Bloco"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="this.account.phone"
                                    label="Telefone principal"
                                    required
                                    disabled
                                    value="1111111111"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" sm="12" md="6">
                                <v-text-field
                                    v-model="this.user.email"
                                    label="Email"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6" sm="12" md="6">
                                <v-text-field
                                    v-model="this.account.person"
                                    label="CPF"
                                    disabled
                                ></v-text-field>
                            </v-col> 
                        </v-row>
                    <!-- DISABLED -->

                </v-container>
                <small>*Indica os campos obrigatórios</small>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="toggleMenuBag(false)"
                >
                    Close
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save()"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-row>
</template>
<script>

import { mapState } from 'vuex'
import AvatarUser from './AvatarUser.vue'
export default {
    name:'UserData',
    computed:{
        ...mapState('view',['userconfig']),
        ...mapState('user',['user', 'account'])
    },
    props: {
        terms: {type:String},
    },
    components:{
        AvatarUser, 
        // DisableForm
    },
    data(){
        return {
            // checkbox:this.account.notifications == "A" ? true : false,
            checkbox:this.terms == "A" ? true : false,
            genre:[
                "Feminino",
                "Masculino",
                "Outro",
                "Não Informa"
            ],
            // required's
            nameRules: [
                value => !!value || 'O nome é obrigatório',
                value => (value && value.length >= 4) || 'O nome deve ter no mínimo 4 caracteres',
                value => (value && value.length <= 100) || 'O nome dever ter no maximo 100 caracteres'
            ],
            birthdayRules:[
                value => this.verificarIdade(value) <= 18  || 'Idade tem que ser maior que 18 anos.'
            ]
        }
    },
    methods:{
         toggleMenuBag(status) {
            this.$store.dispatch('setUserConfig', status)
        },
        verificarIdade(data){
            let milisegundos = Date.now() - data.getTime();
            let anos = Math.floor(milisegundos / 31556952000)
            console.log('anos -> ',anos)
            return anos 
        },
        save(){
            const dataSend = {
                'name' : this.account.name
            }
            console.log('Data send', dataSend)
        }
    }
    
}
</script>