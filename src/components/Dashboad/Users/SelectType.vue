<template>
    <div class="user-select-type">
        <v-row class="text-center align-center">
            <v-col v-for="item in this.type" :key="item.id" class="ma-2 pa-5 align-center ">
                <v-sheet border rounded :height="200" :width="200"
                    class="elevation-8 hover-sel"
                    :class="{'border-select' : (this.select == item.id) }"
                    @click="setType(item.value, item.id)"
                >
                    <h2>
                        {{ item.name }}
                    </h2>
                    <small>{{item.description}}</small>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row class="justfy-end">
            <v-col>
                <v-btn @click="setView" icon="mdi-arrow-right" variant="text">
                    Continuar
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default{
    name:"SelectType",
    data(){
        return {
            value:'',
            select:'',
            view: '',
            type: [
                { id:0, name: 'Cliente',      value:'C', description: 'Nosso alvo, clientes terá que ser associado a um condominio e apartamento.'},
                { id:1, name: 'Estoquista',   value:'V', description: 'Terá alguns acessos relacionado a venda na nossa plataforma administradora.'},
                { id:2, name: 'Administrado', value:'M', description: 'Terá acesso total em nossa plataforma administradora.'},
            ]
        }
    },
    methods:{
        setType(item,id){
            console.log('Aqui esta o tipo selecionado -> ',item)
            this.select = id
            this.$emit('data-emmit',  this.select)
            console.log('Select', this.select)
        },
        setView(){
            if(this.select == 0){
                this.view = 'controlCondominia'
            }else{
                this.view = 'datacontrol'
            }

            this.$emit('status-one',  this.view)
        }
    }

}
</script>
<style>
.hover-sel:hover{
    border: #000 2px solid;
    cursor:pointer;
}
.border-select{
    border: #442 3px solid !important;
    background: #000;
}
</style>
