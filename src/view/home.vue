<template>
  <div id="home">
    <Home-banner></Home-banner>
    <Home-event></Home-event>
    <Home-news></Home-news>
  </div>
</template>
<script>
import HomeBanner from "@/view/home/homebanner"
import HomeEvent from "@/view/home/homeevent"
import HomeNews from "@/view/home/homenews"
export default {
  data(){
    return {

    }
  },
  components: {
    HomeBanner,
    HomeEvent,
    HomeNews
  },
  mounted () {
    
  },
  methods: {
    

  }
}
</script>

