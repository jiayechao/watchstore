<template>
  <div class="detail-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/user/'+$route.params.userId+'/order_list' }">订单列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="detailData.orderState === 0">立即付款</el-breadcrumb-item>
      <el-breadcrumb-item v-else-if="detailData.orderState === 7">付尾款</el-breadcrumb-item>
      <el-breadcrumb-item v-else>查看订单</el-breadcrumb-item>
    </el-breadcrumb>
    <p class="title"><i class="el-icon el-icon-tickets"></i>订单号：{{detailData.orderNo}}</p>
    <div class="step-wrap">
      <div class="step-item fl" :class="{achieve: item.isShow}"  v-for="(item, index) in detailData.flowList" :key="index">
          <div class="step-icon">
            <!--
               case 10:return 'tijiaochenggong';case 20: return 'yifukuan';case 21: return 'nopayment';
              case 28:return 'yifukuan';case 30: return 'shangchuan'; case 38:return 'yunshupeisong';case 48: return 'shouhuo';
             -->
              <svg-icon v-if="item.flowId === 10"  icon-class="tijiaochenggong" />
              <svg-icon v-if="item.flowId === 20"  icon-class="yifukuan" />
              <svg-icon v-if="item.flowId === 21"  icon-class="nopayment" />
              <svg-icon v-if="item.flowId === 28"  icon-class="yifukuan" />
              <svg-icon v-if="item.flowId === 30"  icon-class="shangchuan" />
              <svg-icon v-if="item.flowId === 38"  icon-class="yunshupeisong" />
              <svg-icon v-if="item.flowId === 48"  icon-class="shouhuo" />
            </div>
          <p class="step-desc">{{item.flowDescr}}</p>
          <p class="step-time">{{item.flowTimestamp | moments}}</p>
      </div>
    </div>
    <div class="info-wrap">
      <div class="address panel">
        <p class="title"><svg-icon icon-class="my" />收货人信息</p>
        <div class="address-wrap panel-wrap">
            <p class="receiver"><span class="fl">收货人：</span>{{detailData.receiver}}</p>
            <p class="phone"><span class="fl">手机号码：</span>{{detailData.phone}}</p>
            <div class="address-info moreText" ><span class="fl">地址：</span><p class="text">{{detailData.province}}{{detailData.city}}{{detailData.area}}{{detailData.addressDetail}}</p></div>
        </div>
      </div>
       <div class="pay panel">
        <p class="title"><svg-icon icon-class="refund" />付款信息</p>
        <div class="pay-wrap panel-wrap" :class="{'lang':detailData.orderState === 7}">
            <p class="type"><span class="fl">付款方式：</span>在线支付</p>
             <p class="total"><span class="fl">商品总额：</span>{{detailData.totalAmount}}</p>
            <template v-if="detailData.orderState === 7">
              <p class="presaleAmount"><span class="fl">已付定金：</span>{{detailData.presaleAmount}}</p>
              <p class="restAmount"><span class="fl">代付尾款金额：</span><span style="color:red">{{detailData.restAmount}}</span></p>
            </template>
            <template v-else>
                <p class="pay"><span class="fl">支付金额：</span><span v-if="detailData.orderState !== 0 && detailData.orderState !== 6">{{detailData.totalAmount}}</span><span v-else>未支付</span></p>
                <p class="pay-time" v-if="detailData.payTimestamp !== 0"><span class="fl">支付时间：</span>{{detailData.payTimestamp | moments}}</p>
            </template>
        </div>
      </div>
      <div class="invoice panel">
        <p class="title"><i class="el-icon el-icon-tickets"></i>发票信息</p>
        <div class="invoice-wrap panel-wrap" :class="{'lang':detailData.invoiceType === 2}">
            <p class="invoiceType"><span class="fl">发票类型：</span>{{detailData.invoiceType | toInvoiceText}}</p>
            <template v-if="detailData.invoiceType === 2">
              <div class="phone moreText" ><span class="fl">发票抬头：</span><p class="text">{{detailData.title}}</p></div>
              <p class="phone" ><span class="fl">发票内容：</span>商品明细</p>
              <p class="address-info"><span class="fl">纳税人税号：</span>{{detailData.taxNumber}}</p>
            </template>
        </div>
      </div>
    </div>
    <el-table
          empty-text="没有购买，快去购物吧~"
          :data="detailData.itemList"
          :border="true"
          style="width: 100%"
          :span-method="objectSpanMethod">
            <el-table-column
              label="商品"
              class-name="detail-cell"
              header-align="center"
              width="254">
              <template slot-scope="scope">
                  <div class="img fl" :style="{backgroundImage: 'url(' +scope.row.imgUrl + ')'}"></div>
                    <p class="name">{{scope.row.itemName}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="颜色"
              width="126"
              prop="colorDescr"
              align="center">
            </el-table-column>
            <el-table-column
              label="价格"
              width="126"
              align="center">
              <template slot-scope="scope">
                <span>￥{{scope.row.subtotal}}</span>
              </template>
            </el-table-column>
              <el-table-column
              label="数量"
              width="126"
              prop="num"
              align="center">
            </el-table-column>
            <!-- 根据orderState属性来添加不同的按钮 -->
            <!-- 订单状态 ： 0-未支付 1-已支付 2-配送中 3-完成 4-退款中 5-已退款 6-已取消 7-待付尾款 -->
            <!--
              1、待付款（orderState=0）： 立即付款、取消订单；
              2、待付尾款（orderState=7）：付尾款；
              3、待发货（orderState=1）：售后入口；
              4、待收货（orderState=2）：查看物流 售后入口；
              5、已完成（orderState=3）：查看物流 售后入口；
              6、已取消（orderState=6）：无；
             -->
            <el-table-column
              label="操作"
              class-name="handle-cell"
              align="center">
              <template slot-scope="scope">
                  <el-button type="primary" class="custom-bg" v-if="detailData.orderState === 0" @click="toPay(detailData.orderId)">立即付款</el-button>
                  <el-button type="primary" class="custom-bg" v-if="detailData.orderState === 7" @click="toPay(detailData.orderId)">付尾款</el-button>
                   <el-button plain v-if="detailData.orderState === 0" @click="cancelOrder(detailData.orderId)">取消订单</el-button>
                  <!-- <span v-if="detailData.orderState === 6">已取消</span> -->
                  <!-- <span v-if="detailData.orderState === 1">售后</span> -->
                  <!-- <el-button plain v-if="detailData.orderState === 2" @click="sureRecieve(detailData.orderId)">确认收货</el-button> -->
                  <el-button plain v-if="detailData.orderState > 0 && detailData.orderState < 4" @click="toService(detailData.orderId, detailData.afterSaleApplyState)">售后</el-button>
                  <!-- <el-button plain v-if="detailData.orderState === 4" @click="toServiceStatus(detailData.orderId)">查看售后</el-button> -->
                  <el-button plain v-if="detailData.orderState === 2 || detailData.orderState === 3" @click="checkLogistics(detailData.orderId)">查看物流</el-button>
              </template>
            </el-table-column>
        </el-table>
        <!-- <el-button plain class="custom-height fr"  @click="toOrderList"><svg-icon icon-class="fanhui" />返回订单列表</el-button> -->
        <!-- 物流查看 -->
    <el-dialog   custom-class="loginstics-dialog hasCancel" width="508px" :visible.sync="logisticsDialogVisible">
      <span slot="title"><i class="el-icon el-icon-view"></i>查看物流信息</span>
        <el-logistics :logisticsData="logisticsData"></el-logistics>
         <div slot="footer" class="dialog-footer">
        <el-button class="custom-bg custom-height" type="primary" @click="logisticsDialogVisible = false">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import logistics from '@/components/logistics';
export default {
  data() {
    return {
      logisticsDialogVisible: false,
      detailData: {},
      logisticsData: {}
    };
  },
  created() {
    this.getDetail();
  },
  computed: {
    // 10-提交订单 20-已付预付款 21-待付尾款 28-已付款 30-待发货 38-已发货 48-已收货
    svgClass(id) {
      switch (id) {
        case 10:
          return 'tijiaochenggong';
        case 20:
          return 'yifukuan';
        case 21:
          return 'nopayment';
        case 28:
          return 'yifukuan';
        case 30:
          return 'shangchuan';
        case 38:
          return 'yunshupeisong';
        case 48:
          return 'shouhuo';
      }
    }
  },
  filters: {
    toInvoiceText(val) {
      switch (val) {
        case 0:
          return '不开发票';
        case 1:
          return '个人';
        case 2:
          return '单位';
        case 3:
          return '增值税专票';
      }
    }
  },
  methods: {
    getDetail() {
      this.$fetchPost({
        url: this.$api.GET_ORDER_DETAIL,
        data: {
          orderId: this.$route.params.orderId
        }
      }).then(res => {
        this.detailData = res.data;
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4) {
        return {
          rowspan: this.detailData.itemList.length,
          colspan: 1
        };
      }
    },
    checkLogistics(id) {
      if (this.logisticsData.nu) {
        this.logisticsDialogVisible = true;
        return;
      }
      this.$fetchPost({
        url: this.$api.QUERY_DISPACH_INFO,
        data: {
          orderId: id
        }
      }).then(res => {
        this.logisticsData = res.data;
        this.logisticsDialogVisible = true;
      });
    },
    toPay(id) {
      this.$router.push({path: `/pay/${id}`});
    },
    toService(id, state) {
      const userId = this.$store.getters.userId;
      console.log(state);
      if (state === 0) {
        this.$router.push({path: `/user/${userId}/service/${id}`});
      } else {
        this.$router.push({path: `/user/${userId}/service_status/${id}`});
      }
    },
    toOrderList() {
      const userId = this.$store.getters.userId;
      this.$router.push({path: `/user/${userId}/order_list`});
    },
    toServiceStatus(id) {
      const userId = this.$store.getters.userId;
      this.$router.push({path: `/user/${userId}/service_status/${id}`});
    },
    cancelOrder(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$fetchPost({
          url: this.$api.CANCEL_ORDER,
          data: {
            orderId: id
          }
        }).then(res => {
          this.getDetail();
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    sureRecieve(id) {
      this.$confirm('此操作将确认收货, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$fetchPost({
          url: this.$api.FINISH_ORDERFINISH_ORDER,
          data: {
            orderId: id
          }
        }).then(res => {
          this.getDetail();
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消确认'
        // });
      });
    }
  },
  components: {
    'el-logistics': logistics
  }
};
</script>

<style lang="less" scoped>
@import "../../../../assets/css/base.less";
.step-wrap{
  padding-left: 90px;
  padding-bottom: 48px;
  margin-top: 38px;
  border-bottom: 1px solid #eaeaea;
  overflow: hidden;
  .step-item{
    width: 140px;
    font-size: 16px;
    svg{
          margin-right: 0;
    }
    &:last-of-type :after{
            display: none;
    }
    &.achieve{
      .step-icon{
        border-color: #34b035;
         svg{
              fill: #34b035!important;
          }
        &:after{
          background: url(../../../../assets/images/jiant1.png);
        }
      }
      .step-desc{
        color:  @font-color;
      }
      .step-time{
        color: #666;
      }
    }
    .step-icon{
        position: relative;
        width: 32px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #888;
        border-radius: 50%;
        text-align: center;
        &:after{
          position:absolute;
          content: "";
          width: 91px;
          height: 7px;
          top: 12px;
          left: 40px;
          background: url(../../../../assets/images/jiant2.png);
        }
      }
      .step-desc{
        color: #888;
        line-height: 34px;
      }
      .step-time{
        width: 70px;
        color: #888;
        font-size: 12px;
        line-height: 14px;
      }
  }
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
      &.pay-wrap.lang{
        .fl{
          width: 84px;
        }
      }
      &.invoice-wrap.lang{
        .fl{
          width: 72px;
        }
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
  }
}
.el-table{
  margin-bottom: 42px;
  .detail-cell{
    .img{
        width: 77px;
        height: 92px;
        #bg-img;
      }
      .name{
         display: table-cell;
        line-height: 1.5;
         height: 94px;
        vertical-align: middle;
      }

  }
  .handle-cell{
    .el-button{
        width: 103px;
        padding: 8px 20px;
        margin: 5px 0 10px;
      }
  }
}
.el-breadcrumb__item{
  margin-bottom: 35px;
}
</style>
