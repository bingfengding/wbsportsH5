<template>
  <div id="news"> 
    <header :style="'backgroundImage:url('+domain+baseBanner+')'">
      <div class="headerTitle">新闻资讯</div>
      <swiper 
      :options="newsOption"  
      class="newsSwiper"
      v-if="show"
      :not-next-tick='notNextTick'
      >
        <swiper-slide class="newsSlide" v-for="(item,index) in meuns" :key="index" :class="item.id===activeIndex?'activeItem':''">
          <span @click="changeMeun(index)">{{item.cn_name}}</span>
        </swiper-slide>
      </swiper>
    </header>
    <div class="newsBox">
      <ul  
        v-infinite-scroll="changePageItem"
        infinite-scroll-disabled= "loading"
        infinite-scroll-distance="100"
        infinite-scroll-immediate-check="false"
        class="newsList"
        >
        <li v-for="(item,index) in items" :key="index" class="newsItem">
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
      <div class="info">
        <div class="infoImg" v-if="infoImgShow">
          <img src="../image/news/loading.gif" alt="">
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import {newsmenu,news,banner} from "@/api/home/home"
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      notNextTick:true,
      infoImgShow:false,
      show:false,
      baseHeight:0,
      loading:false,
      total:1,
      allIndex:1,
      activeIndex:null,
      meunIndex:1,
      domain:"",
      basePageSize:12,
      currentPage:1,
      baseBanner:require("../image/event/banner.png"),
      newsOption:{
        slidesPerView:'auto'
      },
      meuns:[{
        cn_name:"全部",
        descriptoncn:"",
        id:1,
        image: require("../image/event/banner.png"),    
      }],

     
      
      items:[
        {
          image:require("../image/news/news.png"),
          cn_title:"本来以为是个青铜 结果却是王者",
          cn_name:"曼联",
          startdate:"15.09.2018",
          id:1,
        }
      ]
    }
  },
  created(){
    newsmenu().then(res=>{
      if(res.status===200){
        this.domain = res.data.data.domain
        let _base =res.data.data
        this.meuns= _base.menu
        this.show = true
        this.activeIndex = this.meuns[0].id
        this.baseBanner = this.meuns[0].image
        
      }
    }).then(res=>{
      news(
        {
          w:'l',
          type:this.activeIndex,
          page:1
        }
      ).then(res=>{
        if(res.status===200){
          this.domain = res.data.data.domain
          let _base = res.data.data
          this.items = _base.news.rows
          this.total = _base.news.total
          this.allIndex =  Math.ceil(this.total/12)
        }
      })
    })
  },
 methods:{

    // 改变菜单选项
    changeMeun(index){
      this.activeIndex = this.meuns[index].id
      this.baseBanner = this.meuns[index].image
      this.meunIndex = 1
      this.loading = false
      news(
        {
          w:'l',
          type:this.activeIndex,
          page:1
        }
      ).then(res=>{
        if(res.status===200){
          this.domain = res.data.data.domain
          let _base = res.data.data
          this.items = _base.news.rows
          this.total = _base.news.total
        }
      })
    },
    // 跳转对应文章
    toArticle(id,type){
      let _obj = {
        id,
        type
      };
      this.$store.commit('setNewsDetail',{..._obj})
      let _url = "/article?type=" + type +"&id=" +id
      this.$router.push(_url)
    },
    // 每页条数改变
    sizeChange(val){
      // console.log(value)
    },
    changePageItem(){
        this.loading = true
        if(this.allIndex>this.meunIndex){
          this.infoImgShow = true
          ++this.meunIndex
          setTimeout(()=>{
              news(
          {
            w:'l',
            type:this.activeIndex,
            page:this.meunIndex
          }
        ).then(res=>{
          if(res.status===200){
            this.domain = res.data.data.domain
            let _base = res.data.data.news.rows
            this.items = [...this.items,..._base]
          }
        })
        this.loading = false
        this.infoImgShow = false
        },1000)
       
      }else{
        console.log("加载完全")
      }
      
    },
    // 当前页改变
    currentChange(val) {
      this.meunIndex = val
      this.changePageItem()
    }
  },
  components: {

  }
}
</script>
<style lang='stylus' scoped>
#news
  header
    height 1.4rem
    padding-left 0.15rem
    background-size cover
    .headerTitle
      color #ff8b47
      font-size 0.36rem
      padding 0.3rem 0 0.2rem 0
      font-weight 600
    .newsSwiper
      .newsSlide
        width auto
        
        span
          border-bottom 0.04rem solid transparent
          font-size 0.18rem
          display inline-block
          padding 0.02rem 0
          color #a5a8ad
          margin-right 0.4rem
        &.activeItem
          span
            border-bottom 0.04rem solid #ff8b47
            color #ff8b47
  .newsBox
    padding 0.2rem 0.15rem 0.1rem 0.15rem
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
    .info
      height 0.4rem
      .infoImg
        display flex
        justify-content center
        img
          width 0.4rem
          height 0.4rem
</style>

