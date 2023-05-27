<template>
    <div class="list-produtos">
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
            v-else
            height="300px"
        >
            <thead>
                <tr>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Quantidade
                    </th>
                    <th class="text-left">
                        Valor unitario
                    </th>
                    <th class="text-left">
                        Ação
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in products"
                    :key="item.name"
                >
                    <td>{{ item.name }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.value }}</td>
                    <td>
                        <v-btn
                            icon="mdi-clipboard-edit-outline"
                            density="compact"
                            color="success"
                        >
                        </v-btn>
                    </td>
                    <td>
                        <v-btn
                            icon="mdi-trash-can"
                            density="compact"
                            color="red"
                        >
                        </v-btn>

                    </td>
                </tr>
            </tbody>
        </v-table>

    </div>
</template>
<script setup>

import {useFetch} from '@/config/composables/Product/fetch'

const {data:products, error:error, carregando:loading} = useFetch('/product')
</script>
