<template>
  <div id="sidebar">
    <div @click="toggle" :class="isShow?'cross':''" class="svgMenu">
      <svg viewBox="0 0 800 600">
        <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top"></path>
        <path d="M300,320 L540,320" id="middle"></path>
        <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path>
      </svg>
    </div>
    <div class="itemBox">
    <Sidebar class="sidebar" :pose="isShow ? 'visible': 'hidden'">
      <div class="sidebarList">
        <Item class="item baseItem" v-for="(item,index) in items" :key="index" :class="routerName === item.name?'colorFFF':''" @click.native="goto(item.url)">
          <span>{{item.text}}</span>
        </Item>
        <Item class="icon">
        
          <div  class="iconBox">
            <div class="fenBox">
              <div class="fenItemBox" data-tag="share_1">
               
                <a href="https://www.instagram.com/wanbosports/" class="instagram"></a>
                <a href="https://twitter.com/wanbosports?lang=en" class="twitter"></a>
                <a href="https://www.facebook.com/wanbosports/" class="facebook"></a>
              </div>
            </div>
          </div>
        </Item>

      </div>
      
    </Sidebar>
    </div>
  </div>
</template>
<script>
import posed from "vue-pose"
export default {
  data () {
    return {
      routerName:"home",
      isShow:false,
      items: [
        {
          text:"首页",
          url:"/home",
          name:'home'
        },
        {
          text:"最新赛事",
          url:"/event",
          name:"event"
        },
        {
          text:"新闻资讯",
          url:"/news",
          name:"news"
        }
      ]
    }
  },
  watch:{
    $route(to,from){
      this.routerName = to.name
    }
  },
   mounted(){
      this.$nextTick(function () {
      window.addEventListener('scroll', this.onScroll)
     
        window._bd_share_config = {
          "common":{
            "bdSnsKey":{},
            "bdText":"",
            "bdMini":"2",
            "bdPic":"",
            "bdStyle":"0",
            "bdSize":"16"
          },
          "share":{}
        };
        const s = document.createElement('script')
        s.type = 'text/javascript'
        s.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)
        document.body.appendChild(s)
    })
  },
  methods:{
    toggle(){
      this.isShow = !this.isShow
    },
    change(){
      this.isShow = false
    },
    goto(url){
      this.isShow = false
      this.$router.push(url)
    }
  },
  components: {
    Sidebar: posed.div({
      visible: {
        x: 0,
        beforeChildren: true,
        staggerChildren: 100
      },
      hidden: {
        x: '100%',
        afterChildren: true,
        staggerChildren: 100
      }
    }),
    Item: posed.div({
      visible: { opacity: 1, y: 0 },
      hidden: { opacity: 0, y: 10 }
    })
  }
}
</script>

<style lang='stylus' scoped>
easeInOutSine = cubic-bezier(0.445, 0.050, 0.550, 0.950)
easeOutBack   = cubic-bezier(0.250,-0.250, 0.750, 1.250)
easing = easeOutBack
duration = .5s
dash-offset-cross = 0px
cross-length = 950px
#sidebar
  position fixed
  top 0
  right 0
  z-index 1000
  font-size 0.26rem
  
  .itemBox
    position fixed
    right 0
    top 0
    color rgba(255,255,255,0.3)
    z-index 10
    height 0
    .sidebar
      transform translateX(100%)
      width 100vw
      height 100vh
      position relative
      background-color rgba(12,19,42,0.9)
      display flex
      flex-wrap wrap
      align-items center
      justify-content center
      .sidebarList

        .item
          margin 0.2rem 0 
          text-align center
          width 100%
          &.job
            border-bottom 1px solid #cccccc
          &.big
            font-size 0.3rem
            line-height 0.7rem
            font-weight 600
          &.about
            margin-top 0.1rem
            line-height 0.6rem
            margin-bottom 0.06rem
            span
              display inline-block
              border-bottom 1px solid #ccc
          &.baseItem
            height 0.5rem
            line-height 0.5rem
          &.tell
            border-top 1px solid #ccc
        .icon
          width 100%
          padding-top 0.6rem
          .iconBox
            .fenBox
              display flex
              align-items center
              justify-content center
              .fenItemBox
                display flex
                align-items center
                a
                  padding-left 0
                  margin 0 0.1rem
                  width 0.3rem
                  height 0.3rem
                  background-size 100% 100%
                  background-position 0
                  display inline-block
                  &:first-of-type
                    margin-left 0
                .instagram
                  background-image url("../image/menu/insta.png")
                .twitter

                  background-image url("../image/menu/twitter.png")

                .facebook

                  background-image url("../image/menu/facebook.png")
  .svgMenu
    position absolute
    top 0rem
    right 0rem
    width 0.8rem
    height 0.6rem
    text-align center
    z-index 2000
    display flex
    justify-content center
    align-items center
    color #fff
  svg
    width 0.8rem
    height 0.6rem
    cursor pointer
    transform translate3d(0,0,0)
    
  path
    fill none
    transition stroke-dashoffset duration easing, stroke-dasharray duration easing
    stroke-width 0.2rem
    stroke-linecap round
    stroke #fff
    stroke-dashoffset 0px
    &#top
    &#bottom
      stroke-dasharray 240px cross-length
    &#middle
      stroke-dasharray 240px 240px

  .cross
    path
      &#top
      &#bottom
        stroke-dashoffset -650px
        stroke-dashoffset -650px
      &#middle
        stroke-dashoffset -115px
        stroke-dasharray 1px 220px

</style>
