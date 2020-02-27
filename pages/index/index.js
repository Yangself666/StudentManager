const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		personMsg: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log("index-onLoad")

		var that = this;
		this.setData({
			personMsg: app.globalData.personMsg
		})

		app.sendPersonMsg = res => { //接收到的个人信息放到index页面中
			console.log("执行了：" + res.data)
			this.setData({
				personMsg: res.data
			})

			wx.getLocation({
				type: 'wgs84',
				success(res) {
					if (that.data.personMsg) {
						wx.request({
							url: 'http://localhost:8080/CollegeLife_war_exploded/location',
							method: "GET",
							data: {
								sid: that.data.personMsg.sid,
								longitude: res.longitude,
								latitude: res.latitude
							},
							success(res) {
								console.log("回调位置信息上传成功！")
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
			})
		}


		// 获取用户位置信息
		wx.getLocation({
			type: 'wgs84',
			success(res) {
				if (that.data.personMsg) {
					wx.request({
						url: 'http://localhost:8080/CollegeLife_war_exploded/location',
						method: "GET",
						data: {
							sid: that.data.personMsg.sid,
							longitude: res.longitude,
							latitude: res.latitude
						},
						success(res) {
							console.log("非call位置信息上传成功！")
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
		var that = this;
		this.setData({
			personMsg: app.globalData.personMsg
		})
		wx.getLocation({
			type: 'wgs84',
			success(res) {
				if (that.data.personMsg) {
					wx.request({
						url: 'http://localhost:8080/CollegeLife_war_exploded/location',
						method: "GET",
						data: {
							sid: that.data.personMsg.sid,
							longitude: res.longitude,
							latitude: res.latitude
						},
						success(res) {
							console.log("onShow位置信息上传成功！")
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
		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		var that = this;

		wx.getLocation({
			type: 'wgs84',
			success(res) {
				if (that.data.personMsg) {
					wx.request({
						url: 'http://localhost:8080/CollegeLife_war_exploded/location',
						method: "GET",
						data: {
							sid: that.data.personMsg.sid,
							longitude: res.longitude,
							latitude: res.latitude
						},
						success(res) {
							console.log("onHide位置信息上传成功！")
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
		})
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
		var that = this
		wx.navigateTo({
			url: '/pages/signin/signin',
			events:{
				signInSeccess: function(data) {
					console.log(data.personMsg);
					that.setData({
						personMsg :data.personMsg
					})
					app.globalData.personMsg = data.personMsg
				}
			}
		})
	}
})