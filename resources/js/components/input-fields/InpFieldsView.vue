<template>
	<p class="tracking-wide text-md font-bold mb-4">{{ fieldsViewData }}</p>
	<div class="flex gap-x-7 mt-2">
		<div class="text-center">
			<div
				:class="
					dataStore.fieldsData.fieldsView == 1
						? 'border-2 border-violet-600 rounded'
						: ''
				"
				class="p-0.5"
			>
				<div
					class="p-3 border-gray-700 border-2 rounded gap-3 cursor-pointer hover:bg-gray-300 h-32 w-20 text-4xl flex items-center justify-center"
					@click="dataStore.fieldsData.fieldsView = 1"
				>
					<img src="../../assets/list.png" class="object-contain" alt="" />
				</div>
			</div>
			<p class="mt-1">List</p>
		</div>

		<div class="text-center">
			<div
				:class="
					dataStore.fieldsData.fieldsView == 2
						? 'border-2 border-violet-600 rounded'
						: ''
				"
				class="p-0.5"
			>
				<div
					class="p-3 border-gray-700 border-2 rounded gap-3 cursor-pointer hover:bg-gray-300 h-32 w-20 text-4xl flex items-center justify-center"
					@click="dataStore.fieldsData.fieldsView = 2"
				>
					<img src="../../assets/grid.png" class="object-contain" alt="" />
				</div>
			</div>
			<p class="mt-1">Grid</p>
		</div>
	</div>
</template>

<script setup>
	import { computed } from "vue";
	import { useDataStore } from "../../stores";
	const dataStore = useDataStore();

	const fieldsViewData = computed(() => {
		let view = dataStore.fieldsData.fieldsView;
		return view == 1 ? "List" : "Grid";
	});
</script>
