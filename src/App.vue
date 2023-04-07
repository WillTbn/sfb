<template>
    <v-app :class="{'over' : this.view.viewBag}">
        <div class="container-bag" v-if="this.view.viewBag" :class="{'over' : this.view.viewBag}">
            <font-awesome-icon 
                :icon="['fas', 'xmark']" @click="toggleMenuBag" 
                style="right: 0;position: absolute; padding: 12px;"
            />
            <bag
            
                v-for="product in this.EstadoCart" :key="product.id"
                :name="product.name"
                :id="product.id"
                :image="product.image"
                :price="product.price"
                :quantity="product.quantity"
                :valueTotal="product.value"
            > </bag>
            <bag-calculation
                :total="valorTotal"
                :quantity="productTotal"
            ></bag-calculation>
        </div>
        <div class="overlay-bag" @click="toggleMenuBag" v-if="this.view.viewBag"></div>
        <navbar></navbar>
        <v-main>
            <router-view/>
        </v-main>
    
    </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import navbar from './components/shared/navbar.vue'
import Bag from './components/Product/Bag.vue'
import BagCalculation from './components/Product/BagCalculation.vue'
// import footer from './components/shared/footer.vue'
export default {
    name: 'App',
    computed:{
        ...mapState(['view', 'shoppingCart']),
        ...mapGetters(['EstadoCart', 'valorTotal', 'productTotal'])
    },
    components: {
       navbar,
       Bag,
       BagCalculation
    //    footer
    },
    data: () => ({

    }),
    methods: {
       toggleMenuBag() {
            this.$store.commit('setViewBag', false)
        },
    },
}
</script>
<style>
.container-bag{
    width: 500px;
    height: 100%;
    position:absolute;
    background-color:#E6E6EA;
    z-index: 2000;
}
.overlay-bag{
       opacity: 0.7;
    background-color: black;
    z-index: 1999;
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>

