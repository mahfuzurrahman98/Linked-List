<template>
  <p class="tracking-wide text-md font-bold mb-4" for="">Background</p>
  <p class="text-gray-500">Type</p>

  <div class="flex my-3 gap-x-7">
    <!-- Solid color -->
    <div class="text-center">
      <div
        class="cursor-pointer p-0.5 rounded"
        :class="
          dataStore.fieldsData.style.bgColorType == 'solid'
            ? 'border-2 border-blue-800'
            : ''
        "
        @click="dataStore.fieldsData.style.bgColorType = 'solid'"
      >
        <div
          class="rounded h-28 w-20"
          :style="{
            background: dataStore.fieldsData.style.bgColor.color1,
          }"
        ></div>
      </div>
      <p class="mt-2">Solid</p>
    </div>

    <!-- Gradient color -->
    <div class="text-center">
      <div
        class="cursor-pointer p-0.5 rounded"
        :class="
          dataStore.fieldsData.style.bgColorType == 'gradient'
            ? 'border-2 border-blue-800'
            : ''
        "
        @click="dataStore.fieldsData.style.bgColorType = 'gradient'"
      >
        <div
          class="rounded h-28 w-20"
          :style="{
            background: dataStore.gradientBackground,
          }"
        ></div>
      </div>
      <p class="mt-2">Gradient</p>
    </div>

    <div class="">
      <p class="mb-2 text-gray-500">Colour</p>
      <div class="flex gap-x-2">
        <input
          class="rounded h-6 w-6 cursor-pointer"
          type="color"
          v-model="dataStore.fieldsData.style.bgColor.color1"
        />
        <input
          class="appearance-none border-2 border-gray-200 rounded w-full py-0 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
          type="text"
          v-model="dataStore.fieldsData.style.bgColor.color1"
        />
      </div>

      <div
        class="flex gap-x-2 mt-5"
        v-if="dataStore.fieldsData.style.bgColorType == 'gradient'"
      >
        <input
          class="rounded h-6 w-6 cursor-pointer"
          type="color"
          v-model="dataStore.fieldsData.style.bgColor.color2"
        />
        <input
          class="appearance-none border-2 border-gray-200 rounded w-full py-0 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
          type="text"
          v-model="dataStore.fieldsData.style.bgColor.color2"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useDataStore } from "../../stores";
  const dataStore = useDataStore();

  const background = computed(() => {
    return (
      "linear-gradient(to bottom," +
      dataStore.fieldsData.style.bgColor.color1 +
      " 0%, " +
      dataStore.fieldsData.style.bgColor.color2 +
      " 100%)"
    );
  });
</script>

<style></style>
