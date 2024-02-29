<template>
    <div class="create-apartment">
        <span class="text-h5">Adionar apartamento ao condominio {{  props.condominia}}</span>

        <v-container>
            <v-row justify="space-around">
                <v-col
                    v-for="item in type"
                    :key="item.id"
                    cols="12"
                    md="4"
                    class="apartment-hover-sel"
                    :class="{'apartment-border-select' : (select == item.value) }"
                    @click="setType(item.value)"
                >
                    <v-sheet
                        class="pa-7"
                        color="blue-lighten-3"

                    >
                        <h2>
                            {{ item.name }}
                        </h2>
                        <small>{{item.description}}</small>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>


    </div>
</template>
<script setup>
import { ref } from "vue";

let select = ref()
// eslint-disable-next-line no-undef
const props = defineProps({
    condominia:{type:String}
})
const setType = ( id)=>{
    select.value = id
    console.log('Select',select.value)
}
const type = [
    {
        id:0,
        name: 'Somente um',
        value:'C',
        description: 'Aqui você vai adicionar a um bloco existe ou cria um bloco um apartamento.',
        help: 'Adicionar somente um apartamento',
        disabled: false
    },
    {
        id:1,
        name: 'Bloco inteiro',
        value:'V',
        description: 'Aqui você irá adicionar em um bloco existem ou não em um intervalo de apartamentos.',
        help:'Ex.: bloco a2, apartamentos de 101 a 110',
        disabled: false
    }
    ,
    // {
    //     id:2,
    //     name: 'Basta fazer upload de uma planilha',
    //     value:'M',
    //     description: 'Basta fazer upload de um arquivo no formado excel.',
    //     help: 'Em desenvolvimento',
    //     disabled: true
    // },
]
</script>
<style>
.apartment-hover-sel:hover{
    border: #000 1px solid;
    cursor:pointer;
}
.apartment-border-select{
    border: rgb(2, 251, 85) 0.5px solid !important;
    background: rgb(2, 251, 85);
    cursor:pointer;
}
</style>
