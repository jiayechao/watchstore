<template>
<div class="service-status-wrap">
   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/user/'+$route.params.userId+'/order_list' }">订单列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user/'+$route.params.userId+'/order/'+$route.params.orderId }">查看订单</el-breadcrumb-item>
      <el-breadcrumb-item>申请售后</el-breadcrumb-item>
    </el-breadcrumb>
  <!-- <span v-if="statusDetail.applyState === 1">（{{statusDetail.createTimestamp | moments}}）</span> <span v-else>（{{statusDetail.applyState | moments}}）</span>  -->
  <p class="title" v-if="statusDetail.applyState">
    <img :src="require('../../../../assets/images/state'+statusDetail.applyState+'.png')" alt=""><span>{{statusDetail.applyState | toText}}</span></p>
  <!-- <p class="note"><svg-icon icon-class="info" />感谢您使用本次服务！</p> -->
  <el-button plain v-if="statusDetail.applyState === 88" @click="applyAgain">再次申请售后</el-button>
  <div class="info-wrap">
      <div class="address panel">
        <p class="title"><i class="el-icon el-icon-location-outline"></i>回寄地址信息</p>
        <div class="address-wrap panel-wrap">
            <p class="receiver"><span class="fl">收货人：</span>{{statusDetail.returnReceiver}}</p>
            <p class="phone"><span class="fl"> 手机号码：</span>{{statusDetail.returnPhone}}</p>
            <div class="address-info moreText"><span class="fl"> 地址：</span><p class="text">{{statusDetail.returnAddress}}</p></div>
            <!-- {{detailData.city}}{{detailData.area}}{{detailData.addressDetail}} -->
        </div>
      </div>
      <div class="goods panel">
        <p class="title"><svg-icon icon-class="xianghujiaohuan" />退货信息</p>
        <div class="goods-wrap panel-wrap">
            <div class="name moreText"><span class="fl">产品：</span><p>{{statusDetail.productInfo}}</p></div>
            <div class="color moreText"><span class="fl"> 颜色：</span><p>{{statusDetail.styleDescr}}</p></div>
            <div class="price moreText"><span class="fl">价格：</span><p>￥{{statusDetail.totalAmount}}</p></div>
            <div class="num moreText"><span class="fl">数量：</span><p>{{statusDetail.totalNum}}个</p></div>
          <!-- <div class="" v-for="(item, index) in statusDetail.itemList" :key="index">
            <div class="img fl" :style="{backgroundImage: 'url(' +item.imgUrl + ')'}"></div>
            <p class="name">{{item.itemName}}</p>
          </div> -->
        </div>
      </div>
      <div class="aftersale panel">
        <p class="title"><svg-icon icon-class="info" />售后消息</p>
        <div class="aftersale-wrap panel-wrap">
          <p class="afterSalesNo"><span class="fl"> 售后编号：</span>{{statusDetail.afterSalesNo}}</p>
          <p class="applyTimestamp"><span class="fl"> 申请时间：</span>{{statusDetail.applyTimestamp | moments}}</p>
          <p class="totalAmount"><span class="fl"> 申请退款金额：</span>￥{{statusDetail.totalAmount}}</p>
          <p class="totalNum"><span class="fl"> 申请退货数量：</span>{{statusDetail.totalNum}}个</p>
            <p class="dealTimestamp" v-if="statusDetail.applyState!==1"><span class="fl"> 完成时间：</span>{{statusDetail.dealTimestamp | moments}}</p>
            <p class="realAmount" v-if="statusDetail.applyState!==1"><span class="fl"> 实际退款金额：</span><span style="color:red">￥{{statusDetail.realAmount}}</span> </p>
            <p class="realNum" v-if="statusDetail.applyState!==1"><span class="fl"> 实际退款金额：</span><span style="color:red">{{statusDetail.realNum}}个</span></p>
        </div>
      </div>
  </div>
  <!-- <el-button plain class="custom-height fr"  @click="toOrderList"><svg-icon icon-class="fanhui" />返回订单</el-button> -->
</div>
</template>
<script>
export default {
  data() {
    return {
      statusDetail: {},
      imgs: [require('../../../../assets/images/state1.png')]
    };
  },
  filters: {
    toText(val) {
      switch (val) {
        case 1:
          return '处理中……';
        case 2:
          return '售后服务已完成';
        case 88:
          return '售后申请已失败';
      }
    }
  },
  created() {
    this.$fetchPost({
      url: this.$api.GET_AFTER_SALES_INFO,
      data: {
        orderId: this.$route.params.orderId
      }
    }).then(res => {
      this.statusDetail = res.data;
      if (res.data.applyState === 0) {
        const userId = this.$store.getters.userId;
        const orderId = this.$route.params.orderId;
        this.$router.replace({path: `/user/${userId}/order/${orderId}`});
      }
    });
  },
  methods: {
    toOrderList() {
      const userId = this.$store.getters.userId;
      const orderId = this.$route.params.orderId;
      this.$router.push({path: `/user/${userId}/order/${orderId}`});
    },
    applyAgain() {
      const userId = this.$store.getters.userId;
      const orderId = this.$route.params.orderId;
      this.$router.push({path: `/user/${userId}/service/${orderId}`});
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../../assets/css/base.less";
.service-status-wrap{
  &>.title{
    line-height: 50px;
    color: #666;
    font-size: 16px;
    background: #f2f2f2;
    margin-bottom: 10px;
    img{
      vertical-align: middle;
      margin: 0 10px;
    }
    span{
      font-size: 12px;
      color: #888;
    }
  }
  .note{
    font-size: 12px;
    color: #666;
  }
  .info-wrap{
    display: table;
  padding-top: 28px;
  padding-bottom: 46px;
  overflow: hidden;
  .panel{
    display: table-cell;
    width: 256px;
    padding-left: 10px;
    .title{
      margin-bottom: 14px;
    }
    &:first-child{
      padding-left: 0px;
    }
    &:nth-child(2){
      border-right: 1px solid #eaeaea;
      border-left: 1px solid #eaeaea;
    }
    .panel-wrap{
      padding-left: 23px;
       .fl{
          width: 60px;
        }
      & > p{
        font-size: 12px;
        line-height: 24px;
      }
      .moreText{
        font-size: 12px;
        line-height: 24px;
        &.phone p{
          padding-left: 70px;
        }
        &.address-info p{
          padding-left: 60px;
        }
      }
    }
    .goods-wrap{
      padding-left: 0;
      overflow: hidden;
      // .img{
      //   width: 77px;
      //   height: 92px;
      //   #bg-img;
      // }
      // .name{
      //   padding-left: 90px;
      //   line-height: 92px;
      // }
      .fl{
        width: 42px;
      }
      p{
        padding-left: 42px;
      }
    }
    .aftersale-wrap{
      .fl{
        width: 84px;
      }
    }
  }
}
.el-breadcrumb{
  margin-bottom: 30px;
}
}
</style>
