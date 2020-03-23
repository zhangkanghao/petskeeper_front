<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body" style="border-bottom: #f1f1f1 3upx solid;">
			<uni-nav-bar :fixed="true" color="#333333" leftIcon="left-nav" leftText="返回" title="我的宠物" @clickLeft="cancel"></uni-nav-bar>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-orange margin-tb-sm lg" @click="petprofile(0)">
				<text class="text-white lg cuIcon-news"></text>
				添加宠物
			</button>
		</view>
		<view v-for="(item,index) in petList" :key="index">
			<view class="cu-card case ">
				<view class="cu-item shadow-warp ">
					<view class=" cu-list menu-avatar ">
						<view class="cu-item" style="height: 200upx;">
							<image class="cu-avatar round xl" :src="apiUrl+'/pet/avatar?petId='+item.id"></image>
							<view class="content flex-sub" style="margin-left: 30upx;width: 60%;margin-top: 30upx;">
								<view class="text-black text-bold">{{item.petName}}</view>
								<view class="text-grey text-sm flex justify-between">{{item.type}}</view>
								<view class="text-grey text-sm">生日:{{item.birthTime}}</view>
							</view>
							<text class="text-blue cuIcon-edit" style="font-size: 40upx;margin-right: 20upx;" @click="petprofile(item.id)"></text>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				petList: []
			}
		},
		onLoad() {
			_this = this;
		},
		onShow() {
			this.petList=[];
			this.getInfos();
		},
		methods: {
			cancel: () => {
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-out-right'
				})
			},
			petprofile(petId) {
				uni.navigateTo({
					url: '../petprofile/petprofile?petId=' + petId
				});
			},
			getInfos() {
				uni.request({
					url: _this.apiUrl + '/pet/query',
					method: 'GET',
					header: {
						'authorization': uni.getStorageSync('userToken')
					},
					success: res => {
						this.petList = res.data;
					}
				});
			}


		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #ffffff;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #ffffff;
		top: 0;
		z-index: 999;
	}

	.content {
		text-align: center;
		height: 100%;
		text-align: start;
		background-color: #FFFFFF;
	}

	.cardleft {
		width: 250upx;
		height: 250upx;
	}

	.xheight {
		height: 200upx;
	}
</style>
