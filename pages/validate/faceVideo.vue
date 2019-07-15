<template>
	<view class="wrapper">
		<view class="tips">缓缓的眨一眨眼睛</view>
		<view class="videoBorder">
			<view class="videoContent">
				<view class="topTips">没有检测到人脸</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.tips{
		text-align: center;
		font-size: 28rpx;
		margin: 30rpx 0;
		color: #333;
	}
	.wrapper{
		width: 100%;
	}
 
	.videoBorder{
		width: 450rpx;
		height: 450rpx;
		border: 10rpx solid #D8D8D8;
		padding: 5rpx;
		border-radius: 450rpx;
		margin:50rpx auto;
		overflow: hidden;
		display: flex;
	}
	.videoContent{
		 flex: 1;
		background-color: #B0AAA5;
		border-radius: 450rpx;
		position: relative;
		overflow: hidden;
	}
	.topTips{
		width: 100%;
		height: 150rpx;
		background-color: #86827E;
		top: 0;
		left: 0;
		font-size: 32rpx;
		color: #FFFFFF;
		 display: flex;
		 align-items: center;
		 justify-content: center;
		 
	}
</style>
