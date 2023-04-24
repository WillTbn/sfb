<template>
    <div class="home-view">
    <v-container style="height: 400px; " v-if="this.loading">
        <v-row
            class="fill-height"
            align-content="center"
            justify="center"
        >
            <v-col
            class="text-subtitle-1 text-center"
            cols="12"
            >
            Getting your files
            </v-col>
            <v-col cols="6">
            <v-progress-linear
                color="deep-purple accent-4"
                indeterminate
                rounded
                height="6"
            ></v-progress-linear>
            </v-col>
        </v-row>
    </v-container>
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
    </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import MainProduct from '../components/MainProduct.vue'
import Box from '../components/Product/Box.vue'
import {mapState} from 'vuex'
export default defineComponent({
    name: 'HomeView',
    computed:{
        ...mapState('view',['viewBag']),
        ...mapState('products',['data', 'loading'])
    },
    components: {
       
        MainProduct,
        Box
    },
    created() {
        this.$store.dispatch('products/getProducts')
    },
});
</script>
