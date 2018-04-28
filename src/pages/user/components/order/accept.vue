<template>
<div class="service-status-wrap">
  <p class="title">{{statusDetail.applyState | toText}}<span v-if="statusDetail.applyState === 1">（{{statusDetail.createTimestamp | moments}}）</span> <span v-else>（{{statusDetail.applyState | moments}}）</span> </p>
  <p class="note"><svg-icon icon-class="info" />感谢您使用本次服务！</p>
  <div class="info-wrap">
      <div class="fl address panel">
        <p class="title"><i class="el-icon el-icon-location-outline"></i>回寄地址信息</p>
        <div class="address-wrap panel-wrap">
            <p class="receiver">收货人：{{statusDetail.returnReceiver}}</p>
            <p class="phone">手机号码：{{statusDetail.returnPhone}}</p>
            <p class="address-info">地址：{{statusDetail.returnAddress}}</p>
            <!-- {{detailData.city}}{{detailData.area}}{{detailData.addressDetail}} -->
        </div>
      </div>
      <div class="fl goods panel">
        <p class="title"><svg-icon icon-class="xianghujiaohuan" />退货信息</p>
        <div class="goods-wrap panel-wrap">
          <div class="" v-for="(item, index) in statusDetail.itemList" :key="index">
            <div class="img fl" :style="{backgroundImage: 'url(' +item.imgUrl + ')'}"></div>
            <p class="name">{{item.itemName}}</p>
          </div>
        </div>
      </div>
      <div class="fl address panel">
        <p class="title"><svg-icon icon-class="info" />退货原因：{{statusDetail.reasonDescr}}</p>
        <div class="address-wrap panel-wrap">
            <p class="num">换货数量：{{statusDetail.num}}</p>
            <p class="time">申请时间：{{statusDetail.createTimestamp | moments}}</p>
        </div>
      </div>
  </div>
  <el-button plain class="custom-height fr"  @click="toOrderList"><svg-icon icon-class="fanhui" />返回订单</el-button>
</div>
</template>
<script>
export default {
  data() {
    return {
      statusDetail: {}
    };
  },
  filters: {
    toText(val) {
      switch (val) {
        case 1:
          return '申请中';
        case 2:
          return '已成功受理';
        case 88:
          return '拒绝申请';
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
    });
  },
  methods: {
    toOrderList() {
      const userId = this.$store.getters.userId;
      const orderId = this.$route.params.orderId;
      this.$router.push({path: `/user/${userId}/order/${orderId}`});
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
    padding-left: 80px;
    background-image: url(../../../../assets/images/cg.png);
    background-position: 28px center;
    background-repeat: no-repeat;
    background-size: 30px;
    margin-bottom: 10px;
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
  padding-top: 28px;
  padding-bottom: 46px;
  overflow: hidden;
  .panel{
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
      p{
        font-size: 12px;
        line-height: 24px;
      }
    }
    .goods-wrap{
      padding-left: 0;
      overflow: hidden;
      .img{
        width: 77px;
        height: 92px;
        #bg-img;
      }
      .name{
        padding-left: 90px;
        line-height: 92px;
      }
    }
  }
}
}
</style>
