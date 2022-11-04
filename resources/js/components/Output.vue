<template>
    <div
        class="md:w-[300px] h-screen md:h-[620px] mx-auto border-[7px] border-black rounded-[32px] px-3 items-center overflow-y-auto no-scrollbar pb-5 mt-5"
        :style="{
            color: dataStore.fieldsData.color,
            background: background,
            fontFamily: dataStore.fieldsData.style.fontFamily,
        }"
    >
        <component :is="dataStore.fieldsMap.logo.out" />
        <component :is="dataStore.fieldsMap.name.out" />
        <component :is="dataStore.fieldsMap.bio.out" />

        <div v-for="(field, index) in dataStore.fields" class="">
            <component
                v-if="!field.deleted && field.active"
                :is="field.out"
                v-bind="sendProps(index)"
            />
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useDataStore } from "../stores";

const dataStore = useDataStore();

const sendProps = (fieldId) => {
    return {
        fieldId: fieldId,
        propsId: dataStore.fields[fieldId].propsId,
    };
};

const background = computed(() => {
    return dataStore.fieldsData.style.bgColorType == "solid"
        ? dataStore.fieldsData.style.bgColor.color1
        : "linear-gradient(to bottom," +
              dataStore.fieldsData.style.bgColor.color1 +
              " 0%, " +
              dataStore.fieldsData.style.bgColor.color2 +
              " 100%)";
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
