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
		if(this.data.level == 1){
			wx.request({
				url: 'https://xiaoyu995.xyz:8443/collegeLife/member',
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
												content: res.data[index].sName+"\n"+res.data[index].sNumber+"\n"+res.data[index].cName,
												color: '#000000',
												borderRadius: 15,
												borderWidth: 1,
												borderColor: '#ec5c5d',
												bgColor: '#ffffff',
												padding: 5,
												textAlign: 'center'
											}
										}
									)
								}
								console.log("数组为")
								console.log(markersArray)
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
		}
		


		if (this.data.level == 2) {
			wx.request({
				url: 'http://localhost:8080/CollegeLife_war_exploded/collegeLocation',
				data: {
					coid: 1,
				},
				method: "GET",
				success(res) {
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
									content: res.data[index].sName+"\n"+res.data[index].sNumber+"\n"+res.data[index].cName,
									color: '#000000',
									borderRadius: 15,
									borderWidth: 1,
									borderColor: '#ec5c5d',
									bgColor: '#ffffff',
									padding: 5,
									textAlign: 'center'
								}
							}
						)
					}
					console.log("数组为")
					console.log(markersArray)
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

		if (this.data.level == 3) {
			wx.request({
				url: 'https://xiaoyu995.xyz:8443/collegeLife/allLocation',
				method: "GET",
				success(res) {
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
									content: res.data[index].sName+"\n"+res.data[index].sNumber+"\n"+res.data[index].cName,
									color: '#000000',
									borderRadius: 15,
									borderWidth: 1,
									borderColor: '#ec5c5d',
									bgColor: '#ffffff',
									padding: 5,
									textAlign: 'center'
								}
							}
						)
					}
					console.log("数组为")
					console.log(markersArray)
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