<template>
	<view class="content">
		页面 - 1
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {
		var res=global.isLogin();
		if(!res){
			console.log(res);
			uni.showModal({
				title:'提醒',
				content:'请先登录',
				success() {
					uni.navigateTo({
						url:'../../login/login'
					})
				}
			})
		}
	},
	methods: {}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
}
</style>
