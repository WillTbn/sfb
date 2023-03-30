<template>
    <v-col cols="4">
        <v-hover v-slot="{ isHovering, props }">
            <v-card
                v-bind="props"
                :elevation="isHovering ? 24 : 6"
                class="mx-auto my-12 rounded bg-grey-lighten-4"
                max-width="260"
            >
            <v-img
                height="250"
                :src="this.image"
            ></v-img>
                <v-card-title>{{name}}</v-card-title>
                <v-card-text>
                    <v-row
                        align="center"
                        class="mx-0"
                    >
                        <div class="grey--text ms-4">
                        {{type}}
                        </div>
                    </v-row>
                    <div class="my-4 text-subtitle-1">
                        R$ {{value}}
                    </div>

                    <div>{{description}}</div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>
                
                <div 
                class="contador 
                    text-center mx-auto pa-4
                    rounded secondary bordered-purple"
                
                >
                    <v-btn
                    class=" fab dark small"
                    color="secondary"
                    v-if="this.cart" @click="start"
                    > 
                        <font-awesome-icon :icon="['fass', 'cart-shopping']" />
                    </v-btn>
                    <div class="" v-else>
                        <v-card 
                        class="d-flex justify-space-between mb-6 align-center"
                        height="35"
                        >
                            <div @click="toDecrease(1, this.value)" class="mx-auto">
                                <font-awesome-icon color="red" :icon="['fass', 'fa-minus']" />
                            </div>
                            <div >
                                <p> {{this.cartQuantity}}</p>
                            </div>
                            <div @click="toAdd(1, this.value, this.name, this.id)" class="mx-auto">
                                <font-awesome-icon 
                                    color="green" 
                                    :icon="['fass', 'fa-plus']" 
                                />
                            </div>
                        </v-card>
                        <div class="d-flex justify-space-between mb-2 align-center">
                            <v-card 
                                class="mr-2 d-flex justify-space-between align-center"
                                height="35"
                                width="115"
                            >
                                <div  @click="toDecrease(this.six, this.value)" class="mx-auto">
                                    <font-awesome-icon color="red" :icon="['fass', 'fa-minus']" />
                                </div>
                                <div >
                                    <p> {{this.six}}</p>
                                </div>
                                <div  @click="toAdd(this.six,this.value, this.name, this.id)" class="mx-auto">
                                    <font-awesome-icon 
                                        color="green" 
                                        :icon="['fass', 'fa-plus']" 
                                    />
                                </div>
                            </v-card>
                            <v-card 
                                class="d-flex justify-space-between align-center"
                                height="35"
                                width="115"
                            >
                                <div  @click="toDecrease(this.eleven, this.value)" class="mx-auto">
                                    <font-awesome-icon color="red" :icon="['fass', 'fa-minus']" />
                                </div>
                                <div >
                                    <p> {{this.eleven}}</p>
                                </div>
                                <div  @click="toAdd(this.eleven,this.value, this.name, this.id)" class="mx-auto">
                                    <font-awesome-icon 
                                        color="green" 
                                        :icon="['fass', 'fa-plus']" 
                                    />
                                </div>
                            </v-card>
                        </div>
                        <v-btn 
                            class="small clip"
                            color="primary"
                            small
                            @click="SentCartHome"
                            style="font-size:9px"

                        >
                        Envia para carrinho {{this.cartValue}}</v-btn>
                    </div>
                   
                
                </div>
            </v-card>
        </v-hover>
    </v-col>
</template>
<style>
.clip{
    clip-path: polygon(
        2rem 0,
        calc(100% + 2rem) 0,
        calc(100% + 2rem) 100%,
        -2rem 100%
    );
}
</style>
<script>
import AddCounter from './AddCounter.vue'
export default {
    components:{AddCounter},
    props: {
        name: { type:String, required:true},
        id: { type:Number, required:true},
        image: String,
        type: String,
        description: String,
        value: String,
    },
     data(){
        return {
            contador:0, 
            six: 6,
            eleven:12,
            cart:true,
            cartQuantity:0,
            cartValue:0,
            cartSent:{}
        }
    },
    methods: {
        start(){
            this.contador = 0
            this.cart = false
        },
        controlCart(quant, add, productValue){
            if(add){
                this.cartValue = parseFloat((quant*productValue).toFixed(2))
            }else{
                let toDecrease = productValue*quant
                
                this.cartValue =  parseFloat((this.cartValue-toDecrease).toFixed(2))
            }
        },
        toAdd(quantity, value){
            console.log('aqui ->'+quantity)
            if(this.cartQuantity == 0){
                this.cartQuantity = this.contador+ quantity
            }
            this.cartQuantity = this.cartQuantity+quantity
            
            this.cartValue =  value*this.cartQuantity
            this.controlCart(this.cartQuantity,true,value);
        },
        toDecrease(quantity, value){
            if(this.cartQuantity >= 0){
                this.controlCart(quantity,false,value);
                this.cartQuantity = this.cartQuantity-quantity
            }
            if(this.cartQuantity <= 0){
                this.cart = true
                this.cartQuantity = 0
                this.cartValue = 0
            }            
        },
        SentCartHome(){
            const cartHome = {
                'name': this.name,
                'price': this.value,
                'quantity':this.cartQuantity,
                'value':this.cartValue
            }

            this.cartSent = cartHome
        },
        addSix(){
            this.contador+this.six
        },
        addEleven(){
            this.contador+this.eleven
        },
    }
}
</script>