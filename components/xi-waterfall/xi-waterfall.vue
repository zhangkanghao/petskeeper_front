<template>
	<view class="container">
		<!-- 第一列 -->
		<view class="column" id="columnFirst">
			<view class="water-item" v-for="(item,index) in columnFirst" :key="index">
				<view @click="toDetail" :data-id="item.id">
					<image class="top-cover" :src="item.img"  mode="widthFix"></image>
					<h3 class="top-title">{{item.title}}</h3>
				</view>
				<view class="water-bottom">
					<view class="water-bottom-item">
						<view class="img-box">
							<image class="water-avatar" :src="item.photo" mode="widthFix"></image>
						</view>
						<text class="water-name">{{item.name}}</text>
					</view>
					<view class="water-bottom-item cu-item">
						<text class="bottom-good" :class="['cuIcon-'+(item.isLiked?'likefill':'like'),'text-'+(item.isLiked?'red':'gray')]"></text>
						<text class="water-num">{{item.likeCount}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 第二列 -->
		<view class="column" id="columnSecond">
			<view class="water-item" v-for="(item,index) in columnSecond" :key="index">
				<view @click="toDetail" :data-id="item.id">
					<image class="top-cover" :src="item.img"  mode="widthFix"></image>
					<h3 class="top-title">{{item.title}}</h3>
				</view>
				<view class="water-bottom">
					<view class="water-bottom-item">
						<view class="img-box">
							<image class="water-avatar" :src="item.photo" mode="widthFix"></image>
						</view>
						<text class="water-name">{{item.name}}</text>
					</view>
					<view class="water-bottom-item">
						<text class="bottom-good" :class="['cuIcon-'+(item.isLiked?'likefill':'like'),'text-'+(item.isLiked?'red':'gray')]"></text>
						<text class="water-num">{{item.likeCount}}</text>
					</view>
				</view>
				<!-- 	<image :src="item.img" mode="widthFix"></image>
					<view>{{ item.title }}</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				}
			}
		},
		data() {
			return {
				tempArray: [],
				columnFirst: [],
				columnSecond: [],
				columnFirstHeight: 0,
				columnSecondHeight: 0,
				switchInsert: true,
				likeIcon:'../../static/img/homepage/icon_good.png'
			};
		},
		methods: {
			like(){
				console.log('like press');
			},
			toDetail(e){
				console.log(e);
				uni.navigateTo({
					url: '/pages/detail/release/release?id='+e.currentTarget.dataset.id
				});
			},
			// 获取dom元素的高度
			async getDomHeight(selector) {
				return new Promise(resolve => {
					let query = uni.createSelectorQuery().in(this);
					query
						.select(selector)
						.fields({
								size: true
							},
							data => {
								resolve(data.height);
							}
						)
						.exec();
				});
			},
			//新增数据
			async insert() {
				//只有数组内有数据才执行
				if (this.tempArray.length > 0) {
					this.switchInsert = false;
					//获取每一列的高度
					let columnFirstHeight = await this.getDomHeight('#columnFirst');
					let columnSecondHeight = await this.getDomHeight('#columnSecond');
					//获取加入的数据
					let data = this.tempArray.splice(0, 1);
					if (columnFirstHeight == columnSecondHeight || columnFirstHeight < columnSecondHeight) {
						//当高度相对,或第一列小于其他列,数据加入到第一列
						this.columnFirst.push(data[0]);
					} else {
						//数据加入到第二列
						this.columnSecond.push(data[0]);
					}
					this.$nextTick(() => {
						//当数据渲染完毕后,可以进行添加,知道临时数据被添加完毕
						this.insert();
					});
				} else {
					this.switchInsert = true;
				}
			},
			//清除数组
			clear() {
				this.columnFirst = [];
				this.columnSecond = [];
				this.tempArray = [];
			},
			//外部调用,添加数据
			insertData(data) {
				this.tempArray = this.tempArray.concat(data);
				//新增数据
				if (this.switchInsert) {
					this.insert();
				}
			}
		},
		watch: {
			list(newVal, oldVal) {
				//当监听到,数据有变化时
				if (newVal.length === 0) {
					//清空数据
					this.clear();
				} else if (newVal.length > 0) {
					//赋值给临时数组
					this.tempArray = this.tempArray.concat(newVal.slice(oldVal.length));
					//新增数据
					if (this.switchInsert) {
						this.insert();
					}
				}
			}
		},
		computed: {
			currentLength() {
				return this.columnFirst.length + this.columnSecond.length;
			}
		}
	};
</script>

<style>
	.container {
		width: 100%;
		display: flex;
		align-items: flex-start;
	}

	.container .column {
		flex: 1;
	}

	.container .column .item image {
		width: 100%;
	}

	.water-item {
		width: 97%;
		margin: 0 auto;
		border-radius: 12upx;
		overflow: hidden;
		background-color: #FFFFFF;
		margin-bottom: 10upx;
	}

	.top-cover {
		width: 100%;
		border-radius: 12upx;
	}

	.top-title {
		font-family: PingFangHK-Medium;
		font-size: 28upx;
		font-weight: 600;
		line-height: 40upx;
		color: #333333;
		text-align: justify;
		margin: 20upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.water-bottom {
		display: flex;
		justify-content: space-between;
		margin: 0 20upx 20upx 20upx;
		font-size: 24upx;
	}

	.water-bottom-item {
		display: flex;
		align-items: center;
	}

	.img-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.water-avatar {
		width: 50upx;
	}

	.water-name {
		max-width: 160upx;
		padding-left: 10upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.bottom-good {
		font-size: 32upx;
	}	
	.water-num {
		line-height: 32upx;
		font-size: 24upx;
		color: #333;
		margin-left: 14upx;
	}

	
</style>
