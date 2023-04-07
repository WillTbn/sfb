<template>
    <div class="return controlsm-title">
        <a href="javascript:history.back()">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </a>
        <b class="h5 font-weight-bolder ml-2">voltar</b>
    </div>
</template>
<script>
export default {
    name:'Return',
    props:['name']
}
</script>
<style scoped>
.return{
    padding-top: 2rem;
    display: flex;
    flex-flow: nowrap;
}
@media (max-width: 991px){
    .controlsm-title{
        position: relative;
        margin-top: -2.2rem !important;
        z-index:1004 !important;
        margin-bottom: 2.1rem !important;
    }
}
</style>