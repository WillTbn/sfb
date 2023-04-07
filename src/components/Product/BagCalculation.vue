<template>
    <div class="bag-calculation">
        <div class="d-flex">
            
                <p class="text-caption text--secondary">{{quantity}} produtos</p>
           
            
                <h3>R$ {{total}}</h3>
            
        </div>
        <div class="d-flex">
           
                <p class=" text-caption text--secondary">frete</p>
            
            
                <h3>R$ 0,00</h3>
                   
        </div>
        <v-divider
            inset
            color="dark"
        ></v-divider>

        <div class="d-flex">
                <p class="text-caption text--secondary"> <b> TOTAL A PAGAR </b></p>
            
                <h3>R$ {{total}}</h3>
            
        </div>
        <div class="d-flex text-center">
            <v-btn color="red" style="margin: 2rem;">
                <router-link  class="btn-checkout" to="/checkout">Finalizar compra</router-link>
            </v-btn>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        quantity:Number,
        total:String
    },
    name:'BagCalculation'
}
</script>
<style>
.btn-checkout{
    text-decoration: none;
    color: white;
    font-family: 'Roboto';
    font-size: small;
    
}

.bag-calculation{
    margin: 2rem;
}

</style>