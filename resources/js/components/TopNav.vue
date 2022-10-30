<template>
	<!-- <div
		class="flex gap-x-3 py-3 justify-between px-8 sticky top-0 z-50 bg-white"
	>
		<div class="flex gap-x-12">
			<div
				@click="dataStore.selectTab('appearance')"
				:class="
					dataStore.fieldsData.selectedTab == 'appearance'
						? 'cursor-pointer border-b-4 border-blue-600'
						: 'cursor-pointer'
				"
			>
				Appereance
			</div>
			<div
				@click="dataStore.selectTab('content')"
				:class="
					dataStore.fieldsData.selectedTab == 'content'
						? 'cursor-pointer border-b-4 border-blue-600'
						: 'cursor-pointer'
				"
			>
				Content
			</div>
		</div>
		<div>
			<button
				@click="updateData"
				class="rounded-full px-3 py-1"
				:class="btnClasses"
				:disabled="updateBtnIsDisabled"
			>
				Save
			</button>
		</div>
		<div class="hidden md:block text-center">
			<p class="">
				Your shop:
				<a
					:href="'https://' + dataStore.fieldsData.subdomain + '.kwikz.app'"
					target="_blank"
					class="text-violet-700"
					>{{ "https://" + dataStore.fieldsData.subdomain + ".kwikz.app" }}
				</a>
			</p>
		</div>
	</div> -->

	<div class="grid grid-cols-3 px-8 py-3 sticky top-0 z-50 bg-white">
		<div class="col-span-3 lg:col-span-2 flex justify-between">
			<div class="flex gap-x-8">
				<div
					@click="dataStore.selectTab('appearance')"
					:class="
						dataStore.fieldsData.selectedTab == 'appearance'
							? 'cursor-pointer border-b-4 border-blue-600'
							: 'cursor-pointer'
					"
				>
					Appereance
				</div>
				<div
					@click="dataStore.selectTab('content')"
					:class="
						dataStore.fieldsData.selectedTab == 'content'
							? 'cursor-pointer border-b-4 border-blue-600'
							: 'cursor-pointer'
					"
				>
					Content
				</div>
			</div>
			<div class="">
				<button
					@click="updateData"
					class="rounded-full px-3 py-1"
					:class="btnClasses"
					:disabled="updateBtnIsDisabled"
				>
					Save
				</button>
			</div>
		</div>

		<div class="hidden lg:block text-center ml-14">
			<button
				class="bg-green-600 px-2 py-1 text-white rounded-2xl shadow-2xl hover:bg-green-400 text-sm"
			>
				<a
					:href="'https://' + dataStore.fieldsData.subdomain + '.kwikz.app'"
					target="_blank"
					>your shop
				</a>
			</button>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useDataStore } from "../stores";
	const dataStore = useDataStore();

	let updateBtnIsDisabled = ref(false);
	let btnClasses = ref("bg-green-900 text-white ");

	const updateData = () => {
		updateBtnIsDisabled.value = true;
		btnClasses.value = "bg-gray-400 text-black ";
		dataStore.postData();
		setTimeout(() => {
			updateBtnIsDisabled.value = false;
			btnClasses.value = "bg-green-900 text-white ";
		}, 2000);
	};
</script>

<style scoped>
	#save-btn {
		margin-right: 50%;
	}
</style>
