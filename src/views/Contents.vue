<template>
    <v-container fluid 
        class="container-login">
        <user-data
            :terms="this.account.notifications"
            v-if="this.view.userconfig"
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
        <navbar
            v-if="this.view.login"
            :name="this.user.name"
            :avatar="this.user.account.avatar"
            :email="this.user.email"
        />
        <div class="overlay-bag" @click="toggleMenuBag" v-if="this.view.viewBag"></div>
        <transition mode="out-in"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
            <router-view/>
        </transition>
    </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Navbar from '@/components/shared/navbar.vue'
import BagCalculation from '@/components/Product/BagCalculation.vue'
import UserData from '@/components/Config/UserData.vue'
import Bag from '@/components/Product/Bag.vue'




export default {
    name:'Contents',
    computed:{
        ...mapState(['view', 'shopping', 'user']),
        ...mapGetters(['valorTotal', 'productTotal'])
    },
    components:{Navbar, BagCalculation, UserData,Bag},
    methods: {
       toggleMenuBag() {
            this.$store.commit('setViewBag', false)
        },
    }
}
</script>
<style>
.container-login{
    display: flex;
    height: 100%;
}
</style>