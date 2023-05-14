<template>
    <v-container class="user-details">
        <v-container class="d-flex justify-center">
            <h3> Confira os dados antes de enviar</h3>
        </v-container>
        <v-container class="box-data">
            <p class="text-box"><b> Dados pessoais</b></p>
            <v-row class="py-5 ma-2">
                <v-col cols="12" class="pa-2">
                    <p> <b> Nome:</b>{{ props.name }}</p>
                </v-col>
                <v-col cols="12" class="pa-2">
                    <p> <b>data de nascimento:</b>{{ props.birthday }}</p>
                </v-col>
                <v-col cols="12" class="pa-2">
                    <p> <b>CPF:</b>{{ props.person }}</p>
                </v-col>
                <v-col cols="12" class="pa-2">
                    <p> <b>E-mail:</b>{{ props.email }}</p>
                </v-col>
                <v-col cols="12" class="pa-2">
                    <p> <b>nº telephone:</b>{{  props.phone != '' ? props.phone : 'não informado' }}</p>
                </v-col>
                <v-col cols="12" class="pa-2">
                    <p> <b>nº celular:</b>{{ props.phone != '' ? props.phone : 'não informado' }}</p>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="box-data mt-6" v-if="props.typeAccount == 'C'">
            <p class="text-box"><b>Tipo de usuário {{ $filters.typeUser(props.typeAccount)}}</b></p>
            <v-row class="py-5 ma-2">
                <v-col cols="6" class="pa-2">
                    <p> <b> Apartamento:</b>{{ props.apartment }}</p>
                </v-col>
                <v-col cols="6" class="pa-2">
                    <p> <b>Condominio:</b>{{ props.condominia }}</p>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
<script setup>

// eslint-disable-next-line no-undef
const props = defineProps({
    apartment:{type:String },
    condominia:{type:String },
    birthday:{type:String, required:true },
    email:{type:String, required:true},
    name:{type:String, required:true},
    person:{type:String, required:true},
    telephone:{type:String},
    phone:{type:String},
    typeAccount:{type:String}
})
</script>
<style>
.box-data{
    border: solid 3px #eee;
}
.text-box{
    color: red;
    background: white;
    margin-top: -2rem;
    align-self: flex-start;
    display: table;
}
</style>
