<template>
  <div class="main-wrap">
    <div class="panel order-list">
      <p class="title">
        <img src="../../assets/images/order-success.png" alt="">
        <span v-if="stateCode === 10">订单提交成功，请尽快付款！</span>
        <span v-else>{{stateDesc}}</span>
          订单号：{{orderDetail.orderNo}}
        </p>
    </div>
    <div class="panel pay-list" v-if="orderDetail.orderState === 0 || orderDetail.orderState === 7">
      <p class="title">网上支付</p>
      <el-tabs type="card">
        <p class="pay-price">应付款金额：￥<span v-if="orderDetail.orderState === 0 && orderDetail.isPresale === 0">{{orderDetail.totalAmount}}</span>
        <span v-if="orderDetail.orderState === 0 && orderDetail.isPresale === 1">{{orderDetail.presaleAmount}}</span>
        <span v-if="orderDetail.orderState === 7">{{orderDetail.restAmount}}</span></p>
        <el-tab-pane>
          <span slot="label"><img src="../../assets/images/wxPay.png" style="vertical-align:middle"> 微信支付</span>
          <qrcode v-if="wxUrl" :value="wxUrl" :options="{ size: 175 }"></qrcode>
        </el-tab-pane>
        <el-tab-pane label="配置管理">
          <span slot="label"><img src="../../assets/images/aliPay.png" style="vertical-align:middle"> 支付宝</span>
          <el-button type="primary" class="zfb custom-bg" @click="toPay">立即使用支付宝支付</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-html="form"></div>
  </div>
</template>

<script>
import Qrcode from '@xkeshi/vue-qrcode';
export default {
  data() {
    return {
      orderDetail: {},
      wxUrl: '',
      isSubOrder: '',
      form: '',
      stateCode: '',
      stateDesc: '',
      orderId: '',
      time: ''
    };
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.$fetchPost({
      url: this.$api.GET_ORDER_DETAIL,
      data: {
        orderId: this.orderId
      }
    }).then(res => {
      this.orderDetail = res.data;
      this.isSubOrder = res.data.orderState === 7 ? 1 : 0;
      const currentState = res.data.flowList.filter(item => {
        return item.isShow === 1;
      });
      this.stateCode = currentState[currentState.length - 1].flowId;
      this.stateDesc = currentState[currentState.length - 1].flowDescr;
      if (res.data.orderState === 0 || res.data.orderState === 7) {
        this.checkWxPay();
        this.$fetchPost({
          url: this.$api.GET_PC_WX_PAY,
          data: {
            orderId: this.orderId,
            isSubOrder: this.isSubOrder
          }
        }).then(res => {
          this.wxUrl = res.data.wxQrCodeUrl;
        });
      }
    });
  },
  beforeDestroy () {
    clearInterval(this.time);
  },
  components: {
    qrcode: Qrcode
  },
  methods: {
    // 轮询微信支付状态
    checkWxPay() {
      if (this.$route.path.indexOf('pay/')) {
        this.time = setInterval(() => {
          console.log(this.orderId);
          this.$fetchPost({
            url: this.$api.QUERY_PAY_STATUS,
            data: {
              orderId: this.orderId,
              isSubOrder: this.isSubOrder,
              payType: 1
            }
          }).then(res => {
            if (res.data.payStatus) {
              this.$router.push({path: '/pay_state', query: { payType: 1, orderId: this.orderId, isSubOrder: this.isSubOrder }});
            }
          }).catch(err => {
            console.log(err);
            clearInterval(this.time);
          });
        }, 1000);
      }
    },
    toPay() {
      this.$fetchPost({
        url: this.$api.LINK2_PC_ALIPAY,
        responseType: 'text',
        data: {
          orderId: this.$route.params.orderId,
          isSubOrder: this.isSubOrder,
          returnUrl: 'http://watch.canplay.com.cn/watch-pc/pay_state'
        }
      }).then(res => {
        this.form = res;
        // 下个周期调取
        console.log('this.form', this.form);
        this.$nextTick(function() {
          document.forms[0].submit();
        });
      }).catch(err => {
        console.log('err', err);
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .main-wrap{
    width: 1200px;
    padding-top: 20px;
    padding-bottom: 56px;
    background: #edeff2;
    margin: 0 auto;
    .panel{
      margin-bottom: 10px;
      padding: 30px 50px;
      background: #fff;
      box-shadow: 0 0 10px  0 #ccc;
    }
    .order-list{
       padding: 20px 50px;
      .title{
        line-height: 1;
        img{
          vertical-align: middle;
        }
      }
      .message{
        line-height: 43px;
        text-align: center;
        padding-bottom: 48px;
        img{
          vertical-align: middle;
        }
      }
    }
    .pay-list{
      .title{
        line-height: 1;
        font-size: 16px;
        margin-bottom: 28px;
      }
      .pay-price{
        padding-top: 18px;
        line-height: 48px;
        font-size: 16px;
        text-align: center;
        span{
          color: #ff0000;
        }
      }
      #pane-1,  #pane-0{
        text-align: center;
      }
      .zfb{
        width: 372px;
        height: 55px;
      }
    }
  }
</style>
