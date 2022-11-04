<template>
    <div class="flex flex-col gap-y-3 mt-3">
        <div class="shadow-2xl bg-white rounded-lg p-4">
            <p class="font-bold">Profile Image</p>
            <component :is="dataStore.fieldsMap.logo.inp" />
        </div>
        <div class="shadow-2xl bg-white rounded-lg p-4">
            <component :is="dataStore.fieldsMap.name.inp" />
            <component :is="dataStore.fieldsMap.bio.inp" />
        </div>
    </div>
</template>

<script setup>
import { useDataStore } from "../stores";

const dataStore = useDataStore();
</script>
