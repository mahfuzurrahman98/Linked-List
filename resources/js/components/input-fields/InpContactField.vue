<template>
    <div class="mt-3 w-full">
        <input
            class="border-b-2 w-full border-orange-600 py-0 px-2 text-black leading-tight focus:outline-none focus:border-orange-400"
            placeholder="Contact"
            type="text"
            v-model="dataStore.fieldsData.contacts[propsId].value"
        />
    </div>
</template>

<script setup>
import { useDataStore } from "../../stores";

const dataStore = useDataStore();
const props = defineProps(["fieldId", "propsId"]);
console.log(props);
</script>

<style></style>
