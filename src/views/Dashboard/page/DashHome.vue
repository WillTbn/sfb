<template>
    <v-container fluid class="dash-home">
        <header-general
            page="Painel de Controle"
        />
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
import VariableData from '../../../components/Dashboad/Data/VariableData.vue';
import HeaderGeneral from '../../../components/Dashboad/shared/HeaderGeneral.vue'

export default{
    name:"DashHome",
    components:{
        VariableData,
        MoveLogin,
        HeaderGeneral
    }
}
</script>
