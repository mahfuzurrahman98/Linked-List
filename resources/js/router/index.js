import { createRouter, createWebHistory } from "vue-router";
import Admin from "../views/Admin.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
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
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                auth: false,
            },
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                auth: false,
            },
        },
    ],
});

// router.beforeEach((to, from, next) => {
//     if (auth in to.meta) {
//         // this route has auth
//         if (to.meta.auth) {
//             // only when user is authenticated
//         } else {
//             // only when user isn't authenticated
//         }
//     } else {
//         // doesn't care about authentication
//     }
// });

export default router;
