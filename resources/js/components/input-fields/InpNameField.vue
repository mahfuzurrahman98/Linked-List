<template>
	<div class="mt-4">
		<label class="tracking-wide text-gray-700 text-md mb-7" for="">
			Store Name Displayed
		</label>
		<input
			class="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
			type="text" v-model="dataStore.fieldsData.name" />
	</div>
</template>

<script setup>
import { useDataStore } from "../../stores";
const dataStore = useDataStore();
</script>

<style>

</style>
