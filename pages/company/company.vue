<template>
	<view class="wrapper">
		<view class="lstItem">
			<view class="itemContent">
				<view class="c000 item">外包企业：全购网络科技</view>
				<view class="item">外包岗位：UI设计</view>
				<view class="item">首次关联日期：2019-04-05</view>
				<view class="item">总外包费：2000</view>
			</view>
			<view class="btnBox">
				<button class="defaultBtn" @tap="bindLogin">浏览</button>
			</view>
		</view>
		<view class="lstItem">
			<view class="itemContent">
				<view class="c000 item">外包企业：全购网络科技</view>
				<view class="item">外包岗位：UI设计</view>
				<view class="item">首次关联日期：2019-04-05</view>
				<view class="item">总外包费：2000</view>
			</view>
			<view class="btnBox">
				<button class="defaultBtn" @tap="bindLogin">浏览</button>
			</view>
		</view>
		<view class="fixBtn">
			<button class="primaryBtn" @tap="bindLogin">添加新关联企业</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.wrapper {
		width: 100%;
		padding: 30rpx;
		padding-bottom: 150rpx;
		background-color: #F2F2F2;
	}

	.fixBtn {
		height: 110rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		border-top: 1px solid #e6e6e6;
		background-color: #FFFFFF;
	}

	.primaryBtn {
		background-color: #007AFF;
		color: #FFFFFF;
		height: 90rpx;
		line-height: 90rpx;
		margin-top: 10rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.lstItem {
		background-color: #FFFFFF;
		padding: 20rpx;
		margin-bottom: 30rpx;

	}

	.itemContent {
		font-size: 28rpx;
		color: #666666;
		padding-bottom: 10rpx;

	}

	.item {
		margin: 10rpx 0;
	}

	.c000 {
		color: #000000;
	}

	.btnBox {
		border-top: 1rpx solid #F3F3F3;
		padding-top: 20rpx;
	}

	.defaultBtn {
		height: 60rpx;
		line-height: 60rpx;
		background-color: #FFFFFF;
		border: 1rpx solid #9F9F9F;
		color: #000000;
		font-weight: 600;
		font-size: 26rpx;
	}
</style>
