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
                    <v-card-title>
                        <span class="text-h5">Novo Usuário</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <div
                                class="select-type-user"
                                v-if="this.statusView == 'initial'"
                            >
                                <select-type
                                    @data-type="this.UserData.type = $event"
                                    @status-view="this.statusView = $event"
                                ></select-type>
                            </div>

                            <div
                                v-if="this.statusView == 'controlCondominia'"
                                class=""
                            >
                                <condominia-user
                                    @status-view="this.statusView = $event"
                                    @data-apartment="this.UserData.apartament_id = $event"
                                />

                            </div>

                            <div
                                v-if="this.statusView == 'datacontrol'"
                                class=""
                            >
                                <data-user
                                    @status-view="this.statusView = $event"
                                ></data-user>
                            </div>
                        </v-container>
                        <!-- <small>*indicates required field</small> -->
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
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
<script>
import SelectType from './SelectType.vue'
import DataUser from './DataUser.vue'
import CondominiaUser from './CondominiaUser.vue'
export default {
    name:'DashControl',
    components:{
        SelectType, DataUser,CondominiaUser
    },
    data() {
        return{
            dialog:false,
            statusView: 'initial',
            UserData:{
                type:'',
                apartament_id:''
            }
        }
    },
    methos:{
        selectOne(item){
            console.log('ITEM _>', item)
            this.UserData.type = item
        }
    }
}
</script>
