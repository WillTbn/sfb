<template>
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
                <div @click="toDecrease(1)" class="mx-auto">
                    <font-awesome-icon color="red" :icon="['fass', 'fa-minus']" />
                </div>
                <div >
                    <p> {{this.quantity}}</p>
                </div>
                <div @click="toAdd(1)" class="mx-auto">
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
                    <div  @click="toDecrease(6)" class="mx-auto">
                        <font-awesome-icon color="red" :icon="['fass', 'fa-minus']" />
                    </div>
                    <div >
                        <p> {{this.six}}</p>
                    </div>
                    <div  @click="toAdd(6)" class="mx-auto">
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
                    <div  @click="toDecrease(this.eleven)" class="mx-auto">
                        <font-awesome-icon color="red" :icon="['fass', 'fa-minus']" />
                    </div>
                    <div >
                        <p> {{this.eleven}}</p>
                    </div>
                    <div  @click="toAdd(this.eleven)" class="mx-auto">
                        <font-awesome-icon 
                            color="green" 
                            :icon="['fass', 'fa-plus']" 
                        />
                    </div>
                </v-card>
            </div>
            
        </div>
       
    </div>
</template>

<script>
export default {
    data(){
        return {
            contador:null, 
            six: 6,
            eleven:12,
            cart:true,
            quantity:0,
        }
    },
    methods: {
        start(){
            this.contador = 0
            this.cart = false
        },
        toAdd(quantity, value, name, id){
            console.log('aqui ->'+quantity)
            if(this.quantity == 0){
                this.quantity = this.contador+ quantity
            }
            this.quantity = this.quantity+quantity

            console.log('Valor ->', this.quantity, 'teste')
        },
        toDecrease(e){
            if(this.quantity >= 0){
                this.quantity = this.quantity-e
            }
            if(this.quantity <= 0){
                this.cart = true
                this.quantity = 0
            }
            console.log(this.quantity, this.cart)
            
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