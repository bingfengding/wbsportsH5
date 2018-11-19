
export default {
  state: {
    newsDetail: {
      id : 20,
      type : "news"
    },
  },
  getters:{
    getNewsDetail: state=>{
      return state.newsDetail
    }
  },
  mutations: {
    setNewsDetail(state,{
      id,
      type
    }){
      let _obj = {
        id,
        type
      }
      state.newsDetail = _obj
    },
    

  },
  actions: {
    // userLogin(context, {
    //   user_name,
    //   user_pass
    // }) {
    //   login(user_name, user_pass).then((result) => {

    //     if (result.data.code == 200) {
    //       let token = result.data.data.token;
    //       if (token != "") {
    //         context.commit("setUser", {
    //           "user_name": user_name,
    //           "user_token": token
    //         })
    //       }

    //       // this.$router.push({
    //       //   path: "/"
    //       // }); //登录成功之后重定向到首页

    //     } else {
    //       return Promise.reject(result)
    //     }

    //   })
    // }
  }
}
