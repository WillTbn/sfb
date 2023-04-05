<template>
    <v-app>
        <div class="container-bag" v-if="this.viewBag">
             <bag
                v-for="product in this.EstadoCart" :key="product.id"
                :name="product.name"
                :id="product.id"
                :image="product.image"
                :price="product.price"
                :quantity="product.quantity"
                :valueTotal="product.value"
            > </bag>
        </div>
        <div class="overlay-bag" @click="toggleMenuBag" v-if="this.viewBag"></div>
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
// import footer from './components/shared/footer.vue'

export default {
    name: 'App',
    computed:{
        ...mapState(['viewBag', 'shoppingCart']),
        ...mapGetters(['EstadoCart'])
    },
    components: {
       navbar,
       Bag
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
    background-color:blue;
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

