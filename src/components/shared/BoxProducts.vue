<template>
    <v-col 
        cols="auto"
        v-for="item in list"
        :key="item.id"
    >
        <v-hover v-slot="{ isHovering, props }">
            <v-card
                v-bind="props"
                :elevation="isHovering ? 24 : 6"
                height="100"
                width="100"
                class="d-flex justify-center align-center bg-secondary rounded"
            >
                <div>{{ item.title }} - {{item.id}}</div>
            </v-card>
        </v-hover>
    </v-col>
</template>