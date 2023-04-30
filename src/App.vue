<template>
    <v-app >
        <loading  v-if="this.loading" />
        <!-- <auth
            v-if="!this.loading  && !this.login && !this.user"
        /> -->
        <auth
            v-if="!this.loading && this.statusView == 'notAuth'"
        />
        <!-- Verificar se esta auth false || se ele um tipo cliente  -->
        <contents-client
            v-if="!this.loading && this.statusView == 'authClient'"
        />
        <contents-adm
            v-if="!this.loading && this.statusView == 'auth'"
        />
    </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import Auth from './views/Auth.vue'
import Loading from './components/shared/Loading.vue'

import ContentsAdm from './views/Dashboard/contentHome.vue'
import ContentsClient from './views/Clients/Contents.vue'
import authValidate from './config/mixins/authValidate'

// import footer from './components/shared/footer.vue'
export default {
    name: 'App',
    computed:{...mapGetters('user', ['statusView'])},
    data(){
        return{
            loadingPag: true
        }
    },
    components: {
        Auth,
        Loading,
        ContentsAdm,
        ContentsClient,
    },
    mixins:[authValidate],

}
</script>
