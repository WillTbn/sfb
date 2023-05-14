<template>
    <div class="dash-control">
        <v-row justify="center">
            <v-dialog
                v-model="dialog"
                persistent
                width="1024"
            >
                <template v-slot:activator="{ props }">

                    <v-col cols="6">
                        <v-btn
                            v-bind="props"
                            append-icon="mdi-plus-thick"
                            variant="tonal"
                            elevation="4"
                            color="green"
                        >
                            Adicionar usuário
                        </v-btn>
                    </v-col>
                </template>
                <v-card>
                    <v-overlay
                        :model-value="loading"
                        class="align-center justify-center"
                        >
                        <v-progress-circular
                            color="red"
                            indeterminate
                            size="64"
                        ></v-progress-circular>
                    </v-overlay>
                    <v-card-title>
                        <span class="text-h5">Novo Usuário</span>
                    </v-card-title>
                        <v-card-text>
                            <v-container fluid

                            >
                                <div
                                    class="select-type-user"
                                    v-if="statusView == 'initial'"
                                >
                                    <select-type
                                        @status-view="statusView = $event.view, userData.type = $event.data"
                                    ></select-type>
                                </div>

                                <div
                                    v-if="statusView == 'controlCondominia'"
                                    class=""
                                >
                                    <condominia-user
                                        @status-view="statusView = $event.view, userData.apartament_id = $filters.removeCaracter($event.data)"
                                        @condominia-data="condominiaData = { ...$event}"

                                    />

                                </div>

                                <div
                                    v-if="statusView == 'datacontrol'"
                                    class=""
                                >
                                    <data-user
                                        :apartment_id=$filters.removeCaracter(userData.apartament_id)
                                        @status-view="statusView = $event"
                                        @data-account="userAccount = { ...$event}"
                                    ></data-user>
                                </div>

                                <div
                                    v-if="statusView == 'usardetails'"
                                    class=""
                                >
                                    <user-details
                                        :class="{'loading-opa' : loading}"
                                        :birthday="userAccount.birthday"
                                        :email="userAccount.email"
                                        :name="userAccount.name"
                                        :person="userAccount.person"
                                        :typeAccount="userData.type"
                                        :apartment="condominiaData.apartament"
                                        :condominia="condominiaData.condominio"
                                        :telephone="userAccount.telephone"
                                        :phone="userAccount.phone"
                                    ></user-details>
                                    <!-- <LoadingVue v-if="loading"/> -->
                                    <v-row class="justify-space-between pt-4" >
                                        <v-col cols="2">
                                            <v-btn
                                                :loading="loading"
                                                variant="tonal"
                                                @click="this.$emit('status-view',  {view:'datacontrol', data:''})"
                                                color="red"
                                            >
                                                Voltar
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-btn
                                                :loading="loading"
                                                variant="tonal"
                                                color="green"
                                                append-icon="mdi-send"
                                                @click="sentUser"
                                                :disabled="loading"
                                            >
                                                <template v-slot:append>
                                                    <v-icon></v-icon>
                                                </template>
                                                    Enviar Convite
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                                <div
                                    class="finally"
                                    v-if="statusView == 'finally'"
                                >
                                    <v-alert
                                    type="success"
                                    variant="outlined"
                                    >
                                        <h3>Sucesso</h3>
                                        <p>Usuário irá receber uma mensagem com o token de primeiro acesso, ele irá conferi as informações, alertio para presta atenção.</p>
                                    </v-alert>
                                </div>
                            </v-container>
                        </v-card-text>
                    <v-card-actions>

                    <v-spacer></v-spacer>

                    <v-btn
                        :loading="loading"
                        color="blue-darken-1"
                        variant="text"
                        @click="dialog = false"
                    >
                        Close
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script setup>
import SelectType from './SelectType.vue'
import DataUser from './DataUser.vue'
import CondominiaUser from './CondominiaUser.vue'
import UserDetails from './UserDetails.vue'
import axios from 'axios'
import { ref, inject } from 'vue'
// import LoadingVue from '@/components/shared/Loading.vue'

const dialog = ref(false)
let statusView = ref('initial')
const userData = ref({type:'', apartament_id:''})
const userAccount = ref()
const condominiaData = ref()

const error = ref()
const loading = ref(false)
const toast = inject('toast')

const sentUser = async()=>{
    loading.value = true
    const data = {
        name: userAccount.value.name,
        email: userAccount.value.email,
        data:{
            person: userAccount.value.person,
            genre: userAccount.value.genre,
            birthday: userAccount.value.birthday,
            type: userData.value.type,
            apartment_id: userData.value.apartament_id
        }
    }
    console.log('Data -> ', data)

    try{
        const req = await axios.post('invite/created', data)

        toast.show(req.data.message, {type: 'success'})
        statusView.value = 'finally'

    }
    catch(err){
        error.value = "Erro ao conversar com o servidor"
        toast.show(err.data.message, {type: 'error'})
    }
    finally{
        loading.value = false
    }
}


</script>
<style>
.loading-opa{
    opacity: 0.4;
}
</style>
