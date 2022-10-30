<template>
	<div>
		<p
			v-if="dataStore.fieldsData.links[propsId].value != ''"
			class="text-center p-3 mt-3 shadow bg-gray-100 rounded-[20px] break-word"
		>
			<font-awesome-icon class="float-left" icon="fa-solid fa-link" />
			<a :href="dataStore.fieldsData.links[propsId].value" target="blank">
				{{ dataStore.fieldsData.links[propsId].title }}
			</a>
		</p>
	</div>
</template>

<script setup>
	import { useDataStore } from "../../stores";

	const dataStore = useDataStore();
	const props = defineProps(["fieldId", "propsId"]);
</script>

<style></style>
