<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body" style="border-bottom: #f1f1f1 3upx solid;">
			<uni-nav-bar :fixed="true" color="#333333"  leftIcon="left-nav" leftText="返回"  title="我的发布" @clickLeft="cancel" ></uni-nav-bar>
		</view>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in 3" :key="index" @tap="tabSelect" :data-id="index">
				{{tabbarName[index]}}
			</view>
		</scroll-view>
		<view v-if="TabCur==0">
			<view v-if="releaseList.length!=0">
				<view v-for="(item,index) in releaseList" :key="index" style="margin-top: 20upx;" >
					<view class="cu-card dynamic" >
						<view class="cu-item shadow">
							<view class="cu-list menu-avatar">
								<view class="cu-item">
									<image class="cu-avatar round lg" :src="avatar"></image>
									<view class="content flex-sub" style="margin-top: 28upx;background-color: #FFFFFF;">
										<view>{{nickname}}</view>
										<view class="text-gray text-sm flex justify-between">
											{{item.createTime}}
										</view>
									</view>
								</view>
							</view> 
							<view class="text-content">
								{{item.content}}
							</view>
							<view class="grid flex-sub padding-lr col-3 grid-square" >
								<view class="bg-img" v-for="(item1,index) in item.imgs" :key="index" >
									<image class="image" :src="apiUrl+item1" mode="aspectFill"></image>
								</view>
							</view>
							<view class="text-gray text-sm text-right padding">
								<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.visit}}
								<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.praise}}
								<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.comment}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<image style="width: 100%;" src="../../../static/img/extra/empty.jpg" mode="widthFix"></image>
			</view>
		</view>
		<view v-else-if="TabCur==1">
			<view v-if="articleList.length!=0">
				<view v-for="(item,index) in articleList" :key="index" style="margin-top: 20upx;" >
					<view class="cu-card article" :class="isCard?'no-card':''">
						<view class="cu-item shadow">
							<view class="title"><view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view></view>
							<view class="content">
								<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
								 mode="aspectFill"></image>
								<view class="desc">
									<view class="text-content"> 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</view>
									<view>
										<view class="cu-tag bg-red light sm round">正义天使</view>
										<view class="cu-tag bg-green light sm round">史诗</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<image style="width: 100%;" src="../../../static/img/extra/empty.jpg" mode="widthFix"></image>
			</view>
		</view>
		<view v-else-if="TabCur==2">
			<view v-if="questionList.length!=0">
				<view v-for="(item,index) in questionList" :key="index" style="margin-top: 20upx;" >
					<view class="cu-card article" :class="isCard?'no-card':''">
						<view class="cu-item shadow">
							<view class="title"><view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view></view>
							<view class="content">
								<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
								 mode="aspectFill"></image>
								<view class="desc">
									<view class="text-content"> 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</view>
									<view>
										<view class="cu-tag bg-red light sm round">正义天使</view>
										<view class="cu-tag bg-green light sm round">史诗</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<image style="width: 100%;" src="../../../static/img/extra/empty.jpg" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tabbarName:['动态','文章','问答'],
				releaseList:[],
				articleList:[],
				questionList:[],
				nickname:'',
				avatar:''
				
			}
		},
		onLoad() {
			_this=this;
			uni.request({
				url: _this.apiUrl + '/user/profile',
				method: 'GET',
				header: {'authorization': uni.getStorageSync('userToken')},
				success: res => {
					_this.nickname = res.data.nickname;
					_this.avatar=_this.apiUrl+'/user/profile/avatar?userId='+res.data.userId;
				}
			});
			
			this.getInfos();
		},
		methods: {
			cancel:()=>{
				uni.navigateBack({
					delta:1,
					animationType:'slide-out-right'
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getInfos(e){
				uni.request({
					url: this.apiUrl+'/article/mypost',
					method: 'GET',
					header:{'authorization':uni.getStorageSync('userToken')},
					success: res => {
						console.log(res);
						var tmpRel=res.data.releases;
						console.log(tmpRel);
						for (var i = 0; i < tmpRel.length; i++) {
							var contentJson=JSON.parse(tmpRel[i].content);
							console.log(contentJson);
							var tmpObj={
								"id": tmpRel[i].id,
								"userId": tmpRel[i].userId,
								"content":contentJson.content,
								"imgs":contentJson.imgs,
								"visit": tmpRel[i].visit,
								"praise": tmpRel[i].praise,
								"comment": tmpRel[i].comment,
								"createTime": tmpRel[i].createTime
							}
							this.releaseList.push(tmpObj);
						}
						console.log(this.releaseList.length);
						this.articleList=res.data.articles;
						this.questionList=res.data.questions;
					}
				});
				
			},
			
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
		text-align: center;
		height: 100%;
		text-align: start;
		background-color: #EEEEEE;
	}
</style>
