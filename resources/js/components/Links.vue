<template>
    <div class="flex justify-between mb-5 bg-pink-00">
        <div class="">
            <button
                type="button"
                class="bg-blue-900 hover:bg-blue-500 px-5 py-2 rounded-full text-white text-sm transition duration-150 ease-in-out"
                data-bs-toggle="modal"
                data-bs-target="#cardModal"
            >
                Add Card
            </button>
        </div>
        <!-- 
		<div class="">
			<button
				@click="updateData"
				class="rounded-2xl px-5 py-2"
				:class="btnClasses"
				:disabled="updateBtnIsDisabled"
			>
				Save
			</button>
		</div> -->
    </div>

    <draggable v-model="dataStore.fields" item-key="index" handle=".handle">
        <template #item="{ element, index }">
            <div
                v-if="
                    element.typeId != 0 &&
                    element.typeId != 5 &&
                    element.typeId != 7 &&
                    !element.deleted
                "
                class="my-3 flex"
            >
                <div
                    class="flex handle cursor-grab bg-gray-200 py-6 px-2 rounded-l-lg items-center"
                >
                    <font-awesome-icon icon="fa-brand fa-grip-vertical" />
                </div>
                <div class="bg-white pl-7 pr-5 py-3 rounded-r-lg w-full">
                    <div class="flex justify-between">
                        <p class="font-bold">
                            {{
                                dataStore.refData.fieldsTypeMap[element.typeId]
                                    .type
                            }}
                        </p>
                        <div
                            class="flex gap-x-3"
                            :style="
                                element.typeId == 0
                                    ? { paddingRight: '24.8px' }
                                    : ''
                            "
                        >
                            <div class="form-check form-switch">
                                <input
                                    class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-gray-500 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
                                    type="checkbox"
                                    role="switch"
                                    @change="dataStore.enableDisable(index)"
                                    :checked="element.active"
                                />
                                <label
                                    class="form-check-label inline-block text-gray-800"
                                >
                                </label>
                            </div>
                            <div v-if="element.typeId != 0" class="">
                                <p
                                    class="cursor-pointer"
                                    @click="
                                        dataStore.refData.deletedFieldIndex =
                                            index
                                    "
                                    data-bs-toggle="modal"
                                    data-bs-target="#fieldDeleteModal"
                                >
                                    <font-awesome-icon
                                        icon="fa-regular fa-trash-can"
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                    <component :is="element.inp" v-bind="sendProps(index)" />
                </div>
            </div>
        </template>
    </draggable>

    <!-- All card add modal -->
    <div
        class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="cardModal"
        tabindex="-1"
        aria-labelledby="cardModalLabel"
        aria-hidden="true"
    >
        <div
            class="modal-dialog modal-sm modal-dialog-centered relative w-auto pointer-events-none"
        >
            <div
                class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
            >
                <div class="modal-body relative p-4">
                    <ul class="flex flex-col gap-y-2">
                        <li
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
                        </li>
                        <li
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
                        </li>
                        <li
                            class="flex shadow-lg hover:bg-gray-200 p-3 rounded-lg cursor-pointer"
                            @click=""
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
                        </li>
                        <li
                            class="flex shadow-lg hover:bg-gray-200 p-3 rounded-lg cursor-pointer"
                            @click=""
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
                        </li>
                        <li
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
                        </li>
                    </ul>
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
// import { ref } from "vue";
import draggable from "vuedraggable";
import { useDataStore } from "../stores";

const dataStore = useDataStore();

const sendProps = (fieldId) => {
    return {
        fieldId: fieldId,
        propsId: dataStore.fields[fieldId].propsId,
    };
};

// let updateBtnIsDisabled = ref(false);
// let btnClasses = ref("bg-green-900 text-white ");

// const updateData = () => {
// 	updateBtnIsDisabled.value = true;
// 	btnClasses.value = "bg-gray-400 text-black ";
// 	dataStore.postData();
// 	setTimeout(() => {
// 		updateBtnIsDisabled.value = false;
// 		btnClasses.value = "bg-green-900 text-white ";
// 	}, 2000);
// };
</script>

<style></style>
