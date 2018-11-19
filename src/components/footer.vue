<template>
 <div id="footer">
    
   <div class="weiboHeader" :style="domain? 'backgroundImage:url('+domain+focus.bg_image+')':'backgroundImage:url('+focus.bg_image+')' ">
     <div class="abTop"></div>
     <div class="abBottom"> </div>
     <div class="textBox">
       <div class="center">
         <div class="headerImg">
         <img :src="domain? domain+focus.image:focus.image" alt="">
       </div>
       </div>
       <div class="center">
         <div class="textList">
         <div class="listImg">
           <img src="../image/footer/title.png" alt="">
         </div>
         <p class="textListP">{{focus.subtitle}}</p>
         <div class="btn" @click="guanzhu">
           + 关注
         </div>
       </div>
       </div>
       
     </div>
   </div>
   <div class="line">
     <div class="lineImgBox">
       官方合作伙伴
     </div>
   </div>
   <div class="incoBox">
     <div class="incoBoxImg" v-cloak v-for="(item,index) in incoList" :key="index">
       <img :src="domain?domain +item.smallimage:item.smallimage" alt="">
  
      </div>
   </div>
   <div class="line">
     <div class="lineImgBox">
       媒体合作伙伴
     </div>
   </div>
   <div class="media">
     <div class="mediaBox">
       <div class="mediaItem" v-for="(item,index) in media" :key="index">
         <img :src="domain+item.smallimage" alt="">
       </div>
     </div>
   </div>
 </div>
</template>
<script>
import {newslist,focus,support,newsDetail,cooperation} from "@/api/home/home"
 export default {
    props: {
      base: Boolean
    },
   data () {
     return {
       domain:"",
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
       media:[
         {
           smallimage:require("../image/footer/1.png")
         },
         {
           smallimage:require("../image/footer/2.png")
         },
         {
           smallimage:require("../image/footer/3.png")
         },
         {
           smallimage:require("../image/footer/4.png")
         },
         {
           smallimage:require("../image/footer/5.png")
         },
         {
           smallimage:require("../image/footer/6.png")
         },
         {
           smallimage:require("../image/footer/7.png")
         },
       ]
       
     }
   },
   watch:{
     
   },
   created(){
     
    //  关注
    focus().then(res=>{
      if(res.status ===200){
         let _base = res.data.data
         this.domain = _base.domain
         
         this.focus = _base.focus
       }
    })
    
     support().then(res=>{
       
       if(res.status ===200){
          let _base = res.data.data
          this.domain = _base.domain
          this.incoList = _base.support

       }
     })
     cooperation().then(res=>{
       if(res.status===200){
         let _base = res.data.data
      
         this.domain = _base.domain
         this.media = _base.cooperation
      
       }
     })
   },
    methods:{
      guanzhu(){
       
        window.top.open(this.focus.focus_url)
      },
      
   },
   components: {

   }
 }
</script>
<style lang="stylus" scoped>
#footer
  padding-top 0.2rem
  .weiboHeader
    background-size cover
    background-position center center
    height 3.5rem
    position relative
    display flex
    justify-content center
    align-items center
    .abTop
      background-color #ff8b47
      width 0.28rem
      height 0.38rem
      position absolute
      top 0
      right 0
    .abBottom
      background-color #ff8b47
      width 0.5rem
      height 0.5rem
      position absolute
      top 0.38rem
      right 0.28rem
    .textBox
      .center
        display flex
        justify-content center
      .headerImg
        width 1.4rem
        height 1.4rem
        border-radius 50%
        overflow hidden
        border 0.06rem solid #3d2d32
        display flex
        justify-content center
        align-items center
        img
          width 100%
          height 100%

      .textList
        display flex
        justify-content center 
        max-width 2rem
        flex-wrap wrap
        padding-top 0.1rem
        .listImg
          width 1.06rem
          height 0.25rem
          display flex
          justify-content center
          
          img
            width 100%
            height 100%
        .textListP
          color #ffffff
          text-align center
          font-size 0.16rem
          padding 0.1rem 0
        .btn
          width 1.5rem
          height 0.3rem
          text-align center
          line-height 0.3rem
          font-size 0.16rem
          background-color #fb7a2e
          cursor pointer
          color #fff
  .line
    height 0.04rem
    background-color #ededed
    margin 0.4rem 0
    position relative
    .lineImgBox
      padding 0 0.2rem
      background-color #fff
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      color #000
      font-size 0.16rem
  .incoBox
    display flex
    justify-content center
    align-items center
    flex-wrap wrap
    min-height 1rem
    .incoBoxImg
      width 50%
      height 1rem
      display flex
      justify-content center
      align-items center
      img
        max-width 100%
        max-height 100%
        height auto 
        width auto
  .media
    display flex
    justify-content center
    padding-bottom 0.2rem
    .mediaBox
      display flex
      justify-content center
      align-items center
      flex-wrap wrap
      width 100%
      min-height 1rem
      .mediaItem
        width 46%
        height 1rem
        margin 0 2%
        line-height 1rem
        text-align center
        img
          max-width 100%
          max-height 100%
          height auto 
          width auto

      
</style>

