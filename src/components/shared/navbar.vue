<template>
    <v-app-bar app color="grey-darken-4" class="d-flex justify-space-between" dark>
        
        <div class="mx-auto">
            <v-badge
                class="pa-2 cursor-p"
                :content="productTotal"
                color="red"
                avatar
                bordered
                overlap
                bottom
                style="color:red"
                @click="toggleMenuBag"
            >
                <v-toolbar-title  >
                        <font-awesome-icon class="pa-2" :icon="['fas', 'bag-shopping']" />
                </v-toolbar-title>
            </v-badge>

        </div>
        <!--Logo-->
        <div class=" mx-auto">
            
            <v-spacer  class="mx-auto cursor-p">
                <img
                    src="@/assets/img/logo-sfb.png"
                    size="26"
                    height="45"
                >
            </v-spacer>
        </div>
        <!--Options-->
        <v-avatar 
            v-on:click="toggleMenuConfig" 
            v-if="this.user" 
            class="cursor-p mx-auto"
        >
            <font-awesome-icon :icon="['fas', 'bars']"  color="pink" class="fa-bars"/>
            <img
                :src="$filters.baseUrlPublic(this.avatar)"
                :alt="this.name"
                size="56"
                width="30"
                height="30"
            >
        </v-avatar>
        <div class="no-auth mx-auto" v-else > 
            <router-link to="/Login" class="auth-link">
                Login
            </router-link>
        </div>
        
        
        <!--Configurações do usuarios-->
        <v-menu 
            v-model="config" 
            left
            bottom
            class="control-config"
            transition="slide-x-reverse-transition"
            width="20rem"
        >
            <v-list>
                <div class="flex-row justify-center text-center">
                    <v-avatar class=" mx-auto">
                        <img
                            :src="$filters.baseUrlPublic(this.avatar)"
                            :alt="this.user.name"
                            width="30"
                            height="30"
                        >
                    </v-avatar>
                    <p> <b>{{this.name}}</b></p>
                    <p class="text-caption text--secondary">{{this.email}}</p>
                    <p class="config-click cursor-p"  @click="toggleDialog"> Altera dados </p>
                </div>
                <v-list-item v-for="item in items" :key="item.title" :to="item.href" link>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>
<script>
import { mapState,mapGetters } from 'vuex'

export default {
    name:'navbar',
    computed:{
        ...mapState('user',['user', 'account']),
        ...mapGetters('shopping', ['productTotal'])
    },
    props:{
        avatar:{type: String},
        email:{type: String},
        name:{type: String},

    },
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
        toggleMenuConfig() {
            this.config = !this.config
            this.$store.commit('view/setViewConfig', true)
        },
        toggleMenuBag() {
            this.bag = true
            this.$store.commit('view/setViewBag', this.bag)
        },
        toggleDialog(){
            this.$store.dispatch('view/setUserConfig', true)
        }
    }
}
</script>
<style scoped>
.no-auth{
    padding: 10px;
    margin-right: 10px;
}
.auth-link{
    cursor: pointer;
    text-decoration: none;
    color: #F44336;
    font-size: larger;
    font-weight: bolder;
}
.control-config{
    right: 0px;
    top: 0px;
    bottom: 0px;
}

.fa-bars{
        position: absolute;
    margin-right: 16px;
    margin-top: 1.2rem;
}
.config-click{
    color:#F44336;
    cursor: pointer;

}
</style>
