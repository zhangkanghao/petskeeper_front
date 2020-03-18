<template>
	<view class="content">
		<view class="header">
			<view class="topView">
				<view>我的</view>
				<image src="../../../static/img/myinfo/logout.png" mode="aspectFit"></image>
			</view>
		</view>	
		
		<view class="info">
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
			
		<view class="iconCon">
			<view>
				<view class="icon-post icon_comment">
					<image class="icon_comment_plus" src="../../../static/img/myinfo/post.png"></image>
				</view>
				<view>我的发布</view>
			</view>
			<view>
				<view class="icon-collect icon_comment">
					<image class="icon_comment_plus" src="../../../static/img/myinfo/collect.png"></image>
				</view>
				<view>我的收藏</view>
			</view>
			<view>
				<view class="icon-draft icon_comment">
					<image class="icon_comment_plus" src="../../../static/img/myinfo/draft.png"></image>
				</view>
				<view>草稿箱</view>
			</view>
			<view>
				<image class="icon-pet icon_comment" src="../../../static/img/myinfo/pet.png"></image>
				<view>我的宠物</view>
			</view>
		</view>
		
		<view class="ui-table">
			<view>
				<image class="icon_small" src="../../../static/img/myinfo/hudong.png"></image>
				<view>互动</view>
			</view>
			<view>
				<image class="icon_small" src="../../../static/img/myinfo/fankui.png"></image>
				<view>反馈</view>
			</view>
			<view>
				<image class="icon_small" src="../../../static/img/myinfo/fenxiang.png"></image>
				<view>分享</view>
			</view>
		</view>
		<view class="ui-table">
			<view>
				<image class="icon_small" src="../../../static/img/myinfo/shezhi.png"></image>
				<view>设置</view>
			</view>
			<view>
				<image class="icon_small" src="../../../static/img/myinfo/about.png"></image>
				<view>关于我们</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'Hello'
			}
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
		box-shadow: 0 0 6px rgba(0,122,255,0.8);
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
		padding: 20px 0;
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
	.ui-table>view>image{
		float: left;
	}
	.icon_small{
		border-radius: 10px;
		font-size: 20px;
		width: 40upx;
		height: 40upx;
		margin-top: 30upx;
		margin-right: 20upx;
		display: inline-block;
		line-height: 30px;
		color: #FFFFFF;
	}
	.icon_comment{
		border-radius: 10px;
		font-size: 20px;
		width: 40px;
		height: 40px;
		display: inline-block;
		line-height: 30px;
		color: #FFFFFF;
	}
	.icon_comment_plus{
		width: 30px;
		height: 30px;
		margin: 5px auto;
		display: inline-block;
		line-height: 30px;
	}
	
	.icon-post{
		background-color: #ffcc01;
	}
	.icon-collect{
		background-color: #ff3434;
	}
	.icon-draft{
		background-color: #6200b8;
	}
	.icon-pet{
		background-color: #5555ff;
	}
</style>
