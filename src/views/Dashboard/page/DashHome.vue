<template>
    <v-container fluid class="dash-home">
        <v-row>
            <v-col cols="12">
                <h3>Painel de controle</h3>
            </v-col>
        </v-row>
        <variable-data></variable-data>
        <v-row class="justify-center">
            <v-col cols="7" class="rounded mx-2">
                Vendas
                <move-login></move-login>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import MoveLogin from '../../../components/Dashboad/Charts/MoveLogin.vue';
import VariableData from '../../../components/Dashboad/VariableData.vue';
export default{
    name:"DashHome",
    components:{
        VariableData,
        MoveLogin
    }
}
</script>
