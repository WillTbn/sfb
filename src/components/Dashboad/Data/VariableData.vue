<template>
    <v-row class="variable-data justify-center">
        <div class=""
            v-for="item in this.cart" :key="item.id"
        >
            <cards-datas
                :name="item.name"
                :quantity="item.quantity"
                :icon="item.icon"
            />
        </div>
    </v-row>
</template>
<script>
import CardsDatas from './CardsDatas.vue'
export default{
    name:"VariableData",
    components:{
        CardsDatas
    },
    data(){
        return{
            cart: [
                { name: 'condominios', quantity: 2, icon: 'mdi-home-group' },
                { name: 'Usuários', quantity: 22, icon: 'mdi-account-group' },
                { name: 'produtos', quantity: 42, icon: 'mdi-cart-arrow-down' },
                { name: 'apartamentos', quantity: 114, icon: 'mdi-home-variant-outline' },
                { name: 'cupons', quantity: 3, icon: 'mdi-ticket-percent' },
                { name: 'vendas', quantity: 113, icon: 'mdi-printer-pos' },
            ],
        }
    }

}
</script>
