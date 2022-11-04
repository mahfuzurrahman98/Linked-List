<template>
    <div class="mt-4">
        <label class="font-bold text-md mb-7" for="bio"> Bio </label>
        <textarea
            class="appearance-none border-2 border-orange-400 rounded-2xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-600"
            id="bio"
            type="text"
            placeholder="Enter your bio"
            v-model="dataStore.fieldsData.user.bio"
        ></textarea>
    </div>
</template>

<script setup>
import { useDataStore } from "../../stores";
const dataStore = useDataStore();
</script>

<style></style>
