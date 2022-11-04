<template>
    <div
        class="text-center px-3 mt-1 break-all"
        :style="{ color: dataStore.fieldsData.style.color }"
    >
        <div class="text-lg">{{ dataStore.fieldsData.user.name }}</div>
        <div class="text-sm font-bold">
            @{{ dataStore.fieldsData.user.username }}
        </div>
    </div>
</template>
<script setup>
import { useDataStore } from "../../stores";
const dataStore = useDataStore();
</script>
<style></style>
