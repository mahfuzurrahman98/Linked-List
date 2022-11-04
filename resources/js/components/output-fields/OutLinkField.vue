<template>
    <div
        v-if="dataStore.fieldsData.links[propsId].value != ''"
        class="flex items-center justify-between text-center p-3.5 mt-3 shadow bg-white border-2 border-gray-200 rounded-[20px] break-word"
    >
        <div class="">
            <font-awesome-icon class="" icon="fa-solid fa-globe" />
        </div>
        <div>
            <a
                :href="'mailto:' + dataStore.fieldsData.links[propsId].value"
                target="blank"
            >
                {{ dataStore.fieldsData.links[propsId].title }}
            </a>
        </div>
        <div></div>
    </div>
</template>

<script setup>
import { useDataStore } from "../../stores";

const dataStore = useDataStore();
const props = defineProps(["fieldId", "propsId"]);
</script>

<style></style>
