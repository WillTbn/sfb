<template>
    <div class="registration-user">
        <p class="text-h5">Olá {{ inviteData.name  }}</p>
        <p class="text-subtitle-1">
            falta pouco para esta usando os beneficios da nossa plataforma dentro do seu condominio <b>{{ inviteData.data.condominia }}</b>.
        </p>
        <v-container class="steps">
            <v-row>
                <v-col
                    cols="4"
                    v-for="item in steps" :key="item.number"
                >
                    <span class="number"
                        :class="{
                            'active' : (current == item.number),
                            'active-green' : (current > item.number)
                        }"

                    >
                        {{ item.number }}

                    </span>

                    <div
                        v-if="item.number != steps.length"
                        class="steps-bar"
                        :class="{'active-bar-green' : (current > item.number)}"
                    ></div>
                </v-col>
            </v-row>
            <v-row></v-row>
        </v-container>
        <v-container v-if="current == 1">
            <apartment-data
                :etapa="etapaCom"
                :data_apartment="inviteData.data.data_apartament"
                :current_local="current"
                @current-data="current = $event"
            ></apartment-data>
        </v-container>
        <v-container v-if="current == 2">
            <personal-data
                :etapa="etapaCom"
                :current_local="current"
                @current-data="current = $event"
                @status-req="statusReq = $event"
            />
        </v-container>

        <v-container v-if="current == 3">
            <user-data
                :etapa="etapaCom"
                :current_local="current"
                @current-data="current = $event"
                @status-req="statusReq = $event"
            />
        </v-container>

        <div class="logo-sfb" style="background-position-y: bottom;"></div>
    </div>
</template>
<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { useStore } from 'vuex'
const ApartmentData = defineAsyncComponent(()=> import('@/components/User/ApartmentData.vue'))
const personalData = defineAsyncComponent(()=> import('@/components/User/PersonalData.vue'))
const userData = defineAsyncComponent(()=> import('@/components/User/UserData.vue'))

const steps = [
    { text:"Conferir dados relacionado ao seu apartamento.", number:1},
    { text:"Dados pessoais", number:2},
    { text:"Crie senha", number:3}
]

const current = ref(1)
const statusReq = ref('')
const store = useStore()

const inviteData = computed(()=> store.state.register.invite)

let etapaCom = computed({
    get: () => steps.filter(v => v.number === current.value)[0].text,
})


</script>
<style>
.steps .v-col{
    padding: 2rem;
    display: -webkit-box;
}
.steps span{
    height: 4rem;
    width: 4rem;
    display: grid;
    border-radius: 50%;
    /* margin: 1.7rem; */
    border: solid 3px gray;
    opacity: 0.2;
    justify-content: space-around;
    align-items: center;
    justify-items: center;
}

.active{
    border: solid 3px green !important;
    opacity: 1 !important;
}
.active-green{
    border: solid 3px red !important;
    color: red;
    opacity: 0.7 !important;
}
.active-bar-green{
    background-color: red  !important;
    /* border: solid 3px green !important; */
    opacity: 1 !important;
}

.steps-bar{
    width: 100%;
    height: 10px;
    margin:auto;
    background-color: gray;
    opacity: 0.2;

}
</style>
