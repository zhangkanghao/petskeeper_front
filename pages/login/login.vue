<template>
	<view class="main">
		<!-- 登录框 -->
		<view class="loginBox">
			<view class="loginLogo">
				<image :src="loginImage" mode="aspectFill"></image>
			</view>
			<view class="loginUser">
				<image v-if="loginMode==1" src="../../static/img/login/login-uname.png" mode="aspectFill"></image>
				<image v-else-if="loginMode==2" src="../../static/img/login/login-phone.png" mode="aspectFill"></image>
				<input v-if="loginMode==1" type="text" placeholder="请输入用户名"/>
				<input v-else-if="loginMode==2" type="number" placeholder="请输入手机号" length="11" @input="usernameInput"/>
			</view>
			<view class="loginPwd">
				<image src="../../static/img/login/login-pwd.png" mode="aspectFill"></image>
				<view v-if="loginMode==1">
					<input  type="password" placeholder="请输入密码" maxlength="16" @input="passwordInpur"/>
				</view>
				<view v-else-if="loginMode==2" class="loginPwdCode"> 
					<input type="number" placeholder="请输入验证码" length="4" @input="codeInput"/>
					<view class="uni-padding-wrap uni-common-mt" @click="getCode"><button type="primary">验证</button></view>
				</view>
			</view>
			<view class="loginBtn uni-padding-wrap uni-common-mt" @click="loginUp">
				<button type="primary">登录</button>
			</view>
		</view>
		
		
		
		<!-- 其他登录方式 -->
		<view class="otherLoginTitle">— 第三方登录 —</view>
		<view class="otherLogin">
			<view class="weiixnLogin" @click="weixinlogin">
				<image class="loginIcon" src="../../static/img/login/weixin.png" mode=""></image>
			</view>
			<view class="qqLogin" @click="qqlogin">
				<image src="../../static/img/login/QQ.png" mode=""></image>
			</view>
			<view class="weiboLogin" @click="weibologin">
				<image  src="../../static/img/login/weibo.png" mode=""></image>
			</view>
		</view>

		<!-- 忘记密码/新用户注册 -->
		<view class="bottomBox">
			<view>
				<view class="loginType" v-if="loginMode == 1" @click="loginCode">手机登录</view>
				<view class="loginType" v-else-if="loginMode == 2" @click="loginPhone">密码登录</view>
			</view>
			<view class="yonghuzhuce">用户注册</view>
			<view>
				<view class="forgetPwd" v-if="loginMode == 1" @click="">忘记密码</view>
				<view class="captcha" v-else-if="loginMode == 2" @click="">收不到验证码?</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginMode: 1,
				usernameType:"text",
				codeBut:"验证",
				loginImage:"../../static/logo.png",
				codeClick:true,
				username:"",
				password:"",
				code:"",
			}
		},
		onLoad() {
			
		},
		methods: {
			loginCode() {
				this.loginMode = 2
				this.usernameType = "number"
			},
			loginPhone() {
				this.loginMode = 1
				this.usernameType = "text"
			},
			// 手机号输入
			usernameInput(e){
				this.username = e.detail.value
			},
			// 密码输入
			passwordInpur(e){
				this.password = e.detail.value
			},
			// 验证码输入
			codeInput(e){
				this.code = e.detail.value
			},
			// 点击登录
			loginUp(){
				var _that = this
				if(_that.phone == ""){
					uni.showToast({
						title: '请输入用户名',
						icon: 'none',
						duration:1000
					});
				}else if(_that.password == "" && _that.loginMode == 1){
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
						duration:1000
					});
				}else if(_that.code == "" && _that.loginMode == 2){
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration:1000
					});
				}else{
					//这里请求接口
					console.log(_that.phone,_that.password,_that.code)
				}
			},
			// 获取验证码
			getCode(){
				var _that = this
				const mobsms = uni.requireNativePlugin('WB-MobSms');
				// 倒计时
				if(_that.codeClick){
					if(_that.phone[0] != 1 || _that.phone.length != 11){
						uni.showToast({
							title: '请输入正确的手机号',
							icon: 'none',
							duration: 800
						});
					}else{
						_that.codeClick = false
						// 发送短信
						mobsms.sendSms(
							{zone: '86',phone_number: _that.phone},
							result => {if (result.status == 'success') {
									uni.showToast({
										title: '验证码获取中',
										icon: 'loading',
										duration: 800
									});
								}
							}
						);
						// 倒计时开始
						var daojishi = 60
						var xianshi = setInterval(function(){
							_that.codeBut = "重新发送"+daojishi;
							daojishi--
							if(daojishi<=0){
								_that.codeBut = "重新发送"
								_that.codeClick = true
								clearInterval(xianshi);
							}
						},1000)
					}
				}
			},
			// 微信登录
			weixinlogin(){
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log(loginRes.authResult);
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
						console.log(infoRes)
				        console.log('用户昵称为：' + infoRes.userInfo.nickName);
				      }
				    });
				  }
				});
			},
			// qq登录
			qqlogin(){
				var _that = this
				uni.login({
				  provider: 'qq',
				  success: function (loginRes) {
					  uni.getUserInfo({
					    provider: 'qq',
					    success: function (infoRes) {
					  	console.log(infoRes)
							_that.loginImage = infoRes.userInfo.figureurl_qq_2
					    }
					  });
				  }
				});
			},
			// 微博登录
			weibologin(){
				uni.login({
					provider:"sinaweibo",
					success: function (loginRes) {
					  console.log(loginRes.authResult);
					}
				})
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	.main {
		background: #fff;
		width: 100%;
		height: 100%;
	}

	.mainHead {
		height: var(--status-bar-height);
	}


	.loginUp {
		margin-top: 30upx;
		padding: 15upx;
	}

	.code {
		background: url(../../static/img/login/code.png)no-repeat;
		background-position: 10upx;
		padding-left: 65upx;
		width: 300upx;
		background-size: 58upx;
	}

	.huoquyanzhengma {
		background: #007AFF;
		color: #fff;
		line-height: 40upx;
		width: 20%;
		text-align: center;
		border-radius: 10upx;
	}

	.loginBox {
		width: 95%;
		height: 60%;
		margin: auto;
		padding-top: 50upx;
	}
	
	.loginLogo{
		width: 70%;
		height: 60%;
		margin: 0 auto;
	}
	.loginLogo>image{
		margin: 0 auto;
		width: 100%;
	}
	.loginUser{
		height: 10%;
		width: 80%;
		margin: 10upx auto;
		padding: 10upx auto;
		justify-content: center;
		display: flex;
		
	}
	.loginUser>image{
		margin-left: 0;
		width: 50upx;
		height: 50upx;
	}
	.loginUser>input{
		margin-top: 15upx;
		margin-left: 15upx;
		width: 75%;
		height: 40upx;
		line-height: 40upx;
		border-bottom: #C0C0C0 1upx inset;
	}
	.loginPwd{
		height: 10%;
		width: 80%;
		margin: 10upx auto;
		justify-content: center;
		display: flex;
		padding: 10upx auto;
	}
	.loginPwd>image{
		margin-left: 0;
		width: 50upx;
		height: 50upx;
	}
	.loginPwd>view{
		margin-top: 15upx;
		margin-left: 15upx;
		width: 75%;
		height: 40upx;
		line-height: 40upx;
		border-bottom: #C0C0C0 1upx inset;
	}
	.loginPwdCode{
		justify-content: center;
		display: flex;
	}
	.loginPwd>view>input{
		width: auto;
		line-height: 40upx;
	}
	.loginPwd>view>view>button{
		background: #007AFF;
		color: #fff;
		line-height: 40upx;
		font-size:30upx;
		height: 100%;
		width: 100%;
		margin: 0 0;
		border-radius: 10upx;
	}
	.loginBtn{
		height: 10%;
		width: 70%;
		margin: 10upx auto;
		padding: 10upx auto;
	}
	


	.logoImgBox {
		width: 200upx;
		height: 200upx;
		margin: 0 auto;
		margin-top: 15upx;
		padding-bottom: 30upx;
	}

	.otherLogin {
		width: 500upx;
		height: 95upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}

	.otherLogin>view>image {
		width: 100upx;
		height: 100upx;
		background: #fff;
		border-radius: 95upx;
	}

	.otherLoginTitle {
		width: 100%;
		text-align: center;
		color: #555555;
		font-size: 28upx;
		line-height: 80upx;
	}

	.bottomBox {
		display: flex;
		justify-content: center;
		position: fixed;
		bottom: 60upx;
		left: 0;
		right: 0;
		margin: auto;
		height: 30upx;
		line-height: 30upx;
		font-size: 32upx;
	}
	.loginType{
		padding-right: 15upx;
	}

	.forgetPwd {
		padding-left: 15upx;
	}
	.captcha{
		padding-left: 15upx;
	}

	.yonghuzhuce {
		border-left: 1rpx solid #555;
		border-right: 1rpx solid #555;
		height: 25upx;
		padding-left: 15upx;
		padding-right: 15upx;
	}
</style>
