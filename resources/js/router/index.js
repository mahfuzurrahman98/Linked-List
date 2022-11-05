import { createRouter, createWebHistory } from "vue-router";
import { useDataStore } from "../stores";
import Admin from "../views/Admin.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import UserProfile from "../views/UserProfile.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                auth: false,
            },
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                auth: false,
            },
        },
        {
            path: "/admin",
            name: "admin",
            component: Admin,
            meta: {
                auth: true,
            },
        },
        {
            path: "/:username",
            name: "user-profile",
            component: UserProfile
        },
    ],
});

// route middlewares
router.beforeEach((to, from, next) => {
    const dataStore = useDataStore();
    // console.log(dataStore.user);
    // console.log(to.name);

    if ("meta" in to && "auth" in to.meta) {
        // this route has auth
        if (to.meta.auth) {
            // user must be authenticated
            if (!dataStore.userAuthenticated) {
                // but he/she isn't
                next({ name: "login" });
                // next("/login");
            } else {
                next();
            }
        } else {
            // user must be un-authenticated
            if (dataStore.userAuthenticated) {
                // but he/she isn't
                next({ name: "admin" });
            } else {
                next();
            }
        }
    } else {
        // doesn't care about authentication
        next();
    }
});

export default router;
