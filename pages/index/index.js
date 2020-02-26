const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: null,
    latitude: null,
    isLogined: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
    var that = this;
    // 获取用户位置信息
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })

    app.getUserOpenid = res => {
      wx.request({
        url: 'http://localhost:8080/CollegeLife_war_exploded/login',
        data: {
          openid: app.globalData.openid
        },
        method: "GET",
        success(res) {
          if (that.getPersonMsg) {
            that.getPersonMsg(res);
          }
        },
        fail(res) {
          wx.showToast({
            title: '服务器连接失败！',
            icon: 'none',
            duration: 5000
          })
        }
      })
    }
    this.getPersonMsg = res => {
      if (!res.data) {
        console.log("是空的，没有登录")
      } else {
        app.globalData.personMsg = res.data
        app.globalData.isLogined = true
        this.setData({
          isLogined: app.globalData.isLogined
        })
      }

      if (this.data.isLogined) {
        wx.request({
          url: 'http://localhost:8080/CollegeLife_war_exploded/location',
          method: "GET",
          data: {
            sid: app.globalData.personMsg.sid,
            longitude: this.data.longitude,
            latitude: this.data.latitude
          },
          success(res) {
            console.log("位置信息上传成功！")
            console.log("经度为：" + that.data.longitude + "纬度为：" + that.data.latitude)
          },
          fail(res) {
            wx.showToast({
              title: '服务器连接失败！无法上传位置信息！',
              icon: 'none',
              duration: 5000
            })
          }
        })
      }

    }


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
    var that = this;
    var data = this.data
    if (this.data.isLogined) {
      wx.request({
        url: 'http://localhost:8080/CollegeLife_war_exploded/location',
        method: "GET",
        data: {
          sid: app.globalData.personMsg.sid,
          longitude: this.data.longitude,
          latitude: this.data.latitude
        },
        success(res) {
          console.log("位置信息上传成功！")
          console.log("经度为：" + that.data.longitude + "纬度为：" + that.data.latitude)
        },
        fail(res) {
          wx.showToast({
            title: '服务器连接失败！无法上传位置信息！',
            icon: 'none',
            duration: 5000
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this;
    var data = this.data
    if (this.data.isLogined) {
      wx.request({
        url: 'http://localhost:8080/CollegeLife_war_exploded/location',
        method: "GET",
        data: {
          sid: app.globalData.personMsg.sid,
          longitude: this.data.longitude,
          latitude: this.data.latitude
        },
        success(res) {
          console.log("位置信息上传成功！")
          console.log("经度为：" + that.data.longitude + "纬度为：" + that.data.latitude)
        },
        fail(res) {
          wx.showToast({
            title: '服务器连接失败！无法上传位置信息！',
            icon: 'none',
            duration: 5000
          })
        }
      })
    }
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
  toSignin: function () {
    wx.navigateTo({
      url: '/pages/signin/signin'
    })
  }
})