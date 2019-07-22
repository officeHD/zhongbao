<template>
	<view>
		<view class="content">
			<image class="logoImg" src="../../static/img/logo2.png" mode="widthFix"></image>
			<view class="userSection">
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
			</view>
			<view class="sectionTab">
				<navigator url="/pages/user/user" class="sectionItem" >
					<image class="itemIcon" src="../../static/img/sec1.png" mode="widthFix"></image>
					<text class="itemtitle">我的基本信息</text>
				</navigator >
				<navigator url="/pages/validate/validate" class="sectionItem" >
					<image class="itemIcon" src="../../static/img/sec2.png" mode="widthFix"></image>
					<text class="itemtitle">二郎神验证</text>
				</navigator>
				
				<navigator url="/pages/businessPlace/businessPlace" class="sectionItem" >
					<image class="itemIcon" src="../../static/img/sec3.png" mode="widthFix"></image>
					<text class="itemtitle">我的经营场所</text>
				</navigator>
				<view class="sectionItem">
					<image class="itemIcon" src="../../static/img/sec4.png" mode="widthFix"></image>
					<text class="itemtitle">我的外包合同</text>
				</view>
				<navigator url="/pages/company/company" class="sectionItem" >
					<image class="itemIcon" src="../../static/img/sec5.png" mode="widthFix"></image>
					<text class="itemtitle">我服务过的企业</text>
				</navigator>
				<view class="sectionItem">
					<image class="itemIcon" src="../../static/img/sec6.png" mode="widthFix"></image>
					<text class="itemtitle">我的业务交付支付确认函</text>
				</view>
				<view class="sectionItem">
					<image class="itemIcon" src="../../static/img/sec7.png" mode="widthFix"></image>
					<text class="itemtitle">我的完税证明</text>
				</view>
			</view>
		</view>
		<image class="banner" src="../../static/img/banner.png" mode="widthFix"></image>


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
					title: '正在加载',
					data: {
						token: this.token
	
					}
				});
				if (res.data.code == 200) {
					this.setUserData(res.data.data)
	
				} else {
					this.$api.msg(res.data.message);
				}
			}
		}
	}
</script>

<style scoped>
	.content {
		background-color: #FFFFFF;
		padding: 30rpx;
	}

	.logoImg {
		width: 298rpx;
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
		;
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
		;

		color: #000000;
	}

	.itemIcon {
		width: 100rpx;

	}

	.itemtitle {
		padding-top: 20rpx;
		font-size: 30rpx;
		font-weight: 600;
	}

	.banner {
		display: block;
		margin-top: 50rpx;
		width: 100%;
	}
</style>
