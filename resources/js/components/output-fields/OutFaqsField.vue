<template>
	<div class="bg-white rounded p-2 mt-2" v-if="0">
		<div v-for="(field, index) in dataStore.fields">
			<component
				v-if="!field.deleted && field.active && field.typeId == 7"
				:is="field.out"
				v-bind="sendProps(index)"
			/>
		</div>
	</div>
</template>

<script setup>
	import { useDataStore } from "../../stores";

	const dataStore = useDataStore();
	const props = defineProps(["fieldId", "propsId"]);

	const sendProps = (fieldId) => {
		return {
			fieldId: fieldId,
			propsId: dataStore.fields[fieldId].propsId,
		};
	};
</script>

<style></style>
