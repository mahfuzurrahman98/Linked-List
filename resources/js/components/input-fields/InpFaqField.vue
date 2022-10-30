<template>
	<div class="w-full">
		<!-- <label class="text-gray-500">Question</label> -->
		<input
			class="mt-1 appearance-none border-2 border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
			placeholder="Enter the question"
			type="text"
			:propsId="propsId"
			v-model="dataStore.fieldsData.faqs[propsId].question"
		/>
	</div>
	<div class="mt-1 w-full">
		<!-- <label class="text-gray-500">Answer</label> -->
		<textarea
			class="mt-1 appearance-none border-2 border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
			placeholder="Enter the answer"
			type="text"
			:propsId="propsId"
			v-model="dataStore.fieldsData.faqs[propsId].answer"
		/>
	</div>
</template>

<script setup>
	import { useDataStore } from "../../stores";

	const dataStore = useDataStore();
	const props = defineProps(["fieldId", "propsId"]);
</script>

<style></style>
