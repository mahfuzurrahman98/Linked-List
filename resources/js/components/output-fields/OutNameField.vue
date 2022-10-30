<template>
	<div
		class="text-center px-5 mt-1 rounded break-all text-2xl"
		:style="{ color: dataStore.fieldsData.style.color }"
	>
		{{ dataStore.fieldsData.name }}
	</div>
</template>
<script setup>
	import { useDataStore } from "../../stores";
	const dataStore = useDataStore();
</script>
<style></style>
