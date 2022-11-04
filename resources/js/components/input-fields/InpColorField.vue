<template>
    <p class="tracking-wide text-md font-bold mb-4" for="">Text</p>
    <div class="flex gap-x-3">
        <input
            class="rounded h-12 w-12 cursor-pointer border-orange-600 focus:border-orange-400"
            type="color"
            v-model="dataStore.fieldsData.style.color"
        />
        <input
            class="border-b-2 border-orange-600 py-0 px-2 text-black leading-tight focus:outline-none focus:border-orange-400"
            type="text"
            v-model="dataStore.fieldsData.style.color"
        />
    </div>
</template>

<script setup>
import { useDataStore } from "../../stores";
const dataStore = useDataStore();
</script>

<style></style>
