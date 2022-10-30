<template>
	<div
		v-if="
			dataStore.fieldsData.images[propsId].value != '' &&
			dataStore.fieldsData.images[propsId].title != ''
		"
		class="mt-3 p-2 bg-white text-center rounded-[20px]"
	>
		<div class="accordion" id="accordionExample2">
			<div class="accordion-item bg-white border-0">
				<h2 class="accordion-header mb-0" id="headingOne2">
					<button
						class="accordion-button relative flex items-center content-center w-full p-[5px] text-base bg-white border-0 rounded-none transition text-black text-center focus:outline-none collapsed"
						type="button"
						data-bs-toggle="collapse"
						:data-bs-target="'#collapseImg' + propsId"
						aria-expanded="true"
						:aria-controls="'collapseImg' + propsId"
					>
						<font-awesome-icon icon="fa-solid fa-image" />
						<p
							class="flex capitalize w-full flex-nowrap justify-center content-center"
						>
							{{ dataStore.fieldsData.images[propsId].title }}
						</p>
					</button>
				</h2>
				<div
					:id="'collapseImg' + propsId"
					class="accordion-collapse collapse"
					aria-labelledby="headingOne2"
					data-bs-parent="#accordionExample2"
				>
					<div class="accordion-body py-4 px-5">
						<img
							:src="
								dataStore.imageServer +
								dataStore.fieldsData.images[propsId].value
							"
							class="text-center p-0"
						/>
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
	console.log(props);
</script>

<style scoped>
	.accordion-button:not(.collapsed) {
		color: #000;
		box-shadow: unset;
	}
</style>
