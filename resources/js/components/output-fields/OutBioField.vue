<template>
	<p
		class="p-1 rounded text-center break-words text-sm"
		:style="{ color: dataStore.fieldsData.style.color }"
	>
		{{ dataStore.fieldsData.bio }}
	</p>
</template>
<script setup>
	import { useDataStore } from "../../stores";
	const dataStore = useDataStore();
</script>
<style></style>
