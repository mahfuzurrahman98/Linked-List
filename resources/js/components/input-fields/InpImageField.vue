<template>
    <div class="flex gap-x-5 items-center mt-2">
        <div class="w-full">
            <div
                v-if="dataStore.fieldsData.images[propsId].value != ''"
                class="flex justify-center"
            >
                <img
                    :src="
                        '/uploads/card_images/' +
                        dataStore.fieldsData.images[propsId].value
                    "
                    class="w-32 border-2 border-blue-600 rounded p-1"
                    alt=""
                />
            </div>
            <div class="">
                <input
                    class="appearance-none border-2 border-black rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
                    placeholder="Enter title"
                    type="text"
                    :propsId="propsId"
                    v-model="dataStore.fieldsData.images[propsId].title"
                />
            </div>
            <div class="mt-2">
                <p
                    class="text-center rounded-md py-2 bg-slate-200 cursor-pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#imageUploadModal"
                    @click="getImageModal()"
                >
                    Selcet Image
                </p>
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
        <div class="modal-dialog relative w-auto pointer-events-none">
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
                        Uploaded Images
                    </h5>
                    <button
                        type="button"
                        class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="file"
                    @change="dataStore.changeImageUploaded($event)"
                />
                <div class="modal-body relative p-4 mt-3">
                    <div class="flex gap-3 mb-3">
                        <div
                            v-for="(image, index) in dataStore.fieldsData
                                .uploadedImages"
                        >
                            <div
                                :class="
                                    index ==
                                    dataStore.refData.currentSelectedImage
                                        ? 'border-2 border-violet-600 rounded p-0.5'
                                        : ''
                                "
                                @click="selectImage(index)"
                            >
                                <img
                                    width="100"
                                    :src="'/uploads/card_images/' + image.image"
                                    alt="ALT"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        :class="
                            selectBtnColor + ' text-white px-2 py-1 rounded-md'
                        "
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
</template>

<script setup>
import { ref } from "vue";
import { useDataStore } from "../../stores";
const dataStore = useDataStore();
const props = defineProps(["fieldId", "propsId"]);
let selectBtnDisabled = ref(true);
let selectBtnColor = ref("bg-blue-400");

const getImageModal = () => {
    dataStore.refData.currentImagePropsId = props.propsId;
    dataStore.getAllImages();
};

const selectImage = (index) => {
    dataStore.refData.currentSelectedImage = index;
    selectBtnDisabled.value = false;
    selectBtnColor.value = "bg-blue-800";
};

const setImageOnFieldLocal = () => {
    dataStore.setImageOnField();
    selectBtnDisabled.value = true;
    selectBtnColor.value = "bg-blue-400";
};
</script>

<style></style>
