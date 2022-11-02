<template>
    <div>Login Page</div>
    <form method="post" action="" @submit.prevent="login">
        <br />
        <input
            type="email"
            name="email"
            v-model="credentials.email"
            placeholder="enter email"
        /><br />
        <input
            type="password"
            name="password"
            v-model="credentials.password"
            placeholder="enter password"
        /><br />
        <input type="submit" value="login" />
    </form>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";
import router from "../router";
import { useDataStore } from "../stores";

const credentials = reactive({
    email: "",
    password: "",
});

const dataStore = useDataStore();

const getUserData = async () => {
    try {
        let resp = await axios.get("/api/user");
        console.log(resp);
        if (resp.status == 200) {
            dataStore.userAuthenticated = true;
            localStorage.setItem("userAuthenticated", true);

            dataStore.user = resp.data;
            localStorage.setItem("user", JSON.stringify(resp.data));

            router.push({ name: "admin" });
        }
    } catch (err) {
        console.log(err);
    }
};

const login = async () => {
    try {
        let resp = await axios.post("/api/login", credentials, {
            headers: {
                "Content-type": "application/json",
            },
        });
        console.log(resp);
        if (resp.data.success) {
            dataStore.token = resp.data.data.token;
            localStorage.setItem("token", resp.data.data.token);

            axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorage.getItem("token");
            axios.defaults.headers.common["Accept"] = "application/json";
            // axios.defaults.headers.common["Content-type"] = "application/json";
            getUserData();
        }
    } catch (err) {
        if (err.response.status == 401) {
            alert(err.response.data.message);
        } else {
            alert("Internal server error");
        }
    }
};
</script>
