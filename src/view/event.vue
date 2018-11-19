<template>
  <div id="event">
    <header :style="'backgroundImage:url('+domain+baseBanner+')'">
      <div class="headerTitle">最新赛事</div>
      <swiper :options="eventOption" v-if="show" class="eventSwiper">
        <swiper-slide class="eventSlide" v-for="(item,index) in meuns" :key="index" :class="item.id===activeIndex?'activeItem':''">
          <span @click="changeMenuSelected(index)">{{item.cn_name}}</span>
        </swiper-slide>
      </swiper>
    </header>
    <main>
      <div class="textBox" @click="showPopup">
        {{activeRounds}}
      </div>
      <mt-popup
        v-model="popupVisible"
        position="bottom"
        class="mintPopup"
        ref="popup"
        >
        <mt-picker 
        :slots="dateSlots" 
        :showToolbar= true
        @change="onValuesChange"
        :visible-item-count="5" 
        :show-toolbar="false"  
        ref="picker" 
        value-key="round"
        >
          <div @click="handleConfirm" class="sureBtn">确认</div>
        </mt-picker>
      </mt-popup>
      <div class="itemBox ft12">
        <div class="item" v-for="(item,index) in schedule" :key="index">
          <div class="itemLeft">
            <div class="itemHome">
              <div class="itemName">
                <div class="itemImg"><img :src="item.home_image" alt=""></div>
                <div class="name">{{item.home_name}}</div>
              </div>
              <div class="scores">{{
                item.home_scores}}</div>
            </div>
            <div class="itemAway">
              <div class="itemName">
                <div class="itemImg"><img :src="item.away_image" alt=""></div>
                <div class="name">{{item.away_name}}</div>
              </div>
              <div class="scores">{{
                item.away_score}}</div>
            </div>
          </div>
          <div class="itemRight">
            {{item.time}}
          </div>
        </div>
      </div>
      <div class="rankBox">
        <p class="rankTitle">
          {{ranking.title}}
        </p>
        <div class="ranking">
          <div class="rankItem">
            <div class="rankingNum">排名</div>
            <div class="team">
              
              <div class="teamText">球队</div>
               </div>
              <div class="status">
                胜/平/负
              </div>
              <div class="integral">
                积分
              </div>
           
          </div>
          <div class="rankItem" v-for="(item,index) in ranking.list" :key="index" :class="'ranking'+index">
            <div class="rankingNum">{{item.sortorder}}</div>
            <div class="team">
              <div class="teamImg">
                <img :src="item.image" alt="">
              </div>
              <div class="teamText">{{item.name}}</div>
              
            </div>
            <div class="status">
                {{item.win}}/{{item.level}}/{{item.lose}}
              </div>
              <div class="integral">
                {{item.ranking}}
              </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import {swiper,swiperSlide} from "vue-awesome-swiper"
