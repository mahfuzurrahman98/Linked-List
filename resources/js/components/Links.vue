<template>
    <draggable v-model="dataStore.fields" item-key="index" handle=".handle">
        <template #item="{ element, index }">
            <div
                v-if="!element.deleted"
                class="bg-white my-3 flex items-center gap-x-5 shadow-lg p-3 rounded-3xl"
            >
                <div class="flex handle cursor-grab">
                    <div v-if="element.typeId == 1">
                        <font-awesome-icon icon="fa-solid fa-globe" />
                    </div>
                    <div v-else-if="element.typeId == 2">
                        <font-awesome-icon icon="fa-solid fa-image" />
                    </div>
                    <div v-else-if="element.typeId == 3">
                        <font-awesome-icon icon="fa-regular fa-circle-play" />
                    </div>

                    <div v-else-if="element.typeId == 4">
                        <font-awesome-icon i icon="fa-solid fa-phone" />
                    </div>
                    <div v-else-if="element.typeId == 5">
                        <font-awesome-icon icon="fa-solid fa-envelope" />
                    </div>
                </div>
                <div class="w-full">
                    <component :is="element.inp" v-bind="sendProps(index)" />
                </div>
                <div class="flex flex-col items-strech py-2">
                    <div class="form-check">
                        <input
                            class="form-check-input appearance-none h-5 w-5 border-2 border-orange-700 rounded-full bg-white checked:bg-orange-500 bg-center bg-contain cursor-pointer"
                            type="checkbox"
                            @change="dataStore.enableDisable(index)"
                            :checked="element.active"
                        />
                        <label
                            class="form-check-label inline-block text-gray-800"
                        >
                        </label>
                    </div>
                    <div class="mt-1">
                        <p
                            class="cursor-pointer"
                            @click="dataStore.refData.deletedFieldIndex = index"
                            data-bs-toggle="modal"
                            data-bs-target="#fieldDeleteModal"
                        >
                            <font-awesome-icon icon="fa-regular fa-trash-can" />
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </draggable>

    <div class="mt-5">
        <p
            class="bg-orange-600 text-center text-white rounded-2xl py-2 font-bold cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target="#cardModal"
        >
            <font-awesome-icon icon="fa-solid fa-circle-plus" /> Add New
        </p>
    </div>
    <!-- All card add modal -->
    <div
        class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="cardModal"
        tabindex="-1"
        aria-labelledby="cardModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog relative w-auto pointer-events-none">
            <div
                class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
            >
                <div class="modal-body relative p-4">
                    <div class="flex flex-wrap flex-col gap-y-2">
                        <div
                            class="flex shadow-lg hover:bg-gray-200 p-3 rounded-lg cursor-pointer"
                            @click="dataStore.addLink()"
                        >
                            <div
                                class="flex gap-x-5 justify-between items-center"
                                data-bs-dismiss="modal"
                            >
                                <div class="font-bold text-3xl">
                                    <font-awesome-icon
                                        icon="fa-solid fa-globe"
                                    />
                                </div>
                                <div>
                                    <p class="font-bold">Link</p>
                                    <p class="text-xs text-gray-500">
                                        Link your social profiles
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex shadow-lg hover:bg-gray-200 p-3 rounded-lg cursor-pointer"
                            @click="dataStore.addImage()"
                        >
                            <div
                                class="flex gap-x-5 justify-between items-center"
                                data-bs-dismiss="modal"
                            >
                                <div class="font-bold text-3xl">
                                    <font-awesome-icon
                                        icon="fa-solid fa-image"
                                    />
                                </div>
                                <div>
                                    <p class="font-bold">Image</p>
                                    <p class="text-xs text-gray-500">
                                        Upload your recent clicks
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex shadow-lg hover:bg-gray-200 p-3 rounded-lg cursor-pointer"
                            @click="dataStore.addVideo"
                        >
                            <div
                                class="flex gap-x-5 justify-between items-center"
                                data-bs-dismiss="modal"
                            >
                                <div class="font-bold text-3xl">
                                    <font-awesome-icon
                                        icon="fa-solid fa-circle-play"
                                    />
                                </div>
                                <div>
                                    <p class="font-bold">Video</p>
                                    <p class="text-xs text-gray-500">
                                        Show your youtube favourites
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex shadow-lg hover:bg-gray-200 p-3 rounded-lg cursor-pointer"
                            @click="dataStore.addContact()"
                        >
                            <div
                                class="flex gap-x-5 justify-between items-center"
                                data-bs-dismiss="modal"
                            >
                                <div class="font-bold text-3xl">
                                    <font-awesome-icon
                                        icon="fa-solid fa-phone"
                                    />
                                </div>
                                <div>
                                    <p class="font-bold">Phone</p>
                                    <p class="text-xs text-gray-500">
                                        Let people call you
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex shadow-lg hover:bg-gray-200 p-3 rounded-lg cursor-pointer"
                            @click="dataStore.addEmail()"
                        >
                            <div
                                class="flex gap-x-5 justify-between items-center"
                                data-bs-dismiss="modal"
                            >
                                <div class="font-bold text-3xl">
                                    <font-awesome-icon
                                        icon="fa-solid fa-envelope"
                                    />
                                </div>
                                <div>
                                    <p class="font-bold">Email</p>
                                    <p class="text-xs text-gray-500">
                                        Add your email addresses
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Field delete modal -->
    <div
        class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="fieldDeleteModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="fieldDeleteModalLabel"
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
                        Delete Card
                    </h5>
                    <button
                        type="button"
                        class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body relative p-4">
                    Do you sure want to delete this card?
                </div>
                <div
                    class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md gap-x-3"
                >
                    <button
                        type="button"
                        class="inline-block px-3 py-1 bg-purple-600 text-white rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                        data-bs-dismiss="modal"
                    >
                        No
                    </button>
                    <button
                        type="button"
                        class="inline-block px-3 py-1 bg-red-600 text-white rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                        data-bs-dismiss="modal"
                        @click="dataStore.removeField"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import draggable from "vuedraggable";
import { useDataStore } from "../stores";

const dataStore = useDataStore();

const sendProps = (fieldId) => {
    return {
        fieldId: fieldId,
        propsId: dataStore.fields[fieldId].propsId,
    };
};
</script>

<style></style>
