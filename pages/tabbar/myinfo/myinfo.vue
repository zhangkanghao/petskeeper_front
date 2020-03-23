<template>
	<view class="content1">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar1">
			<view class="top_view1"></view>
		</view>
		<!-- #endif -->
		<uni-nav-bar backgroundColor="#007AFF" color="#f8f8f8" right-text="注销" title="个人中心" @clickRight="logout"></uni-nav-bar>
		<view class="header1"></view>
		<view class="info1">
			<image :src="avatar" @tap="editProfile"></image>
			<view class="info_name1">{{nickname}}</view>
			<view class="info_text1" style="border-bottom: #f8f8f8 3upx solid;">{{description}}</view>
			<view class="info_item1" @tap="myfollow">
				<view>{{following}}</view>
				<view>关注</view>
			</view>
			<view class="info_item1" @tap="myfans">
				<view>{{follower}}</view>
				<view>粉丝</view>
			</view>
			<view class="info_item1">
				<view>{{praise}}</view>
				<view>点赞</view>
			</view>
		</view>

		<view class="iconCon1">
			<view>
				<view class="icon-post1 icon_comment1">
					<image class="icon_comment_plus1" src="../../../static/img/myinfo/post.png" @click="gotoPage" :data-id="1"></image>
				</view>
				<view>我的发布</view>
			</view>
			<view>
				<view class="icon-collect1 icon_comment1">
					<image class="icon_comment_plus1" src="../../../static/img/myinfo/collect.png" @click="gotoPage" :data-id="2"></image>
				</view>
				<view>我的收藏</view>
			</view>
			<view>
				<view class="icon-draft1 icon_comment1">
					<image class="icon_comment_plus1" src="../../../static/img/myinfo/draft.png" @click="gotoPage" :data-id="3"></image>
				</view>
				<view>草稿箱</view>
			</view>
			<view>
				<image class="icon-pet1 icon_comment1" src="../../../static/img/myinfo/pet.png" @click="gotoPage" :data-id="4"></image>
				<view>我的宠物</view>
			</view>
		</view>

		<view class="ui-table1">
			<view>
				<image class="icon_small1" src="../../../static/img/myinfo/hudong.png"></image>
				<view>互动</view>
			</view>
			<view>
				<image class="icon_small1" src="../../../static/img/myinfo/fankui.png"></image>
				<view>反馈</view>
			</view>
			<view>
				<image class="icon_small1" src="../../../static/img/myinfo/fenxiang.png"></image>
				<view>分享</view>
			</view>
		</view>
		<view class="ui-table1">
			<view>
				<image class="icon_small1" src="../../../static/img/myinfo/shezhi.png"></image>
				<view>设置</view>
			</view>
			<view>
				<image class="icon_small1" src="../../../static/img/myinfo/about.png"></image>
				<view>关于我们</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				nickname: '',
				description: '',
				following: 0,
				follower: 0,
				praise: 0,
				avatar: '../../../static/img/extra/none.jpg'
			}
		},
		onLoad: function() {
			_this = this;
			this.getInfo();
		},
		onShow: function() {
			if (global.$newInfo) {
				this.getInfo();
				global.$newInfo = false;
			}
		},
		methods: {
			getInfo() {
				uni.request({
					url: _this.apiUrl + '/user/profile',
					method: 'GET',
					header: {
						'authorization': uni.getStorageSync('userToken')
					},
					success: res => {
						if (res.data) {
							_this.nickname = res.data.nickname;
							_this.description = res.data.description == null ? '这个人很懒，什么都没留下' : res.data.description;
							_this.following = res.data.following;
							_this.follower = res.data.follower;
							_this.praise = res.data.praise;
							this.avatar = _this.apiUrl + '/user/profile/avatar?userId=' + res.data.userId;
						}
					}
				});
			},
			editProfile() {
				uni.navigateTo({
					url: '../../detail/profile/profile'
				})
			},
			gotoPage(e) {
				var index = e.currentTarget.dataset.id;
				switch (index) {
					case 1:
						uni.navigateTo({
							url:'../../detail/mypost/mypost'
						})
						break;
					case 2:
						uni.navigateTo({
							url:'../../detail/mycollect/mycollect'
						})
						break;
					case 3:
						uni.navigateTo({
							url:'../../detail/mydraft/mydraft'
						})
						break;
					case 4:
						uni.navigateTo({
							url:'../../detail/mypet/mypet'
						})
						break;
				}
			},
			logout() {
				uni.removeStorage({
					key: 'userToken',
					success() {
						uni.request({
							url: _this.apiUrl + '/user/logout',
							method: 'GET',
							header: _this.header,
							complete: () => {
								uni.showToast({
									title: '注销成功',
									duration: 1000
								})
								uni.reLaunch({
									url: '../../login/login'
								})
							}
						});
					}
				})

			},
			myfollow(){
				uni.navigateTo({
					url: '../../detail/myfollow/myfollow',
					animationType:'slide-in-bottom'
				});
			},
			myfans(){
				uni.navigateTo({
					url:'../../detail/myfans/myfans',
					animationType:'slide-in-bottom'
				})
			}
			
		}
	}
