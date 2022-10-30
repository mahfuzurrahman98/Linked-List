<template lang="">
	<div v-if="0" class="mt-3 p-2">
		<p class="mb-2">{{ dataStore.fieldsData.faqs[propsId].question }}</p>
		<p class="mb-2">{{ dataStore.fieldsData.faqs[propsId].answer }}</p>
	</div>
</template>

<script setup>
	import { computed } from "vue";
	import { useDataStore } from "../../stores";

	const dataStore = useDataStore();
	const props = defineProps(["fieldId", "propsId"]);

	const showField = computed(() => {
		return (
			dataStore.fieldsData.faqs[props.propsId].question != "" &&
			dataStore.fieldsData.faqs[props.propsId].answer != ""
		);
	});
</script>

<style></style>
