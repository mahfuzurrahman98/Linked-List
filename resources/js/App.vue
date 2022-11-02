<template>
    <BaseView />
</template>

<script setup>
// import { useRoute } from "vue-router";
import { onBeforeMount, onMounted } from "vue";
import { useDataStore } from "./stores";
import BaseView from "./views/BaseView.vue";
// const route = useRoute();
// console.log(route);

console.log("app created");
// onBeforeMount
onBeforeMount(async () => {
    console.log("app before mounted");
    if (localStorage.getItem("token")) {
        console.log("yes");
        const dataStore = useDataStore();
        dataStore.token = localStorage.getItem("token");
        dataStore.userAuthenticated = localStorage.getItem("userAuthenticated");
        dataStore.user = JSON.parse(localStorage.getItem("user"));
        console.log(dataStore.user);
    } else {
        console.log("no");
    }
});

onMounted(async () => {
    console.log("app mounted");
});
</script>
