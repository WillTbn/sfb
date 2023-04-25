<template>
     <v-container fluid >

        <div class="d-flex justify-center align-center" style="height: 400px; " v-if="this.data == ''">
            <loading-product/>
        </div>
        <main-product v-else>
            <box  
                v-for="item in this.data"
                :key="item.id"

                :name="item.name"
                :id="item.id"
                :image="item.image_one"
                :description="item.description"
                :type="item.type"
                :value="item.value"
                />
            </main-product>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import {mapState} from 'vuex'
import MainProduct from '../components/MainProduct.vue'
import Box from '../components/Product/Box.vue'
import LoadingProduct from '../components/shared/LoadingProduct.vue'
export default defineComponent({
    name: 'HomeView',
    computed:{
        ...mapState('view',['viewBag']),
        ...mapState('products',['data', 'loading'])
    },
    components: {
        LoadingProduct,
        MainProduct,
        Box
    },
    data(){
        return{
            load : true,
        }
    },
    created() {
        this.$store.dispatch('products/getProducts')
    },
});
</script>
