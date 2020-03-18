<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<uni-nav-bar backgroundColor="#f8f8f8" color="#000" right-text="注销" title="个人中心"></uni-nav-bar>
		页面 - 4
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #007AFF;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #007AFF;
		top: 0;
		z-index: 999;
	}

	.content {
		text-align: center;
		height: 100%;
	}
</style>
