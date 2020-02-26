const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogined:false,
    personMsg:null,
    longitude:null,
    latitude:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 通过openid查询数据库
    app.getUserOpenid = res => {
      wx.request({
        url: 'http://localhost:8080/CollegeLife_war_exploded/login',
        data:{
          openid:app.globalData.openid
        },
        method:"GET",
        success(res){
          if(that.getPersonMsg(res)){
            that.getPersonMsg(res);
          }
        }
      })
    }
    this.getPersonMsg = res =>{
      console.log(res)
      that.setData({
        personMsg:res.data,
        isLogined:true
      })
    }
    // 获取用户位置信息
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        that.setData({
          latitude : res.latitude,
          longitude : res.longitude
        })
      }
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  toSignin:function(){
    wx.navigateTo({
      url: '/pages/signin/signin'
    })
  }
})