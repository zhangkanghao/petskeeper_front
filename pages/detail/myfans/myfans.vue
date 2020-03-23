<template>
	<view class="content1">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="#FFFFFF" title="我的粉丝" leftIcon="left-nav" @clickLeft="cancel"></uni-nav-bar>
		</view>
		<view class="cu-card case" v-for="(item,index) in followList" :key="index">
			<view class="cu-item shadow-warp ">
				<view class=" cu-list menu-avatar ">
					<view class="cu-item" style="height: 200upx;">
						<image class="cu-avatar round xl" :src="apiUrl+'/user/profile/avatar?userId='+item.userId"></image>
						<view class="content flex-sub" style="width: 45%;margin-left: 30upx;">
							<view class="text-black text-bold">{{item.nickname}}</view>
							<view class="text-grey text-sm flex justify-between" style="text-align: left;">{{item.description}}</view>
						</view>
						<view class="margin-tb-sm text-center" style="width: 20%; margin-right: 20upx;">
							<button class="cu-btn shadow text-sm" :class="'bg-'+(item.id?'gray':'red')" style="width: 100%;" @click="dofollow(index)">{{item.id?'已关注':'关注'}}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="text-center text-sm text-gray">没有更多了</view>
	</view>
</template>

<script>
	var _self;
	export default {
		
		data() {
			return {
				followList:[],
			};

		},
		onLoad() {
			_self = this;
			this.getInfos();
		},
		methods: {
			cancel:()=>{
				uni.navigateBack({
					delta:1,
					animationType:'slide-out-bottom'
				})
			},
			getInfos(){
				uni.request({
					url: this.apiUrl+'/follow/follower?userId='+uni.getStorageSync('userId'),
					method: 'GET',
					header:{authorization:uni.getStorageSync('userToken')},
					success: res => {
						console.log(res);
						this.followList=res.data;
					}
				});
			},
			dofollow(index) {
				var isfollow=this.followList[index].id;
				if (isfollow) {
					uni.showModal({
						confirmText: '确认',
						cancelText: '取消',
						content: '确认不再关注?',
						success: res => {
							if (res.confirm) {
								this.followList[index].id = false;
								uni.request({
									url: this.apiUrl+'/follow/remove?userId='+this.followList[index].userId,
									method: 'GET',
									header:{'authorization':uni.getStorageSync('userToken')},
									success: res => {
										if(!res.data.ok){
											uni.showToast({
												icon:'none',
												position:'bottom',
												title: res.data.msg
											});
										}else{
											uni.showToast({
												icon:'none',
												position:'bottom',
												title: '取关成功'
											});
										}
									}
								});
							}
						}
					})
				} else {
					this.followList[index].id = true;
					uni.request({
						url: this.apiUrl+'/follow/add?userId='+this.followList[index].userId,
						method: 'GET',
						header:{'authorization':uni.getStorageSync('userToken')},
						success: res => {
							if(!res.data.ok){
								uni.showToast({
									icon:'none',
									position:'bottom',
									title: res.data.msg
								});
							}else{
								uni.showToast({
									icon:'none',
									position:'bottom',
									title: '关注成功'
								});
							}
						}
					});
				}
			},
		}
	};
</script>

<style>
	page {
		background-color: #eeeeee;
	}

	.content1 {
		text-align: center;
		height: 100%;
		background-color: #eeeeee;
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

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	.uni-nav-bar-text {
		font-size: 28rpx;
	}
</style>
