<template>
    <nav class="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
        <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
            <button class="navbar-toggler text-gray-500 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <font-awesome-icon icon="fa-solid fa-sliders" />
            </button>
            <div class="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
                <a class="flex items-center font-bold text-gray-900 hover:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0 mr-1" href="#">
                    Linked List
                </a>
                <!-- Left links -->
                <ul class="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
                    <li class="nav-item p-2">
                        <router-link class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" :to="{ name: 'home' }">Home
                        </router-link>
                    </li>
                    <li class="nav-item p-2">
                        <router-link v-if="dataStore.userAuthenticated" class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" :to="{ name: 'admin' }">Admin
                        </router-link>
                    </li>
                </ul>
                <!-- Left links -->
            </div>
            <!-- Collapsible wrapper -->
            <!-- Right elements -->
            <div class="flex items-center relative">
                <router-link class="text-white bg-orange-600 px-2 py-1 rounded shadow-lg mr-4" :to="{ name: 'login' }" v-if="!dataStore.userAuthenticated">
                    Login
                </router-link>
                <router-link class="text-white bg-orange-600 px-2 py-1 rounded shadow-lg mr-4" :to="{ name: 'register' }" v-if="!dataStore.userAuthenticated">
                    Register
                </router-link>
                <a class="text-white bg-orange-600 px-2 py-1 rounded shadow-lg mr-4 cursor-pointer" @click="logout" v-if="dataStore.userAuthenticated">
                    Logout
                </a>
            </div>
            <!-- Right elements -->
        </div>
    </nav>
</template>
<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { useDataStore } from "../stores";

const dataStore = useDataStore();
const router = useRouter();

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
