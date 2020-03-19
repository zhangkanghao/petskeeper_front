<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body" style="border-bottom: #f1f1f1 3upx solid;">
			<uni-nav-bar :fixed="true" color="#333333"  leftIcon="left-nav" leftText="取消" title="添加问答" rightText="发布" @clickLeft="cancel">
				<block class="cu-item" slot="right">
					<text class="lg text-black cuIcon-camerafill" style="font-size: 40upx;margin-left: 10upx;"></text>
				</block>
			</uni-nav-bar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			cancel:()=>{
				uni.navigateBack({
					delta:1,
					animationType:'slide-out-bottom'
				})
			}
				
		}
	}
</script>

<style>
	page{
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
		background-color: #FFFFFF;
	}
</style>
