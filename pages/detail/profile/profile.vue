<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body" style="border-bottom: #f1f1f1 3upx solid;">
			<uni-nav-bar :fixed="true" color="#333333"  leftIcon="left-nav"  title="个人信息" rightText="保存" @clickLeft="cancel" @clickRight="saveInfo"></uni-nav-bar>
		</view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">头像</view>
				<image class="cu-avatar radius bg-gray" :src="avatar" mode="aspectFill" @tap="chooseAvatar"></image>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">昵称</view>
				<input :value="userData.nickname" name="input" @input="nickInput"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">简介</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" :value="userData.description"></textarea>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">性别</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'...'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">所在地</view>
				<input name="input" :value="userData.location" @input="locInput"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<input placeholder="确保输入正确的邮箱地址" name="input" :value="userData.email" @input="mailInput" :disabled="userData.emailChecked"></input>
				<button v-if="userData.emailChecked==false" class='cu-btn bg-green shadow' @tap="bindMail">绑定</button>
				<button v-else class='cu-btn bg-ray shadow' @tap="unbindMail">已绑定</button>
			</view>
			
		</form>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				index: -1,
				picker: ['男', '女'],
				modalName: null,
				avatar:'../../../static/img/extra/none.jpg',
				userData:{
					"userId": 0,
					"nickname": "nickname",
					"email": "email",
					"emailChecked": false,
					"gender": "gender",
					"description": "description",
					"location": "location",
					"praise": 0,
					"follower": 0,
					"following": 0,
					"createTime": "createTime",
					"updateTime": "updateTime"
				},
				newAvatar:false
				
			}
		},
		onLoad() {
			_this=this;
			uni.request({
				url: _this.apiUrl+'/user/profile',
				method: 'GET',
				header:{'authorization':uni.getStorageSync('userToken')},
				success: res => {
					if(res.data){
						_this.userData=res.data;
						this.index=_this.userData.gender==null?-1:(_this.userData.gender=='男'?0:1);
						this.avatar=_this.apiUrl+'/user/profile/avatar?userId='+_this.userData.userId;
					}
				}
			});
		},
		methods: {
			cancel:()=>{
				if(_this.newAvatar){
					_this.newAvatar=false;
					uni.reLaunch({
						url:'../../tabbar/myinfo/myinfo'
					})
				}else{
					uni.navigateBack({
					delta:1,
					animationType:'slide-out-right'
				})
				}
				
			},
			saveInfo:()=>{
				//保存数据
				uni.request({
					url: _this.apiUrl+'/user/profile/update',
					method: 'POST',
					header:{'content-type':'application/x-www-form-urlencoded',authorization:uni.getStorageSync('userToken')},
					data: {
						"nickname": _this.userData.nickname,
						"email": _this.userData.email,
						"emailChecked": _this.userData.emailChecked,
						"gender": _this.userData.gender,
						"description": _this.userData.description,
						"location": _this.userData.location
					},
					success: res => {
						if(res.data.ok){
							uni.showToast({
								icon:'none',
								title:'修改成功',
								duration:1000
							})
							global.$newInfo=true;
							setTimeout(function(){
								if(_this.newAvatar){
									_this.newAvatar=false;
									uni.reLaunch({
										url:'../../tabbar/myinfo/myinfo'
									})
								}else{
									uni.navigateBack({
									delta:1,
									animationType:'slide-out-right'
								})
								}
							},200);
						}else{
							uni.showToast({
								icon:'none',
								title:'修改异常',
								duration:1000
							})
						}
					}
				});
			},
			nickInput(e){
				this.userData.nickname=e.detail.value;
			},
			textareaBInput(e) {
				this.userData.description=e.detail.value;
			},
			PickerChange(e) {
				this.index = e.detail.value;
				this.userData.gender=this.picker[e.detail.value];
			},
			locInput(){
				this.userData.location=e.detail.value;
			},
			mailInput(e){
				this.userData.email=e.detail.value;
			},
			bindMail(){
				uni.showModal({
					title:'确认',
					content:'确认输入了正确的邮箱地址',
					success: (res) => {
						if(res.confirm){
							uni.request({
								url: _this.apiUrl+'/user/profile/active/mail',
								method: 'POST',
								header:{'content-type':'application/x-www-form-urlencoded',authorization:uni.getStorageSync('userToken')},
								data: {
									email:_this.userData.email
								},
								success: res => {
									if(res.data.ok){
										uni.showToast({
											icon:'none',
											title:'邮件发送成功，请确认后刷新页面更新信息',
											duration:3000
										})
									}else{
										uni.showToast({
											icon:'none',
											title:'邮件发送失败，请确认邮件地址'
										})
									}
								},
							});
						}
					}
				})
			},
			unbindMail(){
				uni.showModal({
					title:'确认',
					content:'确认要解除绑定吗？',
					success: (res) => {
						if(res.confirm){
							_this.userData.emailChecked=false;
							_this.userData.email='';
						}
					}
				})
			},
			chooseAvatar(){
				uni.chooseImage({
					count:1,
					sizeType:['original','compressed'],
					success: (res) => {
						var imgFile=res.tempFilePaths[0];
						uni.uploadFile({
							url:_this.apiUrl+'/user/profile/avatar',
							filePath:imgFile,
							header:{
								'content-type':'application/x-www-form-urlencoded',
								authorization:uni.getStorageSync('userToken')
							},
							name:'file',
							success: (res1) => {
								_this.avatar=imgFile;
								_this.newAvatar=true;
							}
						})
					},
					
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
		text-align: center;
		height: 100%;
		background-color: #FFFFFF;
		text-align: start;
	}
</style>
