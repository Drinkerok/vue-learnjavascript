import Vue from "vue";
import Router from "vue-router";
import IndexPage from "./views/IndexPage.vue";
import EditUserPage from "@/views/EditUserPage.vue";
import AddUserPage from "@/views/AddUserPage.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(Router);
Vue.use(NProgress);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "navigation__link--active",
  routes: [
    {
      path: "/",
      name: "IndexPage",
      component: IndexPage
    },
    {
      path: "/edit/:id",
      name: "EditUser",
      component: EditUserPage
    },
    {
      path: "/add",
      name: "AddUser",
      component: AddUserPage
    }
  ]
});

router.beforeResolve((to, from, next) => {
  if (to.path) {
    NProgress.start();
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
