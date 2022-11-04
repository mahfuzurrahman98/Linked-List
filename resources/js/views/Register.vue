<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div
            class="px-12 py-6 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3 rounded-lg"
        >
            <div class="mb-5">
                <div class="text-2xl font-bold text-center">Create Account</div>
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
            <form @submit.prevent="register">
                <div class="mt-4">
                    <div>
                        <div class="block" for="Name">Name</div>

                        <input
                            type="text"
                            placeholder="Name"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                            v-model="formData.name"
                        />
                    </div>
                    <div class="mt-4">
                        <div class="block" for="Name">Userame</div>
                        <input
                            type="text"
                            placeholder="Username"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                            v-model="formData.username"
                        />
                    </div>
                    <div class="mt-4">
                        <div class="block" for="email">Email</div>
                        <input
                            type="email"
                            placeholder="Email"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                            v-model="formData.email"
                        />
                    </div>
                    <div class="mt-4">
                        <div class="block">Password</div>
                        <input
                            type="password"
                            placeholder="Password"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                            v-model="formData.password"
                        />
                    </div>
                    <div class="flex">
                        <button
                            class="w-full px-6 py-2 mt-4 text-white bg-orange-600 rounded-lg hover:bg-orange-500"
                        >
                            Register
                        </button>
                    </div>
                    <div class="mt-6 text-grey-dark">
                        Already have an account?
                        <router-link
                            class="text-orange-600 hover:underline"
                            :to="{ name: 'login' }"
                        >
                            Log in
                        </router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref } from "vue";
const formData = reactive({
    name: "",
    username: "",
    email: "",
    password: "",
});

let errorMessage = ref("");
let successMessage = ref("");

const register = async () => {
    try {
        let resp = await axios.post("/api/register", formData, {
            headers: {
                "Content-type": "application/json",
            },
        });
        console.log(resp);
        if (resp.data.success) {
            successMessage.value = resp.data.message;
        }
    } catch (error) {
        if (error.response.status == 401) {
            let errorMessages = error.response.data.message;
            if ("name" in errorMessages) {
                errorMessage.value = errorMessages.name[0];
            } else if ("username" in errorMessages) {
                errorMessage.value = errorMessages.username[0];
            } else if ("email" in errorMessages) {
                errorMessage.value = errorMessages.email[0];
            }
        } else if (error.response.status == 500) {
            errorMessage.value = "Sorry, something went wrong";
        }
    }
};
</script>
