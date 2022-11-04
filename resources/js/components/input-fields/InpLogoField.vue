<template>
    <div
        v-if="dataStore.fieldsData.user.logo != ''"
        class="flex justify-center mt-3 rounded-full"
    >
        <img
            :src="dataStore.fieldsData.user.logo"
            class="object-contain w-32 h-32 bg-black border-2 p-1 rounded-full"
        />
    </div>
    <div v-else>
        <div class="flex justify-center">
            <div
                class="bg-red text-center mt-3 rounded-full bg-black text-white flex justify-center items-center w-32 h-32 font-bold border-4 text-4xl uppercase"
            >
                {{ altLogo }}
            </div>
        </div>
    </div>

    <div class="flex justify-center items-center mt-3">
        <button
            type="button"
            class="bg-orange-700 hover:bg-orange-600 font-bold px-7 py-3 rounded-lg text-white text-sm transition duration-150 ease-in-out"
            data-bs-toggle="modal"
            data-bs-target="#logoUploadModal"
        >
            Upload
        </button>
        <p
            class="ml-3 cursor-pointer text-red-600 text-2xl rounded-full transition duration-150 ease-in-out"
            v-if="dataStore.fieldsData.user.logo != ''"
            @click="dataStore.fieldsData.user.logo = ''"
        >
            <font-awesome-icon icon="fa-regular fa-circle-xmark" />
        </p>
    </div>

    <!-- Modal -->
    <div
        class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="logoUploadModal"
        tabindex="-1"
        aria-labelledby="logoUploadModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog relative w-auto pointer-events-none">
            <div
                class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
            >
                <div
                    class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
                >
                    <h5
                        class="text-xl font-medium leading-normal text-gray-800"
                        id="logoUploadModalLabel"
                    >
                        Upload Profile
                    </h5>
                    <button
                        type="button"
                        class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body relative p-4">
                    <div class="flex justify-center mb-5">
                        <img
                            v-if="dataStore.fieldsData.user.logo"
                            :src="dataStore.fieldsData.user.logo"
                            class="object-contain w-48 h-48 bg-white p-1 rounded-lg"
                        />
                    </div>

                    <input
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                        type="file"
                        @change="dataStore.changeLogo($event)"
                    />
                </div>
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
    let userName = dataStore.fieldsData.user.name;
    userName = userName.split(" ");

    if (userName.length == 1) {
        // logo = userName[0][0].toUpperCase();
        logo = userName[0][0];

        // logo = logo.toUpperCase();
    } else {
        for (let i = 0; i < 2; i++) {
            logo += userName[i][0].toUpperCase();
        }
    }
    return logo;
});
</script>

<style scoped>
.logo-name {
    font-size: 45px;
    width: 95px;
    height: 95px;
    display: flex;
    align-content: space-around;
    justify-content: space-around;
    align-items: center;
    border: 5px solid #ffffff;
    text-transform: uppercase;
}
</style>
