<template>
    <v-container fluid  class="users-crud mt-5">
        <header-general
            page="Usuários"

        />
        <dash-control/>
    </v-container>
</template>
<script>
import DashControl from '../../../components/Dashboad/Users/DashControl.vue';
import HeaderGeneral from '../../../components/Dashboad/shared/HeaderGeneral.vue'
export default{
    name:"UsersCentral",
    components:{
        DashControl,
        HeaderGeneral
    }
}
</script>
