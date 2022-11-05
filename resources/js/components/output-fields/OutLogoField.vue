<template>
    <div
        v-if="dataStore.fieldsData.user.logo != ''"
        class="flex justify-center rounded-full"
    >
        <img
            :src="dataStore.fieldsData.user.logo"
            class="object-contain w-24 h-24 bg-black border-2 p-1 rounded-full"
        />
    </div>
    <div v-else>
        <div class="flex justify-center">
            <div
                class="bg-red text-center mt-3 rounded-full bg-black text-white flex justify-center items-center w-24 h-24 font-bold border-4 text-4xl uppercase"
            >
                {{ altLogo }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "../../stores";
const dataStore = useDataStore();

const altLogo = computed(() => {
    let logo = "";
    let shopName = dataStore.fieldsData.user.name;
    shopName = shopName.split(" ");

    if (shopName.length == 1) {
        // logo = shopName[0][0].toUpperCase();
        logo = shopName[0][0];

        // logo = logo.toUpperCase();
    } else {
        for (let i = 0; i < 2; i++) {
            logo += shopName[i][0].toUpperCase();
        }
    }
    return logo;
});
</script>
