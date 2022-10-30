<template>
	<div class="mt-3 p-2 bg-white text-center rounded-[20px]">
		<div class="accordion" id="accordionExample4">
			<div class="accordion-item bg-white border-0">
				<h2 class="accordion-header mb-0" id="headingOne4">
					<button
						class="accordion-button relative flex items-center content-center w-full p-[5px] text-base bg-white border-0 rounded-none transition text-black text-center focus:outline-none collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseF1"
						aria-expanded="true"
						aria-controls="collapseF1"
					>
						<font-awesome-icon icon="fa-solid fa-shop" />
						<p
							class="flex capitalize w-full flex-nowrap justify-center content-center"
						>
							{{ dataStore.fieldsData.shopText }}
						</p>
					</button>
				</h2>
				<div
					id="collapseF1"
					class="accordion-collapse collapse"
					aria-labelledby="headingOne4"
					data-bs-parent="#accordionExample4"
				>
					<div
						class="accordion-body py-4 px-5"
						v-if="Object.keys(dataStore.fieldsData.categories).length == 0"
					>
						Your shop is empty!<br />
						Please
						<a
							class="text-blue-700 underline"
							:href="
								'https://' +
								dataStore.fieldsData.subdomain +
								'.kwikz.app/signin'
							"
							>sign in</a
						>
						and add products or items to your shop.
					</div>

					<div class="accordion-body py-4 px-1" v-else>
						<div class="text-start">
							<button class="p-2 rounded-lg text-start cat-btn mb-5">
								{{ categories.name }}
							</button>
						</div>
						<div v-if="dataStore.fieldsData.fieldsView == 1">
							<!-- first item -->
							<div class="mt-2 grid grid-cols-3">
								<div class="col-span-2 text-start">
									<div class="font-bold text-sm">
										{{ categories.items[0].name }}
									</div>
									<div class="text-gray-500 text-xs mt-2">
										{{ categories.items[0].description }}
									</div>
									<div class="font-bold text-sm mt-2">
										৳{{ categories.items[0].price }}
									</div>
								</div>
								<div
									class="flex justify-end"
									v-if="categories.items[0].image != ''"
								>
									<img
										class="rounded-md"
										:src="dataStore.server + categories.items[0].image"
										:style="{ width: '65px', height: '65px' }"
										alt=""
									/>
								</div>
								<div class="flex justify-end" v-else>
									<div class="flex justify-center">
										<div
											class="flex justify-around items-center bg-red text-center bg-gray-100 text-black text-2xl"
											:style="{ width: '65px', height: '65px' }"
										>
											{{ altLogo1 }}
										</div>
									</div>
								</div>
							</div>
							<!-- second item -->
							<div v-if="categories.items.length > 1">
								<hr class="mt-3" />
								<div class="mt-2 grid grid-cols-3">
									<div class="col-span-2 text-start">
										<div class="font-bold text-sm">
											{{ categories.items[1].name }}
										</div>
										<div class="text-gray-500 text-xs mt-2">
											{{ categories.items[1].description }}
										</div>
										<div class="font-bold text-sm mt-2">
											৳{{ categories.items[1].price }}
										</div>
									</div>
									<div
										class="flex justify-end"
										v-if="categories.items[1].image != ''"
									>
										<img
											class="rounded-md"
											:src="dataStore.server + categories.items[1].image"
											:style="{ width: '65px', height: '65px' }"
											alt=""
										/>
									</div>
									<div class="flex justify-end" v-else>
										<div class="flex justify-center">
											<div
												class="flex justify-around items-center bg-red text-center bg-gray-100 text-black text-2xl"
												:style="{ width: '65px', height: '65px' }"
											>
												{{ altLogo2 }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div v-else>
							<div class="flex gap-x-5">
								<!-- first item -->
								<div class="">
									<div class="" v-if="categories.items[0].image != ''">
										<img
											class="rounded-md"
											:src="dataStore.server + categories.items[0].image"
											alt=""
										/>
									</div>
									<div class="flex justify-end" v-else>
										<div class="flex justify-center">
											<div
												class="flex justify-around items-center bg-red text-center bg-gray-100 text-black text-4xl"
												:style="{ width: '129px', height: '129px' }"
											>
												{{ altLogo1 }}
											</div>
										</div>
									</div>
									<div class="text-start">
										<div class="font-bold text-sm mt-2">
											৳{{ categories.items[0].price }}
										</div>
										<div class="text-sm">
											{{ categories.items[0].name }}
										</div>
									</div>
								</div>
								<!-- second item -->
								<div v-if="categories.items.length > 1">
									<div class="">
										<div class="" v-if="categories.items[1].image != ''">
											<img
												class="rounded-md"
												:src="dataStore.server + categories.items[1].image"
												alt=""
											/>
										</div>
										<div class="flex justify-end" v-else>
											<div class="flex justify-center">
												<div
													class="flex justify-around items-center bg-red text-center bg-gray-100 text-black text-4xl"
													:style="{ width: '129px', height: '129px' }"
												>
													{{ altLogo2 }}
												</div>
											</div>
										</div>
										<div class="text-start">
											<div class="font-bold text-sm mt-2">
												৳{{ categories.items[1].price }}
											</div>
											<div class="text-sm">
												{{ categories.items[1].name }}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="text-blue-600 underline">
						<a
							:href="
								'https://' + dataStore.fieldsData.subdomain + '.kwikz.app/'
							"
							target="blank"
							>view more</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed } from "vue";
	import { useDataStore } from "../../stores";
	const dataStore = useDataStore();
	const props = defineProps(["fieldId", "propsId"]);

	const categories = dataStore.fieldsData.categories;

	const altLogo1 = computed(() => {
		let logo = "";
		let shopName = categories.items[0].name;
		shopName = shopName.split(" ");

		if (shopName.length == 1) {
			logo = shopName[0][0].toUpperCase();
			// logo = shopName[0][0];
			// logo = logo.toUpperCase();
		} else {
			for (let i = 0; i < 2; i++) {
				logo += shopName[i][0].toUpperCase();
			}
		}
		return logo;
	});

	const altLogo2 = computed(() => {
		let logo = "";
		let shopName = categories.items[1].name;
		shopName = shopName.split(" ");

		if (shopName.length == 1) {
			logo = shopName[0][0].toUpperCase();
			// logo = shopName[0][0];
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
	.accordion-button:not(.collapsed) {
		color: #000;
		box-shadow: unset;
	}
	.cat-btn {
		border: 1px solid #d5dbff;
	}
	.cat-btn:hover {
		background: #eceef9;
	}
</style>
