// pages/alterNotice/alterNotice.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		personMsg: null,
		level: null,
		cName: null,
		coName: null,
		content: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this
		console.log(app.globalData.personMsg)
		that.setData({
			personMsg: app.globalData.personMsg,
			level: app.globalData.personMsg.level,
			cName: app.globalData.personMsg.cName,
			coName: app.globalData.personMsg.coName,
			cNotice: app.globalData.personMsg.cNotice,
			coNotice: app.globalData.personMsg.coNotice
		})

		if (this.data.level == 1) {
			this.setData({
				content: this.data.cNotice
			})
		}
		if (this.data.level == 2) {
			this.setData({
				content: this.data.coNotice
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
	typeNotice: function (e) {
		if (this.data.level == 1) {
			this.setData({
				cNotice: e.detail.value
			})
		}
		if (this.data.level == 2) {
			this.setData({
				coNotice: e.detail.value
			})
		}

	},
	formSubmit: function () {
		var that = this
		if (this.data.level == 1) {
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
							url: 'http://localhost:8080/CollegeLife_war_exploded/class',
							data: {
								cid: res.data.cid,
								cNotice: that.data.cNotice
							},
							method: "GET",
							success(res) {
								wx.showToast({
									title: '公告修改成功',
									icon: 'success',
									duration: 2000
								})
							},
							fail(res) {
								wx.showToast({
									title: '服务器连接失败！',
									icon: 'none',
									duration: 5000
								})
							}
						})
						wx.request({ //获取数据库中个人信息
							url: 'http://localhost:8080/CollegeLife_war_exploded/login',
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

		if (this.data.level == 2) {
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
							url: 'https://yangself.cn/collegeLife/college',
							data: {
								coid: 1,
								coNotice: that.data.coNotice
							},
							method: "GET",
							success(res) {
								wx.showToast({
									title: '公告修改成功',
									icon: 'success',
									duration: 2000
								})
							},
							fail(res) {
								wx.showToast({
									title: '服务器连接失败！',
									icon: 'none',
									duration: 5000
								})
							}
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