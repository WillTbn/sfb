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
                            <!--
                                <v-row>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    label="Legal first name*"
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    label="Legal middle name"
                                    hint="example of helper text only on focus"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    label="Legal last name*"
                                    hint="example of persistent helper text"
                                    persistent-hint
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                    label="Email*"
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                    label="Password*"
                                    type="password"
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                >
                                    <v-select
                                    :items="['0-17', '18-29', '30-54', '54+']"
                                    label="Age*"
                                    required
                                    ></v-select>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                >
                                    <v-autocomplete
                                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                    label="Interests"
                                    multiple
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        -->
                            <div class="select-type-user"  v-if="this.statusView == ''">
                                <select-type

                                    @data-emmit="this.UserData.type = $event"
                                    @status-one="this.statusView = $event"
                                ></select-type>
                            </div>
                            <div
                                v-if="this.statusView == 'datacontrol'"

                                class=""
                            >
                                <data-user
                                @status-one="this.statusView = $event"
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
export default {
    name:'DashControl',
    components:{
        SelectType, DataUser
    },
    data() {
        return{
            dialog:false,
            statusView: '',
            UserData:{
                type:''
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
