<template>
    <div class="bg-blue-400">Laravel9 and Vue3</div>

    <div class="flex justify-evenly">
        <router-link to="/">Home</router-link>
        <router-link v-if="!dataStore.userAuthenticated" to="/login"
            >Login</router-link
        >
        <router-link v-if="dataStore.userAuthenticated" to="/admin"
            >Admin</router-link
        >
        <router-link v-if="!dataStore.userAuthenticated" to="/register"
            >Register</router-link
        >
        <a v-if="dataStore.userAuthenticated" href="#" @click="logout"
            >logout</a
        >
    </div>

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
