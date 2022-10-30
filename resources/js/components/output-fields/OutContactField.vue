<template>
	<div
		v-if="dataStore.fieldsData.contacts[propsId].value != ''"
		class="text-center p-3 mt-3 shadow bg-gray-100 rounded-[20px] break-word"
	>
		<p class="">
			<font-awesome-icon class="float-left" icon="fa-solid fa-address-card" />
		</p>
		<a
			:href="'tel:' + dataStore.fieldsData.contacts[propsId].value"
			target="blank"
		>
			{{ dataStore.fieldsData.contacts[propsId].value }}
		</a>
	</div>
</template>

<script setup>
	import { useDataStore } from "../../stores";

	const dataStore = useDataStore();
	const props = defineProps(["fieldId", "propsId"]);
</script>

<style></style>
