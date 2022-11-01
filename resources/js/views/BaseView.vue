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
import { useDataStore } from "../stores";
const dataStore = useDataStore();

const logout = async () => {
    try {
        let resp = await axios.post("/api/logout", {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        });
        console.log(resp);
        localStorage.removeItem("token");
        dataStore.user = {};
        dataStore.userAuthenticated = false;
        router.push("/login");
    } catch (err) {
        console.log(err);
    }
};
</script>
