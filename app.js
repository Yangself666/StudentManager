App({
	globalData: {
		appid: "wxb4af88d61d8255aa",
		secret: "a4c3744b257b5b68403c37ab142cda42",
		personMsg: null,
		openid:null
	},
	/**
	 * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
	 */
	onLaunch: function () {
		console.log("应用第一次启动")
		var that = this
		if (!this.globalData.openid) {//如果app的openid中没有数据，执行获取openid操作
			wx.login({
				success: (res) => {
					wx.request({
						url: 'https://api.weixin.qq.com/sns/jscode2session',
						data: {
							appid: that.globalData.appid,
							secret: that.globalData.secret,
							js_code: res.code,
							grant_type: "authorization_code"
						},
						method: "GET",
						success(res) {//res中的data.openid是获取到的openid，为了保证是在获取后执行登录，使用回调
							that.globalData.openid = res.data.openid
							wx.request({//获取数据库中个人信息
								url: 'https://xiaoyu995.xyz:8443/collegeLife/login',
								data: {
									openid: res.data.openid
								},
								method: "GET",
								success(res) {//已经获取到个人信息，在res.data中
									console.log(res)
									if (!res.data) {//如果没有内容
										console.log("是空的，没有登录")
									} else {//如果获取到信息，将个人信息存放到app.globalData中
										that.globalData.personMsg = res.data
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
						}
					})
				},
			})
		}
	},

	/**
	 * 当小程序启动，或从后台进入前台显示，会触发 onShow
	 */
	onShow: function (options) {
		var that = this
		this.getUserOpenid = res => {
			this.globalData.openid = res.data.openid
			console.log(res.data.openid)
			
		}

	},

	/**
	 * 当小程序从前台进入后台，会触发 onHide
	 */
	onHide: function () {

	},

	/**
	 * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
	 */
	onError: function (msg) {

	}

})