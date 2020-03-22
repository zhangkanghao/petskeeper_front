<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="#FFFFFF" title="关注"></uni-nav-bar>
		</view>
		<view id="waterfull" class="waterfall">
			<waterfall :list="list"></waterfall>
		</view>
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom" direction="horizontal"
		 @trigger="trigger" @fabClick="fabClick" />
		<view class="cu-item foot">{{loadText}}</view>
	</view>
</template>

<script>
	var _self, pageNumber = 1,
		pageSize = 10,
		pageCount = 100;
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import waterfall from '@/components/xi-waterfall/xi-waterfall.vue'
	import uniFab from '@/components/uni-fab/uni-fab.vue'
	export default {
		components: {
			uniIcons,
			uniNavBar,
			waterfall,
			uniFab
		},
		data() {
			return {
				index: -1,
				triggered: false,
				list: [],
				loadText: '没有更多了',
				pattern: {
					color: '#007AFF',
					backgroundColor: '#fff',
					buttonColor: 'orange'
				},
				content: [{
						iconPath: '/static/img/tabbar-option/release.png',
						text: '发动态',
						active: false
					},
					{
						iconPath: '/static/img/tabbar-option/article.png',
						text: '发文章',
						active: false
					},
					{
						iconPath: '/static/img/tabbar-option/question.png',
						text: '发问答',
						active: false
					}
				]
			};

		},
		onLoad() {
			_self = this;
			pageNumber = 1;
			this.getArticles();
		},
		onPullDownRefresh() {
			this.getArticles();

		},
		onReachBottom() {
			if (this.loadText == '下拉加载更多') {
				this.getArticles();
			} else {
				console.log('no more');
			}
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			showCity() {
				uni.showToast({
					title: '选择城市'
				})
			},
			scan() {
				uni.showToast({
					title: '扫码'
				})
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			},
			toDetail() {
				uni.navigateTo({
					url: '../../detail/release/release?id=1'
				})
			},
			trigger(e) {
				console.log(e)
				switch (e.index) {
					case 0:
						uni.navigateTo({
							url: '../../tabbar-3-detial/tabbar-3-release/tabbar-3-release'
						});
						break;
					case 1:
						uni.navigateTo({
							url: '../../tabbar-3-detial/tabbar-3-release/tabbar-3-release'
						});
						break;
					case 2:
						uni.navigateTo({
							url: '../../tabbar-3-detial/tabbar-3-release/tabbar-3-release'
						});
						break;
				}
			},
			fabClick() {
				console.log('fabClick');
			},
			getArticles() {
				uni.request({
					url: _self.apiUrl + '/article/myfollow',
					method: 'GET',
					header: {
						'authorization': uni.getStorageSync('userToken')
					},
					data: {
						pageNumber: pageNumber,
						pageSize: pageSize
					},
					success: res => {
						var $retList = res.data.articles;
						var tmpList = [];
						for (var i in $retList) {
							if ($retList[i].type == '动态') {
								var contentObj = JSON.parse($retList[i].content);
								var tmp = {
									img: _self.apiUrl + contentObj.imgs[0],
									id: $retList[i].id,
									isLiked: $retList[i].targetId,
									likeCount: $retList[i].praise,
									name: $retList[i].annoymous ? '佚名' : $retList[i].nickname,
									photo: $retList[i].annoymous ? '/static/img/extra/none.jpg' : _self.apiUrl +
										'/user/profile/avatar?userId=' + $retList[i].userId,
									title: contentObj.content
								};
								tmpList.push(tmp);
							}
						}
						//刷新->取代
						_self.list = tmpList;
						pageCount = res.data.pager.pageCount;
						//下一页
						if (pageNumber == pageCount) {
							//重置
							uni.showToast({
								icon: 'none',
								title: '已经是最后一页了哦'
							});
							_self.loadText = '没有更多了';
						} else {
							pageNumber++;
							_self.loadText = '下拉加载更多';
						}
						uni.stopPullDownRefresh();
					}
				});

			}
		}
	};
</script>

<style>
	page {
		background-color: #eeeeee;
	}

	.content {
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

	.waterfall {
		height: auto;
		width: 100%;
		margin: 5upx auto;
	}
</style>
