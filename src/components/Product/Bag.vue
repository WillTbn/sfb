<template>
    <v-card
        class="mx-auto bag pt-5 mt-14"
        max-width="344"
        outlined
        max-height="200"
    >
        <v-list-item three-line>
            
                <div class="text-overline mb-4">
                {{name}}
                </div>
                <v-list-item-title class="text-h5 mb-1">
                 <v-avatar>
                    <img
                        :src="(this.image.includes('defatul')) ? this.urlImageDefault : this.urlImageStorage"
                        :alt="this.name"
                        size="56"
                        width="50"
                        height="100"
                    >
                </v-avatar>
                </v-list-item-title>
                <v-list-item-subtitle>Quantidade -  {{quantity}}</v-list-item-subtitle>
                <p>Valor  - R$ {{valueTotal.toFixed(2).toString().replace(".", ",")}}</p>
            

        </v-list-item>

        <v-card-actions>
            <v-btn
                outlined
                rounded
                text
            >
                Button
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {url, baseStorage} from '@/config/global'

export default {
    props: {
        name: String,
        id: Number,
        image: String,
        price: String,
        quantity: Number,
        valueTotal:{ type: Number}
    },
    data(){
        return {
             urlImageDefault: `${url}${this.image}`,
            urlImageStorage: `${baseStorage}${this.image}`,
        }
    },
    name:'Bag'
}
</script>