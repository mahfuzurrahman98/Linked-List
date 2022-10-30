<template>
    <div>Register Page</div>
    <form method="post" action="" @submit.prevent="register">
        <br />
        <input
            type="text"
            name="name"
            v-model="formData.name"
            placeholder="enter name"
        /><br />
        <input
            type="text"
            name="username"
            v-model="formData.username"
            placeholder="enter username"
        /><br />
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
        <input type="submit" value="Register" />
    </form>
</template>

<script setup>
import { reactive } from "vue";

const formData = reactive({
    name: "",
    username: "",
    email: "",
    password: "",
});

const register = async () => {
    try {
        let resp = await axios.post("/api/register", formData, {
            headers: {
                "Content-type": "application/json",
            },
        });
        console.log(resp);
        if (resp.data.success) {
            alert(resp.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};
</script>
