import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import { createPinia } from "pinia";
import "tw-elements";
import { createApp } from "vue";
import "../css/app.css";
import App from "./App.vue";
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
    // console.log("window loaded", dataStore.user);
    if (
        dataStore.token != "" &&
        dataStore.userAuthenticated &&
        dataStore.user &&
        Object.keys(dataStore.user).length > 0
    ) {
        // an authenticated user is present
        // console.log("all cond satis");
        localStorage.setItem("token", dataStore.token);
        localStorage.setItem("userAuthenticated", dataStore.userAuthenticated);
        localStorage.setItem("user", JSON.stringify(dataStore.user));
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("token");
        axios.defaults.headers.common["Accept"] = "application/json";
        // axios.defaults.headers.common["Content-type"] = "application/json";
    } else {
        // if any of the one isn't present
        // make all blank
        dataStore.token = "";
        dataStore.userAuthenticated = false;
        dataStore.user = {};

        localStorage.removeItem("token");
        localStorage.removeItem("userAuthenticated");
        localStorage.removeItem("user");

        delete axios.defaults.headers.common["Authorization"];
    }
};

app.mount("#app");
