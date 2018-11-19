<template>
  <div id="homebanner">
    <swiper class="homeSwiper" ref="homeSwiper" :options="homeOption" v-if="show">
      <swiper-slide class="homeSwiperSlide" :style="
      'backgroundImage:url('+domain+item.image+')'
      " v-cloak v-for="item in homeSwiper" :key="item.id">
        <div class="homeSwiperText">
          <div class="homeTitle">
            {{item.mark}}
          </div>
          <div class="homeTextContent">
          {{ item.cn_title}}
          </div>
          <div class="camBox">
            <div class="camImg">
              <img src="../../image/cam1.png" alt="">
            </div>
            <div class="homeMore">
              <div class="hover-text" @click="toArticle(item.id,'banner')">更多精彩</div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="home-swiper-pagination" slot="pagination">
      </div>
    </swiper>
  </div>
</template>

<script>

import {swiper,swiperSlide} from "vue-awesome-swiper"
import {banner} from "@/api/home/home"
export default {
  data () {
    return {
      domain:"",
      show:false,
      homeOption:{
        pagination: {
          el: '.home-swiper-pagination',
          clickable :true,
        },
      },
      homeSwiper:[
          {
            mark:"万博体育",
            image:require("../../image/home/banner.png"),
            cn_title:"我以为是青铜没想到是王者安排",
            sortorder:0,
            id:1,
            status:1,
          }
        ],
    }
  },
  created(){
    banner().then(
        res=>{
          if(res.status ===200){
            let _base = res.data.data
            this.domain  = _base.domain
            this.homeSwiper = _base.banner
            this.show = true
          }else{
            this.$message.error(res.data.error)
          }
        }
     )
  },
  methods:{
    toArticle(id,type){
      let _obj = {
        id,
        type
      };
      this.$store.commit('setNewsDetail',{..._obj})
      let _url = "/article?type=" + type +"&id=" +id
      this.$router.push(_url)
    },
  },
  components: {
   
  }
}
</script>

<style lang='stylus' scoped>
#homebanner
  height 3.4rem
  img
    width 100%
    height 100%
  .homeSwiper
    .homeSwiperSlide
      height 3.4rem
      display flex
      align-items center
      padding-left 0.15rem
      color #fff
      background-position center
      background-size cover
      .homeTitle
        font-size 0.11rem
        background-color #ff8b47
        width 0.6rem
        text-align center
      .homeTextContent
        margin 0.2rem 0
        font-size 0.3rem
        width 2rem
        overflow hidden
        text-overflow: ellipsis
        display -webkit-box
        -webkit-line-clamp 3
        -webkit-box-orient vertical
      .camBox
        display flex
        justify-content flex-start
        align-items center
        .camImg
          width 0.27rem
          height 0.2rem
        .homeMore
          margin-left 0.1rem
          border-bottom 2px solid #ff8b47
          .hover-text
            font-size 0.13rem
            line-height 0.24rem

          


 
</style>
<style lang="stylus">
#homebanner
  .homeSwiper
    .home-swiper-pagination
      position absolute
      bottom 0.2rem
      display flex 
      justify-content center
      z-index 10
      .swiper-pagination-bullet
        width 0.2rem
        height 0.04rem
        background-color #8b98a0
        border-radius 0
        opacity 1
        &.swiper-pagination-bullet-active
          background-color #ff8b47
</style>
