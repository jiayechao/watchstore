<template>
  <div class="detail-wrap">
    <div class="detail" v-if="itemDetail.styleList">
      <div class="detail-imgs fl">
        <div v-if="itemDetail.styleList"
          class="big-img" :style="{backgroundImage:'url('+currentColorImgUrl+')'}"></div>
        <div style="overflow:hidden;">
          <span class="to-left fl" @click="toRight"><i class="el-icon-arrow-left"></i></span>
          <div class="small-img-wrap fl">
            <div v-if="itemDetail.styleList"
              class="small-img"
              :style="{width: currentStyleImgUrls.length*102 + 'px', left:  distance +'px'}" >
            <span :class="{active:index===styleNum}"
              class="fl"
              v-for="(item, index) in currentStyleImgUrls"
              :key="index"
              :style="{backgroundImage:'url('+item+')'}"
              @click="styleNum = index"></span>
            </div>
          </div>
          <span class="to-right fl" @click="toLeft"><i class="el-icon-arrow-right"></i></span>
        </div>
      </div>
      <div class="detail-info">
        <p class="title">{{itemDetail.itemName}}</p>
        <p class="desc">{{itemDetail.itemDescr}}</p>
        <div v-if="itemDetail.isPresale === 1 && itemDetail.styleList" class="presale-price">
            <p class="finishTime">距抢购结束：
                <template v-if="presaleEndTimestamp < nowTime">
                  <span class="fr">抢购已结束</span>
                </template>
                <template v-else>
                  <span class="fr"><svg-icon icon-class="shalou"></svg-icon>{{finishTime}}</span>
                </template>
              </p>
              <p>￥{{totalPrice}}<span style="font-size:14px">元</span></p>
        </div>
        <p v-else-if="itemDetail.isPresale === 0 && itemDetail.styleList" class="price" >￥{{totalPrice}}<span style="font-size:14px">元</span></p>
        <div class="style-color">
          <span class="label">颜色</span>
          <div class="color-wrap" v-if="itemDetail.styleList">
            <div :class="{active: index===currentStyle}"
              class="color-btn"
              v-for="(item, index) in itemDetail.styleList"
              :key="index"
              @click="changeStyleColor(index)">
              <span class="color-bg"
               :style="{backgroundImage:'url('+item.colorImgUrl+')'}"></span><span class="color-name">{{item.colorDescr}}</span>
            </div>
          </div>
        </div>
        <div class="count-wrap">
          <span class="label">数量</span>
          <!-- 分抢购和普通 -->
          <template v-if="itemDetail.isPresale === 1">
                <el-input-number v-model="count" :key="currentStyle" :disabled="itemDetail.styleList[currentStyle].stock === 0"  :min="Math.min(1,itemDetail.styleList[currentStyle].stock)" :max="2" size="mini"></el-input-number>
                <span style="font-size:12px; color:#888">（每个ID限购2个）</span>
          </template>
          <!-- 切换样式时加个kye可以解决库存不一致的bug -->
          <el-input-number v-else v-model="count" :key="currentStyle" :disabled="itemDetail.styleList[currentStyle].stock === 0" :min="Math.min(1,itemDetail.styleList[currentStyle].stock)" :max="itemDetail.styleList[currentStyle].stock || Infinity" size="mini"></el-input-number>
        </div>
        <div class="btn-wrap">
          <template v-if="itemDetail.isPresale === 0">
            <el-button class="custom-bg" type="primary" @click="buyNow" :disabled="itemDetail.saleState === 0 || itemDetail.styleList[currentStyle].stock < 1">立即购买</el-button>
            <el-button plain class="addCart"  @click="addCart" :disabled="itemDetail.saleState === 0 || itemDetail.styleList[currentStyle].stock < 1">加入购物车</el-button>
          </template>
           <template v-else-if="itemDetail.isPresale === 1">
             <!-- 不售卖或者已过预售时间或者库存为0 -->
             <el-button class="custom-bg presale" type="primary" @click="presalesGoods" :disabled="itemDetail.saleState === 0 || itemDetail.styleList[currentStyle].stock < 1 || presaleEndTimestamp < nowTime"><span style="font-size:26px">￥{{itemDetail.presalePrice}} </span> 抢预售名额</el-button>
              <!-- <p class="finishTime">距抢购结束：
                <template v-if="presaleEndTimestamp < nowTime">
                  <span>抢购已结束</span>
                </template>
                <template v-else>
                  <svg-icon icon-class="shalou"></svg-icon>{{finishTime}}
                </template>
              </p> -->
           </template>
        </div>
      </div>
    </div>
    <img class="paramsImg" v-for="(item, index) in paramsImgs" :key="index" :src="item">
    <!-- <div class="paramsImg" v-for="(item, index) in paramsImgs" :key="index" :style="{backgroundImage:'url('+item+')'}"></div> -->
  </div>
</template>

