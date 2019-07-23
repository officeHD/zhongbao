<template>
	<view class="wrapper"> 
		<view class="celBox bb">
			<text class="c666">我的线下经营场所</text>
			<text class="inputBox">{{userData.RunAddress}}</text>
		</view>
		<view class="celBox bb">
			<text class="c666">我的线上经营场所</text>
			<text class="inputBox">{{userData.ShopURL}}</text>
		</view>
		<view class="celBox bb">
			<text>自我介绍（采用企业介绍的方式撰写自我介绍），不少于150字哦：</text> 
		</view> 
		<textarea class="textarea" placeholder="请输入" :value="userData.SelfDesc" @input="changedec"></textarea>
		 <view class="btn-row">
		 	<button class="primaryBtn" @tap="bindLogin">保存</button>
		 </view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['token', 'userData'])
		},
		methods: {
			...mapMutations(['logout']),
			changedec(e){
				this.userData.SelfDesc=e.detail.value
			},
			async bindLogin(){
				let res = await this.$req.ajax({
					path: '/wxapi/member/maker_SelfDesc',
					title: '正在加载',
					data: {
						introduce:this.userData.SelfDesc,
						token: this.token,
					}
				});
				
				if (res.data.code == 200) {
					 this.$api.msg("保存成功");
					 uni.navigateBack({
					 	
					 })
				
				} else {
					this.$api.msg(res.data.message)
				
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
	.textarea{
		background-color: #FFFFFF;
		width: 100%;
		height: 300rpx;
		padding: 20rpx;
		font-size: 28rpx;
		box-sizing: border-box;
	}
.primaryBtn {
		background-color: #007AFF;
		color: #FFFFFF;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}
.inputBox{
	flex: 1;
}
	.celBox {
		display: flex;
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
		color: #000;
		width: 260rpx;
	}

	.tips {
		display: block;
		padding: 30rpx;
		color: #666;
		font-size: 24rpx;
		;
	}

	.cblue {
		color: #1666F3;
	}

	.avator {
		width: 100rpx;
		height: 100rpx;
	}
</style>
