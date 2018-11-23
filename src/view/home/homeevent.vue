<template>
  <div id="homeevent">
    <div class="newTeamLeft">最新赛事</div>
    <div class="allTeam">
      <div class="allTeamBtn textCen"  @click="goto('/event')">查看全部赛事</div>
    
    </div>
    <swiper class="homeeventSwiper" ref="homeevent" :options="homeeventOption" v-if="show">
      <swiper-slide class="homeeventSlide textCen" v-for="(item,index) in events" :key="index">
        <div class="teamPosition">
          <p class="ft14">{{item.cn_name}}</p>
        <div class="teamImgBox">
      
          <div class="teamImg">
            <div class="teamImgImg"><img :src="domain+item.home_image" alt="">
            </div>
            <p class="ft18">{{item.cn_home_name}}</p>
          </div>
          <div class="vs">VS</div>
          <div class="teamImg">
            <div class="teamImgImg"><img :src="domain+item.away_image" alt=""></div>
            
            <p class="ft18">{{item.cn_away_name}}</p>
          </div>
        </div>
        <p class="ft14">比赛时间</p>
        <p class="teamTime">{{item.time}}</p>
        </div>
        
      </swiper-slide>
      
      <div class="home-swiper-pagination" slot="pagination">
      </div>
    </swiper>
    <div class="swiper-button-prev"></div><!--左箭头-->
      <div class="swiper-button-next"></div><!--右箭头-->
  </div>
</template>

<script>

import {swiper,swiperSlide} from "vue-awesome-swiper"
import {competition} from "@/api/home/home"
export default {
  data () {
    return {
      domain:"",
      show:false,
      homeeventOption:{
        pagination: {
          el: '.home-swiper-pagination',
          clickable :true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      events:[
          {
            cn_name:"英格兰足球超级联赛",
            home_image:require("../../image/home/logo_1.png"),
            away_image:require("../../image/home/logo_2.png"),
            cn_home_name:"曼联",
            cn_away_name:"利物浦",
            time:"2018.9.15 03:00",
            result:"未开赛"
          }
        ],
    }
  },
  created(){
    //  赛事
    competition().then(res=>{
      if(res.status ===200){
        let _base = res.data.data
        this.domain  = _base.domain
        this.events = _base.competition
        this.show = true
      }
    })
  },
  methods:{
    goto(url){
      this.$router.push(url)
    },
  },
  components: {
   
  }
}
</script>

<style lang='stylus' scoped>
#homeevent
  height 4rem
  position relative
  img
    width 100%
    height 100%
  .allTeam
    position absolute
    bottom 0.2rem
    z-index 10
    color #ffffff
    display flex
    justify-content center
    width 100%
    .allTeamBtn
      width 1.5rem
      height 0.3rem
      line-height 0.3rem
      background-color #ff8b47
  .newTeamLeft
    color #ffffff
    font-weight 600
    font-size 0.24rem
    position absolute
    top 0.4rem
    left 0.15rem
    z-index 20
  .homeeventSwiper
    .homeeventSlide
      height 4rem
      color #fff
      background-color #091932
      display flex
      align-items center
      justify-content center
      .teamTime
        padding-top 0.1rem
      .teamImgBox
        padding 0.2rem 0
        display flex
        justify-content center
        align-items center
        .teamImg
          .teamImgImg
            max-width 0.7rem
            max-width 0.7rem
            margin-bottom 0.1rem
            img
              width auto 
              height auto
              max-width 100%
              max-height 100%
        .vs
          padding 0 0.2rem
          font-size 0.22rem
            
</style>
<style lang="stylus">
#homeevent
  .homeeventSwiper
    .home-swiper-pagination
      position absolute
      bottom 0.7rem
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
  .swiper-button-next
    background-image url("../../image/home/icon_rihgt.png")
    background-position center center
    background-size 100% 100%
    width 0.1rem 
    height 0.2rem
  .swiper-button-prev
    background-image url("../../image/home/icon_left.png")
    background-position center center
    background-size 100% 100%
    width 0.1rem 
    height 0.2rem
</style>
