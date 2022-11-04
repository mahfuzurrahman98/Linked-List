<template>
    <div
        :style="{ color: dataStore.fieldsData.style.color }"
        class="text-center break-words text-xs px-3 mt-1"
    >
        {{ dataStore.fieldsData.user.bio }}
    </div>
</template>
<script setup>
import { useDataStore } from "../../stores";
const dataStore = useDataStore();
</script>
<style></style>
