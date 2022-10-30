<template>
	<p class="tracking-wide text-md font-bold mb-4" for="">Text Colour</p>
	<div class="flex my-3 gap-x-7">
		<div class="">
			<div class="flex gap-x-2">
				<input
					class="rounded h-6 w-6 cursor-pointer"
					type="color"
					v-model="dataStore.fieldsData.style.color"
				/>
				<input
					class="appearance-none border-2 border-gray-200 rounded w-full py-0 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
					type="text"
					v-model="dataStore.fieldsData.style.color"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useDataStore } from "../../stores";
	const dataStore = useDataStore();
</script>

<style></style>
