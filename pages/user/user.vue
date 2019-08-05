<template>
	<view class="wrapper">
		<view class="celBox bb">
			<text class="c333">本人正面免冠照片</text>
			<view class="rightRow p20" @tap="testUp">
				<image v-if="userData.SelfPic" class="avator" :src="userData.SelfPic" mode="aspectFill"></image>
				<text class="c888" v-if="!userData.SelfPic">暂无</text>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="celBox bb ">
			<text class="c333">姓名</text>
			<navigator class="rightRow" url="/pages/user/uploadIdcard">
				<text class="c888" >{{userData.Name||""}}</text>
				<image v-if="!userData.Name" class="cammer" src="../../static/img/cammer.png" mode="widthFix"></image>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image>
			</navigator>
		</view>
		<view class="celBox bb">
			<text class="c333">身份证号码</text>
			<text class="c888 pr32">{{userData.IDCardNo?userData.IDCardNo.replace(userData.IDCardNo.substring(2,14), "************"):'暂无'}}</text>
		</view>
		<view class="celBox bb">
			<text class="c333">身份证有效期</text>
			<text class="c888 pr32">{{userData.DueDate||'暂无'}}</text>
		</view>
		<view class="celBox bb">
			<text class="c333">手机号码</text>
			<navigator class="rightRow" url="/pages/user/changePhone">
				<text class="c888">{{userData.PhoneNumber?userData.PhoneNumber.replace(userData.PhoneNumber.substring(3,9), "******"):"暂无"}}</text>
				<text class="changePhone" v-if="userData.PhoneNumber">更换</text>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image>

			</navigator>
		</view>
		<view class="celBox bb">
			<text class="c333">验证状态</text>
			<view class="rightRow" v-if="userData.StatusVerify=='1'">
				<text class=" changePhone">验证通过</text> 
			</view>
			<navigator class="rightRow" v-if="!userData.StatusVerify||userData.StatusVerify!=1" url="/pages/validate/validate">
				<text class=" changePhone">{{userData.StatusVerify==2?"未通过":"未验证"}}</text>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image> 
			</navigator>
		</view>
		<view class="celBox ">
			<text class="c333">验证时间</text>
			<text class="c888 pr32">{{userData.DateVerify||'无'}}</text>
		</view>
		<view class="celBox mt20 bb">
			<text class="c333">银行卡号</text>
			<navigator class="rightRow" url="/pages/bankcard/bankcard">

				<text class="c888">{{userData.BankCardNo?userData.BankCardNo.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "$1 **** **** $2"):'无'}}</text>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image>

			</navigator>
		</view>
		<view class="celBox bb">
			<text class="c333">开户银行</text>
			<text class="c888 pr32">{{userData.BankName||'无'}}</text>
		</view>
		<view class="celBox ">
			<text class="c333">开户支行</text>
			<text class="c888 pr32">{{userData.SubBankName||'无'}}</text>
		</view>
		<view class="celBox mt20 bb">
			<text class="c333">本人身份证正反面</text>
			<navigator class="rightRow" url="/pages/user/uploadIdcard">
				<image v-if=" userData.IDCardPic||userData.IDCardPicBack" class="demoImg" src="../../static/img/frontDemo.png"
				 mode="widthFix"></image>
				<image v-if=" userData.IDCardPic ||userData.IDCardPicBack" class="demoImg" src="../../static/img/backDemo.png"
				 mode="widthFix"></image>
				<text v-if="!userData.IDCardPic&&!userData.IDCardPicBack" class="c888">暂无</text>
			</navigator>
		</view>
		<view class="celBox mb20 bb">
			<view class="p20">
				<text class="c333">身份证正面+反面合一复印件</text>
				<view class="f24 c888 tips">
					办理个体户时需要，身份证正反面都复印到一张A4纸的一面
				</view>
			</view>

			<navigator class="rightRow" url="/pages/user/uploadImg">
				<text class="c888" v-if="!userData.IDCardCopy">暂无</text>
				<image class="demoImg" v-if="userData.IDCardCopy" src="../../static/img/copyde.png" mode="widthFix"></image>
				<image class="arrowImg" src="../../static/img/arrow.png" mode="widthFix"></image>
			</navigator>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import rup from '@/common/request/request-upFiles.js';
	export default {
		data() {
			return {

			}
		},
		computed: mapState(['token', 'userData']),
		onShow() {
			this.getUserData();
		},
		methods: {
			...mapMutations(['setUserData']), 
			async getUserData() {
				var res = await this.$req.ajax({
					path: '/wxapi/member/Maker',
					title: '',
					data: {
						token: this.token

					}
				});
				if (res.data.code == 200) {
					this.setUserData(res.data.data)

				} else {
					this.$api.msg(res.data.message);
				}
			},
			async maker_SelfPic(url){
				var res = await this.$req.ajax({
					path: '/wxapi/member/maker_SelfPic',
					title: '正在加载',
					data: {
						token: this.token,
						url:url
				
					}
				});
				if (res.data.code == 200) {
					this.getUserData()
				
				} else {
					this.$api.msg(res.data.message);
				}
			},
			async testUp(index) {
				let that=this;
				try {
					const res = await rup.selectFiles({
						type: 2,
						maximum: 1,
						upload: {
							path: 'https://www.appi2b2b.com/wxapi/member/Uplode',
							files: ['file'],
							title: '正在上传',
							extra: {
								token: this.token
							}
						}
					})
			
					// let imageArr=
					if (res.upload && res.upload.length > 0) {
						res.upload.forEach(item => {
							let returnData = JSON.parse(item);
							console.log(returnData)
							if (returnData.code == 200) {
								that.maker_SelfPic(returnData.data.url)
							}
			
						})
					}
				} catch (e) {
					console.log(e)
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
		background-color: #FFFFFF;
		min-height: 100rpx;
		padding-right: 32rpx;
	}
	.pr32{
		padding-right: 32rpx;
	}
.p20{
	padding-top: 20rpx;
	padding-bottom: 20rpx;
}
	.cammer {
		width: 48rpx;
		height: 48rpx;

	}

	.demoImg {
		width: 60rpx;
		margin-left: 10rpx;
	}

	.tips {
		margin-top: 15rpx;
	}

	.f24 {
		font-size: 24rpx;
	}
	.c333{
		color: #333333;
	}
	.c888 {
		color: #888888;
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
		padding-left: 32rpx;
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
