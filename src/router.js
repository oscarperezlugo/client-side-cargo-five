import { createWebHistory, createRouter } from "vue-router";

const routes = [{
        path: "/",
        alias: "/posts",
        name: "posts",
        beforeEnter: guardMyroute,
        component: () =>
            import ("./components/PostList")
    },
    {
        path: "/posts/:id",
        name: "post-details",
        beforeEnter: guardMyroute,
        component: () =>
            import ("./components/Post")
    },
    {
        path: "/add",
        name: "add",
        beforeEnter: guardMyroute,
        component: () =>
            import ("./components/AddPost")
    },
    {
        path: "/users",
        name: "users",
        beforeEnter: guardMyroute,
        component: () =>
            import ("./components/UserList")
    },
    {
        path: "/users/:id",
        name: "user-details",
        beforeEnter: guardMyroute,
        component: () =>
            import ("./components/User")
    },
    {
        path: "/add-user",
        name: "add-user",
        beforeEnter: guardMyroute,
        component: () =>
            import ("./components/AddUser")
    },
    {
        path: "/scraper",
        name: "scraper",
        beforeEnter: guardMyroute,
        component: () =>
            import ("./components/Scraper")
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import ("./components/Login")
    },
    {
        path: "/password",
        name: "password",
        component: () =>
            import ("./components/Password")
    }
];

function guardMyroute(to, from, next) {
    var isAuthenticated = false;
    //this is just an example. You will have to find a better or 
    // centralised way to handle you localstorage data handling 
    if (localStorage.getItem('LoggedUser'))
        isAuthenticated = true;
    else
        isAuthenticated = false;
    if (isAuthenticated) {
        next(); // allow to enter route
    } else {
        next('/login'); // go to '/login';
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;