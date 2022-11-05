<template>
    <NavBar />
    <div class="p-5">
        <h1 class="font-bold text-4xl">Welcome to Linked List</h1>
        <div class="mt-10">
            <p>Claim your linked list</p>
            <div class="flex items-center gap-x-1 mt-1 md:w-1/4">
                <p class="font-bold text-2xl">@</p>
                <input class="border-b-2 w-full border-orange-600 text-2xl py-3 px-1 text-gray-500 leading-tight focus:outline-none focus:border-orange-400" placeholder="username" type="text" v-model="userName" />
            </div>
            <button @click="proceed" class="mt-3 ml-6 text-white bg-orange-600 px-3 py-2 rounded-lg">Proceed</button>
        </div>
    </div>
</template>
<script setup>
import NavBar from "../components/NavBar.vue";
import { useRouter } from "vue-router";
import { useDataStore } from "../stores";
import {ref} from "vue";

const dataStore = useDataStore();
const router = useRouter();
let userName = ref("");

const proceed = () => {
  dataStore.refData.tempUserName = userName.value;
  router.push({name: 'register'});
}

</script>
