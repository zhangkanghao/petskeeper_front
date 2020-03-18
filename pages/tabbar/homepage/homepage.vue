<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body">
			<uni-nav-bar :fixed="true" color="#333333" background-color="#FFFFFF" right-icon="scan" @clickLeft="showCity"
			 @clickRight="scan">
				<block slot="left">
					<view class="city">
						<view><text class="uni-nav-bar-text">{{ city }}</text></view>
						<uni-icons type="arrowdown" color="#333333" size="22" />
					</view>
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
					<view class="swiper-item">
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
		<scroll-view scroll-y="true" enable-back-to-top="true" show-scrollbar="false" refresher-enabled="true" :refresher-triggered="triggered"
		 :refresher-threshold="45" refresher-background="#eee" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
		 @refresherrestore="onRestore" @refresherabort="onAbort" @scrolltolower="loadMore">
			<view id="waterfull" class="waterfall">
				<waterfall :list="list"></waterfall>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	var _self,page=1;
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import waterfall from '@/components/xi-waterfall/xi-waterfall.vue'
	export default {
		components: {
			uniIcons,
			uniNavBar,
			waterfall
		},
		data() {
			return {
				title: 'Hello',
				city: '北京',
				scrollTop: 0,
				triggered: false,
				old: {
					scrollTop: 0
				},
				list: [],
				data: [{
					img: "http://pic1.win4000.com/wallpaper/2018-03-28/5abafe0c311e6.jpg",
					id: "1084",
					isLiked: "0",
					likeCount: 0,
					name: "笑饮孤鸿",
					photo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173486008&di=68514e7684d0753c5100994fae6456cb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F07%2F20161207195613_xuEFP.thumb.700_0.jpeg",
					title: "虽然你我会下落不明",
				}, {
					img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173237976&di=4026f6a26b2c370611d6c6877aad1ded&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fqidai%2Fndmzsjbz%2F001.jpg",
					id: "1084",
					isLiked: "0",
					likeCount: 520,
					name: "残城碎梦",
					photo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173486004&di=3ef63a12a8372b81bfe97b81adee093d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F07%2F20161207195604_jNSGc.thumb.700_0.jpeg",
					title: "你知道我曾为你动过情"
				}, {
					img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173237976&di=4026f6a26b2c370611d6c6877aad1ded&imgtype=0&src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2Fqidai%2Fndmzsjbz%2F001.jpg",
					id: "1084",
					isLiked: "0",
					likeCount: 650,
					name: "梦里南柯",
					photo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173486004&di=3ef63a12a8372b81bfe97b81adee093d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F07%2F20161207195604_jNSGc.thumb.700_0.jpeg",
					title: "我欲与君相知，长命无绝衰。山无陵，江水为竭。东雷震震，夏雨雪。天地合，乃敢与君绝"
				}, {
					img: "http://img.51rry.com/note/2019-10-21/1571654591036.png",
					id: "1084",
					isLiked: "0",
					likeCount: 999,
					name: "无风",
					photo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173620777&di=54b7ee5f59c30503096ccabbe0ed9a8e&imgtype=0&src=http%3A%2F%2Fp.store.itangyuan.com%2Fp%2Fchapter%2Fattachment%2Feg-VEBjtEA%2FEgfWEgMVEgjTe_-W4BEU40u3KhifeUL1HtDvHhsVgU9hK6LqG1opiMO.jpg",
					title: "晓看天色，暮看云，行也思君，坐也思君",
				}, {
					img: "http://pic1.win4000.com/wallpaper/2018-10-31/5bd99d277748e.jpg",
					id: "1084",
					isLiked: "0",
					likeCount: 25,
					name: "君倾心",
					photo: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576173486008&di=68514e7684d0753c5100994fae6456cb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F07%2F20161207195613_xuEFP.thumb.700_0.jpeg",
					title: "众里寻她千百度，蓦然回首，那人却在，灯火阑珊处",
				}]
			};
		},
		onLoad() {
			console.log('home load');
			_self = this;
			this._freshing = false;
			this.triggered =true;
			setTimeout(() => {
				_self.list = _self.list.concat(_self.data);
			}, 100)
		},
		onReachBottom() {
			console.log(121);
			this.loadMore();
		},
		methods: {
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
			onPulling(e) {
			},
			onRefresh() {
				if (this._freshing) {
					uni.showToast({
						title:'请勿重复刷新',
						icon:'loading'
					})
					return;
				}
				this._freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
					_self.list = _self.list.concat(_self.data);
				}, 1000)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
			},
			onAbort() {
				
			},
			insertData() {
				this.list = this.list.concat(this.data);
			},
			initData:function(){
				page=1;
				uni.showNavigationBarLoading();
				uni.redirectTo({
					url: 'ip/article/query?page='+page,
					success: res => {
						uni.hideNavigationBarLoading();
						page++;
					},
					fail: () => {},
					complete: () => {},
				});
				
			},
			loadMore:()=>{
				console.log(1);
				uni.showNavigationBarLoading();
				uni.redirectTo({
					url: 'ip/article/query?page='+page,
					success: res => {
						uni.hideNavigationBarLoading();
						page++;
					},
					fail: () => {},
					complete: () => {}
				});
				
			}
		}
	};
</script>

<style>
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
