<template>
    <div class="mt-4">
        <label class="font-bold text-md mb-7" for="name"> Name </label>
        <input
            class="appearance-none border-2 border-orange-400 rounded-2xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-600"
            id="name"
            type="text"
            placeholder="Enter your name"
            v-model="dataStore.fieldsData.user.name"
        />
    </div>
</template>

<script setup>
import { useDataStore } from "../../stores";
const dataStore = useDataStore();
</script>
