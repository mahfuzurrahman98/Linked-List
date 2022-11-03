<template>
    <!-- profile section -->
    <div class="bg-white shadow-lg rounded p-3 mt-3">
        <p class="font-bold">Profile</p>
        <component :is="dataStore.fieldsMap.logo.inp" />
        <component :is="dataStore.fieldsMap.name.inp" />
        <component :is="dataStore.fieldsMap.bio.inp" />
    </div>
</template>

<script setup>
import { useDataStore } from "../stores";

const dataStore = useDataStore();
</script>
