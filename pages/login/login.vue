<template>
	<view class="content">
		<image class="logoImg" src="../../static/img/LOGO.png"></image>
		<text class="welcome">欢迎您!</text>
		<view class="target">
			<text class="leftLine"></text>
			<text>科技&数据赋能创客(自由职业者)轻松做老板</text>
			<text class="rightLine"></text>
		</view>
		<view class="sectionBar">
			<text class="loginTab " :class="{'active': pageType=='login'}" @click="pageType='login'">登录</text>
			<text class="registerTab" :class="{'active': pageType!=='login'}" @click="pageType='register',loginType='phone'">注册</text>
		</view>
		<view class="loginWm" v-if="loginType!=='account'">
			<view class="inputBox">
				<input class="inputItem" type="text" maxlength="11" :value="mobile" data-key="mobile" @input="inputChange"
				 placeholder="请输入手机号" placeholder-style="color:#D6D6FF" />
			</view>
			<view class="inputBox">
				<input class="inputItem" type="text" maxlength="6" :value="vaild" data-key="vaild" @input="inputChange" placeholder="请输入验证码"
				 placeholder-style="color:#D6D6FF" />
				<text class="cendMsm" @click="checking" v-if="state===false">发送验证码</text>
				<text class="cendMsm zai-time" v-if="state===true">倒计时{{ currentTime }}s</text>
			</view>
			<view class="inputBox" v-if="pageType=='register'">
				<input class="inputItem" type="text" :value="password" data-key="password" @input="inputChange" placeholder="密码至少为6位长度的数字或字母组合"
				 placeholder-style="color:#D6D6FF" />
			</view>
		</view>
		<view class="loginWm" v-if="pageType=='login'&&loginType=='account'">
			<view class="inputBox">
				<image class="yonghuIcon" src="../../static/img/yonghu.png"></image>
				<text class="lineBorder"></text>
				<input class="inputItem" type="text" :value="account" data-key="account" @input="inputChange" placeholder="请输入账号"
				 placeholder-style="color:#D6D6FF" />
			</view>
			<view class="inputBox">
				<image class="passwordIcon" src="../../static/img/password.png"></image>
				<text class="lineBorder"></text>
				<input class="inputItem" type="text" :value="password" data-key="password" @input="inputChange" placeholder="请输入密码"
				 placeholder-style="color:#D6D6FF" />
			</view>
		</view>
		<text v-if="pageType=='login'&&loginType=='account'" class="loginType" @click="loginType='phone'">验证码登录</text>
		<text v-if="pageType=='login'&&loginType=='phone'" class="loginType" @click="loginType='account'">账号密码登录</text>
		<view class="btn-row" v-if="pageType=='login'">
			<button v-if="loginType=='phone'" class="primaryBtn" @tap="toLogin">快速登录</button>
			<button v-if="loginType=='account'" class="primaryBtn" @tap="toLoginPw">快速登录</button>
		</view>
		<view class="btn-row" v-if="pageType=='register'">
			<button class="primaryBtn" @tap="toRegister">立即注册</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				loginType: 'phone',
				pageType: "login",
				state: false, //是否开启倒计时
				totalTime: 60, //总时间，单位秒
				recordingTime: 0, //记录时间变量
				currentTime: 0, //显示时间变量
				vaild: "",
				mobile: '',
				password: '',
				account: '',
				positionTop: 0
			}
		},
		onLoad() {
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					that.getOpenId(loginRes.code);
				}
			});
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login', 'setOpenId']),
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			async loginWithWe(code) {
				var res = await this.$req.ajax({
					path: '/wxapi/login/WeChat',
					title: '正在加载',
					data: {
						WeChatID: code,
						verify: "zhongbao"

					}
				});
				if (res.data.code == 200) {
					console.log(res.data.data)
					uni.redirectTo({
						url: "/pages/main/main"
					})
				} else {
					this.$api.msg(res.data.message);
				}
			},
			async getOpenId(code) {
				var res = await this.$req.ajax({
					path: '/wxapi/login/getOpenid',
					title: '正在加载',
					data: {
						code: code,
						appid: "wx7aa0d26e5ca6597c",
						secret: "a43098ef40806ae89c1711ab3b9a6e15"
					}
				});
				if (res.data.code == 200) {
					let resdata = JSON.parse(res.data.data.code);
					this.loginWithWe(resdata.openid)
					this.setOpenId(resdata.openid)

				}
			},
			async toRegister() {
				if (!/(^1[3|4|5|6|7|8|9][0-9]{9}$)/.test(this.mobile)) {
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				let res = await this.$req.ajax({
					path: '/wxapi/Login/registered',
					title: '正在加载',
					data: {
						account: this.mobile,
						LoginPWD: this.password,
						code: this.vaild,

					}
				});
				if (res.data.code == 200) {
					this.login(res.data.data.token);
					uni.redirectTo({
						url: "/pages/main/main"
					})
				} else {
					this.$api.msg(res.data.message)

				}
			},
			async checking() {
				if (!/(^1[3|4|5|6|7|8|9][0-9]{9}$)/.test(this.mobile)) {
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				// 
				let res = await this.$req.ajax({
					path: 'wxapi/sms/ChuanglanSmsApi',
					title: '正在加载',
					data: {
						account: this.mobile,

					}
				});
				if (res.data.code == 200) {
					//把显示时间设为总时间
					this.currentTime = this.totalTime;
					//开始倒计时
					this.state = true;
					//执行倒计时
					this.checkingTime();
				} else {
					this.$api.msg(res.data.message)

				}

			},
			checkingTime() {
				let that = this;
				//判断是否开启
				if (this.state) {
					//判断显示时间是否已到0，判断记录时间是否已到总时间
					if (this.currentTime > 0 && this.recordingTime <= this.totalTime) {
						//记录时间增加 1
						this.recordingTime = this.recordingTime + 1;
						//显示时间，用总时间 - 记录时间
						this.currentTime = this.totalTime - this.recordingTime;
						//1秒钟后，再次执行本方法
						setTimeout(() => {
							//定时器内，this指向外部，找不到vue的方法，所以，需要用that变量。
							that.checkingTime();
						}, 1000)
					} else {
						//时间已完成，还原相关变量
						this.state = false; //关闭倒计时
						this.recordingTime = 0; //记录时间为0
						this.currentTime = this.totalTime; //显示时间为总时间
					}
				} else {
					//倒计时未开启，初始化默认变量
					this.state = false;
					this.recordingTime = 0;
					this.currentTime = this.totalTime;
				}
			},
			async toLoginPw(){
				 
				let res = await this.$req.ajax({
					path: '/wxapi/login/Loginpwd',
					title: '正在加载',
					data: {
						account: this.account,
						LoginPWD: this.password,
				
					}
				});
				if (res.data.code == 200) {
					this.login(res.data.data.token);
					uni.redirectTo({
						url: "/pages/main/main"
					})
				} else {
					this.$api.msg(res.data.message)
				
				}
			},
			async toLogin() {
				this.logining = true;
				const {
					mobile,
					vaild
				} = this;
				if (!/(^1[3|4|5|6|7|8|9][0-9]{9}$)/.test(mobile)) {
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				const sendData = {
					mobile,
					vaild
				};

				const result = await this.$req.ajax({
					path: 'wxapi/login/makerLogin',
					title: '正在加载',
					data: sendData
				});
				if (result.data.code === 200) {
					this.login(result.data.data.token);
					uni.navigateTo({
						url: "/pages/main/main"
					});
				} else {
					this.$api.msg(result.data.message);
					this.logining = false;
				}
			}
		}
	}
</script>

<style>
	.content {
		background: linear-gradient(to bottom, #1666F3, #7F7AFF);
		padding-top: 100upx;
	}

	.logoImg {
		width: 409upx;
		height: 120upx;
		display: block;
		margin: 30upx auto;
	}

	.welcome {
		font-size: 50rpx;
		color: #FFFFFF;
		font-family: PingFangSC-Medium;
		text-align: center;
		letter-spacing: 5rpx;
		margin-top: 20rpx;
	}

	.target {
		display: flex;
		;
		justify-content: center;
		font-size: 24upx;
		margin: 30rpx 0;
		color: #FFFFFF;
		align-items: center;

	}

	.leftLine {
		display: block;
		width: 80rpx;
		height: 1rpx;
		background: linear-gradient(to left, #fff, rgba(255, 255, 255, 0));
		margin-right: 10rpx;
	}

	.rightLine {
		display: block;
		width: 80rpx;
		height: 1rpx;
		background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
		margin-left: 10rpx;
	}

	.sectionBar {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		padding: 0 50px;
		margin-bottom: 30px;
	}

	.loginTab,
	.registerTab {
		padding: 15rpx;
		color: #CED8FE;
		font-size: 26rpx;
		;

	}

	.loginTab.active,
	.registerTab.active {
		border-bottom: 2px solid #fff;
		color: #fff;
		;
	}

	.loginWm {
		padding: 10rpx 30rpx;
	}

	.inputBox {
		border-bottom: 1px solid #7D99FF;
		height: 90rpx;
		display: flex;
		align-items: center;
		padding-top: 20rpx;
		font-size: 26rpx;
		color: #FFFFFF;
		padding-right: 5rpx;
	}

	.passwordIcon {
		width: 40rpx;
		height: 19rpx;
		padding-right: 20rpx;
	}

	.yonghuIcon {
		width: 33rpx;
		height: 35rpx;
		margin-left: 7rpx;
		padding-right: 20rpx;
	}

	.lineBorder {
		display: block;
		height: 35rpx;
		border-right: 1px solid #FFFFFF;
	}

	.loginType {
		text-align: right;
		font-size: 26rpx;
		color: #FFFFFF;
		padding-right: 30rpx;
		padding-top: 20rpx;
	}

	.inputItem {
		flex: 1;
		padding-left: 20rpx;
		;
		font-size: 26rpx;
		height: 70rpx;
		line-height: 70rpx;
	}

	.cendMsm {
		font-size: 26rpx;
	}

	.primaryBtn {
		border-radius: 100rpx;
		background-color: #FFFFFF;
		font-size: 30rpx;
		color: #007AFF;
		height: 100rpx;
		line-height: 100rpx;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
</style>
