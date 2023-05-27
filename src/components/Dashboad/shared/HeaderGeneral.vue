<template>
    <v-row class="pa-6">
        <v-col cols="12">
            <h3>{{props.page}}</h3>
        </v-col>
    </v-row>
</template>
<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
    page:{type:String, required:true}
})
</script>
