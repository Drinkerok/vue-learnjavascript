import Vue from "vue";
import Router from "vue-router";
import IndexPage from "./views/IndexPage.vue";
import EditUserPage from "./views/EditUserPage.vue";
import AddUserPage from "./views/AddUserPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  linkExactActiveClass: "navigation__link--active",
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
      path: "/add",
      name: "addUser",
      component: AddUserPage
    }
  ]
});
