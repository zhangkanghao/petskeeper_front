<script>
global.$newInfo=false;
export default {
	onLaunch: function() {
		console.log('App Launch');
		try {
		    let userData=uni.getStorageSync('setUserData');
			if(userData){
				console.log(userData);
				uni.switchTab({
					url:'pages/tabbar/homepage/homepage'
				})
			}
		} catch (e) {
		    // error
		}
		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */ 
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
