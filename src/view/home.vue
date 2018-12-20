<template>
  <div id="home">
    <Home-banner></Home-banner>
    <Home-event></Home-event>
    <Home-news></Home-news>
    <Home-videos></Home-videos>
  </div>
</template>
<script>
import HomeBanner from "@/view/home/homebanner"
import HomeEvent from "@/view/home/homeevent"
import HomeNews from "@/view/home/homenews"
import HomeVideos from "@/view/home/homevideos"
export default {
  data(){
    return {

    }
  },
  components: {
    HomeBanner,
    HomeEvent,
    HomeNews,
    HomeVideos
  },
  mounted () {
    
  },
  methods: {
    

  }
}
</script>

