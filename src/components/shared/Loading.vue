<template>
    <div class="loading mt-5 pt-5">
        <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
        ></v-progress-circular>
    </div>
</template>
<script>
export default {
    name:'Loading'
}
</script>
<style>
    .loading{
        display:flex;
        justify-content: center;
        align-items: center;
    }
</style>