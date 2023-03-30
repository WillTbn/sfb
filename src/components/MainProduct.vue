<template>
    <v-container 
        fluid
    >
        <v-row>
            <slot/>
        </v-row>
    </v-container>
</template>

<script>

export default {
   
    data(){
        return {
            loading: false,
            selection: 1,
        }
    }
}
</script>