<template>
  <div class="main-wrap">
    <div class="banner">
      <el-carousel height="615px" arrow="never" :interval="100000">
        <el-carousel-item v-for="(item, index) in bannerImgs" :key="index" :style="{backgroundImage: 'url(' + item.imgUrl + ')'}">
          <router-link v-if="item.linkType !==3" style="display: block;height: 615px" :to="'/goods/'+item.itemBaseId">
          <a v-if="item.linkType ===3" :href="item.linkAddress" style="display: block;height: 615px"></a>
          </router-link>
        </el-carousel-item>
      </el-carousel>
  </div>
  <div class="recommend">
    <div class="recommend-goods" v-for="(item, index) in recommendList" :key="index">
      <router-link class="goods-img fl"  :style="{backgroundImage: 'url(' + item.imgUrl + ')'}" :to="'/goods/'+item.itemBaseId"></router-link>
      <div class="goods-info">
        <p class="title">{{item.itemName}}</p>
        <p class="descr">{{item.itemDescr}}</p>
        <p class="price">￥{{item.basePrice}}</p>
        <el-button class="custom-bg" type="primary" @click="toGoodsDetail(item.itemBaseId)">现在购买</el-button>
      </div>
    </div>
  </div>
  <div class="goods-list">
    <p class="title">商品列表</p>
    <div class="list-wrap">
      <router-link v-for="(item, index) in goodsList" :key="index" class="goods-item fl"  :to="'/goods/'+item.itemBaseId">
        <div class="goods-img" :style="{backgroundImage: 'url(' + item.baseImgUrl + ')'}"></div>
        <p class="title">{{item.itemName}}</p>
        <p class="price">￥{{item.basePrice}}</p>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      bannerImgs: [],
      recommendList: [],
      goodsList: []
    };
  },

  created() {
    // 获取banner
    this.$fetchPost({
      url: this.$api.GET_BANNER_LIST
    }).then(res => {
      this.bannerImgs = res.data;
    });
    // 获取推荐列表
    this.$fetchPost({
      url: this.$api.GET_INDEX_RECOMMEND
    }).then(res => {
      this.recommendList = res.data;
    });
    // 获取商品列表
    this.$fetchPost({
      url: this.$api.GET_ITEM_LIST,
      data: {
        page: 1,
        pageSize: 100
      }
    }).then(res => {
      console.log(res);
      this.goodsList = res.data.itemList;
    });
  },
  methods: {
    toGoodsDetail(id) {
      this.$router.push({path: '/goods/' + id});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/css/base.less';
.main-wrap{
  background: #f4f4f4;
}
.el-carousel{
  overflow: hidden;
}
.el-carousel__item{
  #bg-img
}
.recommend{
  width: 1200px;
  margin: 0 auto;
  .recommend-goods{
    background: #fff;
    border: 1px solid #e0e0e0;
    margin-top: 20px;
    overflow: hidden;
    &:hover{
      box-shadow: 0 0 10px 0 #ccc;
    }
    .goods-img{
      width: 770px;
       height: 340px;
      background-color: #eee;
      &:extend(.el-carousel__item);
    }
    .goods-info{
      padding-left: 820px;
      .title{
        font-size: 28px;
        line-height: 50px;
        padding-top: 64px;
        color: @font-color;
      }
      .descr{
        line-height: 40px;
        color: #666;
        margin-bottom: 36px;
      }
      .price{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 40px;
        line-height: 1;
        margin-bottom: 18px;
      }
      .el-button{
        width: 215px;
      }
    }
  }
}
.goods-list{
   width: 1200px;
    margin: 0 auto;
    padding-bottom: 30px;
  &>.title{
    font-size: 20px;
    color: #666;
    line-height: 40px;
    margin-top: 64px;
    text-align: center;
    margin-bottom: 27px;
  }
  .list-wrap{
    overflow: hidden;
  }
  .goods-item{
    width: 380px;
    height: 420px;
    margin-right: 30px;
    margin-bottom: 30px;
    background: #fff;
    &:nth-of-type(3n+3){
      margin-right: 0;
    }
    &:hover{
      box-shadow: 0 0 10px 0 #ccc;
    }
      .goods-img{
        height: 300px;
        &:extend(.el-carousel__item);
      }
      .title{
        font-size: 20px;
        color: @font-color;
        line-height: 40px;
        text-align: center;
        margin-top: 14px;
      }
      .price{
        color: #fd600b;
        font-size: 20px;
        line-height: 40px;
        text-align: center;
      }
  }
}
</style>
