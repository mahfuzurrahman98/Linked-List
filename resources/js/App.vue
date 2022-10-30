<template>
    <div>Laravel9 and Vue3</div>
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
    <a href="#" @click="logout">logout</a>

    <router-view></router-view>
</template>

<script setup>
const logout = async () => {
    try {
        let resp = await axios.post("/api/logout", {
            Accept: "application/json",
        });
        console.log(resp);
        router.push("/login");
    } catch (err) {
        console.log(err);
    }
};
</script>
