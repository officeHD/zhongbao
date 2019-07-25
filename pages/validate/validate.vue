<template>
	<view class="wrapper">
		<navigator url="/pages/validate/faceVaildate" class="btnBox c000">人脸识别验证</navigator>
		<button  class="btnBox">手机号实名认证</button>
		<button class="btnBox">银行卡3要素验证</button>
		<button class="btnBox">社保授权查询</button>
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

<style scoped>
	.wrapper{
		width: 100%;
	}
	.btnBox{
		margin: 50rpx;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 8rpx;
		font-size: 30rpx;
		background-color: #E3E8F0;
		color: #888888;
		text-align: center;
	}
	.c000{
		color: #000000;
	}
</style>
