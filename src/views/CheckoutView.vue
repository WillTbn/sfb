<template>
    <div class="checkout">
        <return></return>
        <h1>This is page checkout</h1>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Return from '../components/shared/return.vue'
export default {
    name:'CheckoutView',
    computed:mapGetters(['view']),
    components:{
      Return
    },
    methods:{
    },
    created(){
       this.$store.commit('setViewBag', false)
    }
}
</script>