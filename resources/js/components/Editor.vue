<template>
    <div class="my-5 px-2 lg:px-48">
        <AdminNav />
        <div v-if="dataStore.fieldsData.selectedTab == 'profile'">
            <Profile />
        </div>
        <div v-else-if="dataStore.fieldsData.selectedTab == 'theme'">
            <Theme />
        </div>
        <div v-else-if="dataStore.fieldsData.selectedTab == 'links'">
            <Links />
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import router from "../router";
import { useDataStore } from "../stores";
import AdminNav from "./AdminNav.vue";
import Links from "./Links.vue";
import Profile from "./Profile.vue";
import Theme from "./Theme.vue";

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

<style scoped>
.active {
    font-weight: bold;
}
</style>
