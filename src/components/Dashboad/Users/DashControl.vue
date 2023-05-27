<template>
    <div class="dash-control">

        <v-row justify="center">
            <create-user></create-user>
        </v-row>
        <v-row class="d-flex justify-center align-items-center pa-7">
           <list-invite
            style="border:solid 1px #25e25e"
           ></list-invite>
        </v-row>
    </div>
</template>
<script setup>
// import LoadingInput from '@/components/shared/LoadingInput.vue';
import ListInvite from './ListInvite.vue';
import CreateUser from './CreateUser.vue';




</script>
<style>

</style>
