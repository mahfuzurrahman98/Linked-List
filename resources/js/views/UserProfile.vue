<template>
    <div class="py-3 px-3 h-100 flex justify-center" :style="{
        color: dataStore.fieldsData.color,
        background: background,
        fontFamily: dataStore.fieldsData.style.fontFamily,
    }">
        <div class="w-[320px]">
            <component :is="dataStore.fieldsMap.logo.out" />
            <component :is="dataStore.fieldsMap.name.out" />
            <component :is="dataStore.fieldsMap.bio.out" />
            <div v-for="(field, index) in dataStore.fields" class="">
                <component v-if="!field.deleted && field.active" :is="field.out" v-bind="sendProps(index)" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDataStore } from "../stores";

const dataStore = useDataStore();
const route = useRoute();
const router = useRouter();

const username = route.params.username;
console.log("here in user profik")
onMounted( async () => {
    await dataStore.getData(username);
    console.log('dataStore-user: ', dataStore.user)
    if (Object.keys(dataStore.fieldsData.user).length === 0 ) {
      router.push({name: 'page-not-found'});
    }
});

const sendProps = (fieldId) => {
    return {
        fieldId: fieldId,
        propsId: dataStore.fields[fieldId].propsId,
    };
};

const background = computed(() => {
    return dataStore.fieldsData.style.bgColorType == "solid" ?
        dataStore.fieldsData.style.bgColor.color1 :
        "linear-gradient(to bottom," +
        dataStore.fieldsData.style.bgColor.color1 +
        " 0%, " +
        dataStore.fieldsData.style.bgColor.color2 +
        " 100%)";
});

</script>
