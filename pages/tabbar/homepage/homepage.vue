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
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="3000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view id="waterfull" class="waterfall">
			<waterfall :list="list"></waterfall>
		</view>
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom" direction="horizontal" @trigger="trigger" @fabClick="fabClick" />
		<view class="cu-item foot" style="padding: 40upx; height: 100upx;">{{loadText}}</view>
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
				swiperList:[{
					url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584978895934&di=bd6a9bda53e7540ced3a4fc4f6194514&imgtype=0&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-7%2F201272714191252206.jpg'
				},{
					url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584978928926&di=670c9cb6634597bf2a3d892512125283&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1902882455%2C82944671%26fm%3D214%26gp%3D0.jpg'
				},{
					url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584978895934&di=7d29702dd621660cc6c3603f63565ec5&imgtype=0&src=http%3A%2F%2Fwww.cpse-expo.com%2Fuploadfile%2F2018%2F0425%2F20180425091802416.jpg'
				},{
					url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584978895934&di=5d19490e36c3894e1389d479cd2be300&imgtype=0&src=http%3A%2F%2Fpic6.58cdn.com.cn%2Fp1%2Fbig%2Fn_v2e40a9d7e2acc4352a5e208481fef9a44.jpg'
				},{
					url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584978895933&di=a884e606d1863fd822b1618ac6186402&imgtype=0&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-7%2F201272714223895294.jpg'
				},{
					url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584978895933&di=4577367661c7c8118d19c4d6326a397a&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-12-01%2F5a20f8784e92b.jpg'
				}],
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
		onShow() {
			_self.list=[];
			this.getArticles();
		},
		onPullDownRefresh() {
			_self.list=[];
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
		background-color: #FFFFFF;
	}
	.content {
		text-align: center;
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
		height: 350upx;
		background-color: #FFCC01;
	}
	.swiperView >swiper-item{
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		width: 100%;
		height: 350upx;
	}

	.swiper-item>image {
		width: 100%;
		height: 350upx;
	}
	
	scroll-view{}

	.waterfall {
		height: auto;
		width: 100%;
		margin: 5upx auto;
	}
</style>
