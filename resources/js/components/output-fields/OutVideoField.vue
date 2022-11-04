<template lang="">
    <div
        class="mt-3 p-2 border-2 border-gray-200 bg-white text-center rounded-[20px]"
        v-if="
            embedLink != '' && dataStore.fieldsData.videos[propsId].title != ''
        "
    >
        <div class="accordion" id="accordionExample">
            <div class="accordion-item bg-white border-0">
                <h2 class="accordion-header mb-0" id="headingOne">
                    <button
                        class="accordion-button relative flex items-center content-center w-full p-[5px] text-base bg-white border-0 rounded-none transition text-black text-center focus:outline-none collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#collapseVideo' + propsId"
                        aria-expanded="true"
                        :aria-controls="'collapseVideo' + propsId"
                    >
                        <font-awesome-icon icon="fa-regular fa-circle-play" />
                        <p
                            class="flex capitalize w-full flex-nowrap justify-center content-center"
                        >
                            {{ dataStore.fieldsData.videos[propsId].title }}
                        </p>
                    </button>
                </h2>
                <div
                    :id="'collapseVideo' + propsId"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                >
                    <div class="accordion-body py-4 px-5">
                        <iframe
                            v-if="embedLink != ''"
                            class="w-full"
                            height="200"
                            :src="embedLink"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
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

const embedLink = computed(() => {
    let url = dataStore.fieldsData.videos[props.propsId].value;
    let tempLink = "";
    if (url.includes("youtu.be/")) {
        tempLink = url.replace("youtu.be/", "youtube.com/embed/");
    } else if (url.includes("m.youtube.com/watch?v=")) {
        tempLink = url.replace(
            "m.youtube.com/watch?v=",
            "www.youtube.com/embed/"
        );
    } else if (url.includes("www.youtube.com/watch?v=")) {
        tempLink = url.replace(
            "www.youtube.com/watch?v=",
            "www.youtube.com/embed/"
        );
    }
    return tempLink;
});
</script>
