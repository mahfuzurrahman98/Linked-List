<template>
	<div v-for="(element, index) in dataStore.fields">
		<div v-if="!element.deleted && element.typeId == 7" class="my-3 flex">
			<div class="bg-white pt-3 rounded-r-lg w-full">
				<div class="flex justify-between">
					<p class="">
						{{ dataStore.refData.fieldsTypeMap[element.typeId].type }}
					</p>
					<div class="flex gap-x-3">
						<div class="form-check form-switch">
							<input
								class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-gray-500 bg-no-repeat bg-contain focus:outline-none cursor-pointer shadow-sm"
								type="checkbox"
								role="switch"
								@change="dataStore.enableDisable(index)"
								:checked="element.active"
							/>
							<label class="form-check-label inline-block text-gray-800">
							</label>
						</div>
						<div v-if="element.typeId != 0" class="">
							<p
								class="text-red-700 cursor-pointer"
								@click="dataStore.deletedFieldIndex = index"
								data-bs-toggle="modal"
								data-bs-target="#fieldDeleteModal"
							>
								<font-awesome-icon icon="fa-solid fa-trash-can" />
							</p>
						</div>
					</div>
				</div>
				<component :is="element.inp" v-bind="sendProps(index)" />
			</div>
		</div>
	</div>
	<div class="text-center">
		<button
			class="bg-blue-800 rounded-md px-2 py-1 text-white"
			@click="dataStore.addFaq"
		>
			Add More
		</button>
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
