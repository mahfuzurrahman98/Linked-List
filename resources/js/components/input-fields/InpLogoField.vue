<template>
	<div class="flex gap-x-7 items-center mt-5">
		<div
			v-if="dataStore.fieldsData.logo != ''"
			class="flex justify-center rounded-full"
		>
			<img
				:src="dataStore.fieldsData.logo"
				class="object-contain w-24 h-24 bg-white p-1 rounded-full"
			/>
		</div>
		<div v-else>
			<div class="flex justify-center">
				<div
					class="bg-red text-center rounded-full bg-[#2F2F2F] text-white logo-name"
				>
					{{ altLogo }}
				</div>
			</div>
		</div>
		<button
			type="button"
			class="bg-blue-900 hover:bg-blue-500 px-7 py-3 rounded-full text-white text-sm transition duration-150 ease-in-out"
			data-bs-toggle="modal"
			data-bs-target="#logoUploadModal"
		>
			Upload logo
		</button>
		<button
			type="button"
			class="bg-violet-200 hover:bg-blue-700 px-7 py-3 rounded-full text-white text-sm transition duration-150 ease-in-out"
			v-if="dataStore.fieldsData.logo != ''"
			@click="dataStore.fieldsData.logo = ''"
		>
			Remove logo
		</button>
	</div>

	<!-- Modal -->
	<div
		class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
		id="logoUploadModal"
		tabindex="-1"
		aria-labelledby="logoUploadModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog relative w-auto pointer-events-none">
			<div
				class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
			>
				<div
					class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
				>
					<h5
						class="text-xl font-medium leading-normal text-gray-800"
						id="logoUploadModalLabel"
					>
						Upload Logo
					</h5>
					<button
						type="button"
						class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body relative p-4">
					<div class="flex justify-center mb-5">
						<img
							v-if="dataStore.fieldsData.logo"
							:src="dataStore.fieldsData.logo"
							class="object-contain w-24 h-24 bg-white p-1 rounded-full"
						/>
					</div>

					<input
						class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						type="file"
						@change="dataStore.changeLogo($event)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed } from "vue";
	import { useDataStore } from "../../stores";
	const dataStore = useDataStore();

	const altLogo = computed(() => {
		let logo = "";
		let shopName = dataStore.fieldsData.name;
		shopName = shopName.split(" ");

		if (shopName.length == 1) {
			// logo = shopName[0][0].toUpperCase();
			logo = shopName[0][0];

			// logo = logo.toUpperCase();
		} else {
			for (let i = 0; i < 2; i++) {
				logo += shopName[i][0].toUpperCase();
			}
		}
		return logo;
	});
</script>

<style scoped>
	.logo-name {
		font-size: 45px;
		width: 95px;
		height: 95px;
		display: flex;
		align-content: space-around;
		justify-content: space-around;
		align-items: center;
		border: 5px solid #ffffff;
		text-transform: uppercase;
	}
</style>
