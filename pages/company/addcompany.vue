<template>
	<view class="wrapper">
		<view class="celBox bb">
			<text class="c666">邀请码</text>
			<input class="inputBox" :value="RelMemo" data-key="RelMemo" @input="inputChange" placeholder="请输入" />

		</view>

		<view class="celBox bb">
			<text class="c666">外包岗位</text>
			<input class="inputBox" :value="PositionID" data-key="PositionID" @input="inputChange" placeholder="请输入" />
		</view>
		<view class="celBox bb">
			<text class="c666">关联备注</text>
			<input class="inputBox" :value="InviteNo" data-key="InviteNo" @input="inputChange" placeholder="请输入" />
		</view>
		<view class="btn-row">
			<button class="primaryBtn" @tap="correlation">保存</button>
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
			...mapState(['token', 'forcedLogin'])
		},
		data() {
			return {
				RelMemo: "",
				PositionID: "",
				InviteNo: "",
			}
		},
		methods: {
			 
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			async correlation() {
				let res = await this.$req.ajax({
					path: '/wxapi/Related/correlation',
					title: '正在加载',
					data: {
						RelMemo: this.RelMemo,
						PositionID: this.PositionID,
						InviteNo: this.InviteNo,
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

	.textarea {
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

	.inputBox {
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
		width: 180rpx;
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
