// pages/more/more.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		arrow_right: "/images/icon/arrow_right.png",
		personMsg: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			personMsg: app.globalData.personMsg
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
		var that = this
		wx.request({//获取数据库中个人信息
			url: 'https://yangself.cn/collegeLife/login',
			data: {
				openid: app.globalData.openid
			},
			method: "GET",
			success(res) {//已经获取到个人信息，在res.data中
				console.log(res)
				if (!res.data) {//如果没有内容
					console.log("是空的，没有登录")
				} else {//如果获取到信息，将个人信息存放到app.globalData中
					app.globalData.personMsg = res.data
				}

				if (that.sendPersonMsg) {//将获取到的用户数据通过回调函数发送出去
					that.sendPersonMsg(res);
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
		this.sendPersonMsg = res =>{
			app.globalData.personMsg = res.data
		}
		this.setData({
			personMsg: app.globalData.personMsg
		})
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
	alterInfo: function () {
		app.globalData.personMsg = this.data.personMsg
		wx.navigateTo({
			url: '/pages/alterInfo/alterInfo'
		})
	},
	alterLevel: function () {
		app.globalData.personMsg = this.data.personMsg
		wx.navigateTo({
			url: '/pages/alterLevel/alterLevel'
		})
	},
	alterNotice: function () {

		app.globalData.personMsg = this.data.personMsg
		wx.navigateTo({
			url: '/pages/alterNotice/alterNotice',
		})
	},
	location: function () {

		app.globalData.personMsg = this.data.personMsg
		wx.navigateTo({
			url: '/pages/location/location'
		})
	}

})