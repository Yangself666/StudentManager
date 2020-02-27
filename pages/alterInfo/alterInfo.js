// pages/signin/signin.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		personMsg: null,
		multiArray: [
			['电子信息工程', '电气工程及其自动化', '计算机科学与技术'],
			['电子1601班']
		],
		objectMultiArray: [
			[{
					id: 0,
					name: '电子信息工程'
				},
				{
					id: 1,
					name: '电气工程及其自动化'
				},
				{
					id: 2,
					name: '计算机科学与技术'
				}
			],
			[{
					id: 0,
					name: '电子1601班'
				},
				{
					id: 1,
					name: '电气1601班'
				},
				{
					id: 2,
					name: '电气1602班'
				},
				{
					id: 3,
					name: '电气1603班'
				},
				{
					id: 4,
					name: '电气1604班'
				},
				{
					id: 5,
					name: '计算机1601班'
				},
				{
					id: 6,
					name: '计算机1602班'
				},
				{
					id: 7,
					name: '计算机1603班'
				},
				{
					id: 8,
					name: '计算机1604班'
				}
			]
		],
		multiIndex: [0, 0],
		classIndex: [0, 0],
		sName: null,
		sNumber: null
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
				sName: res.personMsg.sName,
				sNumber: res.personMsg.sNumber
			})
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
	bindMultiPickerColumnChange: function (e) {
		var data = {
			multiArray: this.data.multiArray,
			multiIndex: this.data.multiIndex
		};
		data.multiIndex[e.detail.column] = e.detail.value;
		switch (e.detail.column) {
			case 0:
				switch (data.multiIndex[0]) {
					case 0:
						data.multiArray[1] = ['电子1601班'];
						break;
					case 1:
						data.multiArray[1] = ['电气1601班', '电气1602班', '电气1603班', '电气1604班'];
						break;
					case 2:
						data.multiArray[1] = ['计算机1601班', '计算机1602班', '计算机1603班', '计算机1604班'];
						break;
				}
				data.multiIndex[1] = 0;
				break;
		}
		this.setData(data);
	},
	bindMultiPickerChange: function (e) {
		this.setData({
			classIndex: e.detail.value
		});
	},
	typeName: function (e) {
		this.setData({
			sName: e.detail.value
		});
	},
	typeNumber: function (e) {
		this.setData({
			sNumber: e.detail.value
		});
	},
	formSubmit: function () {
		const eventChannel = this.getOpenerEventChannel()
		var that = this;
		var data = this.data;
		if (!data.sName || !data.sNumber) {
			wx.showToast({
				title: '姓名和学号不能为空！',
				icon: 'none',
				duration: 2000
			})
		} else {
			wx.request({
				url: 'http://localhost:8080/CollegeLife_war_exploded/info',
				data: {
					openid: app.globalData.openid,
					sName: data.sName,
					sNumber: data.sNumber,
					classIndex0: data.classIndex[0],
					classIndex1: data.classIndex[1]
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
						console.log(res)
						wx.showToast({
							title: res.data,
							icon: 'none',
							duration: 2000
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
	}
})