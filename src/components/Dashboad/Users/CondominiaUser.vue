<template>
    <div class="condominia-user">
        <v-row>
            <v-col>
                <v-combobox
                    v-model="data.condominia_id"
                    :items="selectCondominia"
                    variant="solo"
                    :rules="[rules.required]"

                ></v-combobox>
            </v-col>
        </v-row>

        <v-row v-if="data.condominia_id != ''">
            <v-col>
                <v-combobox
                    v-model="data.apartment_id"
                    :items="selectBlock"
                    item-value="id"
                    label="Selecione o Bloco"
                    variant="solo"
                    :rules="[rules.required]"

                ></v-combobox>
            </v-col>
        </v-row>

        <v-row class="justify-space-between" >
            <v-col cols="2">
                <v-btn
                    @click="this.$emit('status-view',  'initial')"
                    color="red"

                >
                    Voltar
                </v-btn>
            </v-col>
            <v-col cols="2">

                <v-btn

                    color="green"
                    variant="text"
                >
                    Continuar
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script setup>
import {ref, watch}from 'vue'

    const  rules = {
        required: value => !!value || 'Obrigatorio.',
    }

    const apartment = [
        {id:1, number:'185', block:'a1', condominia_id:1},
        {id:2, number:'205', block:'a1', condominia_id:1},
        {id:3, number:'322', block:'a1', condominia_id:1},
        {id:4, number:'419', block:'a1', condominia_id:1},
        {id:5, number:'565', block:'a1', condominia_id:1},
        {id:6, number:'101', block:'Home', condominia_id:2},
        {id:7, number:'102', block:'Hime', condominia_id:2},
        {id:8, number:'185', block:'a2', condominia_id:1},
    ]
    // REPLICA DA API
    const condominia = [
        {id:1, name:'Vivendas Teste'},
        {id:2, name:'Curicica Square'}
    ]
    const data = ref({
        condominia_id:'',
        apartment_id:'',
    })

    let selectCondominia = []

    let setBlock = []
    let setApart = []

    condominia.forEach(e=> selectCondominia.push(e.name))


    // this.apartment.filter(item => item.condominia_id === this.data.condominia_id)

    let selectApartments = ref([])
    let selectBlock = ref([])
    watch(data.value,(n, a)=>{
        console.log('n -> ', n)
        let condominioId = condominia.filter(item => item.name == n.condominia_id)
        let select = apartment.filter(item => item.condominia_id === condominioId[0].id)
        select.forEach(e=> setBlock.push(e.block))
        select.forEach(e=> setApart.push(e.number))
        console.log('select_>',select)

    })


</script>
<!-- <script>
export default {
    name:'CondominiaUser',
    data(){
        return{
            selectCondominia:[],
            data:{
                condominia_id:'',
                apartment_id:''
            },
            condominia: [
                {id:1, name:'Vivendas Teste'},
                {id:2, name:'Curicica Square'}
            ],
            apartment:[
                {id:1, number:'185', block:'a1', condominia_id:1},
                {id:2, number:'205', block:'a1', condominia_id:1},
                {id:3, number:'322', block:'a1', condominia_id:1},
                {id:4, number:'419', block:'a1', condominia_id:1},
                {id:5, number:'565', block:'a1', condominia_id:1},
                {id:6, number:'101', block:'Home', condominia_id:2},
                {id:7, number:'102', block:'Hime', condominia_id:2},
                {id:8, number:'185', block:'a2', condominia_id:1},
            ],
            rules: {
                required: value => !!value || 'Obrigatorio.',
            },
            loadingForm:false,
        }
    },
    methods:{
        setUser(){
            this.$emit('data-apartment',  this.data.apartment_id)
            this.$emit('status-one',  'datacontrol')
        },
        overlay(){

            this.loadingForm = true
            let self = this
            setTimeout(function(){
                self.loadingForm = false
            }, 4000)
        },
        getCodomonia(){
            for(var i =0; i< this.condominia.length; i++){
                this.selectCondominia.push(this.condominia[i].name)
            }
        }
    },
    created(){
        this.getCodomonia()
    }
}
</script> -->
