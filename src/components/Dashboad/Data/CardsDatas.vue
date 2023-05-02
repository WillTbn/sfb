<template>
    <v-col cols="4" sm="12" md="4" class="cards-data">
        <v-card
            class="mx-auto rounded-shaped"
            width="300"
            :prepend-icon="icon"
        >
            <template v-slot:title>
                {{$filters.firstName(name)}}
            </template>

            <v-card-text>
                estamos com {{ quantity }} {{ name }} cadastrados
            </v-card-text>
        </v-card>
    </v-col>
</template>
<script>
export default{
    name:"CardsData",
    props:{
        name: {type: String,  required: true },
        quantity: {type: Number, required: true },
        icon: { type: String, required: true}

    }
}
</script>
