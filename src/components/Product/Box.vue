<template>
    <v-col 
        cols="12"
        sm="6"
        md="2"
    >
        <v-hover v-slot="{ isHovering, props }">
            <v-card
                v-bind="props"
                :elevation="isHovering ? 24 : 6"
                class="mx-auto my-12 rounded bg-grey-lighten-4"
                max-width="260"
                :class="{'select' : this.selectItem(this.id)}"
            >
            <v-img
                height="250"
                :src="(this.image.includes('default')) ? this.urlImageDefault : this.urlImageStorage"
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
                        {{$filters.moneyFilter(value)}}
                    </div>

                    
                </v-card-text>

                <v-divider class="mx-4"></v-divider>
                
                <div 
                class="contador 
                    text-center mx-auto pa-4
                    rounded secondary bordered-purple"
                
                >
                    <v-btn
                        class=" fab dark small"
                        color="red-darken-1"
                        v-if="this.cart && !this.selectItem(this.id)" @click="start"
                    > 
                        <font-awesome-icon :icon="['fass', 'cart-shopping']" />
                    </v-btn>
                    <v-btn 
                            v-if="this.cart && this.selectItem(this.id)"
                            class="small clip"
                            color="green-darken-3"
                            small
                            @click="start"
                            style="font-size:9px"

                        >
                        Você já adicinou {{ $filters.moneyFilter(this.cartValue)}}
                    </v-btn>
                        <font-awesome-icon 
                         v-if="this.cart && this.selectItem(this.id)"
                        class="icon-right" :icon="['fass', 'check']" 
                        />
                    <div class="suave" v-if="!this.cart">
                        <v-card 
                            class="d-flex justify-space-between mb-6 align-center"
                            height="35"
                            transition="slide-x-transition"
                        >
                            <div @click="toDecrease(1, this.value)" class="mx-auto">
                                <font-awesome-icon color="red" :icon="['fass', 'fa-minus']" />
                            </div>
                            <div >
                                <p> {{this.cartQuantity}}</p>
                            </div>
                            <div @click="toAdd(1, this.value, this.name, this.id)" class="mx-auto">
                                <font-awesome-icon color="green" :icon="['fass', 'fa-plus']"/>
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
                            color="green-darken-3"
                            small
                            @click="SentCartHome"
                            style="font-size:9px"
                            v-if="this.cartQuantity > 0"

                        >
                            Colocar carrinho {{$filters.moneyFilter(this.cartValue)}}
                        </v-btn>
                        <font-awesome-icon class="icon-right" :icon="['fass', 'cart-shopping']" />
                    </div>
                   
                
                </div>
            </v-card>
        </v-hover>
    </v-col>
</template>
<style>
.icon-right{
    color:#1B5E20;
    width: 10px;
    position: absolute;
    margin-left: -0.75rem;
    margin-top: 1.4rem;
}
.clip{
    clip-path: polygon(
        0rem 0,
        calc(100% + 2rem) 0,
        calc(65% + 2rem) 100%,
        -2rem 100%
    );
}
.suave{
    transition: width 2s;
}
.select{
    border:solid #1B5E20;
}
</style>
<script>
import Products from '../../config/mixins/Products'
export default {
    name:'Box',
    props: {
        name: { type:String, required:true},
        id: { type:Number, required:true},
        image: String,
        type: String,
        description: String,
        value: String,
        quantity:Number
    },
   mixins:[Products]
}
</script>