import Vue from "vue";
import Router from "vue-router";
import IndexPage from "./views/IndexPage.vue";
import EditUserPage from "./views/EditUserPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexPage
    },
    {
      path: "/edit/:id",
      name: "editUser",
      component: EditUserPage
    },
    {
      path: "/add/",
      name: "addUser",
      component: EditUserPage
    }
  ]
});
