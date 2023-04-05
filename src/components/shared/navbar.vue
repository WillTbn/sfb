<template>
    <v-app-bar app color="grey-darken-4" dark>
        <v-toolbar-title @click="toggleMenuBag" >
            <font-awesome-icon :icon="['fas', 'bag-shopping']" />
            <v-badge
            color="green"
                :content="this.shoppingCart.length"
                bordered
            ></v-badge>
        </v-toolbar-title>
        <!--Logo-->
        <v-spacer >
                <img
                src="@/assets/logo-sfb.png"
                size="26"
                height="45"
            >
        </v-spacer>
        <!--Options-->
        <v-avatar v-on:click="toggleMenu" v-if="this.user.token">
            <img
                :src="this.user.avatar"
                :alt="this.user.name"
                size="56"
                width="30"
                height="30"
            >
        </v-avatar>
        <div class="no-auth" v-else > 
            <a >Login</a>
        </div>
        
        <!--Configurações do usuarios-->
        <v-menu 
            v-model="config" 
            left
            bottom
            class="control-config"
            transition="slide-x-reverse-transition"
            
        >
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" :to="item.href" link>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>
<script>
import Bag from '../Product/Bag.vue'
import { mapState } from 'vuex'

export default {
    computed:mapState(['user', 'shoppingCart']),
    components:{Bag},
    data() {
        return {
        items: [
            { title: 'Home', href: '/' },
            { title: 'About', href: '/about' },
        ],
            config: false,
            bag:false,
            group: null,
        }
    },
    methods: {
        toggleMenu() {
            this.config = !this.config
        },
        toggleMenuBag() {
            this.bag = true
            this.$store.commit('setViewBag', this.bag)
        }
    }
}
</script>
<style scoped>
.no-auth{
    padding: 10px;
    margin-right: 10px;
}
.control-config{
    right: 0px;
    top: 0px;
    bottom: 0px;
}

</style>
