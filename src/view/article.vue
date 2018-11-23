<template>
  <div id="article">
    <div class="bannerImg" :style="'backgroundImage:url('+bannerImg+')'">
    </div>
    <div class="main">
      <div class="icon">
        <div class="iconImg"><img src="../image/article/1.png" alt=""></div>
      </div>
      <div class="title bold">
        {{title}}
      </div>
      <div class="htmlBox">
        <div class="html" v-html="articleContent"></div>
      </div>
      <div class="fenxiang">
        <p class="text">
          分享：
        </p>
        <div class="fenBox">
          <div class="bdsharebuttonbox" data-tag="share_1">
            <a class="bds_tsina" data-cmd="tsina"></a>
            <a class="bds_weixin" data-cmd="weixin"></a>
          </div>
        </div>
      </div>
      <div class="upDown" v-show="previous !== -1 || next !== -1">
        <div class="previousBox" v-show="previous !== -1" @click="toArticle(previous,'news')">
          <div class="upDownImg">
            <img src="../image/article/2.png" alt="">
          </div>
          <p>上篇新闻</p>
        </div>
        <div class="nextBox" v-show="next !== -1" @click="toArticle(next,'news')">
          <div class="upDownImg">
            <img src="../image/article/3.png" alt="">
          </div>
          <p>下篇新闻</p>
        </div>
      </div>
    </div>
    <div class="sameNews">
      <div class="title">相关新闻</div>
      <ul  
        class="newsList"
        >
        <li v-for="(item,index) in newsList" :key="index" class="newsItem">
          <div class="newsItemImg" :style="'backgroundImage:url('+domain+item.image+')'">
          </div>
          <div class="textBox">
            <div>
               <p class="ft12">
                <span class="colorOrange">{{item.cn_name}}</span> / {{item.startdate}}</p>
                <p class="bold">{{item.cn_title}}</p>
                <div class="moreBox">
                  <div class="moreNews ft12" @click="toArticle(item.id,'news')">查看更多</div>
                </div>
            </div>
           
            
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import player from '@/components/player'
import {newsDetail,focus,newslist,support} from "@/api/home/home"
import { mapGetters } from 'vuex'
import { setInterval, clearInterval } from 'timers';
export default {
  data () {
    return {
      next:-1,
      previous:-1,
      domain:"",
      title:"我以为是青铜没想到是王者安排",
      bannerImg:require("../image/event/banner.png"),
      logBox:[
          {
            url:require("../image/article/news.png")
          }
        ],
    
        newsList:[
          {
            image:require("../image/article/news.png"),
            startdate:"15.09.2018",
            cn_name:"曼联",
            cn_title:"原来以为是 青铜结果是 稍等fds sdf s 阿瑟东啊王者安排",
            url:"",
            id:1,
          }
        ],
        // videoList:[
        //   {
        //     image:require("../image/article/video_01.png"),
        //     cn_title:"原本以为是青铜 结果是王者",
        //     url:require("../image/home/videos/1.mp4"),
        //     id:1,
        //   }
        // ],
        articleContent:"訴紀出是！的家星，家",
        focus:{
         bg_image:require("../image/footer/bg.png"),
         focus_url:"https://www.weibo.com/u/6728889134",
         id:1,
         image:require("../image/footer/header.png"),
         subtitle:"知名体育博主 知名博主",
         title:"万博体育"

       },
       incoList:[
         {
           smallimage:""
         }
       ],
       textList:[
        {
          cn_name:"英超",
          startdate:"15.09.2018",
          cn_title:"最新最全的英超资讯都在这里",
          url:"",
          id:1,
        },{
          cn_name:"英超",
          startdate:"15.09.2018",
          cn_title:"最新最全的英超资讯都在这里",
          url:"",
           id:2,
        },{
          cn_name:"英超",
          startdate:"15.09.2018",
          cn_title:"最新最全的英超资讯都在这里",
          url:"",
           id:3,
        },
      ]
     }
   },
    created(){
      this.getUrl()
      //  关注
    focus().then(res=>{
      if(res.status ===200){
         let _base = res.data.data
         this.domain = _base.domain
         this.focus = _base.focus
       }
    })
     newslist().then(res=>{
       if(res.status ===200){
         let _base = res.data.data
         this.domain = _base.domain
         this.textList = _base.threeNews
       }
     })
     support().then(res=>{
       if(res.status ===200){
          let _base = res.data.data
          this.domain = _base.domain
          this.incoList = _base.support

       }
     })
     
    
    },
   computed:{
      ...mapGetters([
      'getNewsDetail'
    ])
   },

    beforeCreate(){
       window._bd_share_main = "";
    },
    watch:{
      $route(to,from){
        if(to.name === "article")
        this.getUrl()
      }
    },
    mounted(){
      this.$nextTick(()=>{
        // this.baseVideo = this.videoList[0].url
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
    getUrl(){
      let _obj = {}
      let num = window.location.hash.indexOf('?')
      if(num+1){
        let _string = window.location.hash.slice(num+1)
        let _arr1 = _string.split("&")
        _arr1.forEach((item)=>{
          let _arr2 = item.split("=")
          _obj[_arr2[0]] = _arr2[1]
        })

      }else {
        _obj = this.getNewsDetail
      }

      newsDetail({..._obj}).then(res=>{
        if(res.status==200){
          let _base = res.data.data
          this.domain = _base.domain
          this.videoList = _base.relationVideos
          this.newsList = _base.relationNews
          this.title = _base.newsDetail.cn_title
          this.articleContent = _base.newsDetail.maincontent
          this.bannerImg = this.domain+_base.newsDetail.image
          this.next = _base.next
          this.previous = _base.previous
          // console.log(typeof this.next)
          // console.log(this.next,this.previous)

          // console.log(this.previous !== -1)
        }
      })
    },
    guanzhu(){
        window.top.open(this.focus.focus_url)
      },
    toArticle(id,type){
      let _obj = {
        id,
        type
      }
      this.$store.commit('setNewsDetail',{..._obj})
      let _url = "/article?type=" + type +"&id=" +id
      this.$router.push(_url)
      let _obj1 = {}
      let num = window.location.hash.indexOf('?')
      if(num+1){
        let _string = window.location.hash.slice(num+1)
        let _arr1 = _string.split("&")
        _arr1.forEach((item)=>{
          let _arr2 = item.split("=")
          _obj1[_arr2[0]] = _arr2[1]
        })

      }else {
        _obj1 = this.getNewsDetail
      }
      newsDetail({..._obj1}).then(res=>{
        if(res.status==200){
          let _base = res.data.data
          this.domain = _base.domain
          this.videoList = _base.relationVideos
          this.newsList = _base.relationNews
          this.title = _base.newsDetail.cn_title
          this.next = _base.next
          this.previous = _base.previous
          // console.log(this.next,this.previous)
          this.articleContent = _base.newsDetail.maincontent
          this.bannerImg = this.domain+_base.newsDetail.image
 
        }
      })
      this.top()
    },
    gotoHome(){
      this.$router.push("/")
    },
    openVideo(index){
      this.ifShowVideo = true
      this.baseVideo = this.videoList[index].url 
      this.state = false
    },
    modelClick(){
      this.ifShowVideo = false
      this.state = true
      this.baseVideo = ""
    },
    top(){
      let step =  document.documentElement.scrollTop / 50 || document.body.scrollTop / 50
      let timer = setInterval(()=>{
        let distance = document.documentElement.scrollTop || document.body.scrollTop
        
        document.documentElement.scrollTop = distance - step
        document.body.scrollTop = distance - step
        if(distance <= 0){
          clearInterval(timer)
        }
      },10)
    }
  },
  components: {
    //player
  }
}
</script>

<style lang='stylus' scoped>
#article
  img
    width 100%
    height 100%
  .bannerImg
    height 1.4rem
    background-size cover
    background-position center center
    margin-bottom 0.2rem
  .main
    margin 0 0.15rem
    border-bottom 1px solid #e0e0e0
    margin-bottom 0.4rem
    .icon
      padding-bottom 0.1rem
      .iconImg
        width 0.6rem
        height 0.15rem
    .title
      font-size 0.28rem
      color #000000
      padding-bottom 0.2rem
    .fenxiang
      .text
        color #a3a3a3
        font-size 0.24rem
        padding-bottom 0.2rem
    .upDown
      display flex
      justify-content space-between
      height 0.8rem
      position relative
      padding-bottom 0.2rem
      .previousBox
        position absolute
        left 0%
        top 0%
      .nextBox
        position absolute
        right 0%
        top 0%
        display flex
        justify-content flex-end
        flex-wrap wrap
        max-width 0.8rem
      .upDownImg
        width 0.15rem
        height 0.28rem
        margin-bottom 0.06rem
      p
        font-size 0.2rem 
        
  .sameNews
    padding 0 0.15rem
    .title
      color #ff8b47
      font-size 0.24rem
      padding-bottom 0.2rem
    .newsList
      padding-bottom 0.1rem
      .newsItem
        height 1rem
        width 2.9rem
        box-shadow 0.02rem 0.02rem 0.04rem 0.02rem #ccc
        margin-bottom 0.1rem
        display flex
        justify-content flex-start
        .newsItemImg
          height 1rem
          width 1rem
          background-position center center
          background-size cover
        .textBox
          width 1.9rem
          padding-left 0.1rem
          display flex
          align-items center
          flex-wrap wrap
          p
            width 1.6rem
          .bold

            margin 0.04rem 0
            height 0.4rem
            overflow hidden
            text-overflow: ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            word-wrap:break-word
            -webkit-box-orient vertical 
          .moreBox
            .moreNews
              width 0.9rem
              height 0.2rem
              text-align center
              line-height 0.2rem
              color #ffffff
              background-color #ff8b47
        
</style>
<style lang="stylus">
#article
  .main
    .htmlBox
      width 2.9rem
      padding-bottom 0.4rem
      .html
        p
          font-size 0.14rem !important
      img
        max-width 100%
    .fenBox
      padding-bottom 0.2rem
      .bds_tsina
        background-image url("../image/article/icon_weibo.png")
        width 0.5rem
        height 0.5rem
        padding 0
        background-position center center
        background-size 100% 100%
        margin-right 0.1rem
      .bds_weixin
        background-image url("../image/article/icon_wechat.png")
        width 0.5rem
        height 0.5rem
        padding 0
        background-position center center
        background-size 100% 100%
</style>

