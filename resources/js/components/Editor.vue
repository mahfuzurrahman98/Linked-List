<template>
	<div class="gap-y-7 py-3 px-5 max-h-screen overflow-y-auto">
		<div v-if="dataStore.fieldsData.selectedTab == 'appearance'">
			<Appearance />
		</div>
		<div v-if="dataStore.fieldsData.selectedTab == 'content'">
			<Content />
		</div>
	</div>
</template>

<script setup>
	import { useDataStore } from "../stores";
	import Appearance from "./Appearance.vue";
	import Content from "./Content.vue";
	const dataStore = useDataStore();
</script>

<style></style>
