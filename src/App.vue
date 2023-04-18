<template>
    <v-app >
        <loading  v-if="this.view.loading" />
        <auth 
            v-if="!this.view.login && !this.user"
        />
        <contents v-else/>
    </v-app>
</template>

<script>

import authValidate from './config/mixins/authValidate'
import Loading from './components/shared/Loading.vue'
import Contents from './views/Contents.vue'
import Auth from './views/Auth.vue'
import { mapState } from 'vuex'

// import footer from './components/shared/footer.vue'
export default {
    name: 'App',
    data(){
        return{
            loadingPag: true
        }
    },
    components: {Loading,Contents,Auth},
    mixins:[authValidate]
}
</script>