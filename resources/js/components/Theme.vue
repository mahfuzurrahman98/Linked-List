<template>
    <div class="flex flex-col gap-y-3 mt-3">
        <!-- text color -->
        <div class="bg-white shadow-2xl rounded-lg p-3">
            <component :is="dataStore.fieldsMap.color.inp" />
        </div>
        <!-- background color -->
        <div class="bg-white shadow-2xl rounded-lg p-3">
            <component :is="dataStore.fieldsMap.bgColor.inp" />
        </div>
        <!-- Font section -->
        <div class="bg-white shadow-2xl rounded-lg p-3">
            <component :is="dataStore.fieldsMap.font.inp" />
        </div>
    </div>
</template>

<script setup>
// import { ref } from "vue";
import { useDataStore } from "../stores";
const dataStore = useDataStore();

function fun() {
    console.log(dataStore.inputComponents);
}

const sendProps = (fieldId) => {
    return {
        fieldId: fieldId,
        propsId: dataStore.fields[fieldId].propsId,
    };
};
</script>
