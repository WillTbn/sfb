<template>
    <v-container fluid 
        class="container-login"
    >
        <user-data
            :terms="this.account.notifications"
            v-if="this.userconfig"
        ></user-data>
        <div 
            class="container-app-bag" 
            v-if="this.viewBag" 
            :class="{'over' : (this.viewBag || this.viewConfig)}"
        >
            <font-awesome-icon 
                :icon="['fas', 'xmark']" @click="toggleMenuBag"
                class="bag-icon-xmark"
            />
            <div class="container-bag">
                <bag            
                    v-for="product in this.cart" :key="product.id"
                    :name="product.name"
                    :id="product.id"
                    :image="product.image"
                    :price="product.price"
                    :quantity="product.quantity"
                    :valueTotal="product.value"
                > </bag>
            </div>
            <bag-calculation
                :total="this.valorTotal"
                :quantity="this.productTotal"
            ></bag-calculation>
        </div>
        <navbar
            v-if="this.login"
            :name="this.user.name"
            :avatar="this.account.avatar"
            :email="this.user.email"
        />
        <div class="overlay-bag" @click="toggleMenuBag" v-if="this.viewBag"></div>
        
        <router-view/>
        
    </v-container>
</template>
<script>
import { defineComponent } from 'vue';

import { mapState, mapGetters } from 'vuex'
import Navbar from '@/components/shared/navbar.vue'
import BagCalculation from '@/components/Product/BagCalculation.vue'
import UserData from '@/components/Config/UserData.vue'
import Bag from '@/components/Product/Bag.vue'


export default defineComponent({
    name:'Contents',
    computed:{
        ...mapState('view',['userconfig', 'viewBag', 'login', 'viewConfig']),
        ...mapState('user',['account', 'user']),
        ...mapState('shopping',['cart']),
        ...mapGetters('shopping', ['valorTotal', 'productTotal'])
    },
    components:{Navbar, BagCalculation, UserData,Bag},
    methods: {
       toggleMenuBag() {
            this.$store.commit('view/setViewBag', false)
        },
    },
    mounted() {
        console.log('SETUP -> ', this.cart.value)
    }
})
</script>
<style>
.container-login{
    display: flex;
    height: 100%;
}
</style>