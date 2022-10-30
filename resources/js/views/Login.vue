<template>
    <div>Login Page</div>
    <form method="post" action="" @submit.prevent="login">
        <br />
        <input
            type="email"
            name="email"
            v-model="formData.email"
            placeholder="enter email"
        /><br />
        <input
            type="password"
            name="password"
            v-model="formData.password"
            placeholder="enter password"
        /><br />
        <input type="submit" value="login" />
    </form>
</template>

<script setup>
import axios from "axios";
import router from "../../js/router";

const formData = {
    email: "",
    password: "",
};

const login = async () => {
    try {
        let resp = await axios.post("/api/login", formData, {
            headers: {
                "Content-type": "application/json",
            },
        });
        console.log(resp);
        if (resp.data.success) {
            localStorage.setItem("token", resp.data.data.token);
        }
        router.push("/");
    } catch (err) {
        console.log(err);
    }
};
</script>
