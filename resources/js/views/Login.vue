<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div
            class="px-12 py-6 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3 rounded-lg"
        >
            <div class="mb-5">
                <div class="text-2xl font-bold text-center">Login</div>
                <hr />
            </div>
            <div
                v-if="successMessage"
                class="mt-3 alert bg-green-100 rounded-lg py-1.5 px-3 text-base text-green-900 inline-flex items-center w-full alert-dismissible fade show"
                role="alert"
            >
                {{ successMessage }}
                <button
                    type="button"
                    class="btn-close box-content p-1 ml-auto text-black"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
            </div>
            <div
                v-if="errorMessage"
                class="mt-3 alert bg-red-100 rounded-lg py-1.5 px-3 text-base text-red-900 inline-flex items-center w-full alert-dismissible fade show"
                role="alert"
            >
                {{ errorMessage }}
                <button
                    type="button"
                    class="btn-close box-content p-1 ml-auto text-black"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
            </div>
            <form @submit.prevent="login">
                <div class="mt-4">
                    <div class="mt-4">
                        <div class="block" for="email">Email</div>
                        <input
                            type="email"
                            placeholder="Email"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                            v-model="credentials.email"
                        />
                    </div>
                    <div class="mt-4">
                        <div class="block">Password</div>
                        <input
                            type="password"
                            placeholder="Password"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                            v-model="credentials.password"
                        />
                    </div>
                    <div class="flex">
                        <button
                            class="w-full px-6 py-2 mt-4 text-white bg-orange-600 rounded-lg hover:bg-orange-500"
                        >
                            Submit
                        </button>
                    </div>
                    <div class="mt-6 text-grey-dark">
                        Haven't any account?
                        <router-link
                            class="text-orange-600 hover:underline"
                            :to="{ name: 'register' }"
                        >
                            Register
                        </router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router"
import { useDataStore } from "../stores";

const credentials = reactive({
    email: "",
    password: "",
});

const dataStore = useDataStore();
const router = useRouter();

const getUserData = async () => {
    try {
        let resp = await axios.get("/api/user");
        console.log(resp);
        if (resp.status == 200) {
            dataStore.userAuthenticated = true;
            dataStore.user = resp.data;

            localStorage.setItem("userAuthenticated", true);
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
