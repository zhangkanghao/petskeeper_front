<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="#FFFFFF" right-icon="scan" @clickRight="scan">
				<block slot="left">
					<picker class="city" @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:'全部'}}
						</view>
						<uni-icons type="arrowdown" color="#333333" size="22" />
					</picker>
					
					<!-- <view class="city">
						<view><text class="uni-nav-bar-text">{{ city }}</text></view>
						
					</view> -->
				</block>
				<view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词" @confirm="confirm">
				</view>
			</uni-nav-bar>
		</view>
		<view id="swiper" class="swiperView">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
				<swiper-item>
					<view class="swiper-item" @click="toDetail">
						<image src="../../../static/img/homepage/item1.png" mode="scaleToFill"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="../../../static/img/homepage/item2.png" mode="scaleToFill"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="../../../static/img/homepage/item3.png" mode="scaleToFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view id="waterfull" class="waterfall">
			<waterfall :list="list"></waterfall>
		</view>
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom" direction="horizontal" @trigger="trigger" @fabClick="fabClick" />
		<view class="cu-item foot">{{loadText}}</view>
	</view>
</template>

<script>
	var _self,pageNumber=1,pageSize=10,pageCount=100;
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
				picker: ['北京', '上海', '温州'],
				city: '北京',
				triggered: false,
				list: [],
				loadText:'没有更多了',
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
			pageNumber=1;
			this.getArticles();
		},
		onPullDownRefresh() {
			this.getArticles();
			
		},
		onReachBottom() {
			if(this.loadText=='下拉加载更多'){
				this.getArticles();
			}else{
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
			toDetail(){
				uni.navigateTo({
					url:'../../detail/release/release?id=1'
				})
			},
			trigger(e) {
				console.log(e)
				switch(e.index){
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
					url: _self.apiUrl+'/article/',
					method: 'GET',
					header:{'authorization':uni.getStorageSync('userToken')},
					data:{pageNumber:pageNumber,pageSize:pageSize},
					success: res => {
						var $retList=res.data.articles;
						var tmpList=[];
						for (var i in $retList) {
							console.log($retList[i]);
							if($retList[i].type=='动态'){
								var contentObj=JSON.parse($retList[i].content);
								var tmp={
									img: _self.apiUrl+contentObj.imgs[0],
									id: $retList[i].id,
									isLiked: $retList[i].targetId,
									likeCount: $retList[i].praise,
									name: $retList[i].annoymous?'佚名':$retList[i].nickname,
									photo: $retList[i].annoymous?'/static/img/extra/none.jpg':_self.apiUrl+'/user/profile/avatar?userId='+$retList[i].userId,
									title: contentObj.content
								};
								console.log(tmp);
								tmpList.push(tmp);
							}
						}
						//刷新->取代
						_self.list=tmpList;
						pageCount=res.data.pager.pageCount;
						//下一页
						if(pageNumber==pageCount){
							//重置
							uni.showToast({
								icon:'none',
								title: '已经是最后一页了哦'
							});
							_self.loadText='没有更多了';
						}else{
							pageNumber++;
							_self.loadText='下拉加载更多';
						}
						
						uni.stopPullDownRefresh();
					}
				});
				
			}
		}
	};
</script>

<style>
	page{
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

	.city {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		/* width: 160rpx;
	*/
		margin-left: 4px;
	}

	.input-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		/* width: 500rpx;*/
		flex: 1;
		background-color: #f8f8f8;
		height: 30px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.input-uni-icon {
		line-height: 30px;
	}

	.nav-bar-input {
		height: 30px;
		line-height: 30px;
		/* #ifdef APP-PLUS-NVUE */
		width: 370rpx;
		/* #endif */
		padding: 0 5px;
		font-size: 28rpx;
		background-color: #f8f8f8;
		text-align: left;
	}

	.swiperView {
		width: 100%;
		height: 280upx;
		background-color: #FFCC01;
	}

	.swiper-item {
		width: 100%;
		height: 280upx;
	}

	.swiper-item>image {
		width: 100%;
		height: 280upx;
	}
	
	scroll-view{}

	.waterfall {
		height: auto;
		width: 100%;
		margin: 5upx auto;
	}
</style>
