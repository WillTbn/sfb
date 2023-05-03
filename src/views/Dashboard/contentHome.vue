<template>
    <v-card v-if="this.auth">
        <v-layout>
            <v-navigation-drawer
                v-model="drawer"
                :rail="rail"
                permanent
                @click="rail = false"
            >
            <!-- prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" -->
                <v-list-item
                    :prepend-avatar="$filters.baseUrlPublic(this.account.avatar)"
                    :title="this.account.name"
                    nav
                >
                    <template v-slot:append>
                        <v-btn
                            variant="text"
                            icon="mdi-chevron-left"
                            @click.stop="rail = !rail"
                        ></v-btn>
                    </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <router-link :to="{path:'/Dashboard'}" >
                        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
                    </router-link>
                    <router-link :to="{path:'/Condominios'}" >
                        <v-list-item prepend-icon="mdi-home-city" title="Condominia" value="condominia"></v-list-item>
                    </router-link>
                    <router-link :to="{path:'/Usuarios'}" >
                        <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
                    </router-link>
                    <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
                    <v-list-item prepend-icon="mdi-logout" title="Sair" value="logout"  @click="putLogout"></v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main style="min-height: 100vh;">
                <router-view/>
            </v-main>
        </v-layout>
    </v-card>
    <div v-else class=""></div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState('user',['account', 'user', 'auth']),
    },
    data () {
        return {
            drawer: true,
            items: [
                { title: 'Home', icon: 'mdi-view-dashboard' },
                { title: 'My Account', icon: 'mdi-account' },
                { title: 'Users', icon: 'mdi-account-group-outline' },
            ],
            rail: true,
        }
    },
    methods:{
        putLogout(){
            this.$store.dispatch('user/logout')
            //console.log('Redirect -> ',this.$router.hasRoute())
        },
    }
}
</script>
<style>
.v-list>a{
    text-decoration: none;
    color: #000;
}
</style>
