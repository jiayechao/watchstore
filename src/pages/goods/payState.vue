<template>
<div class="main-wrap">
  <div class="content">
    <div class="statusImg">
        <img v-if="payStatus === 1 || payStatus === 3" src="../../assets/images/cg.png">
        <img v-if="payStatus === 2" src="../../assets/images/failed.png">
    </div>
    <p class="statusText">{{msgDesc}}</p>
    <div class="link-wrap">
      <router-link class="fl toGoods" to="/"><i class="el-icon el-icon-d-arrow-left"></i>继续购物</router-link>
      <router-link class="fl toOrderDetail" :to="orderUrl">查看订单</router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      payStatus: '',
      msgDesc: ''
    };
  },
  created() {
    console.log(this.$route.query.queryOrderId || this.$route.query.orderId);
    this.$fetchPost({
      url: this.$api.QUERY_PAY_STATUS,
      data: {
        orderId: this.$route.query.queryOrderId || this.$route.query.orderId,
        isSubOrder: this.$route.query.isSubOrder,
        payType: this.$route.query.payType || 2
      }
    }).then(res => {
      console.log(res);
      this.payStatus = res.data.payStatus;
      this.msgDesc = res.data.msgDesc || '订单支付成功!';
    });
  },
  computed: {
    orderUrl() {
      const orderId = this.$route.query.queryOrderId || this.$route.query.orderId || '';
      return orderId ? '/user/' + this.$store.getters.userId + '/order/' + orderId : '/';
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../assets/css/base.less';
 .main-wrap{
    width: 1200px;
    padding-top: 20px;
    padding-bottom: 56px;
    background: #edeff2;
    margin: 0 auto;
    .content{
      height: 470px;;
      margin-bottom: 10px;
      padding: 50px 0px;
      background: #fff;
      box-sizing: border-box;
      box-shadow: 0 0 10px  0 #ccc;
    }
    .statusImg{
      display: block;
      text-align: center;
      height: 60px;
      margin: 0 auto 12px;
      p{
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
      }
    }
    .statusText{
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      font-weight: bold
    }
    .link-wrap{
      width: 190px;
      margin: 68px auto 0;
      line-height: 1;
      .toGoods{
        float: left;
        color: #888;
      }
      .toOrderDetail{
         float: right;
         color: @font-color;
         text-decoration: underline;
      }
    }
 }
</style>
