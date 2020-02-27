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
		var that = this
		wx.navigateTo({
			url: '/pages/alterInfo/alterInfo',
			success: function (res) {
				res.eventChannel.emit('userMsg', {
					personMsg: that.data.personMsg
				})
			}
		})
	},
	alterLevel: function () {
		var that = this
		wx.navigateTo({
			url: '/pages/alterLevel/alterLevel',
			success: function (res) {
				res.eventChannel.emit('userMsg', {
					personMsg: that.data.personMsg
				})
			}
		})
		


	},
	alterNotice: function () {
		var that = this
		wx.navigateTo({
			url: '/pages/alterNotice/alterNotice',
			success: function (res) {
				res.eventChannel.emit('userMsg', {
					personMsg: that.data.personMsg
				})
			}
		})
	},
	location: function () {
		var that = this
		wx.navigateTo({
			url: '/pages/location/location',
			success: function (res) {
				res.eventChannel.emit('userMsg', {
					personMsg: that.data.personMsg
				})
			}
		})
	}

})