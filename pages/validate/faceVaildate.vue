<template>
	<view class="wrapper">
		<view class="tips">拍摄你本人人脸请确保光线充足，请确保正对手机</view>
		<image class="faceImg" src="../../static/img/face.png" mode="widthFix"></image>
		<navigator url="/pages/validate/faceVideo" class="primaryBtn">开始刷脸</navigator>
		<view class="tips c9999">信息已加密，仅限于身份认证</view>

	</view>
</template>

<script>
</script>

<style scoped>
	.tips {
		text-align: center;
		font-size: 24rpx;
		margin: 30rpx 0;
		color: #666666;
	}

	.wrapper {
		width: 100%;
	}

	.faceImg {
		width: 300rpx;
		margin: 50rpx auto;
		display: block;
	}

	.primaryBtn {
		background-color: #1666F3;
		color: #FFFFFF;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 100rpx;
		margin-right: 100rpx;
		margin-top: 130rpx;
		text-align: center;
	}

	.c9999 {
		color: #999;
	}
</style>
