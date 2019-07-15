<template>
	<view class="wrapper">
		<view class="celBox bb">
			<text>本人正面免冠照片</text>
			<image class="avator" src="../../static/img/人脸识别.png" mode="aspectFill"></image>
		</view>
		<view class="celBox bb">
			<text>姓名</text>
			<text class="c666">张三</text>  
		</view>
		<view class="celBox bb">
			<text>身份证号码</text>
			<text class="c666">张三</text>  
		</view>
		<view class="celBox bb">
			<text>身份证有效期</text>
			<text class="c666">张三</text>  
		</view>
		<view class="celBox bb">
			<text>手机号码</text>
			<text class="c666">张三</text>  
		</view>
		<view class="celBox bb">
			<text>验证状态</text>
			<text class="c666">张三</text>  
		</view>
		<view class="celBox ">
			<text>验证时间</text>
			<text class="c666">张三</text>  
		</view>
		<view class="celBox mt20 bb">
			<text>银行卡号</text>
			<text class="c666">张三</text>  
		</view>
		<view class="celBox bb">
			<text>开户银行</text>
			<text class="c666">张三</text>  
		</view>
		<view class="celBox ">
			<text>开户支行</text>
			<text class="c666">张三</text>  
		</view>
		<view class="celBox mt20 bb">
			<text>本人身份证正反面</text>
			<text class="c666">张三</text>  
		</view>
		<view class="celBox mb20 bb">
			<text>身份证正面+反面合一复印件</text>
			<text class="c666">张三</text>  
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
			...mapState(['hasLogin', 'forcedLogin'])
		},
		methods: {
			...mapMutations(['logout']),

		}
	}
</script>

<style scoped>
	.wrapper {
		width: 100%;
		min-height: 100vh;
		background-color: #F2F2F2;
		padding-bottom: 20px;;
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
