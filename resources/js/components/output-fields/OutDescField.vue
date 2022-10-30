<template lang="">
	<div
		class="mt-3 p-2 bg-white text-center rounded-[20px]"
		v-if="
			dataStore.fieldsData.descriptions[propsId].title != '' &&
			dataStore.fieldsData.descriptions[propsId].value != ''
		"
	>
		<div class="accordion" id="accordionExample4">
			<div class="accordion-item bg-white border-0">
				<h2 class="accordion-header mb-0" id="headingOne4">
					<button
						class="accordion-button relative flex items-center content-center w-full p-[5px] text-base bg-white border-0 rounded-none transition text-black text-center focus:outline-none collapsed"
						type="button"
						data-bs-toggle="collapse"
						:data-bs-target="'#collapseDesc' + propsId"
						aria-expanded="true"
						:aria-controls="'collapseDesc' + propsId"
					>
						<font-awesome-icon icon="fa-solid fa-circle-info" />
						<p
							class="flex capitalize w-full flex-nowrap justify-center content-center"
						>
							{{ dataStore.fieldsData.descriptions[propsId].title }}
						</p>
					</button>
				</h2>
				<div
					:id="'collapseDesc' + propsId"
					class="accordion-collapse collapse"
					aria-labelledby="headingOne4"
					data-bs-parent="#accordionExample4"
				>
					<div class="accordion-body py-4 px-5">
						{{ dataStore.fieldsData.descriptions[propsId].value }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { useDataStore } from "../../stores";
	const dataStore = useDataStore();
	const props = defineProps(["fieldId", "propsId"]);
</script>
<style scoped>
	.accordion-button:not(.collapsed) {
		color: #000;
		box-shadow: unset;
	}
</style>
