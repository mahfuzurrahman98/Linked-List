<template>
    <router-view></router-view>
</template>

<script setup>
import axios from "axios";
import router from "../router";
import { useDataStore } from "../stores";

const dataStore = useDataStore();

const logout = async () => {
    try {
        let resp = await axios.post("/api/logout");
        console.log(resp);

        dataStore.token = "";
        dataStore.userAuthenticated = false;
        dataStore.user = {};

        localStorage.removeItem("token");
        localStorage.removeItem("userAuthenticated");
        localStorage.removeItem("user");

        router.push({ name: "login" });
    } catch (err) {
        console.log(err);
    }
};
</script>
