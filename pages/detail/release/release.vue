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
				<block v-if="!isMe" slot="right" style="width: 30%;">
					<button class="cu-btn shadow followbtn" :class="isfollow?'bg-grey':'bg-orange'" @tap="dofollow">{{isfollow?'已关注':'关注'}}</button>
				</block>
				<view class="padding input-view">
					<image class="cu-avatar round" :src="avatar"></image>
					<text class="nickname">{{nickname}}</text>
				</view>
			</uni-nav-bar>
		</view>
		<view class="detail">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
			<view class="text-content cText">
				{{articleInfo.content}}
			</view>
			<view class="text-gray text-sm text-right padding">
				<text class="pdate">{{articleInfo.createTime}}</text>
				<text class="cuIcon-attentionfill margin-lr-xs"></text> {{articleInfo.visit}}
				<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{articleInfo.praise}}
				<text class="cuIcon-messagefill margin-lr-xs"></text> {{articleInfo.comment}}
			</view>
		</view>
		<view class="cu-list menu-avatar comment solids-top margin-tb-sm">
			<view class="cu-item " v-for="(item,index) in commentList" :key="index">
				<image class="cu-avatar round" :src="item.url" mode="widthFix"></image>
				<view class="content">
					<view class="text-black text-bold">{{item.nickname}}</view>
					<view class="text-black text-content text-df">
						{{item.content}}
					</view>
					<view class="bg-gray padding-sm radius text-sm margin-top-sm" v-for="(reply,index) in item.replies">
						<view class="flex" style="border-bottom: #000000 2upx solid;line-height: 40upx;">
							<view>{{reply.nickname}}:</view>
							<view class="flex-sub">{{reply.content}}</view>
						</view>
					</view>
					<view class="text-sm text-gray" @tap="queryReplies(index)">点击展开更多回复</view>
					<view class="margin-top-sm flex justify-between">
						<view class="text-gray text-df">{{item.date}}</view>
						<view>
							<text :class="['cuIcon-'+(item.targetId?'likefill':'like'),item.targetId?'text-red':'text-gray']" @click="dopraise(index)"></text>{{item.praise}}
							<text class="cuIcon-messagefill text-gray margin-left-sm" @click="comReply(index)"></text>{{item.comment}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="text-center text-gray text-sm" style="margin-bottom: 100upx;">{{bottomText}}</view>
		<view class="cu-bar input foot">
			<input @click="InputFocus" class="solid-bottom bg-gray fontsize"
			 placeholder="快写下你的评论吧" :focus="false" maxlength="300" cursor-spacing="10"></input>
			<view class="cu-item">
				<text class="text-lg fontsize" :class="['cuIcon-'+(isfavor?'favorfill':'favor'),isfavor?'text-yellow':'text-gray']" @tap="dofavor"></text>
				<text class="text-lg fontsize" :class="['cuIcon-'+(islike?'likefill':'like'),islike?'text-red':'text-gray']" @tap="dolike"></text>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="commentbox?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="hideModal">取消</view>
					<view class="action text-blue" @tap="doComment">发布</view>
				</view>
				<view class="cu-form-group margin-top box-comment">
					<textarea maxlength="-1" @input="commentInput" @blur="InputBlur" :focus="focus" placeholder="发布评论" adjust-position="true" cursor-spacing="10"></textarea>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	var _this;
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniIcons,
			uniNavBar
		},
		data() {
			return {
				InputBottom: 0,
				isMe:false,
				avatar: '../../../static/img/extra/none.jpg',
				articleInfo: {
					id: 0,
					userId: 0,
					content: '折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！',
					visit: 0,
					praise: 0,
					comment: 0,
					annoymous: false,
					createTime: '',
					updateTime: ''
				},
				nickname: '佚名',
				swiperList: [],
				commentList: [],
				myOwn: false, //自己的文章
				isfollow: false,
				cardCur: 0,
				isfavor: false,
				islike: false,
				commentbox:false,
				comment:{
					text:'',
					type:false,
					to:0
				},
				comPager:{
					pageNumber:1,
					pageSize:10,
					pageCount:0
				},
				focus:false,
				bottomText:'上拉加载更多'
			}
		},
		onLoad(e) {
			_this = this;
			this.getArticleDetail(e.id);
		},
		onReachBottom() {
			this.getComments();
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-out-bottom'
				})
			},
			showModal(){
				this.commentbox=true;
			},
			hideModal(){
				this.commentbox=false;
			},
			getArticleDetail(articleId){
				uni.request({
					url: this.apiUrl + '/article/get?articleId=' + articleId,
					method: 'GET',
					header: {
						authorization: uni.getStorageSync('userToken')
					},
					success: res => {
						this.articleInfo = res.data;
						var tmp = res.data;
						//头像
						this.avatar = this.apiUrl + '/user/profile/avatar?userId=' + tmp.userId;
						//内容和图片
						var parseContent = JSON.parse(tmp.content);
						_this.articleInfo.content = parseContent.content;
						for (var i = 0; i < parseContent.imgs.length; i++) {
							var tmpImgObj = {
								id: i,
								type: 'image',
								url: _this.apiUrl + parseContent.imgs[i]
							};
							this.swiperList.push(tmpImgObj);
						}
						//获取用户昵称
						if (!tmp.annoymous) {
							uni.request({
								url: _this.apiUrl + '/user/profile/get?userId=' + tmp.userId,
								method: 'GET',
								header: {
									authorization: uni.getStorageSync('userToken')
								},
								success: res1 => {
									_this.nickname = res1.data.nickname;
								}
							});
						}
						//获取点赞状态
						this.initPraise();
						//获取收藏状态
						this.initCollect();
						//是否本人
						//this.isMe=uni.getStorageSync('userId')==tmp.userId?true:false;
						//获取关注状态
						if(!this.isMe){
							this.initFollow();
						}
						this.getComments();
					}
				});
			},
			initPraise(){
				uni.request({
					url: this.apiUrl+'/praise/get?type=0&targetId='+this.articleInfo.id,
					method: 'GET',
					header:{authorization:uni.getStorageSync('userToken')},
					success: res => {
						if(res.data.ok){
							this.islike=true;
						}else{
							this.islike=false;
						}
					}
				});
			},
			initCollect(){
				uni.request({
					url: this.apiUrl+'/collect/get?articleId='+this.articleInfo.id,
					method: 'GET',
					header:{authorization:uni.getStorageSync('userToken')},
					success: res => {
						if(res.data.ok){
							this.isfavor=true;
						}else{
							this.isfavor=false;
						}
					}
				});
			},
			initFollow(){
				uni.request({
					url: this.apiUrl+'/follow/get?userId='+this.articleInfo.userId,
					method: 'GET',
					header:{authorization:uni.getStorageSync('userToken')},
					success: res => {
						if(res.data.ok){
							this.isfollow=true;
						}else{
							this.isfollow=false;
						}
					}
				});
			},
			InputFocus(e) {
				this.comment.type=false;
				this.comment.to=this.articleInfo.id;
				this.focus=true;
				this.showModal();
			},
			InputBlur(e) {
				this.focus=false;
				setTimeout(()=>{
					this.hideModal();
				},100)
			},
			commentInput(e){
				this.comment.text=e.detail.value;
			},
			dofollow() {
				if (this.isfollow) {
					uni.showModal({
						confirmText: '确认',
						cancelText: '取消',
						content: '确认不再关注?',
						success: res => {
							if (res.confirm) {
								this.isfollow = false;
								uni.request({
									url: this.apiUrl+'/follow/remove?userId='+this.articleInfo.userId,
									method: 'GET',
									header:{'authorization':uni.getStorageSync('userToken')},
									success: res => {
										if(!res.data.ok){
											uni.showToast({
												icon:'none',
												position:'bottom',
												title: res.data.msg
											});
										}else{
											uni.showToast({
												icon:'none',
												position:'bottom',
												title: '取关成功'
											});
										}
									}
								});
							}
						}
					})
				} else {
					this.isfollow = true;
					uni.request({
						url: this.apiUrl+'/follow/add?userId='+this.articleInfo.userId,
						method: 'GET',
						header:{'authorization':uni.getStorageSync('userToken')},
						success: res => {
							if(!res.data.ok){
								uni.showToast({
									icon:'none',
									position:'bottom',
									title: res.data.msg
								});
							}else{
								uni.showToast({
									icon:'none',
									position:'bottom',
									title: '关注成功'
								});
							}
						}
					});
				}
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			dofavor() {
				if (this.isfavor) {
					this.isfavor = false;
					uni.request({
						url: this.apiUrl+'/collect/remove?articleId='+this.articleInfo.id,
						method: 'GET',
						header:{'authorization':uni.getStorageSync('userToken')},
						success: res => {
							if(!res.data.ok){
								uni.showToast({
									icon:'none',
									position:'bottom',
									title: res.data.msg
								});
							}else{
								uni.showToast({
									icon:'none',
									position:'bottom',
									title: '取消收藏'
								});
							}
						}
					});
				} else {
					this.isfavor = true;
					uni.request({
						url: this.apiUrl+'/collect/add?articleId='+this.articleInfo.id,
						method: 'GET',
						header:{'authorization':uni.getStorageSync('userToken')},
						success: res => {
							if(!res.data.ok){
								uni.showToast({
									icon:'none',
									position:'bottom',
									title: res.data.msg
								});
							}else{
								uni.showToast({
									icon:'none',
									position:'bottom',
									title: '加入收藏'
								});
							}
						}
					});
				}
			},
			dolike() {
				if (this.islike) {
					this.islike = false;
					uni.request({
						url: this.apiUrl+'/praise/remove?type=0&targetId='+this.articleInfo.id,
						method: 'GET',
						header:{'authorization':uni.getStorageSync('userToken')},
						success: res => {
							if(!res.data.ok){
								uni.showToast({
									icon:'none',
									title: res.data.msg
								});
							}
						}
					});
				} else {
					this.islike = true;
					uni.request({
						url: this.apiUrl+'/praise/add?type=0&targetId='+this.articleInfo.id,
						method: 'GET',
						header:{'authorization':uni.getStorageSync('userToken')},
						success: res => {
							if(!res.data.ok){
								uni.showToast({
									icon:'none',
									title: res.data.msg
								});
							}
						}
					});
				}
			},
			doComment(){
				console.log(this.comment);
				uni.request({
					url: this.apiUrl+'/comment/add',
					method: 'POST',
					data: {
						type:this.comment.type,
						to:this.comment.to,
						content:this.comment.text
					},
					header:{'content-type':'application/x-www-form-urlencoded',authorization:uni.getStorageSync('userToken')},
					success: res => {
						console.log(res);
						var Obj=res.data.data;
						var tmp={
							id: Obj.id,
							nickname: '我',
							url: this.apiUrl+'/user/profile/avatar?userId='+uni.getStorageSync('userId'),
							content: Obj.content,
							date: Obj.updateTime,
							praise: Obj.praise,
							comment: Obj.comment,
							targetId:true,
							replies:[]
						}
						this.commentList.push(tmp);
					}
				});
			},
			getComments(){
				uni.request({
					url: this.apiUrl+'/comment/commentOfA?articleId='+this.articleInfo.id+'&pageNumber='+this.comPager.pageNumber+'&pageSize='+this.comPager.pageSize,
					method: 'GET',
					header:{authorization:uni.getStorageSync('userToken')},
					success: res => {
						console.log(res);
						var Objs=res.data.comments;
						for (var i = 0; i < Objs.length; i++) {
							var tmp={
								id: Objs[i].id,
								nickname: Objs[i].nickname,
								url: this.apiUrl+'/user/profile/avatar?userId='+Objs[i].from,
								content: Objs[i].content,
								date: Objs[i].date,
								praise: Objs[i].praise,
								comment: Objs[i].comment,
								targetId:Objs[i].targetId,
								replies:[],
								pageNumber:1
							}
							this.commentList.push(tmp);
						}
						this.comPager=res.data.pager;
						if(this.comPager.pageNumber>this.comPager.pageCount){
							this.bottomText='没有更多了';
						}else{
							this.comPager.pageNumber++;
							this.bottomText='上拉加载更多';
						}
					}
				});
			},
			dopraise(index){
				var tmp=this.commentList[index];
				if (tmp.targetId) {
					this.commentList[index].targetId = false;
					this.commentList[index].praise--;
					uni.request({
						url: this.apiUrl+'/praise/remove?type=1&targetId='+this.commentList[index].id,
						method: 'GET',
						header:{'authorization':uni.getStorageSync('userToken')},
						success: res => {
							if(!res.data.ok){
								uni.showToast({
									icon:'none',
									title: res.data.msg
								});
							}
						}
					});
				} else {
					this.commentList[index].targetId = true;
					this.commentList[index].praise++;
					uni.request({
						url: this.apiUrl+'/praise/add?type=1&targetId='+this.commentList[index].id,
						method: 'GET',
						header:{'authorization':uni.getStorageSync('userToken')},
						success: res => {
							if(!res.data.ok){
								uni.showToast({
									icon:'none',
									title: res.data.msg
								});
							}
						}
					});
				}
			},
			comReply(index){
				console.log(index);
				this.comment.type=true;
				this.comment.to=this.commentList[index].id;
				this.showModal();
				setTimeout(()=>{
					this.focus=true;
				},100)
			},
			queryReplies(index){
				console.log(index);
				uni.request({
					url: this.apiUrl+'/comment/commentOfC?commentId='+this.commentList[index].id+'&pageNumber='+this.commentList[index].pageNumber+'&pageSize=3',
					method: 'GET',
					header:{authorization:uni.getStorageSync('userToken')},
					success: res => {
						console.log(res);
						if(res.data.replys.length>0){
							this.commentList[index].replies=this.commentList[index].replies.concat(res.data.replys);
							this.commentList[index].pageNumber++;
						}else{
							uni.showToast({
								icon:'none',
								title: '没有更多回复了',
								position:'bottom'
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	page {
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

	.nickname {
		font-size: 32upx;
		text-align: center;
		margin-left: 10upx;
	}

	.followbtn {
		height: 50upx;
		width: 100%;
		margin: 0;
		padding: 0;
		font-size: 24upx;
		text-align: center;
		line-height: 30upx;
	}

	.detail {
		margin-bottom: 15upx;
	}

	.cText {
		margin: 20upx auto;
		text-align: start;
		width: 95%;
		font-size: 32upx;
		line-height: 40upx;
	}

	.pdate {
		text-align: left;
		margin-right: 10upx;
	}

	.fontsize {
		font-size: 40upx;
		margin: 0 20upx;
	}
	
	.box-comment{
		margin-top: 0;
		text-align: start;
	}
	
	
</style>
