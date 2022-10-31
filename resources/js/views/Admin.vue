<template>
    <TopNav />
    <div v-if="hasData">
        <div class="grid grid-cols-3 gap-x-3 home-div">
            <div class="col-span-3 lg:col-span-2">
                <Editor />
            </div>
            <div class="hidden lg:block">
                <Output />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Editor from "../components/Editor.vue";
import Output from "../components/Output.vue";
import TopNav from "../components/TopNav.vue";
import { useDataStore } from "../stores";

const dataStore = useDataStore();

const hasData = computed(() => {
    return Object.keys(dataStore.fieldsData).length != 0;
});

const route = useRoute();
dataStore.shopId = route.params.shop_id;

console.log("route param from home: ", dataStore.shopId);

onMounted(() => {
    dataStore.getData();
});
</script>

<style scoped>
.home-div {
    background-color: #f8fafc;
}
</style>
