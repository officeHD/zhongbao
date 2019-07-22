<template>
	<view class="wrapper">
		<view class="lstItem" v-for="(item,index) in comList" :key="index">
			<view class="itemContent">
				<view class="c000 item">外包企业：{{item.EnterpriseName}}</view>
				<view class="item">外包岗位：{{item.Position.PositionName}}</view>
				<view class="item">首次关联日期：{{item.RelaDate}}</view>
				<view class="item">总外包费：{{item.money}}</view>
			</view>
			<view class="btnBox">
				<button class="defaultBtn" @tap="liulan">浏览</button>
			</view>
		</view>
			
		<view class="fixBtn">
			<navigator url="/pages/company/addcompany" class="primaryBtn" >添加新关联企业</navigator>
		</view>
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
				comList: []
			}
		},
		computed: mapState(['token']),
		onShow() {
			this.getList()
		},
		methods: {
			async getList() {
				let res = await this.$req.ajax({
					path: '/wxapi/Related/Select',
					title: '正在加载',
					data: {

						token: this.token,


					}
				});
				if (res.data.code == 200) {
					console.log(res)
					this.comList = res.data.data
				} else {
					this.$api.msg(res.data.message)

				}
			}
			,
			liulan(item){
				let data=JSON.stringify(item);
				uni.navigateTo({
					url:`/pages/company/detail?data=${data}`
				})
			}

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
		text-align: center;
		border-radius: 10rpx;;
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
