// pages/location/location.js
const app = getApp();
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
		wx.stopPullDownRefresh()
		var that = this


		this.setData({
			personMsg: app.globalData.personMsg,
			level: app.globalData.personMsg.level
		})
		console.log(app.globalData.personMsg)
		if (this.data.level == 1) {
			wx.request({
				url: 'https://yangself.cn/collegeLife/member',
				data: {
					openid: this.data.personMsg.openid
				},
				method: "GET",
				success(res) {
					console.log("查询cid为")
					console.log(res.data)
					wx.request({
						url: 'http://yangself.cn/collegeLife/classLocation',
						data: {
							cid: res.data.cid,
						},
						method: "GET",
						success(res) {
							var markersArray = [];
							console.warn(res)
							for (let index = 0; index < res.data.length; index++) {
								var font = res.data[index].updateTime.indexOf(".")
								var time = res.data[index].updateTime.substring(0, font)
								markersArray.push({
									iconPath: "/images/icon/icon_gps.png",
									id: index,
									latitude: res.data[index].latitude,
									longitude: res.data[index].longitude,
									width: 30,
									height: 30,
									callout: {
										content: res.data[index].sName + "\n" + res.data[index].sNumber + "\n" + res.data[index].cName + "\n更新时间：" + time,
										color: '#000000',
										borderRadius: 15,
										borderWidth: 1,
										borderColor: '#ec5c5d',
										bgColor: '#ffffff',
										padding: 5,
										textAlign: 'center'
									}
								})
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
				url: 'https://yangself.cn/collegeLife/collegeLocation',
				data: {
					coid: 1,
				},
				method: "GET",
				success(res) {
					var markersArray = [];
					for (let index = 0; index < res.data.length; index++) {
						var font = res.data[index].updateTime.indexOf(".")
						var time = res.data[index].updateTime.substring(0, font)
						markersArray.push({
							iconPath: "/images/icon/icon_gps.png",
							id: index,
							latitude: res.data[index].latitude,
							longitude: res.data[index].longitude,
							width: 30,
							height: 30,
							callout: {
								content: res.data[index].sName + "\n" + res.data[index].sNumber + "\n" + res.data[index].cName + "\n更新时间：" + time,
								color: '#000000',
								borderRadius: 15,
								borderWidth: 1,
								borderColor: '#ec5c5d',
								bgColor: '#ffffff',
								padding: 5,
								textAlign: 'center'
							}
						})
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
				url: 'https://yangself.cn/collegeLife/allLocation',
				method: "GET",
				success(res) {
					var markersArray = [];
					for (let index = 0; index < res.data.length; index++) {
						var font = res.data[index].updateTime.indexOf(".")
						var time = res.data[index].updateTime.substring(0, font)
						markersArray.push({
							iconPath: "/images/icon/icon_gps.png",
							id: index,
							latitude: res.data[index].latitude,
							longitude: res.data[index].longitude,
							width: 30,
							height: 30,
							callout: {
								content: res.data[index].sName + "\n" + res.data[index].sNumber + "\n" + res.data[index].cName + "\n更新时间：" + time,
								color: '#000000',
								borderRadius: 15,
								borderWidth: 1,
								borderColor: '#ec5c5d',
								bgColor: '#ffffff',
								padding: 5,
								textAlign: 'center'
							}
						})
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

	}
})