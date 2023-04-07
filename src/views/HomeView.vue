<template>
    <main-product>
        <box  
            v-for="item in products.data"
            :key="item.id"

            :name="item.name"
            :id="item.id"
            :image="item.image_one"
            :description="item.description"
            :type="item.type"
            :value="item.value"
        />
    </main-product>
    
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HelloWorld from '../components/HelloWorld.vue';
import MainProduct from '../components/MainProduct.vue'
import Box from '../components/Product/Box.vue'
import {mapState,mapGetters} from 'vuex'
export default defineComponent({
    name: 'HomeView',
    computed:{
        ...mapState(['viewBag', 'products']),
        ...mapGetters(['EstadoCart'])
    },
    components: {
        HelloWorld,
        MainProduct,
        Box
    },
    created() {
        this.$store.dispatch('getProducts')
    },
});
</script>
