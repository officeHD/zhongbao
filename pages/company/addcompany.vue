<template>
	<view class="wrapper">
		<view class="celBox bb">
			<text class="c666">邀请码</text>
			<input class="inputBox" :value="RelMemo" data-key="RelMemo" @input="inputChange" placeholder="请输入" />

		</view>

		<view class="celBox bb">
			<text class="c666">外包岗位</text>

			<view class="inputBox">
				<picker @change="bindPickerChange" :value="objectIndex" :range="jobList" range-key="PositionName">
					<view class="uni-input">{{jobList[objectIndex].PositionName}}</view>
				</picker>
			</view>
		</view>
		<view class="celBox bb">
			<text class="c666">关联备注</text>
			<input class="inputBox" :value="InviteNo" data-key="InviteNo" @input="inputChange" placeholder="请输入" />
		</view>
		<view class="tipsl">
			请找相关服务外包企业获取邀请码，一般为企业400号码或者域名
		</view>
		<view class="btn-row">
			<button class="primaryBtn" @tap="correlation">立即关联</button>
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
				objectIndex: "0",
				jobList: [{
						"PositionID": "4E44A58A-31FB-4D98-8762-4962C1016A22",
						"PositionName": "666",
						"PositionDesc": "2323",
						"CreateDatetime": null,
						"ROW_NUMBER": "1"
					},
					{
						"PositionID": "F37D72F7-635E-41E4-8485-621EEEFC427C",
						"PositionName": "777",
						"PositionDesc": "123",
						"CreateDatetime": null,
						"ROW_NUMBER": "2"
					}
				],
			}
		},
		onLoad() {
			this.getJob();
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.objectIndex = e.detail.value;
				this.PositionID = this.jobList[e.detail.value].PositionID
			},
			async getJob() {
				let res = await this.$req.ajax({
					path: '/wxapi/Related/jobs',
					title: '正在加载',
					data: {

						token: this.token,
					}
				});

				if (res.data.code == 200) {
					this.jobList = res.data.data;

				} else {
					this.$api.msg(res.data.message)

				}

			},
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

	.tipsl {
		padding: 20rpx;
		color: #666666;
		font-size: 24rpx;;
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
