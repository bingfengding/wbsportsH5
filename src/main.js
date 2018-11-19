// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "@/style/reset.css"
import "@/utils/rem";
import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.css'
import Mint from "mint-ui";
import VideoPlayer from 'vue-video-player'
import VueAwesomeSwiper from "vue-awesome-swiper"
import store from "./store";
import 'animate.css'
const FastClick = require('fastclick')
FastClick.attach(document.body)
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')


Vue.config.productionTip = false
Vue.use(Mint)

Vue.use(VueAwesomeSwiper)
Vue.use(VideoPlayer)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
