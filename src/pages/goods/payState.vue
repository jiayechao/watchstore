<template>
<div class="main-wrap">
  <div class="content">
    <div class="statusImg">
        <img v-if="payStatus === 1 || payStatus === 3" src="../../assets/images/pay-success.png">
        <img v-if="payStatus === 2" src="../../assets/images/pay-fail.png">
    </div>
    <p class="statusText">{{msgDesc}}</p>
    <div class="link-wrap">
      <el-button plain class="custom-height toOrderDetail" type="default" @click="toOrderDetail">查看订单</el-button>
      <el-button  class="custom-bg custom-height toGoods" type="primary" @click="toBuy">继续购物</el-button>
      <!-- <router-link class="fl toOrderDetail" :to="orderUrl">查看订单</router-link>
      <router-link class="fl toGoods" to="/"></router-link> -->
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
  },
  methods: {
    toOrderDetail() {
      const orderId = this.$route.query.queryOrderId || this.$route.query.orderId || '';
      const userId = this.$store.getters.userId;
      if (orderId) {
        this.$router.push({path: `/user/${userId}/order/${orderId}`});
      } else {
        this.$route.push({path: '/'});
      }
    },
    toBuy() {
      this.$router.push({path: '/'});
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
      margin: 94px auto 12px;
      p{
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
      }
    }
    .statusText{
      font-size: 26px;
      line-height: 40px;
      text-align: center;
    }
    .link-wrap{
     text-align: center;
      margin: 68px auto 0;
      line-height: 1;
      .toOrderDetail{
         color: @font-color;
      }
    }
 }
</style>
