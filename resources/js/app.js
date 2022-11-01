import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import "tw-elements";
import { createApp } from "vue";
import { useRoute } from "vue-router";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
// import { useDataStore } from "./stores";

const route = useRoute();

library.add(fas);
library.add(fab);
library.add(far);

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);

app.mount("#app");
