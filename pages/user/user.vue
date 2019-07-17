<template>
	<view class="wrapper">
		<view class="celBox bb">
			<text>本人正面免冠照片</text>
			<view class="rightRow">
				<image v-if="userData.SelfPic" class="avator" :src="userData.SelfPic" mode="aspectFill"></image>
				<text v-if="!userData.SelfPic">暂无</text>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="celBox bb ">
			<text>姓名</text>
			<view class="rightRow">
				<text class="c666" v-if="userData.Name">{{userData.Name}}</text>
				<image v-if="!userData.Name" class="cammer" src="../../static/img/cammer.png" mode="widthFix"></image>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="celBox bb">
			<text>身份证号码</text>
			<text class="c666">{{userData.IDCardNo||'暂无'}}</text>
		</view>
		<view class="celBox bb">
			<text>身份证有效期</text>
			<text class="c666">{{userData.Name||'暂无'}}</text>
		</view>
		<view class="celBox bb">
			<text>手机号码</text>
			<view class="rightRow">
				<text class="c666">{{userData.PhoneNumber}}</text>
				<text class="changePhone">更换</text>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image>

			</view>
		</view>
		<view class="celBox bb">
			<text>验证状态</text>
			<view class="rightRow">
				<text class=" changePhone">{{userData.StatusVerify||'未验证'}}</text>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image>

			</view>
		</view>
		<view class="celBox ">
			<text>验证时间</text>
			<text class="c666">{{userData.DateVerify||'无'}}</text>
		</view>
		<view class="celBox mt20 bb">
			<text>银行卡号</text>
			<view class="rightRow">
				<text class="c666">{{userData.BankCardNo||'无'}}</text>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image>

			</view>
		</view>
		<view class="celBox bb">
			<text>开户银行</text>
			<text class="c666">{{userData.BankName||'无'}}</text>
		</view>
		<view class="celBox ">
			<text>开户支行</text>
			<text class="c666">{{userData.SubBankName||'无'}}</text>
		</view>
		<view class="celBox mt20 bb">
			<text>本人身份证正反面</text>
			<text class="c666">{{userData.Name||'无'}}</text>
		</view>
		<view class="celBox mb20 bb">
			<view class="">
				<text>身份证正面+反面合一复印件</text>
				<view class="f24 c999 tips">
					办理个体户时需要，身份证正反面都复印到一张A4纸的一面
				</view>
			</view>

			<view class="rightRow">
				<text class="c666">{{userData.Name}}</text>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				userData: {
					Age: "",
					BankCardNo: "",
					BankName: "",
					CreateDate: "",
					DateVerify: "",
					DescVerify: "",
					DueDate: "",
					FlagVerify: "",
					IDCardNo: "",
					IDCardPic: "",
					IDCardPicBack: "",
					MakerID: "",
					Name: "",
					NameVerifyManual: "",
					PhoneNumber: "",
					PicVerify: "",
					RelaDate: "",
					RunAddress: "",
					SelfDesc: "",
					SelfPic: "",
					Sex: "",
					ShopID: "",
					ShopURL: "",
					ShopUserName: "",
					ShopUserPWD: "",
					StatusVerify: "",
					SubBankName: "",
					WeChatID: "",
				}
			}
		},
		computed: mapState(['token']),
		onLoad() {
			// console.log(this.token)
			this.getUserData();
		},
		methods: {
			async getUserData() {
				var res = await this.$req.ajax({
					path: '/wxapi/member/Maker',
					title: '正在加载',
					data: {
						token: this.token

					}
				});
				if (res.data.code == 200) {
					this.userData = res.data.data;
				} else {
					this.$api.msg(res.data.message);
				}
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		width: 100%;
		min-height: 100vh;
		background-color: #F2F2F2;
		padding-bottom: 20px;
		;
	}

	.rightRow {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.cammer {
		width: 48rpx;
		height: 48rpx;

	}

	.tips {
		margin-top: 15rpx;
	}

	.f24 {
		font-size: 24rpx;
	}

	.c999 {
		color: #999999;
	}

	.arrowImg {
		width: 22rpx;
		height: 40rpx;
		margin-left: 22rpx;
	}

	.changePhone {
		color: #007AFF;
		margin-left: 50rpx;
		margin-right: -5rpx;
		font-size: 30rpx;
		font-weight: bold;
	}

	.cblue {
		color: #007AFF;
	}

	.celBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		background-color: #FFFFFF;
		min-height: 100rpx;
		padding: 20rpx 30rpx;
		color: #1E1E1E;

	}

	.bb {
		border-bottom: 1px solid #E4E4E4;
	}

	.mt20 {
		margin-top: 20rpx;
	}



	.c666 {
		color: #666;
	}

	.cblue {
		color: #1666F3;
	}

	.avator {
		width: 100rpx;
		height: 100rpx;
	}
</style>
