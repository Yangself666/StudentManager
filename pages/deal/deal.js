// pages/deal/deal.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personMsg:null,
    applyList:[],
		level:0,
		status:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		wx.stopPullDownRefresh()
    var that = this;
    this.setData({
      personMsg: app.globalData.personMsg,
      level: app.globalData.personMsg.level
    })
    		// 查询自己等级有没有需要处理的请求
		if (this.data.level == 1) {
			// 他是班长就要查询他班里有没有人申请
			wx.request({
				url: 'https://yangself.cn/collegeLife/member',
				data: {
					openid: this.data.personMsg.openid
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
						wx.request({
							url: 'https://yangself.cn/collegeLife/applyClassNum',
							data: {
								cid: res.data.cid,
							},
							method: "GET",
							success(res) {
								that.setData({
									applyList: res.data
								})
								//这里收到一个list
								console.log(res)
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
			// 院，所有的
			wx.request({
				url: 'https://yangself.cn/collegeLife/applyCollegeNum',
				method: "GET",
				success(res) {
					that.setData({
            applyList: res.data
          })
					//这里收到一个list
					console.log(res)
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
			//所有的
			wx.request({
				url: 'https://yangself.cn/collegeLife/applyAllNum',
				method: "GET",
				success(res) {
					that.setData({
            applyList: res.data
          })
					//这里收到一个list
					console.log(res)
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
		this.onLoad();
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
	agree:function(event){
		var that = this;
		var index = event.currentTarget.dataset.value
		var sid = this.data.applyList[index].sid
		console.log(event);
		wx.request({
			url: 'https://yangself.cn/collegeLife/agree',
			data:{
				sid:sid
			},
			method:"GET",
			success(res){
				wx.showToast({
					title: "已同意",
					icon: 'success',
					duration: 1000
				})
				that.onLoad();
				//显示已同意对话框，并且把按钮隐藏
			}
		})
	},
	reject:function(event){
		var that = this;
		var index = event.currentTarget.dataset.value
		var sid = this.data.applyList[index].sid
		wx.request({
			url: 'https://yangself.cn/collegeLife/reject',
			data:{
				sid:sid
			},
			method:"GET",
			success(res){
				wx.showToast({
					title: "已拒绝",
					icon: 'success',
					duration: 1000
				})
				that.onLoad();
				//显示已拒绝对话框，并且把按钮隐藏
			}
		})
	}
})