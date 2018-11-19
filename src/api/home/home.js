import request from '@/utils/request';

//关注
export const focus = ()=>{
  return request({
    url:"api/index/focus",
    method:"post",
  })
}
//赞助
export const support = ()=>{
  return request({
    url:"api/index/support",
    method:"post",
  })
}

//banner图
export const banner = ()=>{
  return request({
    url:"api/index/banner",
    method:"post",
  })
}

//骑士殿堂
export const hall = ()=>{
  return request({
    url:"api/index/hall",
    method:"post",
  })
}

//新闻页面
export const news = (item)=>{
  let data = {
    ...item
  }
  return request({
    url:"api/index/news",
    method:"post",
    data
  })
}

//最新赛事
export const competition = ()=>{
  return request({
    url:"api/index/competition",
    method:"post",
  })
}

//最热
export const hot = ()=>{
  return request({
    url:"api/index/hot",
    method:"post",
  })
}
//新闻详情
export const newsDetail = (item)=>{
  let data = {...item}
  return request({
    url:"api/index/newsDetail",
    method:"post",
    data
  })
}
//精彩视频
export const videos = ()=>{
  return request({
    url:"api/index/videos",
    method:"post",
  })
}
//相册
export const gallery = ()=>{
  return request({
    url:"api/index/gallery",
    method:"post",
  })
}
//底部新闻资讯(新闻列表前三条)
export const newslist = ()=>{
  return request({
    url:"api/index/newslist",
    method:"post",
  })
}
//新闻页菜单栏
export const newsmenu = ()=>{
  return request({
    url:"api/index/newsmenu",
    method:"post",
  })
}

// 赛事菜单栏
export const schedulemenu = ()=>{
  return request({
    url:"api/index/schedulemenu",
    method:"post",
  })
}
//赛事详情
export const schedule = (item)=>{
  let data = {...item}
  return request({
    url:"api/index/schedule",
    method:"post",
    data
  })
}
// 赞助媒体
export const cooperation = (item)=>{
  let data = {...item}
  return request({
    url:"api/index/cooperation",
    method:"post",
    data
  })
}

