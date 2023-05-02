<template>
    <v-container fluid  class="users-crud mt-5">
        <dash-control/>
    </v-container>
</template>
<script>
import DashControl from '../../../components/Dashboad/Users/DashControl.vue';
export default{
    name:"UsersCentral",
    components:{
        DashControl
    }
}
</script>
