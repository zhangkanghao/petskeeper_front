<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body">
			<uni-nav-bar :fixed="false" color="#333333" background-color="#FFFFFF" right-icon="scan" @clickLeft="showCity"
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
		<view id="waterfull" class="waterfall">
			<waterfall :list="list"></waterfall>
		</view>
	</view>
</template>

<script>
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
				old: {
					scrollTop: 0
				},
				list: [],
				data: [
					{
						title: '标题1',
						img: 'https://s2.ax1x.com/2020/02/28/3Dn6c8.png'
					},
					{
						title: '标题2',
						img: 'https://s2.ax1x.com/2020/02/28/3DntXD.jpg'
					},
					{
						title: '标题3',
						img: 'https://s2.ax1x.com/2020/02/28/3Dna0H.jpg'
					},
					{
						title: '标题4',
						img: 'https://s2.ax1x.com/2020/02/28/3Dn0AA.jpg'
					},
					{
						title: '标题5',
						img: 'https://s2.ax1x.com/2020/02/28/3DnRBQ.jpg'
					},
					{
						title: '标题6',
						img: 'https://s2.ax1x.com/2020/02/28/3Dns9P.jpg'
					},
					{
						title: '标题7',
						img: 'https://s2.ax1x.com/2020/02/28/3DncjS.jpg'
					},
					{
						title: '标题8',
						img: 'https://s2.ax1x.com/2020/02/28/3Dn2ng.jpg'
					},
					{
						title: '标题2',
						img: 'https://s2.ax1x.com/2020/02/28/3DntXD.jpg'
					},
					{
						title: '标题3',
						img: 'https://s2.ax1x.com/2020/02/28/3Dna0H.jpg'
					},
					{
						title: '标题4',
						img: 'https://s2.ax1x.com/2020/02/28/3Dn0AA.jpg'
					},
					{
						title: '标题5',
						img: 'https://s2.ax1x.com/2020/02/28/3DnRBQ.jpg'
					},
					{
						title: '标题6',
						img: 'https://s2.ax1x.com/2020/02/28/3Dns9P.jpg'
					},
					{
						title: '标题7',
						img: 'https://s2.ax1x.com/2020/02/28/3DncjS.jpg'
					},
					{
						title: '标题8',
						img: 'https://s2.ax1x.com/2020/02/28/3Dn2ng.jpg'
					}
				]
			};
		},

		onShow() {
			this.list = this.list.concat(this.data);
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
			}
		}
	};
</script>

<style>
	.content {
		text-align: center;
		height: 100%;
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

	.swiper-item{
		width: 100%;
		height: 280upx;
	}
	.swiper-item>image{
		width: 100%;
		height: 280upx;
	}

	.waterfall {
		height: auto;
		width: 100%;
		margin: 5upx auto;
	}
</style>
