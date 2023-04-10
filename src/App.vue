<template>
    <v-app >
        <user-data
            :terms="this.user.account.notifications"
        ></user-data>
        <div 
            class="container-app-bag" 
            v-if="this.view.viewBag" 
            :class="{'over' : (this.view.viewBag || this.view.viewConfig)}"
            >
            <font-awesome-icon 
                :icon="['fas', 'xmark']" @click="toggleMenuBag"
                class="bag-icon-xmark"
            />
            <div class="container-bag">
                <bag            
                    v-for="product in this.shopping.cart" :key="product.id"
                    :name="product.name"
                    :id="product.id"
                    :image="product.image"
                    :price="product.price"
                    :quantity="product.quantity"
                    :valueTotal="product.value"
                > </bag>
            </div>
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
import UserData from './components/Config/UserData.vue'
// import footer from './components/shared/footer.vue'
export default {
    name: 'App',
    computed:{
        ...mapState(['view', 'shopping', 'user']),
        ...mapGetters(['valorTotal', 'productTotal'])
    },
    components: {
       navbar,
       Bag,
       BagCalculation,
       UserData
       
    //    footer
    },
    data: () => ({

    }),
    methods: {
       toggleMenuBag() {
            this.$store.commit('setViewBag', false)
        },
    },
    created(){
        this.$store.dispatch('getDataAccount')
    }
}
</script>