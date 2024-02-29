<template>
    <div class="list-invite">
        <v-alert
            class="alert-v"
            closable
            :text=error.value
            type="error"
            v-if="error"
        ></v-alert>

        <loading-input
            v-if="loading"
        />
        <v-table
            v-if="invites && invites.length > 0"
            height="300px"
        >
            <thead>
                <tr>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Email
                    </th>
                    <th class="text-left">
                        Data envio
                    </th>
                    <th class="text-left">
                        Criado por:
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in invites"
                    :key="item.name"
                >
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.created_at }}</td>
                    <td>{{ item.create_email }}</td>
                    <td>
                        <v-btn
                            icon="mdi-email-multiple-outline"
                            density="compact"
                            color="info"
                            @click="resend(item.id)"
                        >
                        </v-btn>
                    </td>
                </tr>

            </tbody>
        </v-table>
        <div v-else>
           <p>Não há nenhuma convite pendente!</p>
        </div>
    </div>
</template>
<script setup>
import LoadingInput from '@/components/shared/LoadingInput.vue';
import { useFetch } from '@/config/composables/users/fetch';
import axios from 'axios';
import { ref } from 'vue';

const {data:invites, error:error, carregando:loading} = useFetch('/invite')

const text = ref('')

const resend = async(id) =>{
    loading.value = true
    try{
        const req = await axios.post('invite/resend/'+id)

        text.value = req.data.response.message
    }catch(err){
        text.value = 'Tem algum erro'
    }finally{
        loading.value = false
    }
}

</script>
<!-- {"status":"success",
"message":"Segue dados encontrados!",
"response":{
    "invite":[
    {"email":"clie@live.com","name":"Teste segundo invitation","create_email":"jlbnunes@live.com","create_avatar":"default-avatar.png"},
    {"email":"cliente@live.com","name":"Fulano da Silva Mattos","create_email":"jlbnunes@live.com","create_avatar":"default-avatar.png"}]}} -->
