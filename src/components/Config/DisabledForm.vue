<template>
   
        <v-col cols="6" sm="12" md="6">
            <v-text-field
            @input="updateInputValue"
                :value="name"
                label="Condominio"
                disabled
            ></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-text-field
            @input="updateInputValue"
                :value="number"
                label="Nº apartamento"
                disabled
            ></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-text-field
            @input="updateInputValue"
                :value="block"
                label="Bloco"
                disabled
            ></v-text-field>
        </v-col>
        <v-col cols="6" sm="12" md="6">
            <v-text-field
            @input="updateInputValue"
                :value="email"
                label="Email"
                disabled
            ></v-text-field>
        </v-col>
        <v-col cols="6" sm="12" md="6">
            <v-text-field
            @input="updateInputValue"
                :value="person"
                label="CPF"
                disabled
            ></v-text-field>
        </v-col>
    
</template>
<script>
export default {
    name:'DisabledForm',
    props:{
        condominioName:{type:String, required: true},
        apartmentNumber:{type:Number, required:true},
        apartmentBlock:{type:String, required: true},
        userEmail:{type:String, required: true},
        accountPerson:{type:String, required: true},
    },
    data(){
        return {
            name:this.condominioName,
            number: this.apartmentNumber,
            block: this.apartmentBlock,
            email: this.userEmail,
            person:this.person
        }
    },
    methods: {
        updateInputValue(event) {
            this.name = event.target.value
            this.number = event.target.value
            this.block = event.target.value
            this.email = event.target.value
            this.person = event.target.value
        }
    }
}
</script>