<template>
    <br />
    <br />
    <TopNav />
    <div class="grid grid-cols-3 gap-x-3 home-div">
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
import TopNav from "../components/TopNav.vue";
import { useDataStore } from "../stores";

const dataStore = useDataStore();

onBeforeMount(() => {
    dataStore.getData();
});
</script>

<style scoped>
.home-div {
    background-color: #f8fafc;
}
</style>
