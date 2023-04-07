<template>
    <v-card
        class="mx-auto bag pt-5 mt-2 d-flex"
        max-width="366"
        max-height="100"
    >
        <div class="d-flex" height="100" >
            <div class="mx-auto">
                <img
                    :src="(this.image.includes('defatul')) ? this.urlImageDefault : this.urlImageStorage"
                    :alt="this.name"
                    width="40"
                    height="60"
                    class="drop-img mx-auto"
                >
            </div>

            <div class="pa-3 mx-auto bag-center" >
                <p class="font-name"> {{name}}</p>
                <div class="text-center-bag">
                    <p class="text-caption text--secondary">{{ $filters.moneyFilter(price)}} <b>unid. </b></p>
                    <p class="text-caption text--secondary">{{ $filters.moneyFilter(valueTotal)}}</p>
                </div>
                <v-card 
                    class="d-flex justify-space-between align-center"
                    height="20"
                    transition="slide-x-transition"
                >
                    <div @click="toDecrease(1, this.value)" class="mx-auto">
                        <font-awesome-icon color="red" :icon="['fass', 'fa-minus']" />
                    </div>
                    <div >
                        <p> {{this.quantity}}</p>
                    </div>
                    <div @click="toAdd(1, this.value, this.name, this.id)" class="mx-auto">
                        <font-awesome-icon color="green" :icon="['fass', 'fa-plus']"/>
                    </div>
                </v-card>
            </div>

            <v-card class="pa-2  ml-5 align-self-center">
                <font-awesome-icon color="red" class="mx-auto" :icon="['fass', 'fa-trash']"/>
            </v-card>
        </div>
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
        valueTotal:{ type: Number,}
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
<style>
.font-name{
    font-size: 0.7rem;
    font-weight: bolder;
}
.d-flex{
    justify-content: space-evenly;
    align-items: flex-end;
}
.bag-center{
   width: 10rem;
   white-space: nowrap;
}
.drop-img{
    filter:drop-shadow(0 0 10px #121212)
}

</style>