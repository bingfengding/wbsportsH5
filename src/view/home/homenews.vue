<template>
  <div id="homenews">
    <div class="newsTitle"><p>新闻资讯</p></div>
    <div class="newsTextBox">
      <div class="center">
        <div class="item" v-for="(item,index) in newsList" :key="index">
          <div class="slideImg" :style="'backgroundImage:url('+domain+item.image+')'">
          </div>
          <div class="slideText">
            <div class="ft12">
              <span class="colorOrange">{{item.cn_name}} </span>
            / {{item.startdate}}
            </div>
            <div class="ft30">{{item.cn_title}}</div>
       
              
              <div class="samllUrl">
                
                <div class="hover-text" @click="toArticle(item.id,'news')">查看更多</div>
              </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="more">
      <div class="moreBox" @click="goto('news')">查看全部新闻</div>
      
      </div>
  </div>

</template>

<script>
import {swiper,swiperSlide} from "vue-awesome-swiper"
import {news} from "@/api/home/home"
 export default {
   data () {
     return {
       domain:"",
       newsOption:{
         pagination: {
            el: '.news-swiper-pagination',
            clickable :true,
          },
       },
       newsList:[
         
           {
            image:require("../../image/home/banner.png"),
            cn_title:"本来以为是个青铜 结果却是王者",
            cn_name:"曼联",
            startdate:"15.09.2018",
            id:1,
          }
         
          
       ]
     }
   },
   created(){
    // 新闻资讯
     news().then(res=>{
       if(res.status ===200){
         let _base = res.data.data
         this.domain = _base.domain
         this.newsList = _base.news.rows
       }
     })
   },
   methods:{
    goto(url){
      this.$router.push(url)
    },
     toArticle(id,type){
       let _obj = {
          id,
          type
        };
        this.$store.commit('setNewsDetail',{..._obj})
        let _url = "/article?type=" + type +"&id=" +id
       this.$router.push(_url)
     }
   },
   components: {
     swiper,
     swiperSlide,
   
   }
 }
 
</script>

<style lang="stylus" scoped>
#homenews
  padding 0.4rem 0.15rem 0 0.15rem
  background-image url("../../image/home/bg.png")
  background-color #fbfbfb
  background-size 2.06rem 0.76rem
  background-position top right
  background-repeat no-repeat
  .newsTitle
    padding-bottom 0.2rem
    p
      font-size 0.24rem
      color #ff8b47
  .more
    display flex
    justify-content center
    padding 0.2rem 0 0.3rem 0
    .moreBox
      width 1.5rem
      height 0.3rem
      line-height 0.3rem
      color #fff
      background-color #ff8b47
      text-align center
      cursor pointer
  .newsTextBox
    display flex
    justify-content center
    .center
      display flex
      justify-content center
      flex-wrap wrap
      .item
        display flex
        justify-content center
        margin 0.04rem 0
        height 1rem
        box-shadow 0.02rem 0.02rem 0.04rem 0.02rem #ccc
      .slideImg
        width 1rem
        height 1rem
        background-repeat no-repeat
        background-position center center
        background-size cover
      .colorOrange
        color #ff8b47
      .ft30
        font-size 0.14rem
        margin 0.08rem 0
        font-weight 600
        line-height 0.18rem
        height 0.36rem
        overflow hidden
        text-overflow: ellipsis
        display -webkit-box
        -webkit-line-clamp 2
        -webkit-box-orient vertical
      .slideText
        width 1.9rem
        padding 0.1rem
        background-color #ffffff
        .ft12
          line-height 0.12rem
  .samllUrl
    position relative
    
    .hover-text
      width 0.9rem
      height 0.2rem
      line-height 0.2rem
      font-size 0.12rem
      text-align center
      background-color #ff8b47
      color #ffffff
</style>