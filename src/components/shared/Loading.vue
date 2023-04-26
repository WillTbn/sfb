<template>
    <div class="loading d-flex align-center justify-center">
        <div class="circle"> 
            <font-awesome-icon color="red" :icon="['fas', 'beer']" />
        </div>
        <div class="circle">
            <font-awesome-icon color="red" :icon="['fas', 'bag-shopping']" />
        </div>
        <div class="circle">
            <!-- faBottleWater faCartShopping-->
            <font-awesome-icon color="red" :icon="['fas', 'bottle-water']" />
        </div>
        <div class="circle">
            <font-awesome-icon color="red" :icon="['fas', 'cart-shopping']" />
        </div>
    </div>
</template>
<script>
export default {
    name:'Loading'
}
</script>
<style>
.loading {
    animation: spin988 2s linear infinite;
    
    overflow: hidden;
}
.loading .circle {
    --color: #333;
    --dim: 1.2rem;
    width: var(--dim);
    height: var(--dim);
    border-radius: 50%;
}
.loading{
    content: attr(data-text);
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #212121;
    border-bottom: 16px solid #212121;
    animation: lod 5s linear ;
    overflow: hidden;
}
/* 
.loading .circle:nth-child(1) {
    top: 0;
    left: 0;
}

.loading .circle:nth-child(2) {
    top: 0;
    right: 0;
}

.loading .circle:nth-child(3) {
    bottom: 0;
    left: 0;
}

.loading .circle:nth-child(4) {
  bottom: 0;
  right: 0;
} */
@keyframes rotGing {
    from {
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
@keyframes lod {
    0%{
        width: 0;
    }
    100%{
        width: 100%;
    }
}
@keyframes spin988 {
  0% {
    transform: scale(1);
  }

  20%, 25% {
    transform: scale(1.3);
  }

  45%, 50% {
    transform: scale(1);
  }

  70%, 75% {
    transform: scale(1.3);
  }

  95%, 100% {
    transform: scale(1);
  }
}
</style>