<script>
import { fixed } from '@/filters/index';
import path from '@/api/api-path';
import { fetchPost } from '@/utils/fetch';
export default {
  data () {
    return {
      itemDetail: {}, // 所有数据
      currentStyle: 0, // 当前的款式
      paramsImgs: [], // 详情大图，整合了介绍和详情
      count: 1, // 当前购买数量
      styleNum: 0, // 当前展示的小图index
      distance: 0, // 滑动的距离
      nowTime: '', // 当前时间戳
      presaleEndTimestamp: '', // 抢购时结束时间戳
      time: '' // 定时器
    };
  },
  beforeRouteEnter (to, from, next) {
    fetchPost({
      url: path.GET_ITEM_DETAIL,
      data: {
        itemBaseId: to.params.id
      }
    }).then(res => {
      next(vm => {
        vm.itemDetail = res.data;
        vm.nowTime = res.times;
        vm.presaleEndTimestamp = res.data.presaleEndTimestamp;
        vm.paramsImgs = res.data.detailImgUrls.concat(res.data.paramsImgUrls);
        vm.countDown();
      });
    });
  },
  beforeRouteUpdate (to, from, next) {
    this.$fetchPost({
      url: this.$api.GET_ITEM_DETAIL,
      data: {
        itemBaseId: to.params.id
      }
    }).then(res => {
      this.itemDetail = res.data;
      this.nowTime = res.times;
      this.presaleEndTimestamp = res.data.presaleEndTimestamp;
      this.paramsImgs = res.data.detailImgUrls.concat(res.data.paramsImgUrls);
      this.countDown();
      next();
    });
  },
  created () {
    // this.$fetchPost({
    //   url: this.$api.GET_ITEM_DETAIL,
    //   data: {
    //     itemBaseId: this.$route.params.id
    //   }
    // }).then(res => {
    //   this.itemDetail = res.data;
    //   this.nowTime = res.times;
    //   this.presaleEndTimestamp = res.data.presaleEndTimestamp;
    //   this.paramsImgs = res.data.detailImgUrls.concat(res.data.paramsImgUrls);
    // });
  },
  beforeDestroy () {
    clearInterval(this.time);
  },
  computed: {
    finishTime() {
      // 这里正式线要去掉绝对值
      let second = Math.abs(this.presaleEndTimestamp - this.nowTime) / 1000;
      let minute = 0;
      let hour = 0;
      let day = 0;
      minute = parseInt(second / 60); // 算出一共有多少分钟
      second %= 60;// 算出有多少秒
      if (minute > 60) { // 如果分钟大于60，计算出小时和分钟
        hour = parseInt(minute / 60);
        minute %= 60;// 算出有多分钟
      }
      if (hour > 24) { // 如果小时大于24，计算出天和小时
        day = parseInt(hour / 24);
        hour %= 24;// 算出有多分钟
      }
      // day + '天' + hour + '小时' + minute + '分' + second + '秒';
      return day + '天' + hour + '小时' + minute + '分' + parseInt(second) + '秒';
    },
    // 当前展示的大图
    currentColorImgUrl() {
      return this.itemDetail.styleList[this.currentStyle].styleImgUrls[this.styleNum];
    },
    // 当前款式的图片
    currentStyleImgUrls() {
      return this.itemDetail.styleList[this.currentStyle].styleImgUrls;
    },
    // 当前款式的价格
    currentColorPrice() {
      return this.itemDetail.styleList[this.currentStyle].stylePrice;
    },
    // 总价
    totalPrice() {
      return fixed(this.count * this.currentColorPrice);
    },
    // 当前所选款式
    itemStyleId() {
      return this.itemDetail.styleList[this.currentStyle].itemStyleId;
    }
  },
  methods: {
    changeStyleColor(index) {
      this.currentStyle = index;
      this.styleNum = this.distance = 0;
    },
    buyNow() {
      this.$fetchPost({
        url: this.$api.DIRECT_ORDER,
        data: {
          itemStyleId: this.itemStyleId,
          num: this.count
        }
      }).then(res => {
        this.$store.commit('ADD_CURRENT_GOODS', res.data);
        this.$router.push({path: '/purchase'});
      }).catch(err => {
        console.log(err);
        if (err.code === 6 || err.code === 10) {
          this.$router.push({path: '/signin', query: {redirect: this.$route.path}});
        } else {
          this.$message.error(err.msg);
        }
      });
    },
    presalesGoods() {
      this.$fetchPost({
        url: this.$api.GET_PRESALE_CART_INFO,
        data: {
          itemStyleId: this.itemStyleId,
          num: this.count
        }
      }).then(res => {
        this.$store.commit('ADD_CURRENT_GOODS', res.data);
        this.$router.push({path: '/purchase'});
      }).catch(err => {
        console.log(err);
        if (err.code === 6 || err.code === 10) {
          this.$router.push({path: '/signin', query: {redirect: this.$route.path}});
        } else {
          this.$message.error(err.msg);
        }
      });
      // let arr = [
      //   {
      //     'itemStyleId': this.itemStyleId,
      //     'itemBaseId': 2,
      //     'itemName': this.itemDetail.itemName,
      //     'imgUrl': 'http://p6jij8et8.bkt.clouddn.com/color_blue.jpg',
      //     'colorDescr': this.itemDetail.styleList[this.currentStyle].colorDescr,
      //     'num': this.count,
      //     'singlePrice': this.itemDetail.styleList[this.currentStyle].stylePrice,
      //     'presalePrice': fixed(this.count * this.itemDetail.presalePrice),
      //     'subtotal': this.totalPrice - 0
      //   }
      // ];
      // this.$store.commit('ADD_CURRENT_GOODS', arr);
      // this.$router.push({path: '/purchase'});
    },
    addCart() {
      this.$fetchPost({
        url: this.$api.ADD_CARD,
        data: {
          itemStyleId: this.itemStyleId,
          num: this.count
        }
      }).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
      }).catch(err => {
        console.log(err);
        this.$router.push({path: '/signin', query: {redirect: this.$route.path}});
      });
    },
    toLeft() {
      // 向左滑动的条件就是总length长度 - distance > 408(包裹div的长度) 的值
      // const len = (this.currentStyleImgUrls.length - 1) * 102;
      // if (Math.abs(this.distance) < len && this.currentStyleImgUrls.length > 4) {
      //   this.distance = this.distance - 408;
      // }
      const len = this.currentStyleImgUrls.length * 102;
      if (len - Math.abs(this.distance) > 408) {
        this.distance = this.distance - 408;
      }
    },
    toRight() {
      // 向右滑动的条件就是 distance的距离为负值
      // const len = (this.currentStyleImgUrls.length - 1) * 102;
      // if (Math.abs(this.distance) >= len) {
      //   this.distance = this.distance + 408;
      // }
      if (this.distance < 0) {
        this.distance = this.distance + 408;
      }
    },
    countDown() {
      this.time = setInterval(() => {
        this.nowTime += 1000;
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/css/base.less';
.detail-wrap{
  background: #fff;
  .detail{
    width: 1200px;
    min-height: 580px;
    margin: 0 auto 50px;
    overflow: hidden;
  }
  .paramsImg{
    // max-width: 1400px;
    // height: 746px;
    // margin: 0 auto;
    // #bg-img;
    display: block;
    width: 1200px;
    margin: 0 auto;
  }
}
.detail-imgs{
  width: 510px;
  height: 584px;
  .big-img{
    height: 482px;
    #bg-img;
  }
  .to-left,.to-right{
    width: 40px;
    color: #bbb;
    height: 102px;
    line-height: 102px;
    cursor: pointer;
  }
  .to-right{
    text-align: right;
  }
  .small-img-wrap{
    position: relative;
    width:408px;
    height: 102px;
    overflow: hidden;
    .small-img{
      position: absolute;
      top: 0;
      transition: 0.3s;
      overflow: hidden;
    }
    span{
      width: 102px;
      height: 102px;
      box-sizing: border-box;
      cursor: pointer;
      #bg-img;
      &.active{
       border: 1px solid @hover-color;
      }
    }
  }
}
.detail-info{
  padding-left: 660px;
  .presale-price{
    margin-bottom: 30px;
    p{
      font-size: 26px;
      color: red;
      padding: 0 22px;
      line-height: 64px;
      background: #f8f8f8;
    }
    .finishTime{
      font-size: 16px;
      line-height: 38px;
      color: #fff;
      background: #ff8080;
    }
  }
  .title{
    font-size: 36px;
    line-height: 64px;
    padding-top: 95px;
    color: @font-color;
  }
  .desc{
    font-size: 16px;
    color: #666;
    line-height: 44px;
    margin-bottom: 40px;
  }
  .price{
    font-size: 48px;
    font-family: Arial, Helvetica, sans-serif;
    color: #ea1a1a;
    line-height: 72px;
    margin-bottom: 56px;
  }
  .label{
    font-size: 12px;
    line-height: 30px;
    color: #999;
    margin-right: 12px;
  }
  .style-color{
    margin-bottom: 11px;
    .color-wrap{
      display: inline-block;
      vertical-align: middle;
    }
    .color-btn{
      float: left;
      border: 1px solid #e6e6e6;
      margin-right: 24px;
      margin-bottom: 10px;
      box-sizing: border-box;
      cursor: pointer;
      &.active{
        border-color: @base-color;
      }
    }
    .color-bg{
      display: inline-block;
      width: 28px;
      height: 28px;
      vertical-align: middle;
      #bg-img;
    }
    .color-name{
      display: inline-block;
      min-width: 67px;
      padding: 0 10px;
      height: 28px;
      line-height: 28px;
      border-left: 1px solid #e6e6e6;
      text-align: center;
      vertical-align: middle;
    }
  }
  .count-wrap{
    margin-bottom: 28px;
  }
  .btn-wrap{
    .el-button{
      font-size: 16px;
      width: 192px;
      height: 50px;
      &.addCart{
        border-color: @base-color;
        color: @base-color;
      }
      &.presale{
        font-size: 24px;
        width: 315px;
      }
    }
    .finishTime{
      font-size: 12px;
      color:red;
      line-height: 32px;
    }
  }
}
</style>
