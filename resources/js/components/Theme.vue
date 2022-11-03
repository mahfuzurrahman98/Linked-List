<template>
    <!-- <div class="flex justify-end mb-5 bg-pink-00">
		<div class="">
			<button
				@click="updateData"
				class="rounded-2xl px-5 py-2"
				:class="btnClasses"
				:disabled="updateBtnIsDisabled"
			>
				Save
			</button>
		</div>
	</div> -->
    <div class="">
        <!-- text color -->
        <div class="bg-white shadow-lg rounded p-3 mt-3">
            <component :is="dataStore.fieldsMap.color.inp" />
        </div>
        <!-- background color -->
        <div class="bg-white shadow-lg rounded p-3 mt-3">
            <component :is="dataStore.fieldsMap.bgColor.inp" />
        </div>
        <!-- Font section -->
        <div class="bg-white shadow-lg rounded p-3 mt-3">
            <component :is="dataStore.fieldsMap.font.inp" />
        </div>
    </div>
</template>

<script setup>
// import { ref } from "vue";
import { useDataStore } from "../stores";
const dataStore = useDataStore();

function fun() {
    console.log(dataStore.inputComponents);
}

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
