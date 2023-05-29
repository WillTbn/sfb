#!/bin/bash
# Script para cria arquivo padrão de vue
echo "Olá $whoami"
whoami
conteudo='<template>
    <div class="">
    </div>
</template>
<script setup>
</script>
<style>
</style>
'
read -p "Digite nome da pasta dentro de components, que deseja colocar esse novo componente: " a_input
read -p "Agora o nome do componentes: " b_input

cd src/components/${a_input} && echo "$conteudo" > "$b_input".vue
