<template>
    <v-row class="variable-data">
        <v-col cols="4" sm="12" md="4">
            <v-card
                class="mx-auto rounded-shaped"
                width="300"

                prepend-icon="mdi-home-group"
            >
                <template v-slot:title>
                    Condominios
                </template>

                <v-card-text>
                    estamo com 2 condominios cadastrados
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue">
                        ver todos
                    </v-btn>

                    <v-btn color="blue">
                        criar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="4" sm="12" md="4">
            <v-card
                class="mx-auto rounded-shaped"
                width="300"

                prepend-icon="mdi-account-group"
            >
                <template v-slot:title>
                    Usuários
                </template>

                <v-card-text>
                    estamos com 32 usuários cadastrados
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue">
                        ver todos
                    </v-btn>

                    <v-btn color="blue">
                        criar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="4" sm="12" md="4">
            <v-card
                class="mx-auto rounded-shaped"
                width="300+"

                prepend-icon="mdi-cart-arrow-down"
            >
                <template v-slot:title>
                    Produtos
                </template>

                <v-card-text>
                    Temos 20 produtos cadastrados
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue">
                        ver todos
                    </v-btn>

                    <v-btn color="blue">
                        criar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
 export default{
    name:"VariableData"
 }
</script>
