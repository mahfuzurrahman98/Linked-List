<template>
	<p class="p-3 mt-3 shadow bg-gray-100 rounded" style="word-wrap: break-word">
		{{ dataStore.fieldsData.desc }}
	</p>
</template>

<script setup>
	import { useDataStore } from "../../stores";
	const dataStore = useDataStore();
</script>

<style></style>
