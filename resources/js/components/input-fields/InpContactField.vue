<template>
    <div>
        <!-- <div class="w-full">
			<label class="text-gray-500">Title</label>
			<input
				class="appearance-none border-2 border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100 "
				placeholder="Enter contact" type="text" :propsId="propsId"
				v-model="dataStore.fieldsData.contacts[propsId].title" />
		</div> -->
        <div class="mt-1 w-full">
            <input
                class="appearance-none border-2 border-black rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
                placeholder="Enter contact"
                type="text"
                :propsId="propsId"
                v-model="dataStore.fieldsData.contacts[propsId].value"
            />
        </div>
    </div>
</template>

<script setup>
import { useDataStore } from "../../stores";

const dataStore = useDataStore();
const props = defineProps(["fieldId", "propsId"]);
console.log(props);
</script>

<style></style>
