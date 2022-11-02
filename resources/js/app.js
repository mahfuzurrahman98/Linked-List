import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import "tw-elements";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import router from "./router";
import { useDataStore } from "./stores";

library.add(fas);
library.add(fab);
library.add(far);

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(pinia);

const dataStore = useDataStore();

window.onload = function () {
    // persist the sate
    console.log("window loaded", dataStore.user);
    if (
        dataStore.token != "" &&
        dataStore.userAuthenticated &&
        dataStore.user &&
        Object.keys(dataStore.user).length > 0
    ) {
        // an authenticated user is present
        console.log("all cond satis");
        localStorage.setItem("token", dataStore.token);
        localStorage.setItem("userAuthenticated", dataStore.userAuthenticated);
        localStorage.setItem("user", JSON.stringify(dataStore.user));
    } else {
        // if any of the one isn't present
        // make all blank
        dataStore.token = "";
        dataStore.userAuthenticated = false;
        dataStore.user = {};

        localStorage.removeItem("token");
        localStorage.removeItem("userAuthenticated");
        localStorage.removeItem("user");
    }
};

app.mount("#app");