</script>

<style>
	.status_bar1 {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #007AFF;
	}

	.top_view1 {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #007AFF;
		top: 0;
		z-index: 999;
	}

	.content1 {
		text-align: center;
		height: 100%;
	}

	* {
		margin: 0;
		padding: 0;
		font-family: "微软雅黑";
	}

	.header1 {
		/* 头部包含背景图 */
		background-color: #007AFF;
		width: 100%;
		overflow: hidden;
		height: 200upx;
	}

	.topView1 {
		/* 放我的和关机图标 */
		height: 50px;
		line-height: 50px;
	}

	.topView1>view {
		color: #FFFFFF;
		display: inline-block;
		float: left;
		padding-left: 16px;
		font-size: 18px;
		font-weight: bold;
	}

	.topView1>image {
		display: inline-block;
		float: right;
		padding-top: 32upx;
		padding-right: 32upx;
		width: 50upx;
		height: 50upx;
	}


	.info1 {
		/* 存放个人信息的 */
		width: calc(100% - 32px);
		background-color: #FFFFFF;
		margin-left: 16px;
		margin-top: -48px;
		float: left;
		border-radius: 8px;
		box-shadow: 0 0 6px rgba(0, 122, 255, 0.6);
	}

	.info1>image {
		width: 66px;
		height: 66px;
		border-radius: 66px;
		margin: 0 auto;
		display: block;
		margin-top: -33px;
		border: 1px solid #007AFF;
	}

	.info_name1 {
		text-align: center;
		font-size: 16px;
		color: #444444;
		height: 30px;
		line-height: 30px;
	}

	.info_text1 {
		text-align: center;
		width: 80%;
		margin: 0 auto;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #6F6F6F;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.info_item1 {
		width: calc(100% / 3);
		float: left;
		text-align: center;
		padding: 4px 0;
	}

	.info_item1>view:nth-of-type(1) {
		font-size: 12px;
	}

	.info_item1>view:nth-of-type(2) {
		font-size: 14px;
		color: #6F6F6F;
	}

	.info_item1:nth-of-type(1) {
		border-radius: 0 0 0 8px;
	}

	.info_item1:nth-last-of-type(1) {
		border-radius: 0 0 8px 0;
	}

	.iconCon1 {
		/* 放功能的图标 */
		width: 100%;
		float: left;
		overflow: hidden;
		margin-top: 16px;
		padding: 20px 0;
		background-color: #ffffff;
	}

	.iconCon1>view {
		float: left;
		width: calc(100% / 4);
		text-align: center;
		font-size: 30upx;
	}

	.ui-table1 {
		float: left;
		width: 100%;
		background-color: #FFFFFF;
		border-top: 8px solid #EFEFF4;
		padding: 0 32px;
		font-size: 30upx;
	}

	.ui-table1>view {
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #EFEFF4;
	}

	.ui-table1>view>view {
		float: left;
	}

	.ui-table1>view>image {
		float: left;
	}

	.icon_small1 {
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

	.icon_comment1 {
		border-radius: 10px;
		font-size: 20px;
		width: 40px;
		height: 40px;
		display: inline-block;
		line-height: 30px;
		color: #FFFFFF;
	}

	.icon_comment_plus1 {
		width: 30px;
		height: 30px;
		margin: 5px auto;
		display: inline-block;
		line-height: 30px;
	}

	.icon-post1 {
		background-color: #ffcc01;
	}

	.icon-collect1 {
		background-color: #ff3434;
	}

	.icon-draft1 {
		background-color: #6200b8;
	}

	.icon-pet1 {
		background-color: #5555ff;
	}
</style>
