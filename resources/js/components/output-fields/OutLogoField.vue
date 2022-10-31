<!-- <template>
	<div
		v-if="dataStore.fieldsData.logo != ''"
		class="flex justify-center mt-3 rounded-full"
	>
		<a
			:href="'https://' + dataStore.fieldsData.subdomain + '.kwikz.app'"
			target="_blank"
		>
			<img
				:src="dataStore.fieldsData.logo"
				class="object-contain w-24 h-24 bg-white p-1 rounded-full"
		/></a>
	</div>
	<div v-else>
		<div class="flex justify-center">
			<div
				class="bg-red text-center mt-3 rounded-full bg-[#2F2F2F] text-white logo-name"
			>
				<a
					:href="'https://' + dataStore.fieldsData.subdomain + '.kwikz.app'"
					target="_blank"
				>
					{{ altLogo }}
				</a>
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
</style> -->
