<template>
    <div class="px-2 md:px-28">
        <div
            class="md:mx-16 grid grid-cols-3 text-center px-3 shadow-lg rounded-2xl my-5 py-2"
        >
            <div
                @click="dataStore.fieldsData.selectedTab = 'profile'"
                class="nav-item cursor-pointer"
                :class="
                    dataStore.fieldsData.selectedTab == 'profile'
                        ? 'border-b-4 border-b-orange-600 font-bold'
                        : ''
                "
            >
                <p class="text-black text-lg">Profile</p>
            </div>
            <div
                @click="dataStore.fieldsData.selectedTab = 'theme'"
                class="nav-item cursor-pointer"
                :class="
                    dataStore.fieldsData.selectedTab == 'theme'
                        ? 'border-b-4 border-b-orange-600 font-bold'
                        : ''
                "
            >
                <p class="text-black text-lg">Theme</p>
            </div>
            <div
                @click="dataStore.fieldsData.selectedTab = 'links'"
                class="nav-item cursor-pointer"
                :class="
                    dataStore.fieldsData.selectedTab == 'links'
                        ? 'border-b-4 border-b-orange-600 font-bold'
                        : ''
                "
            >
                <p class="text-black text-lg">Links</p>
            </div>
        </div>

        <div class="gap-y-7 py-3 px-5 lg:px-20 max-h-screen overflow-y-auto">
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
    </div>
</template>

<script setup>
import axios from "axios";
import router from "../router";
import { useDataStore } from "../stores";
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
