<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="example-body" style="border-bottom: #f1f1f1 3upx solid;">
			<uni-nav-bar :fixed="true" color="#333333"  leftIcon="left-nav"  title="宠物信息" rightText="保存" @clickLeft="cancel" @clickRight="doPost"></uni-nav-bar>
		</view>
		<view class="uni-center" style="background:#FFFFFF; font-size:0;">
			<image class="round" mode="aspectFill" :src="pic" @click="chooseAvatar"/>
		</view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">昵称</view>
				<input :value="petData.petName" name="input" @input="nickInput" style="text-align: end;" placeholder="请输入宠物昵称"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">性别</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'请选择宠物性别'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">品种</view>
				<picker @change="PickerChange1" :value="index1" :range="picker1">
					<view class="picker">
						{{index1>-1?picker1[index1]:'请选择宠物品种'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">出生日期</view>
				<picker mode="date" :value="petData.birthTime" start="2015-09-01" end="2021-12-12" @change="birthDateChange">
					<view class="picker">
						{{petData.birthTime}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">领养日期</view>
				<picker mode="date" :value="petData.adoptionTime" start="2015-09-01" end="2020-09-01" @change="adpDateChange">
					<view class="picker">
						{{petData.adoptionTime}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">绝育情况</view>
				<picker @change="PickerChange2" :value="index2" :range="picker2">
					<view class="picker">
						{{index2>-1?picker2[index2]:'请选择宠物绝育情况'}}
					</view>
				</picker>
			</view>
		</form>
		<view v-if="petId!=0" class="uni-center text-red" style="margin-top: 40upx;" @click="deletePet(petId)">删除宠物</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				petId:0,
				index: -1,
				picker: ['GG', 'MM'],
				index1:-1,
				picker1:['博美','美短','英短','折耳'],
				index2:-1,
				picker2:['已绝育','未绝育'],
				modalName: null,
				pic:'../../../static/img/extra/none.jpg',
				petData:{
					"id":0,
					"userId": 0,
					"petName":'',
					"gender": '',
					"type": '',
					"birthTime": '2020-3-22',
					"adoptionTime": '2020-3-22',
					"praise": 0,
					"sterilized": '',
				}
			}
		},
		onLoad(e) {
			_this=this;
			this.petId=e.petId;
			if(e.petId!=0){
				uni.request({
					url: this.apiUrl+'/pet/get?petId='+e.petId,
					method: 'GET',
					header:{'authorization':uni.getStorageSync('userToken')},
					success: res => {
						console.log(res);
						this.petData=res.data;
						this.index=this.petData.gender=='GG'?0:1;
						for (var i = 0; i < this.picker1.length; i++) {
							if(this.picker1[i]==this.petData.type){
								this.index1=i;
								break;
							}
						}
						if(this.index1==this.picker1.length)this.index1=-1;
						this.index2=this.petData.sterilized=='已绝育'?0:1;
						this.pic=this.apiUrl+'/pet/avatar?petId='+e.petId;
					}
				});
			}
		},
		methods: {
			cancel:()=>{
				uni.navigateBack({
					delta:1,
					animationType:'slide-out-right'
				})
			},
			nickInput(e){
				this.petData.petName=e.detail.value;
			},
			PickerChange(e) {
				this.index = e.detail.value;
				this.petData.gender=this.picker[e.detail.value];
			},
			PickerChange1(e) {
				this.index1 = e.detail.value;
				this.petData.type=this.picker1[e.detail.value];
			},
			birthDateChange(e) {
				this.petData.birthTime = e.detail.value
			},
			adpDateChange(e) {
				this.petData.adoptionTime = e.detail.value
			},
			PickerChange2(e) {
				this.index2 = e.detail.value;
				this.petData.sterilized=this.picker2[e.detail.value];
			},
			chooseAvatar(){
				uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					success: (res) => {
						var imgFile=res.tempFilePaths[0];
						this.pic=imgFile;
					}
				})
			},
			doPost(){
				console.log('post');
				if(this.petId==0){
					var url=_this.apiUrl+'/pet/add';
				}else{
					var url=_this.apiUrl+'/pet/update';
				}
				this.dorequst(url);
			},
			dorequst(url){
				console.log(url);
				uni.request({
					url: url,
					method: 'POST',
					data: {
						"id":_this.petData.id,
						"userId": _this.petData.userId,
						"petName":_this.petData.petName,
						"gender": _this.petData.gender,
						"type": _this.petData.type,
						"birthTime":_this.petData.birthTime,
						"adoptionTime": _this.petData.adoptionTime,
						"sterilized": _this.petData.sterilized,
					},
					header:{
						'content-type':'application/x-www-form-urlencoded',
						'authorization':uni.getStorageSync('userToken')
					},
					success: (res) => {
						console.log(res);
						uni.uploadFile({
							url:_this.apiUrl+'/pet/avatar',
							filePath:_this.pic,
							header:{
								authorization:uni.getStorageSync('userToken')
							},
							name:'file',
							formData:{
								petId:res.data.data.id
							},
							success: (res1) => {
								uni.showToast({
									icon:'none',
									title:'添加成功'
								});
								uni.navigateBack({
									delta: 1
								});
							}
						})
					}
				});
			},
			deletePet(e){
				console.log(e);
				uni.showModal({
					title: '确认',
					content: '确认要删除你的宠物吗？',
					cancelText: '我再想想',
					confirmText: '确认删除',
					success: res => {
						if(res.confirm){
							console.log('删除');
							uni.request({
								url: this.apiUrl+'/pet/delete?petId='+e,
								method: 'GET',
								header:{
									'authorization':uni.getStorageSync('userToken')
								},
								success: result => {
									if(result.data.ok){
										uni.showToast({
											icon:'none',
											title:'删除成功'
										});
										uni.navigateBack({
											delta: 1
										});
									}else{
										uni.showToast({
											icon:'none',
											title:result.data.msg
										});
									}
								}
							});
						}
					}
				});
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
	.uni-center{
		text-align:center;
	}
	.uni-center>image{
		width: 200upx;
		height: 200upx;
		margin-top: 20upx;
	}
</style>
