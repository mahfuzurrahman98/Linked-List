<template>
    <div class="grid grid-cols-3 gap-x-3">
        <div class="col-span-3 lg:col-span-2">
            <Editor />
        </div>
        <div class="hidden lg:block">
            <Output />
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import Editor from "../components/Editor.vue";
import Output from "../components/Output.vue";
import { useDataStore } from "../stores";

const dataStore = useDataStore();

onBeforeMount(() => {
    dataStore.getData();
});
</script>
