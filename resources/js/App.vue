<template>
    <BaseView />
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useDataStore } from "./stores";
import BaseView from "./views/BaseView.vue";

onBeforeMount(async () => {
    const dataStore = useDataStore();
    if (localStorage.getItem("token")) {
        dataStore.token = localStorage.getItem("token");
        dataStore.userAuthenticated = localStorage.getItem("userAuthenticated");
        dataStore.user = JSON.parse(localStorage.getItem("user"));
    } else {
        dataStore.token = "";
        dataStore.userAuthenticated = false;
        dataStore.user = {};
    }
});
</script>
