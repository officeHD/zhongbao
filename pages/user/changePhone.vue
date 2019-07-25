<template>
	<view class="wrapper">


		<view class="loginWm">
			<view class="inputBox">
				<view class="title">原手机号码</view>
				<input class="inputItem" type="number" maxlength="11" :value="account" data-key="account" @input="inputChange"
				 placeholder="请输入手机号" placeholder-style="color:#999" />
			</view>
			<view class="inputBox">
				<view class="title">新手机号码</view>
				<input class="inputItem" type="number" maxlength="11" :value="mobile" data-key="mobile" @input="inputChange"
				 placeholder="请输入新手机号" placeholder-style="color:#999" />
				<text class="cendMsm" @click="checking" v-if="state===false">发送验证码</text>
				<text class="defaultBtn" v-if="state===true">倒计时{{ currentTime }}s</text>
			</view>
			<view class="inputBox">
				<view class="title">验证码</view>
				<input class="inputItem" type="text" maxlength="6" :value="vaild" data-key="vaild" @input="inputChange" placeholder="请输入验证码"
				 placeholder-style="color:#999" />
			</view>
		</view>


		<view class="btn-row">
			<button class="primaryBtn" @tap="toRegister">保存</button>
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

		},
		computed: mapState(['token']),
		methods: {
			...mapMutations(['login', 'setOpenId']),
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},

			async toRegister() {
				if (!/(^1[3|4|5|6|7|8|9][0-9]{9}$)/.test(this.account)) {
					this.$api.msg('请输入正确的原手机号');
					return;
				}
				if (!/(^1[3|4|5|6|7|8|9][0-9]{9}$)/.test(this.mobile)) {
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(this.account==this.mobile){
					this.$api.msg('手机号相同，请重新输入');
					return;
				}
				let res = await this.$req.ajax({
					path: '/wxapi/member/maker_mobile',
					title: '正在加载',
					data: {
						account: this.mobile,
						code: this.vaild,
						token: this.token,


					}
				});
				if (res.data.code == 200) {
					this.$api.msg("修改成功")
					 setTimeout(function() {
					 	uni.navigateBack({})
					 },1000)
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
			}


		}
	}
</script>

<style>
	.wrapper {
		width: 100%;
	}

	.logoImg {
		width: 409upx;
		height: 120upx;
		display: block;
		margin: 30upx auto;
	}


	.title {
		color: #000000;
		width: 180rpx;
		text-align: left;
		padding-left: 20rpx;
		font-size: 28rpx;

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

	}

	.loginTab.active,
	.registerTab.active {
		border-bottom: 2px solid #fff;
		color: #fff;
		;
	}

	.loginWm {
		padding: 10rpx 0;
		width: 100%;
	}

	.inputBox {
		background: #FFFFFF;
		border-bottom: 1px solid #E6E6E6;
		height: 90rpx;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: #FFFFFF;
		padding-right: 5rpx;
		color: #333333;
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
		background-color: #1666F3;
		margin: 0 10rpx;
		border-radius: 8rpx;
		color: #FFFFFF;
		padding: 15rpx 25rpx;
	}

	.defaultBtn {
		font-size: 26rpx;
		background-color: #666666;
		margin: 0 10rpx;
		border-radius: 8rpx;
		color: #F2F2F2;
		padding: 15rpx 25rpx;
	}

	.primaryBtn {
		border-radius: 8rpx;
		background-color: #1666F3;
		font-size: 30rpx;
		color: #FFFFFF;
		height: 100rpx;
		line-height: 100rpx;
		margin: 0 30rpx;
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
