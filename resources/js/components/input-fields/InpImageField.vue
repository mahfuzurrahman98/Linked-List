<template>
    <div class="flex gap-x-5 items-center mt-2">
        <div class="w-full">
            <div
                v-if="dataStore.fieldsData.images[propsId].value != ''"
                class="flex justify-center"
            >
                <img
                    :src="
                        '/uploads/field_images/' +
                        dataStore.fieldsData.images[propsId].value
                    "
                    class="w-32 border-2 border-orange-600 rounded p-1"
                    alt=""
                />
            </div>

            <div class="flex justify-between gap-x-3 mt-3">
                <div class="w-full">
                    <input
                        class="border-b-2 w-full border-orange-600 py-0 px-2 text-black leading-tight focus:outline-none focus:border-orange-400"
                        placeholder="Title"
                        type="text"
                        v-model="dataStore.fieldsData.images[propsId].title"
                    />
                </div>
                <div class="">
                    <p
                        class="text-center rounded-md py-1 px-2 bg-slate-200 cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#imageUploadModal"
                        @click="getImageModal()"
                    >
                        Image
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Image upload modal -->
    <div
        class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="imageUploadModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="imageUploadModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-md relative w-auto pointer-events-none">
            <div
                class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
            >
                <div
                    class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
                >
                    <h5
                        class="text-xl font-medium leading-normal text-gray-800"
                        id="exampleModalLabel"
                    >
                        Image Gallery
                    </h5>
                    <button
                        type="button"
                        class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>

                <input
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                    type="file"
                    @change="dataStore.changeImageUploaded($event)"
                />
                <div class="modal-body relative p-4 mt-3">
                    <div class="flex flex-wrap gap-3 mb-3">
                        <div
                            v-for="(image, index) in dataStore.fieldsData
                                .uploadedImages"
                        >
                            <div
                                class="w-24 h-24"
                                :class="
                                    index ==
                                    dataStore.refData.currentSelectedImage
                                        ? 'border-2 border-orange-600 rounded p-0.5'
                                        : ''
                                "
                                @click="selectImage(index)"
                            >
                                <img
                                    width="100"
                                    :src="
                                        '/uploads/field_images/' + image.image
                                    "
                                    alt="ALT"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button
                            :class="selectBtnColor"
                            class="cursor-pointer text-white px-2 py-1 rounded-md font-bold"
                            data-bs-dismiss="modal"
                            @click="setImageOnFieldLocal"
                            :disabled="selectBtnDisabled"
                        >
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useDataStore } from "../../stores";
const dataStore = useDataStore();
const props = defineProps(["fieldId", "propsId"]);
let selectBtnDisabled = ref(true);
let selectBtnColor = ref("bg-orange-400");

const getImageModal = () => {
    dataStore.refData.currentImagePropsId = props.propsId;
    dataStore.getAllImages();
};

const selectImage = (index) => {
    dataStore.refData.currentSelectedImage = index;
    selectBtnDisabled.value = false;
    selectBtnColor.value = "bg-orange-600";
};

const setImageOnFieldLocal = () => {
    dataStore.setImageOnField();
    selectBtnDisabled.value = true;
    selectBtnColor.value = "bg-blue-400";
};
</script>

<style></style>
