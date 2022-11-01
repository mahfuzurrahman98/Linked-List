<template>
    <!-- <TopNav />
    <div class="grid grid-cols-3 gap-x-3 home-div">
        <div class="col-span-3 lg:col-span-2">
            <Editor />
        </div>
        <div class="hidden lg:block">
            <Output />
        </div>
    </div> -->

    {{ dataStore.user }}
</template>

<script setup>
import { onMounted } from "vue";
import { useDataStore } from "../stores";

const dataStore = useDataStore();

// const hasData = computed(() => {
//     return Object.keys(dataStore.fieldsData).length != 0;
// });

// const route = useRoute();
// const username = route.params.username;
// dataStore.shopId = route.params.shop_id;

// console.log("route param from home: ", dataStore.shopId);

onMounted(() => {
    // dataStore.getData();
});
</script>

<style scoped>
.home-div {
    background-color: #f8fafc;
}
</style>
