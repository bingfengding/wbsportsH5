<template>
  <div id="homeVideos">
    <p class="title">精彩视频</p>
    <div class="modal" v-if="showModal" @click="stopVideo">
      <div class="baseVideo" @click.stop>
        <player :state="state" :video-url="baseUrl"></player>
      </div>
    </div>
    <div class="videosBox">
      <ul>
        <li v-for="(item,index) in videosList" :key="index" class="videoItem" :style="'backgroundImage:url('+ domain+item.image +')'"
        @click="playVideo(item.url)"
        >
        <div class="itemModal"></div>
          <div class="playerCen">
            <div class="playerImg">
              <img src="../../image/home/player.png" alt="">
            </div>
          </div>
          <div class="videoText">
            {{item.cn_title}}
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="moreVideos">
      <div class="ipt" @click="goto('/videos')">查看更多视频</div>
    </div> -->
  </div>
</template>

<script>
import player from "@/components/player"
import {videos} from "@/api/home/home"
export default {
  data () {
    return {
      showModal:false,
      state:true,
      domain:"",
      baseUrl:"",
      videosList:[
        {
          id:1,
          image:"",
          cn_title:"",
          url:"",

        }
      ]
    }
  },
  created(){
    videos().then(res=>{
      let _base = res.data.data
      this.domain = _base.domain
      this.videosList = _base.videos
    })
  },
  methods:{
    playVideo(url){
      this.state = false
      if(url !== this.baseUrl) {
        this.baseUrl = ""
        this.baseUrl = url
      }
      this.showModal = true
    },
    stopVideo(){
      this.showModal = false
      this.state = true
    },
    goto(url){
      // this.$router.push(url)
    }
  },
  components: {
    player
    
  }
}
</script>

<style lang='stylus' scoped>
#homeVideos
  padding 0.4rem 0.15rem
  .title
    font-size 0.24rem
    color #ff8b47
    padding-bottom 0.1rem
  .modal
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0,0,0,0.8)
    z-index 1000
    display flex
    justify-content center
    align-items center
    .baseVideo
      min-width 100%
  .moreVideos
    display flex
    justify-content center
    padding-top 0.3rem
    .ipt
      color #fff
      font-size 0.16rem
      line-height 0.3rem
      width 1.5rem
      height 0.3rem
      background-color #ff8b47
      text-align center
      
  .videosBox
    .videoItem
      width 2.9rem
      height 1.5rem
      margin-bottom 0.1rem
      padding 0.15rem
      background-size cover
      background-position center
      color #ffffff
      cursor pointer
      font-size 0.16rem
      padding-top 0.55rem
      position relative
      .itemModal
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background-color rgba(0,0,0,0.5)
      .videoText
        position relative
      .playerCen
        position relative
        display flex
        justify-content center
        padding-bottom 0.1rem
        z-index 10
        .playerImg
          width 0.4rem
          height 0.4rem
          img
            width 100%
            height 100%
 
</style>
