<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body" style="border-bottom: #f1f1f1 3upx solid;">
			<uni-nav-bar :fixed="true" color="#333333"  leftIcon="left-nav" leftText="取消" title="添加动态" rightText="发布" @clickLeft="cancel" @clickRight="publish(1)">
				<block class="cu-item" slot="right">
					<text class="lg text-black cuIcon-camerafill" style="font-size: 40upx;margin-left: 10upx;"></text>
				</block>
			</uni-nav-bar>
		</view>
		<form>
			<view class="cu-form-group margin-top align-start" style="height: 300upx;">
				<textarea class="tatext" maxlength="-1" @input="textareaAInput" placeholder="多行文本输入框"></textarea>
			</view>
			<!-- 图片 -->
			<view class="cu-form-group">
				<view class="grid col-3 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image class="image" :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<9">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">所有人可见</view>
				<switch @change="SwitchA" :class="readType?'checked':''" :checked="readType?true:false"></switch>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">匿名</view>
				<switch @change="Annoymous" :class="annoymous?'checked':''" :checked="annoymous?true:false"></switch>
			</view>
			
		</form>
	</view>
</template>

<script>
	var _this;
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{
			uniIcons,uniNavBar
		},
		data() {
			return {
				title: 'Hello',
				textareaAValue:'',
				index: -1,
				imgList: [],
				imgUrlList:[],
				readType:true,
				annoymous:false,
				status:0,
				region: ['广东省', '广州市', '海珠区'],
			}
		},
		onLoad() {
			_this=this;
		},
		methods: {
			cancel(){
				if(this.textareaAValue!=''){
					uni.showModal({
						title:'提示',
						confirmText:'保存',
						cancelText:'拒绝',
						content:'内容将被清空，是否保存为草稿',
						success:res => {
							_this.publish(0);
						}
					})
				}else{
					uni.navigateBack({
						delta:1,
						animationType:'slide-out-bottom'
					})
				}
				
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				this.imgList.splice(e.currentTarget.dataset.index, 1)
			},	
			ChooseImage() {
				uni.chooseImage({
					count: 9-this.imgList.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			Annoymous(e){
				this.annoymous=e.detail.value
			},
			publish(ptype){
				var promises=[];
				//上传图片
				for (var i = 0; i < this.imgList.length; i++) {
					var promise=uni.uploadFile({
						url:_this.apiUrl+'/article/addPic',
						filePath:this.imgList[i],
						header:{authorization:uni.getStorageSync('userToken')},
						name:'file'
					})
					promises.push(promise);
				}
				Promise.all(promises).then(function(value){
					for (var i = 0; i < value.length; i++) {
						var res=JSON.parse(value[i][1].data);
						if(res.ok){
							_this.imgUrlList.push(res.path);
						}else{
							uni.showToast({
								icon:'none',
								title:'错误['+i+']:'+res.msg,
								duration:2000
							});
							return;
						}
					}
					//封装content+img
					var contentJson={
						content:_this.textareaAValue,
						imgs:_this.imgUrlList
					};
					//发布或者存草稿
					uni.request({
						url: _this.apiUrl+'/article/publish',
						method: 'POST',
						header:{
							'content-type':'application/x-www-form-urlencoded',
							authorization:uni.getStorageSync('userToken')
						},
						data: {
							type:'动态',
							readType:_this.readType,
							content:JSON.stringify(contentJson),
							annoymous:_this.annoymous,
							status:ptype==1?true:false
						},
						success: res => {
							if(res.data.ok){
								uni.showToast({
									icon:'none',
									title:ptype==1?'发表成功':'保存成功'
								});
								if(ptype==1){
									uni.redirectTo({
										url:'../../detail/release/release?id='+res.data.data.id
									});
								}else{
									uni.navigateBack({
										delta:1,
										animationType:'slide-out-bottom'
									})
								}
								
							}else{
								uni.showToast({
									icon:'none',
									title:'请求异常'
								});
							}
							
						}
					});
				})
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
	.tatext{
		text-align: start;
		height: 500upx;
	}
</style>
