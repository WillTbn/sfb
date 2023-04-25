<template>
    <div class="loader d-flex align-center justify-center">
        Pegando os produtos das prateleiras
    </div>
</template>
<script>
export default {
    name:'LoadingProduct'
}
</script>
<style>
.loader {
    animation: spin988 2s linear infinite;
   
    overflow: hidden;
}
.loader .circle {
    --color: #333;
    --dim: 2.2rem;
    --wim: 1.2rem;
    width: var(--wim);
    height: var(--dim);
    border-radius: 50%;
}
.loader::after{
    content: attr(data-text);
    color: #212121;
    animation: pontos 2s linear infinite;
    overflow: hidden;
}
@keyframes pontos {
    0% {
        content: '.';
    }

    50% {
        content: '..';
    }

    70%, 75% {
        content: '...';
    }

    95%, 100% {
        content: '....';
    }
}
@keyframes rotGing {
    from {
        transform: rotate(0deg);

    }
    to{
        transform: rotate(360deg);
       
    }
}
@keyframes spin988 {
    0% {
        /* transform: scale(1); */
        display: none;
    }

    20%, 25% {
        /* transform: scale(1.3); */
        display: block;
    }

    45%, 50% {
        /* transform: scale(1); */
        display: none;
    }

    70%, 75% {
        /* transform: scale(1.3); */
        display: block;
    }

    95%, 100% {
        /* transform: scale(1); */
        display: block;
        
    }
}
</style>