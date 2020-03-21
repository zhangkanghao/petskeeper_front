<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body" style="border-bottom: #f1f1f1 3upx solid;">
			<uni-nav-bar :fixed="true" color="#333333" @clickLeft="goback">
				<block class="cu-item" slot="left">
					<text class="lg text-black cuIcon-back" style="font-size: 40upx;margin-left: 10upx;"></text>
				</block>
				<block slot="right" style="width: 30%;">
					<button class="cu-btn shadow followbtn" :class="isfollow?'bg-grey':'bg-orange'" @tap="dofollow">{{followText}}</button>
				</block>
				<view class="padding input-view">
					<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
					<text class="nickname">{{nickname}}</text>
				</view>
			</uni-nav-bar>
		</view>
		<view class="detail">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
			<view class="text-content cText">
				{{content}}
			</view>
			<view class="text-gray text-sm text-right padding">
				<text class="pdate">2020-3-19</text>
				<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
				<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
				<text class="cuIcon-messagefill margin-lr-xs"></text> 30
			</view>
		</view>
		<view class="cu-list menu-avatar comment solids-top">
			<view class="cu-item" v-for="(item,index) in commentList" :key="index">
				<image class="cu-avatar round" src="https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png" mode="widthFix"></image>
				<view class="content">
					<view class="text-grey">莫甘娜</view>
					<view class="text-gray text-content text-df">
						凯尔，你被自己的光芒变的盲目。
					</view>
					<view class="bg-gray padding-sm radius margin-top-sm  text-sm">
						<view class="flex" style="border-bottom: #000000 2upx solid;line-height: 40upx;">
							<view>凯尔：</view>
							<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
						</view>
						<view style="color: #0081FF;">点击查看更多回复</view>
					</view>
					<view class="margin-top-sm flex justify-between">
						<view class="text-gray text-df">{{item.date}}</view>
						<view>
							<text class="cuIcon-appreciatefill text-red"></text>{{item.like}}
							<text class="cuIcon-messagefill text-gray margin-left-sm"></text>{{item.comment}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar input foot">
			<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" class="solid-bottom bg-gray fontsize" placeholder="快写下你的评论吧" :focus="false" maxlength="300" cursor-spacing="10"></input>
			<view class="cu-item">
				<text class="lg fontsize" :class="['cuIcon-'+favoricon,isfavor?'text-yellow':'text-gray']" @tap="dofavor"></text>
				<text class="lg fontsize" :class="['cuIcon-'+likeicon,islike?'text-red':'text-gray']" @tap="dolike"></text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{
			uniIcons,uniNavBar
		},
		data() {
			return {
				title: 'Hello',
				nickname: '秋裤小达人',
				isfollow:false,
				followText:'关注',
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}],
				commentList:[{
					id:0,
					nickname:'莫甘娜',
					url:'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
					content:'凯尔，你被自己的光芒变的盲目。',
					date:'2020年3月19日',
					like:20,
					comment:40
					
				}],
				content:'折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！',
				isfavor:false,
				favoricon:'favor',
				islike:false,
				likeicon:'like'
			}
		},
		onLoad(e) {
			console.log(e);
		},
		methods: {
			goback(){
				uni.navigateBack({
					delta:1,
					animationType:'slide-out-bottom'
				})
			},
			dofollow(){
				if(this.isfollow){
					uni.showModal({
						confirmText:'确认',
						cancelText:'取消',
						content:'确认不再关注?',
						success:res => {
							if(res.confirm){
								this.isfollow=false;
								this.followText='关注';
								//TODO
								// uni.request({
								// 	url: '',
								// 	method: 'GET',
								// 	data: {},
								// 	success: res => {},
								// 	fail: () => {},
								// 	complete: () => {}
								// });
							}
						}
					})
				}else{
					this.isfollow=true;
					this.followText='已关注';
					// TODO
					// uni.request({
					// 	url: '',
					// 	method: 'GET',
					// 	data: {},
					// 	success: res => {},
					// 	fail: () => {},
					// 	complete: () => {}
					// });
				}
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			dofavor(){
				if(this.isfavor){
					this.isfavor=false;
					this.favoricon='favor';
					// uni.request({
					// 	url: '',
					// 	method: 'GET',
					// 	data: {},
					// 	success: res => {},
					// 	fail: () => {},
					// 	complete: () => {}
					// });
				}else{
					this.isfavor=true;
					this.favoricon='favorfill';
					// TODO
					// uni.request({
					// 	url: '',
					// 	method: 'GET',
					// 	data: {},
					// 	success: res => {},
					// 	fail: () => {},
					// 	complete: () => {}
					// });
				}
			},
			dolike(){
				if(this.islike){
					this.islike=false;
					this.likeicon='like';
					// uni.request({
					// 	url: '',
					// 	method: 'GET',
					// 	data: {},
					// 	success: res => {},
					// 	fail: () => {},
					// 	complete: () => {}
					// });
				}else{
					this.islike=true;
					this.likeicon='likefill';
					// TODO
					// uni.request({
					// 	url: '',
					// 	method: 'GET',
					// 	data: {},
					// 	success: res => {},
					// 	fail: () => {},
					// 	complete: () => {}
					// });
				}
			}
			
			
			
		}
	}
</script>

<style>
	page{
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
	.content {
		height: 100%;
		background-color: #FFFFFF;
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
	.nickname{
		font-size: 32upx;
		text-align: center;
		margin-left: 10upx;
	}
	.followbtn{
		height: 50upx;
		width: 100%;
		margin: 0;
		padding: 0;
		font-size: 24upx;
		text-align: center;
		line-height: 30upx;
	}
	.detail{
		margin-bottom: 15upx;
	}
	.cText{
		margin: 20upx auto;
		text-align: start;
		width: 95%;
		font-size: 32upx;
		line-height: 40upx;
	}
	.pdate{
		text-align: left;
		margin-right: 10upx;
	}
	.fontsize{
		font-size: 40upx;
		margin: 0 20upx;
	}
</style>
