<template>
	<view class="content">
		<view class="header">
			<view class="topView">
				<view>我的</view>
				<image src="../../../static/img/myinfo/logout.png" mode="aspectFit"></image>
			</view>
		</view>	
		
		<view v-if="isLogin" class="info">
			<image src="../../../static/img/extra/user.png"></image>
			<view class="info_name">NICKNAME</view>
			<view class="info_text">我的简介我的简介我的简介我的简介我的简介我的简介我的简介我的简介我的简介我的简介我的简介我的简介我的简介我的简介我的简介我的简介我的简介我的简介</view>
			<view class="info_item">
				<view>16</view>
				<view>关注</view>
			</view>
			<view class="info_item">
				<view>32</view>
				<view>粉丝</view>
			</view>
			<view class="info_item">
				<view>3</view>
				<view>动态</view>
			</view>
		</view>
		<view v-else class="info">
			<image style="background-color: #fff;" src="../../../static/img/myinfo/annoymous.png"></image>
			<view class="info_name"><navigator hover-class="navigator-hover" url="../../login/login" style="color: #0055ff;">点此登陆</navigator></view>
			<view class="info_text">点击上方登录以获取账号信息</view>
			<view class="info_item">
				<view>0</view>
				<view>关注</view>
			</view>
			<view class="info_item">
				<view>0</view>
				<view>粉丝</view>
			</view>
			<view class="info_item">
				<view>0</view>
				<view>动态</view>
			</view>
		</view>
			
		<view class="iconCon">
			<view>
				<image class="icon-xiezuo icon_comment" src="../../../static/img/tabbar-option/release.png"></image>
				<view>文章</view>
			</view>
			<view>
				<image class="icon-xiezuo icon_comment" src="../../../static/img/tabbar-option/qa.png"></image>
				<view>图片</view>
			</view>
			<view>
				<image class="icon-xiezuo icon_comment" src="../../../static/img/tabbar-option/release.png"></image>
				<view>音乐</view>
			</view>
			<view>
				<image class="icon-xiezuo icon_comment" src="../../../static/img/tabbar-option/video.png"></image>
				<view>视频</view>
			</view>
		</view>
		
		<view class="ui-table">
			<view class="ui-table-cell">
				<image class="icon_comment" src=""></image>
				<view>收藏</view>
			</view>
			<view>
				<image class="icon_comment" src=""></image>
				<view>互动</view>
			</view>
			<view>
				<image class="icon_comment" src=""></image>
				<view>偶遇</view>
			</view>
			<view>
				<image class="icon_comment" src=""></image>
				<view>设置</view>
			</view>
			<view>
				<image class="icon_comment" src=""></image>
				<view>关于</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
			}
		},
		onLoad() {
			console.log('myinfo load');
			var res=global.isLogin();
			if(res){
				isLogin=true;
				console.log(res);
			}
		},
		onShow() {
			console.log('myinfo show');
			
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 100%;
	}
	*{
		margin: 0;
		padding: 0;
		font-family: "微软雅黑";
	}
	.header{
		/* 头部包含背景图 */
		background-color: #007AFF;
		width: 100%;
		overflow: hidden;
		
		height: 150px;
	}
	.topView{
		/* 放我的和关机图标 */
		height: 50px;
		line-height: 50px;
	}
	.topView>view{
		color: #FFFFFF;
		display: inline-block;
		float: left;
		padding-left: 16px;
		font-size: 18px;
		font-weight: bold;
	}
	.topView>image{
		display: inline-block;
		float: right;
		padding-top: 32upx;
		padding-right: 32upx;
		width: 50upx;
		height: 50upx;
	}
	
	
	.info{
		/* 存放个人信息的 */
		width: calc( 100% - 32px );
		background-color: #FFFFFF;
		margin-left: 16px;
		margin-top: -48px;
		float: left;
		border-radius: 8px;
		box-shadow: 0 0 6px rgba(255,218,25,0.6);
	}
	.info>image{
		width: 66px;
		height: 66px;
		border-radius: 66px;
		margin: 0 auto;
		display: block;
		margin-top: -33px;
		border: 1px solid #007AFF;
	}
	.info_name{
		text-align: center;
		font-size: 16px;
		color: #444444;
		height: 30px;
		line-height: 30px;
	}
	.info_text{
		text-align: center;
		width: 80%;
		margin:0 auto;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #6F6F6F;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.info_item{
		width: calc( 100% / 3 );
		float: left;
		text-align: center;
		padding: 4px 0;
	}
	.info_item>view:nth-of-type(1){
		font-size: 12px;
	}
	.info_item>view:nth-of-type(2){
		font-size: 14px;
		color: #6F6F6F;
	}
	.info_item:nth-of-type(1){
		border-radius: 0 0 0 8px;
	}
	.info_item:nth-last-of-type(1){
		border-radius: 0 0 8px 0;
	}
	
	.iconCon{
		/* 放功能的图标 */
		width: 100%;
		float: left;
		overflow: hidden;
		margin-top: 16px;
		padding: 32px 0;
	}
	.iconCon>view{
		float: left;
		width: calc( 100% / 4 );
		text-align: center;
		
	}
	
	.ui-table{
		float: left;
		width: calc( 100% - 64px );
		background-color: #FFFFFF;
		border-top: 8px solid #EFEFF4;
		padding: 0 32px;
	}
	.ui-table>view{
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #EFEFF4;
	}
	.ui-table>view>view{
		float: left;
	}
	.ui-table>view>i{
		float: right;
	}
	
	.icon_comment{
		border-radius: 100px;
		font-size: 20px;
		width: 30px;
		height: 30px;
		display: inline-block;
		line-height: 30px;
		color: #FFFFFF;
	}
	
	.icon-xiezuo{
		background-color: #fbdc58;
	}
	.icon-tupian{
		background-color: #94ede2;
	}
	.icon-yinyue{
		background-color: #bceccd;
	}
	.icon-shipin{
		background-color: #ffbadc;
	}
</style>
