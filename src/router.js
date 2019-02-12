import Vue from "vue";
import Router from "vue-router";
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
      component: () => import("./views/IndexPage.vue")
    },
    {
      path: "/edit/:id",
      name: "EditUser",
      component: () => import("./views/EditUserPage.vue")
    },
    {
      path: "/add",
      name: "AddUser",
      component: () => import("./views/AddUserPage.vue")
    },
    {
      path: "/phonebook",
      name: "Phonebook",
      component: () => import("./views/Phonebook.vue")
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