import {newsmenu,schedule,schedulemenu} from "@/api/home/home"
export default {
  data () {
    return {
      defaultIndex:0,
      //popupShow:false,
      popupVisible:false,
      activeRounds:"",
      activeIndex:null,
      show:false,
      season:"",
      domain:"",
      baseBanner:require("../image/event/banner.png"),
      eventOption:{
        slidesPerView:'auto'
      },


      meuns:[{
        cn_name:"全部",
        descriptoncn:"",
        id:1,
        image: require("../image/event/banner.png"),    
      }],
      defaultList:{
        round:"",
        total:20,
        roundlist:[
          {
            round:"第1轮"
          }
        ]
      },
      schedule:[
        {
          away_image:require('../image/event/1.png'),
          away_name:"曼城",
          away_score:"-",
          home_image:require('../image/event/1.png'),
          home_name:"曼城",
          home_scores:"-",
          id:1,
          round:"第1轮",
          season:"",
          time:"2018-09-01",
          wanbo_league:"英超"
        }
      ],
      ranking:{
        title:"英超积分榜",
        list:[
          {
            name:"曼城",
            win:10,
            ranking:2,
            level:3,
            id:1,
            sortorder:1,
            lose:20,
            image:require("../image/event/1.png")
          }
        ]
      }

    }
  },
  computed:{
    dateSlots(){
      let _arr = [{
        flex: 1,
        values: this.defaultList.roundlist,
        className: 'slot1',
        textAlign: 'center',
        defaultIndex :this.defaultIndex
      }]
      return _arr
    }
    
  },
  created(){
    schedulemenu().then(res=>{
      if(res.status===200){
        this.domain = res.data.data.domain
        let _base =res.data.data
        this.meuns= _base.menu
        this.show = true
        this.activeIndex = this.meuns[0].id
        this.baseBanner = this.meuns[0].image
        this.chooseMenu(this.activeIndex)
      }
    })
  },
  mounted(){
    
  },
  methods:{
    // 变更赛事数据
    chooseMenu(id){
      schedule({id}).then(res=>{
        if(res.status===200){
          let _base = res.data.data
          this.domain = _base.domain
          this.activeRounds = _base.default.round
          this.defaultList = _base.default
          this.schedule = _base.schedule
          this.ranking = _base.ranking
          this.season = _base.default.season
          this.defaultIndex =  _base.default.roundlist.findIndex(function(value){
            return _base.default.round === value.round
          })
          // console.log(this.defaultIndex)
          this.$refs.picker.setSlotValues(0,_base.default.roundlist)
          // this.$refs.picker.setSlotValue(0,{round:this.activeRounds})
          // this.$refs.picker.setValues([{round:this.activeRounds}])
        }
      })
    },
    // 改变菜单选项
    changeMenuSelected(index){
      this.activeIndex = this.meuns[index].id
      this.baseBanner = this.meuns[index].image
      this.popupShow = false
      this.defaultIndex = 0
      this.chooseMenu(this.activeIndex)
    },
    //切换轮次
    changeRounds(value){
      this.activeRounds = value[0].round
      schedule({
        id:this.activeIndex,
        season:this.season,
        round:this.activeRounds
        }).then(res=>{
        if(res.status===200){
          let _base = res.data.data
          this.schedule = _base.schedule

  
        }
      })
    },
    //显示popup
    showPopup(){
      this.popupVisible=true
    },
    onValuesChange(items,value){
      if(items){
        // console.log(value)
        // console.log(items.getSlotValue(0))
        // console.log(items.getValues())
        // console.log(items.getSlotValues(0))
      }
    
    },
    handleConfirm() {
      let _value = this.$refs.picker.getValues()
      this.changeRounds(_value)
      this.popupVisible = false
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang='stylus' scoped>
#event
  header
    height 1.4rem
    padding-left 0.15rem
    background-size cover
    .headerTitle
      color #ff8b47
      font-size 0.36rem
      padding 0.3rem 0 0.2rem 0
      font-weight 600
    .eventSwiper
      .eventSlide
        width auto
        span
          border-bottom 0.04rem solid transparent
          font-size 0.18rem
          color #a5a8ad
          margin-right 0.4rem
          display inline-block
          padding 0.02rem 0
        &.activeItem
          span
            border-bottom 0.04rem solid #ff8b47
            color #ff8b47
  main
    padding 0.2rem 0.15rem 0 0.15rem
    .textBox
      height 0.34rem
      line-height @height
      color #ff8b47
      font-size 0.18rem
      border 1px solid #ff8b47
      text-align center
    .itemBox
      padding-top 0.2rem
      padding-bottom 0.4rem
      .item
        display flex
        padding 0.16rem 0
        width 2.9rem
        border-bottom 1px solid #ebebeb
        border-top 1px solid #ebebeb
        .itemLeft
          width 2rem
          padding 0.1rem 0.1rem 0.1rem 0.2rem
          display flex
          align-items center
          flex-wrap wrap
          border-right 1px solid #f0f0f0
          .itemHome
            display flex
            width 100%
            justify-content space-between
            padding-bottom 0.1rem
          .itemAway
            display flex
            width 100%
            justify-content space-between
          .itemName
            display flex
            justify-content flex-start
            .itemImg
              width 0.2rem
              height 0.2rem
              margin-right 0.1rem
              img
                max-width 100%
                max-height 100%
                width auto
                height auto
        .itemRight
          width 0.9rem
          padding 0 0.1rem
          text-align center
          display flex
          align-items center
          justify-content center
    .rankBox
      font-size 0.12rem
      padding-bottom 0.4rem
      .rankTitle
        color #ff8b47
        font-size 0.36rem
        padding-bottom 0.2rem
      .rankItem
        display flex
        justify-content space-between
        align-items center
        height 0.36rem
        text-align center
        padding 0 0.08rem
        &.ranking0
          .rankingNum
            color #ff0000
        &.ranking1
          .rankingNum
            color #ff9b00
        &.ranking2
          .rankingNum
            color #00a214
        &:nth-of-type(2n+1)
          background-color #f1f1f1
        .rankingNum
          color #111111
          min-width 0.3rem

        .team
          min-width 1rem
          display flex
          justify-content flex-start
         

          .teamImg
            width 0.2rem
            height 0.2rem
            margin-right 0.04rem
            img 
              width auto 
              height auto 
              max-width 100%
              max-height 100%
        .status
          min-width 0.5rem
        .integral
          min-width 0.3rem
          
          
</style>
<style lang="stylus">
#event
  .mintPopup
    width 100%
  .picker
    .picker-toolbar
      display flex 
      justify-content flex-end
      align-items center
      .sureBtn
        width 0.7rem
        height 0.3rem
        line-height 0.3rem
        background-color #ff8b47
        color #ffffff
        font-size 0.18rem
        text-align center
        margin-right 0.1rem

</style>
