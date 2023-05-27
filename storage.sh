#!/bin/bash
#Script para cria storage conforme a pasta module-example
#basta passa o nome que ele cuidara de copia  de lá para k
#Essencial esta na pasta raiz do projeto para executa o script
# author @WillTbn
atual=`date`
echo -n "Ola $whoami"
whoami

read -p "Digite o nome do store vuex que deseja cria: " a_input
echo "Você digitou ${a_input}"
text="cria simples"
#cd src/store && mkdir ${a_input} && cd ${a_input} && cp index.js && touch actions.js && touch getters.js && touch mutations.js && touch state.js
cd src/config/store && mkdir ${a_input} && cd .. && cd .. && cd .. && cp src/config/store/module-example/index.js src/config/store/${a_input}/index.js && cp src/config/store/module-example/actions.js src/config/store/${a_input}/actions.js && cp src/config/store/module-example/getters.js src/config/store/${a_input}/getters.js && cp src/config/store/module-example/mutations.js src/config/store/${a_input}/mutations.js && cp src/config/store/module-example/state.js src/config/store/${a_input}/state.js
