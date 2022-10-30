<template>
	<!-- <div class="mt-4">
		<p>Online Shop</p>
	</div> -->
	<div class="mt-1 w-full">
		<input
			class="appearance-none border-2 border-black rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
			placeholder="Enter link"
			type="text"
			v-model="dataStore.fieldsData.shopText"
		/>
	</div>
</template>

<script setup>
	import { useDataStore } from "../../stores";
	const dataStore = useDataStore();

	const props = defineProps(["fieldId", "propsId"]);
</script>

<style></style>
