<template>
    <p class="tracking-wide text-md font-bold mb-4" for="">Background</p>
    <div class="flex my-3 gap-x-7">
        <!-- Solid color -->
        <div class="text-center">
            <div
                class="cursor-pointer p-0.5 rounded"
                :class="
                    dataStore.fieldsData.style.bgColorType == 'solid'
                        ? 'border-2 border-orange-600'
                        : ''
                "
                @click="dataStore.fieldsData.style.bgColorType = 'solid'"
            >
                <div
                    class="rounded h-28 w-20"
                    :style="{
                        background: dataStore.fieldsData.style.bgColor.color1,
                    }"
                ></div>
            </div>
            <p class="mt-2">Solid</p>
        </div>

        <!-- Gradient color -->
        <div class="text-center">
            <div
                class="cursor-pointer p-0.5 rounded"
                :class="
                    dataStore.fieldsData.style.bgColorType == 'gradient'
                        ? 'border-2 border-orange-600'
                        : ''
                "
                @click="dataStore.fieldsData.style.bgColorType = 'gradient'"
            >
                <div
                    class="rounded h-28 w-20"
                    :style="{
                        background: dataStore.gradientBackground,
                    }"
                ></div>
            </div>
            <p class="mt-2">Gradient</p>
        </div>
    </div>

    <div class="flex flex-col gap-y-2 mt-5">
        <p class="text-gray-500">Select Color</p>
        <div class="flex gap-x-3">
            <input
                class="rounded h-12 w-12 cursor-pointer"
                type="color"
                v-model="dataStore.fieldsData.style.bgColor.color1"
            />
            <input
                class="border-b-2 border-orange-600 py-0 px-2 text-black leading-tight focus:outline-none focus:border-orange-400"
                type="text"
                v-model="dataStore.fieldsData.style.bgColor.color1"
            />
        </div>

        <div
            v-if="dataStore.fieldsData.style.bgColorType == 'gradient'"
            class="flex gap-x-3"
        >
            <input
                class="rounded h-12 w-12 cursor-pointer border-orange-600 focus:border-orange-400"
                type="color"
                v-model="dataStore.fieldsData.style.bgColor.color2"
            />
            <input
                class="border-b-2 border-orange-600 py-0 px-2 text-black leading-tight focus:outline-none focus:border-orange-400"
                type="text"
                v-model="dataStore.fieldsData.style.bgColor.color2"
            />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "../../stores";
const dataStore = useDataStore();

const background = computed(() => {
    return (
        "linear-gradient(to bottom," +
        dataStore.fieldsData.style.bgColor.color1 +
        " 0%, " +
        dataStore.fieldsData.style.bgColor.color2 +
        " 100%)"
    );
});
</script>

<style></style>
