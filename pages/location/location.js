// pages/location/location.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		markers: [],
		personMsg: null,
		level: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this
		const eventChannel = this.getOpenerEventChannel()
		eventChannel.on('userMsg', function (res) {
			console.log(res.personMsg)
			that.setData({
				personMsg: res.personMsg,
				level: res.personMsg.level
			})
		})
		wx.request({
			url: 'http://localhost:8080/CollegeLife_war_exploded/member',
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
						url: 'http://localhost:8080/CollegeLife_war_exploded/classLocation',
						data: {
							cid: res.data.cid,
						},
						method: "GET",
						success(res) {
							console.log(res.data)
							var markersArray = [];
							for (let index = 0; index < res.data.length; index++) {
								markersArray.push(
									{
										iconPath: "/images/icon/icon_gps.png",
										id: index,
										latitude: res.data[index].latitude,
										longitude: res.data[index].longitude,
										width: 30,
										height: 30,
										callout: {
											content: 'res.data.index.sName\nres.data.index.sNumber\nres.data.index.cName', //文本
											color: '#000000', //文本颜色
											borderRadius: 15, //边框圆角
											borderWidth: 1, //边框宽度
											borderColor: '#ec5c5d', //边框颜色
											bgColor: '#ffffff', //背景色
											padding: 5, //文本边缘留白
											textAlign: 'center' //文本对齐方式。有效值: left, right, center
										}
									}
								)
							}
							that.setData({
								markers: markersArray
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


		if (this.data.level == 2) {

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

	}
})