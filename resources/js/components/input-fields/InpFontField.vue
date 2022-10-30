<template lang="">
	<p class="tracking-wide text-md font-bold mb-4" for="">Font</p>
	<div class="flex gap-3 mt-2">
		<div v-for="font in dataStore.fonts" :key="font.id" class="text-center">
			<div
				:class="
					dataStore.fieldsData.style.fontFamily == font.fontFamily
						? 'border-2 border-violet-600 rounded'
						: ''
				"
				class="p-0.5"
			>
				<div
					class="p-2 border-gray-700 border-2 rounded gap-3 cursor-pointer hover:bg-gray-300 h-20 w-20 text-4xl flex items-center justify-center"
					:style="{ fontFamily: font.fontFamily }"
					@click="dataStore.fieldsData.style.fontFamily = font.fontFamily"
				>
					Aa
				</div>
			</div>
			<p class="mt-1">{{ font.fontName }}</p>
		</div>
	</div>
</template>

<script setup>
import { useDataStore } from "../../stores";
const dataStore = useDataStore();
</script>
