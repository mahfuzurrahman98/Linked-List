<template>
	<div class="w-full">
		<label class="text-gray-500">Title</label>
		<input
			class="appearance-none border-2 border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
			placeholder="Enter the title"
			type="text"
			:propsId="propsId"
			v-model="dataStore.fieldsData.descriptions[propsId].title"
		/>
	</div>
	<div class="mt-1 w-full">
		<label class="text-gray-500">Description</label>
		<textarea
			class="appearance-none border-2 border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
			placeholder="Enter the description"
			type="text"
			:propsId="propsId"
			v-model="dataStore.fieldsData.descriptions[propsId].value"
		/>
	</div>
</template>

<script setup>
	import { useDataStore } from "../../stores";

	const dataStore = useDataStore();
	const props = defineProps(["fieldId", "propsId"]);
</script>

<style></style>
