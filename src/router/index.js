import Vue from "vue";
import Router from "vue-router";
const home = r =>
  require.ensure([], () => r(require("@/view/home.vue")), "home");
const event = r =>
  require.ensure([], () => r(require("@/view/event.vue")), "event");
const news = r =>
  require.ensure([], () => r(require("@/view/news.vue")), "news");
const article = r =>
  require.ensure([], () => r(require("@/view/article.vue")), "article");
Vue.use(Router);

export const RouterMap = [
  {
    path: "",
    redirect: "home"
  },{
    path: '/home',
    name: 'home',
    component: home
  },{
    path: '/event',
    name: 'event',
    component: event
  },{
    path: '/news',
    name: 'news',
    component: news
  },{
    path: '/article',
    name: 'article',
    component: article
  },
];

const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: RouterMap
});
  

export default router