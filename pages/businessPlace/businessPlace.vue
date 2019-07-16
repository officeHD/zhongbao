<template>
	<view class="wrapper">

		<view class="celBox bb">
			<text class="c666">我的线下经营场所</text>
			<text>张三</text>
		</view>
		<view class="celBox bb">
			<text class="c666">我的线上经营场所</text>
			<text>张三</text>
		</view>
		<view class="celBox bb">
			<text>自我介绍（采用企业介绍的方式撰写自我介绍），不少于150字哦：</text>
		 
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
