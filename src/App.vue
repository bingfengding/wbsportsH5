<template>
  <div id="app">
    <Bg-header></Bg-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
     <Bg-footer></Bg-footer>
     <Bg-sidebar></Bg-sidebar>
  </div>
</template>
<script>
import BgFooter from "@/components/footer"
import BgHeader from "@/components/header"
import BgSidebar from '@/components/sidebar'
export default {
  name: 'App',
  components:{
    BgFooter,
    BgHeader,
    BgSidebar
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top:0.6rem;
  font-size:0.16rem;
}
</style>
