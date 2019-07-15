<template>
	<view class="wrapper">

		<view class="celBox bb">
			<text class="c666">客户名称</text>
			<text>张三</text>
		</view>
		<view class="celBox bb">
			<text class="c666">企业网站</text>
			<text>www.662.com</text>
		</view>
		<view class="celBox bb">
			<text class="c666">办公地址(快递地址)</text>
			<text>张三</text>
		</view>
		<view class="celBox bb">
			<text class="c666">联系人1姓名</text>
			<text>张三</text>
		</view>
		<view class="celBox bb">
			<text class="c666">联系人1职位</text>
			<text>张三</text>
		</view>
		<view class="celBox bb">
			<text class="c666">联系人1手机</text>
			<text>张三</text>
		</view>
		<view class="celBox bb">
			<text class="c666">联系人1邮箱</text>
			<text>张三</text>
		</view>
		<view class="celBox bb">
			<text class="c666">联系人2姓名</text>
			<text>张三</text>
		</view>
		<view class="celBox bb">
			<text class="c666">联系人2职位</text>
			<text>张三</text>
		</view>
		<view class="celBox bb">
			<text class="c666">联系人2手机</text>
			<text>张三</text>
		</view>
		<view class="celBox bb">
			<text class="c666">联系人2邮箱</text>
			<text>张三</text>
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
		padding-bottom: 20px;
		;
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
		color: #666;
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
