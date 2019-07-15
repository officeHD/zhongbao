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
				<input class="inputItem" type="text" value="" placeholder="请输入手机号" placeholder-style="color:#D6D6FF" />
			</view>
			<view class="inputBox">
				<input class="inputItem" type="text" value="" placeholder="请输入验证码" placeholder-style="color:#D6D6FF" />
				<text class="cendMsm">发送验证码</text>
			</view>
			<view class="inputBox" v-if="pageType=='register'">
				<input class="inputItem" type="text" value="" placeholder="密码至少为6位长度的数字或字母组合" placeholder-style="color:#D6D6FF" />
			</view>

		</view>
		<view class="loginWm" v-if="pageType=='login'&&loginType=='account'">
			<view class="inputBox">
				<image class="yonghuIcon" src="../../static/img/yonghu.png"></image>
				<text class="lineBorder"></text>
				<input class="inputItem" type="text" value="" placeholder="请输入账号" placeholder-style="color:#D6D6FF" />
			</view>
			<view class="inputBox">
				<image class="passwordIcon" src="../../static/img/password.png"></image>

				<text class="lineBorder"></text>

				<input class="inputItem" type="text" value="" placeholder="请输入密码" placeholder-style="color:#D6D6FF" />
			</view>


		</view>
		<text v-if="pageType=='login'&&loginType=='account'" class="loginType" @click="loginType='phone'">验证码登录</text>
		<text v-if="pageType=='login'&&loginType=='phone'" class="loginType" @click="loginType='account'">账号密码登录</text>

		<view class="btn-row">
			<button class="primaryBtn" @tap="bindLogin">快速登录</button>
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
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					account: this.account,
					password: this.password
				};
				const validUser = service.getUsers().some(function(user) {
					return data.account === user.account && data.password === user.password;
				});
				if (validUser) {
					this.toMain(this.account);
				} else {
					uni.showToast({
						icon: 'none',
						title: '用户账号或密码不正确',
					});
				}
			},
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.navigateBack();
				}

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
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
		;
		line-height: 100rpx;
		;
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
