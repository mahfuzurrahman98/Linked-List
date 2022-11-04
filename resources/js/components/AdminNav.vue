<template>
    <div
        class="grid grid-cols-3 text-center px-3 py-2 my-5 shadow-lg bg-white rounded-2xl"
    >
        <div
            @click="dataStore.fieldsData.selectedTab = 'profile'"
            class="nav-item cursor-pointer font-bold"
            :class="
                dataStore.fieldsData.selectedTab == 'profile'
                    ? 'border-b-2 border-b-orange-600 '
                    : ''
            "
        >
            <p class="text-black text-lg">Profile</p>
        </div>
        <div
            @click="dataStore.fieldsData.selectedTab = 'theme'"
            class="nav-item cursor-pointer font-bold"
            :class="
                dataStore.fieldsData.selectedTab == 'theme'
                    ? 'border-b-2 border-b-orange-600 '
                    : ''
            "
        >
            <p class="text-black text-lg">Theme</p>
        </div>
        <div
            @click="dataStore.fieldsData.selectedTab = 'links'"
            class="nav-item cursor-pointer font-bold"
            :class="
                dataStore.fieldsData.selectedTab == 'links'
                    ? 'border-b-2 border-b-orange-600 '
                    : ''
            "
        >
            <p class="text-black text-lg">Links</p>
        </div>
    </div>

    <div class="flex justify-between gap-x-3">
        <div class="">
            <button
                @click="updateData"
                class="rounded-2xl px-2 py-1.5 font-"
                :class="btnClasses"
                :disabled="updateBtnIsDisabled"
            >
                Update
            </button>
        </div>
        <div
            v-if="dataStore.refData.successMessage"
            class="alert bg-green-100 rounded-lg py-1.5 px-3 text-base text-green-900 inline-flex items-center w-full alert-dismissible fade show"
            role="alert"
        >
            {{ dataStore.refData.successMessage }}
            <button
                type="button"
                class="btn-close box-content p-1 ml-auto text-green-900"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
        <div
            v-if="dataStore.refData.failureMessage"
            class="alert bg-red-100 rounded-lg py-1.5 px-3 text-base text-red-900 inline-flex items-center w-full alert-dismissible fade show"
            role="alert"
        >
            {{ dataStore.refData.failureMessage }}
            <button
                type="button"
                class="btn-close box-content p-1 ml-auto text-green-900"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useDataStore } from "../stores";

const dataStore = useDataStore();

let updateBtnIsDisabled = ref(false);
let btnClasses = ref("bg-orange-600 text-white ");

const updateData = () => {
    updateBtnIsDisabled.value = true;
    btnClasses.value = "bg-gray-400 text-black ";
    dataStore.postData();
    setTimeout(() => {
        updateBtnIsDisabled.value = false;
        btnClasses.value = "bg-orange-600 text-white ";
        dataStore.refData.successMessage = "";
        dataStore.refData.failureMessage = "";
    }, 2000);
};
</script>
