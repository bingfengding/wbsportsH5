<template>
  <div id="header">
    <div class="svgBox" @click="goto('/home')"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods:{
    goto(url){
      this.$router.push(url)
    }
  },
  components: {
    
  }
}
</script>

<style lang='stylus' scoped>
#header
  height 0.6rem
  background-color #0c132a
  position fixed
  top 0
  left 0
  width 100%
  display flex
  align-items center
  padding-left 0.2rem
  z-index 50
  .svgBox
    width 1.2rem
    height 0.35rem
    background-image url("../image/header/logo.svg")
    background-size 100% 100%
    

 
</style>
