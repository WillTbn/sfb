<template>
    <div class="user-select-type">
        <h3>Selecione o tipo de usuário que você quer adicionar</h3>
        <v-container>
            <v-row justify="space-around">
                <v-col
                    v-for="item in type"
                    :key="item.id"
                    cols="12"
                    md="4"
                    class="hover-sel"
                    :class="{'border-select' : (select == item.value) }"
                    @click="setType(item.value)"
                >
                    <v-sheet
                        class="pa-7"
                        color="grey-lighten-3"
                    >

                        <h2>
                            {{ item.name }}
                        </h2>
                        <small>{{item.description}}</small>

                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>

        <v-row justify="end">
            <v-col cols="2" class="p-7">
                <v-btn
                    @click="this.$emit(
                        'status-view',
                        {
                            view: select == 'C' ? 'controlCondominia' : 'datacontrol',
                            data: select
                        }
                    )"
                    color="green"
                >
                    Continuar
                    <span icon="mdi-arrow-right"> </span>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script setup>
import { ref } from "vue";

let select = ref()

const type = [
    { id:0, name: 'Cliente',      value:'C', description: 'Nosso alvo, clientes terá que ser associado a um condominio e apartamento.'},
    { id:1, name: 'Estoquista',   value:'V', description: 'Terá alguns acessos relacionado as vendas na nossa plataforma administradora.'},
    { id:2, name: 'Administrado', value:'M', description: 'Terá acesso total em nossa plataforma administradora, cuidado ao cria esse acesso.'},
]

const setType = ( id)=>{
    select.value = id
    console.log('Select',select.value)
}
</script>

<style>
.hover-sel:hover{
    border: #000 1px solid;
    cursor:pointer;
}
.border-select{
    border: #442 1px solid !important;
    background: #442;
    cursor:pointer;
}
</style>
