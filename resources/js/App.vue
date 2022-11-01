<template>
    <BaseView />
</template>

<script setup>
// import { useRoute } from "vue-router";
import axios from "axios";
import { onBeforeMount, onMounted } from "vue";
import { useDataStore } from "./stores";
import BaseView from "./views/BaseView.vue";
// const route = useRoute();
// console.log(route);

console.log("app created");
// onBeforeMount
onBeforeMount(async () => {
    console.log("app before mounted");
    if (localStorage.getItem("token")) {
        console.log("yes");
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("token");
        axios.defaults.headers.common["Accept"] = "application/json";

        try {
            let resp = await axios.get("/api/user", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
            });
            console.log(resp);
            if (resp.status == 200) {
                const dataStore = useDataStore();
                dataStore.user = resp.data;
                dataStore.userAuthenticated = true;
                console.log(dataStore.user);
                // router.push({ name: "home" });
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("no");
        delete axios.defaults.headers.common["Authorization"];
    }
});

onMounted(async () => {
    console.log("app mounted");
});
</script>
