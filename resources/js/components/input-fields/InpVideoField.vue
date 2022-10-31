<template>
    <div>
        <div class="w-full">
            <input
                class="appearance-none border-2 border-black rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
                placeholder="Enter title"
                type="text"
                :propsId="propsId"
                v-model="dataStore.fieldsData.videos[propsId].title"
            />
        </div>
        <div class="mt-1 w-full">
            <input
                class="appearance-none border-2 border-black rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
                placeholder="Enter youtube video link"
                type="text"
                :propsId="propsId"
                v-model="dataStore.fieldsData.videos[propsId].value"
            />
        </div>
    </div>
</template>

<script setup>
import { useDataStore } from "../../stores";

const dataStore = useDataStore();
const props = defineProps(["fieldId", "propsId"]);
</script>

<style></style>
