// pages/alterLevel/alterLevel.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personMsg: null,
    level: null,
    lName: null,
    index: 0,
    array: ['学生', '班级管理员', '学院管理员'],
    newLevel: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var that = this
    this.setData({
      personMsg: app.globalData.personMsg,
      level: app.globalData.personMsg.level
    })

    if (this.data.level == 0) {
      this.setData({
        lName: "学生",
        array: ['班级管理员', '学院管理员']
      })
    } else if (this.data.level == 1) {
      this.setData({
        lName: "班级管理员",
        array: ['学生', '学院管理员']
      })
    } else if (this.data.level == 2) {
      this.setData({
        lName: "学院管理员",
        array: ['学生', '班级管理员']
      })
    } else {
      this.setData({
        lName: "软件管理员",
        array: ['学生', '班级管理员', '学院管理员']
      })
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function () {
    var that = this
    if (this.data.level == 0) {
      if (this.data.index == 0) {
        this.setData({
          newLevel: 1
        })
      } else {
        this.setData({
          newLevel: 2
        })
      }

      wx.request({
        url: 'https://yangself.cn/collegeLife/alterLevel',
        data: {
          sid: this.data.personMsg.sid,
          sName: this.data.personMsg.sName,
          sNumber: this.data.personMsg.sNumber,
          preLevel: 0,
          newLevel: this.data.newLevel
        },
        method: "GET",
        success(res) {
          if (!res.data) {
            console.log(res)
            wx.showToast({
              title: '服务器错误！',
              icon: 'none',
              duration: 2000
            })
          } else {

            wx.showToast({
              title: res.data,
              icon: 'success',
              duration: 2000
            })
            wx.request({ //获取数据库中个人信息
							url: 'https://yangself.cn/collegeLife/login',
							data: {
								openid: app.globalData.openid
							},
							method: "GET",
							success(res) { //已经获取到个人信息，在res.data中
								console.log("将要返回") //如果获取到信息，将个人信息存放到app.globalData中
								console.log(res.data)
								app.globalData.personMsg = res.data
							},
							fail(res) {
								wx.showToast({
									title: '服务器连接失败！',
									icon: 'none',
									duration: 5000
								})
							}
						})
            setTimeout(function () {
              wx.navigateBack({
                complete: (res) => {}
              })
            }, 2000);
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

    if (this.data.level == 1) {
      if (this.data.index == 0) {
        this.setData({
          newLevel: 0
        })
      } else {
        this.setData({
          newLevel: 2
        })
      }

      wx.request({
        url: 'https://yangself.cn/collegeLife/alterLevel',
        data: {
          sid: this.data.personMsg.sid,
          sName: this.data.personMsg.sName,
          sNumber: this.data.personMsg.sNumber,
          preLevel: 1,
          newLevel: this.data.newLevel
        },
        method: "GET",
        success(res) {
          if (!res.data) {
            console.log(res)
            wx.showToast({
              title: '服务器错误！',
              icon: 'none',
              duration: 2000
            })
          } else {

            wx.showToast({
              title: res.data,
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack({
                complete: (res) => {}
              })
            }, 2000);
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

    if (this.data.level == 2) {
      if (this.data.index == 0) {
        this.setData({
          newLevel: 0
        })
      } else {
        this.setData({
          newLevel: 1
        })
      }

      wx.request({
        url: 'https://yangself.cn/collegeLife/alterLevel',
        data: {
          sid: this.data.personMsg.sid,
          sName: this.data.personMsg.sName,
          sNumber: this.data.personMsg.sNumber,
          preLevel: 2,
          newLevel: this.data.newLevel
        },
        method: "GET",
        success(res) {
          if (!res.data) {
            console.log(res)
            wx.showToast({
              title: '服务器错误！',
              icon: 'none',
              duration: 2000
            })
          } else {

            wx.showToast({
              title: res.data,
              icon: 'success',
              duration: 2000
            })
            wx.request({ //获取数据库中个人信息
							url: 'https://yangself.cn/collegeLife/login',
							data: {
								openid: app.globalData.openid
							},
							method: "GET",
							success(res) { //已经获取到个人信息，在res.data中
								console.log("将要返回") //如果获取到信息，将个人信息存放到app.globalData中
								console.log(res.data)
								app.globalData.personMsg = res.data
							},
							fail(res) {
								wx.showToast({
									title: '服务器连接失败！',
									icon: 'none',
									duration: 5000
								})
							}
						})
            setTimeout(function () {
              wx.navigateBack({
                complete: (res) => {}
              })
            }, 2000);
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

    if (this.data.level == 3) {
      if (this.data.index == 0) {
        this.setData({
          newLevel: 0
        })
      } else if(this.data.index == 1) {
        this.setData({
          newLevel: 1
        })
      }else{
        this.setData({
          newLevel: 2
        })
      }

      wx.request({
        url: 'https://yangself.cn/collegeLife/alterLevel',
        data: {
          sid: this.data.personMsg.sid,
          sName: this.data.personMsg.sName,
          sNumber: this.data.personMsg.sNumber,
          preLevel: 3,
          newLevel: this.data.newLevel
        },
        method: "GET",
        success(res) {
          if (!res.data) {
            console.log(res)
            wx.showToast({
              title: '服务器错误！',
              icon: 'none',
              duration: 2000
            })
          } else {

            wx.showToast({
              title: res.data,
              icon: 'success',
              duration: 2000
            })
            wx.request({ //获取数据库中个人信息
							url: 'https://yangself.cn/collegeLife/login',
							data: {
								openid: app.globalData.openid
							},
							method: "GET",
							success(res) { //已经获取到个人信息，在res.data中
								console.log("将要返回") //如果获取到信息，将个人信息存放到app.globalData中
								console.log(res.data)
								app.globalData.personMsg = res.data
							},
							fail(res) {
								wx.showToast({
									title: '服务器连接失败！',
									icon: 'none',
									duration: 5000
								})
							}
						})
            setTimeout(function () {
              wx.navigateBack({
                complete: (res) => {}
              })
            }, 2000);
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

  }
})