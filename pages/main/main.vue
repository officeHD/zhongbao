<template>
	<view>
		<view class="content">
			<image class="logoImg" src="../../static/img/logo2.png" mode="widthFix"></image>
			<!-- <view class="userSection">
				<view class="userName"> 张三</view>
				<view class="cellList">
					<text class="cellleft">最近服务的企业</text>
					<text class="cellright">只用奥术大师多</text>
				</view>
				<view class="cellList">
					<text class="cellleft">最近一笔外包服务收入</text>
					<text class="cellright">只用奥术大师多</text>
				</view>
				<view class="cellList">
					<text class="cellleft">总外包服务收入</text>
					<text class="cellright">只用奥术大师多</text>
				</view>
			</view> -->
			<view class="sectionTab">
				<navigator url="/pages/user/user" class="sectionItem">
					<image class="itemIcon" src="../../static/img/sec1.png" mode="widthFix"></image>
					<text class="itemtitle">我的基本信息</text>
				</navigator>
				<navigator url="/pages/validate/validate" class="sectionItem">
					<image class="itemIcon" src="../../static/img/sec2.png" mode="widthFix"></image>
					<text class="itemtitle">二郎神验证</text>
				</navigator>

				<navigator url="/pages/businessPlace/businessPlace" class="sectionItem">
					<image class="itemIcon" src="../../static/img/sec3.png" mode="widthFix"></image>
					<text class="itemtitle">我的经营场所</text>
				</navigator>
				<view class="sectionItem " @click="toastTip">
					<image class="itemIcon" src="../../static/img/sec4.png" mode="widthFix"></image>
					<text class="itemtitle">我的外包合同</text>
					<view class="gray"></view>
				</view>
				<navigator url="/pages/company/company" class="sectionItem">
					<image class="itemIcon" src="../../static/img/sec5.png" mode="widthFix"></image>
					<text class="itemtitle">我服务过的企业</text>
				</navigator>
				<view class="sectionItem  " @click="toastTip">
					<image class="itemIcon" src="../../static/img/sec6.png" mode="widthFix"></image>
					<text class="itemtitle">我的业务交付支付确认函</text>
					<view class="gray"></view>
				</view>
				<view class="sectionItem" @click="toastTip">
					<image class="itemIcon" src="../../static/img/sec7.png" mode="widthFix"></image>
					<text class="itemtitle">我的完税证明</text>
					<view class="gray"></view>
				</view>
			</view>
			<image class="banner" src="../../static/img/banner.png" mode="widthFix"></image>
		</view>

		<view class="mask" v-if="showNotice">
			<view class="maskContent">
				<view class="mask_title">敬请期待</view>
				<view class="mask_new" @click="showNotice=false">我知道了</view>
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
				showNotice: false
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
			toastTip() {
				// this.$api.msg("暂未开通");
				this.showNotice = true;
			}

		}
	}
</script>

<style scoped>
	.mask {
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, .2);
	}

	.maskContent {
		width: 542rpx;
		height: 325rpx;
		background-color: #FFFFFF;
		border-radius: 28rpx;
		padding: 0 30rpx;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -271rpx;
		margin-top: -150rpx;
	}

	.mask_title {
		height: 220rpx;
		text-align: center;
		line-height: 220rpx;
		font-size: 34rpx;
		color: #1E1E1E;
	}

	.mask_new {
		border-top: 1px solid #DADADA;
		line-height: 60rpx;
		height: 104rpx;
		line-height: 104rpx;
		font-size: 34rpx;
		text-align: center;
		color: #1667F3;
	}

	.content {
		background-color: #FFFFFF;
		padding: 30rpx;
		position: relative;
		min-height: 100vh;
		padding-bottom: 330rpx;
	}

	.logoImg {
		width: 298rpx;
		height: 43rpx;
		display: block;
		margin: 10px 0;
	}

	.userSection {
		padding: 25rpx;
		border-radius: 10rpx;
		background-color: #E7E9F3;
		margin-top: 20rpx;
	}

	.userName {
		border-bottom: 1px dashed #C8CDE1;
		font-size: 40rpx;
		font-weight: 600;
		color: #000;
		padding-bottom: 10rpx;
		margin-bottom: 15rpx;
	}

	.cellList {
		font-size: 24rpx;
		display: flex;
		margin-top: 15rpx;
		color: #6F6F6F;
	}

	.cellleft,
	.cellright {
		flex: 1;
		text-align: left;
	}

	.cellright {
		color: #1E1E1E;
	}

	.sectionTab {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 30rpx;
	}

	.sectionItem {
		width: 330rpx;
		height: 230rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #F6F7FC;
		margin-bottom: 20rpx;

		color: #000000;
		position: relative;
		overflow: hidden;
	}

	.gray {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, .1);
	}

	.itemIcon {
		width: 100rpx;
		height: 100rpx;
	}

	.itemtitle {
		padding-top: 20rpx;
		font-size: 29rpx;
		font-weight: 600;
	}

	.banner {
		display: block;
		margin-top: 50rpx;
		width: 100%;
		height: 232rpx;
		position: absolute;
		left: 0;
		bottom: 0;
	}
</style>
