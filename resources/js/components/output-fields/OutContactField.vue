<template>
    <div
        v-if="dataStore.fieldsData.contacts[propsId].value != ''"
        class="flex items-center justify-between p-3.5 mt-3 shadow bg-white border-2 border-gray-200 rounded-[20px] break-word"
    >
        <div class="">
            <font-awesome-icon class="" icon="fa-solid fa-phone" />
        </div>
        <div>
            <a
                :href="'tel:' + dataStore.fieldsData.contacts[propsId].value"
                target="blank"
            >
                {{ dataStore.fieldsData.contacts[propsId].value }}
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
