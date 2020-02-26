App({
  globalData:{
    openid:null,
    appid:"wxb4af88d61d8255aa",
    secret:"a4c3744b257b5b68403c37ab142cda42",
    isLogined:false,
    personMsg:null
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            appid:that.globalData.appid,
            secret:that.globalData.secret,
            js_code:res.code,
            grant_type:"authorization_code"
          },
          method:"GET",
          success(res){
            that.globalData.openid = res.data.openid
            if (that.getUserOpenid){
              that.getUserOpenid(res)
            }
          }
        })
      },
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
  
})
