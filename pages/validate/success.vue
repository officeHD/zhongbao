<template>
	<view class="wrapper">
		<image class="pageIcon" src="../../static/img/success.png" mode="widthFix"></image>
		<view class="result">
			人脸扫描验证通过，恭喜你已经完成人脸识别验证
		</view>
		<button class="primaryBtn">完成</button>
	</view>
</template>

<script>
</script>

<style>
	.wrapper {
		width: 100%;
	}

	.pageIcon {
		display: block;
		margin: 50rpx auto;
		width: 112rpx;
		height: 112rpx;
	}

	.result {
		width: 400rpx;
		font-size: 28rpx;
		color: #666666;
		margin: 0 auto;
		text-align: center;
	}

	.primaryBtn {
		background-color: #1666F3;
		color: #FFFFFF;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 100rpx;
		margin-right: 100rpx;
		margin-top: 130rpx;
	}
</style>
