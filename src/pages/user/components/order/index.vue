<template>
  <div v-if="orderList.length" class="order_list-wrap">
    <p class="table-list-title">
      <span class="order-detail fl">订单详情</span>
      <span class="sum-price fl">金额</span>
      <span class="receive fl">收货人</span>
      <span class="status fl">状态</span>
      <span class="handle fl">操作</span>
    </p>
    <div class="table-list-wrap">
      <div class="table-list" v-for="(item, index) in orderList" :key="index">
          <p class="title"><i class="el-icon el-icon-document"></i>订单号：{{item.orderNo}} <span>下单时间：{{item.createTimestamp | moments}}</span></p>
          <el-table
              empty-text="没有购买，快去购物吧~"
              :data="[orderList[index]]"
              :border="true"
              style="width: 100%">
                <el-table-column
                  label="详情"
                  class-name="detail-cell"
                  width="254">
                  <template slot-scope="scope">
                    <div class="detail-item" v-for="(item, index) in scope.row.itemList" :key="index">
                      <div class="img fl" :style="{backgroundImage: 'url(' +item.imgUrl + ')'}"></div>
                      <div class="info">
                        <p class="name">{{item.itemName}}</p>
                        <p class="style-wrap"><span class="style">{{item.colorDescr}}</span><span class="price">￥{{item.singlePrice}}</span> × <span class="num">{{item.num}}</span></p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <!-- 根据orderState属性7来判断付尾款的项 -->
                <el-table-column
                  label="金额"
                  width="164"
                  align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.orderState !== 7" style="color:red">￥{{scope.row.totalAmount}}</span>
                    <div v-else>
                      <p>应付款：￥{{scope.row.totalAmount}}</p>
                      <p>已付定金：￥{{scope.row.presaleAmount}}</p>
                      <p>待付尾款：<span style="color:red">￥{{scope.row.restAmount}}</span></p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="收货人"
                  width="126"
                  prop="receiver"
                  align="center">
                </el-table-column>
                <!-- 根据orderState属性来判断不同状态 -->
                <el-table-column
                  label="状态"
                  width="120"
                  align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.orderState | toStatusText}}</span>
                  </template>
                </el-table-column>
                <!-- 根据orderState属性来添加不同的按钮 -->
                <!--
                  1、待付款（orderState=0）： 立即付款、取消订单、查看订单；
                  2、待付尾款（orderState=7）：付尾款、查看订单；
                  3、待发货（orderState=1）：查看订单；
                  4、待收货（orderState=2）：查看物流、查看订单；
                  5、已完成（orderState=3）：查看订单；
                  6、已取消（orderState=6）：查看订单；
                 -->
                <el-table-column
                  label="操作"
                  class-name="handle-cell"
                  align="center">
                  <template slot-scope="scope">
                    <!-- 未支付时付款 -->
                      <el-button type="primary" class="custom-bg" v-if="scope.row.orderState === 0" @click="toPay(scope.row.orderId)">立即付款</el-button>
                      <!-- 抢购单时付尾款 -->
                      <el-button type="primary" class="custom-bg" v-if="scope.row.orderState === 7" @click="toPay(scope.row.orderId)">付尾款</el-button>
                      <!-- 未支付时可以取消订单 -->
                      <el-button plain v-if="scope.row.orderState === 0" @click="cancelOrder(scope.row.orderId)">取消订单</el-button>
                      <!-- 所有可查看订单 -->
                      <el-button plain @click="toDetail(scope.row.orderId)">查看详情</el-button>
                      <!-- 配送中可以确认收货 -->
                       <!-- <el-button plain v-if="scope.row.orderState === 2" @click="sureRecieve(scope.row.orderId)">确认收货</el-button> -->
                        <!-- 已支付和配送中可以申请售后 -->
                      <!-- <el-button plain v-if="scope.row.orderState === 3" @click="toService(scope.row.orderId)">申请售后</el-button> -->
                      <!-- 有申请售后可查看 -->
                      <!-- <el-button plain v-if="scope.row.aftersalesState" @click="toServiceStatus(scope.row.orderId)">查看售后</el-button> -->
                      <!-- 已支付到完成可查看物流  " -->
                      <el-button plain v-if="scope.row.orderState === 2 || scope.row.orderState === 3"  @click="checkLogistics(scope.row.orderId)">查看物流</el-button>
                  </template>
                </el-table-column>
            </el-table>
      </div>
      <div class="pagination">
       <el-pagination
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="5"
        :current-page="page"
        @current-change="currentChange"
        :total="totalSize">
      </el-pagination>
      </div>
  </div>
   <el-dialog   custom-class="loginstics-dialog hasCancel" width="508px" :visible.sync="logisticsDialogVisible">
      <span slot="title"><i class="el-icon el-icon-view"></i>查看物流信息</span>
        <el-logistics :logisticsData="logisticsData"></el-logistics>
         <div slot="footer" class="dialog-footer">
        <el-button class="custom-bg custom-height" type="primary" @click="logisticsDialogVisible = false">确 定</el-button>
    </div>
    </el-dialog>
  </div>
  <div v-else class="no-order_list">
    <img src="../../../../assets/images/qq1.png" alt="">
    <p>暂无订单</p>
    <el-button class="custom-bg" type="primary" @click="toIndex">去购物</el-button>
  </div>
</template>
<script>
import path from '@/api/api-path';
import { fetchPost } from '@/utils/fetch';
import logistics from '@/components/logistics';
export default {
  data() {
    return {
      orderList: [],
      page: 1,
      totalSize: 0,
      logisticsData: {},
      logisticsDialogVisible: false
    };
  },
  beforeRouteEnter (to, from, next) {
    fetchPost({
      url: path.GET_ORDER_LIST,
      data: {
        page: 1,
        pageSize: 5
      }
    }).then(res => {
      next(vm => {
        vm.orderList = res.data.orderList;
        vm.hasNext = res.data.hasNext;
        vm.totalSize = res.data.totalSize;
      });
    });
  },
  beforeRouteUpdate (to, from, next) {
    fetchPost({
      url: path.GET_ORDER_LIST,
      data: {
        page: 1,
        pageSize: 5
      }
    }).then(res => {
      this.orderList = res.data.orderList;
      this.hasNext = res.data.hasNext;
      this.totalSize = res.data.totalSize;
      next();
    });
  },
  created() {
    // this.getList();
  },
  filters: {
    /*
    1、待付款（orderState=0）： 立即付款、取消订单、查看订单；
2、待付尾款（orderState=7）：付尾款、查看订单；
3、待发货（orderState=1）：查看订单；
4、待收货（orderState=2）：查看物流、查看订单；
5、已完成（orderState=3）：查看订单；
6、已取消（orderState=6）：查看订单； */
    toStatusText(val) {
      switch (val) {
        case 0:
          return '待付款';
        case 1:
          return '待发货';
        case 2:
          return '待收货';
        case 3:
          return '已完成';
        case 4:
          return '已完成';
          // return '申请售后';
        case 5:
          return '已完成';
          // return '已退款';
        case 6:
          return '已取消';
        case 7:
          return '待付尾款';
      }
    }
  },
  computed: {
  },
  methods: {
    getList  () {
      this.$fetchPost({
        url: this.$api.GET_ORDER_LIST,
        data: {
          page: this.page,
          pageSize: 5
        }
      }).then(res => {
        console.log(res);
        this.orderList = res.data.orderList;
        this.hasNext = res.data.hasNext;
        this.totalSize = res.data.totalSize;
      });
    },
    currentChange(id) {
      this.page = id;
      this.getList();
    },
    toPay(id) {
      this.$router.push({path: `/pay/${id}`});
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
          this.getList();
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    toDetail(id) {
      const userId = this.$store.getters.userId;
      this.$router.push({path: `/user/${userId}/order/${id}`});
    },
    sureRecieve(id) {
      this.$confirm('此操作确认收货, 是否继续?', '提示', {
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
          this.getList();
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消确认'
        // });
      });
    },
    checkLogistics(id) {
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
    toService(id) {
      const userId = this.$store.getters.userId;
      this.$router.push({path: `/user/${userId}/service/${id}`});
    },
    toServiceStatus(id) {
      const userId = this.$store.getters.userId;
      this.$router.push({path: `/user/${userId}/service_status/${id}`});
    },
    toIndex() {
      this.$router.push({path: '/'});
    }
  },
  components: {
    'el-logistics': logistics
  }
};
</script>
<style lang="less" scoped>
@import "../../../../assets/css/base.less";
.table-list-title{
  line-height: 1;
  color: #888;
  padding-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid #eaeaea;
  overflow: hidden;
  .order-detail{
    width: 254px;
    text-align: left;
    text-indent: 32px;
  }
  .sum-price{
    width: 164px;
  }
  .receive{
    width: 126px;
  }
  .status{
    width: 120px;
  }
  .handle{
    width: 130px;
  }
}
.table-list-wrap{
  .table-list{
    margin-top: 10px;
    margin-bottom: 20px;
    .title{
      padding-left: 10px;
      line-height: 30px;
      background: #f2f2f2;
      border-bottom: 1px solid #ebeef5;
      span{
        font-size: 12px;
        color:#888;
        margin-left: 54px;
      }
    }
    .handle-cell{
      .el-button{
        width: 103px;
        padding: 8px 20px;
        margin: 5px 0 10px;
      }
    }
    .detail-cell{
      padding: 0!important;
      .detail-item{
        margin: 0 -12px;
        padding: 12px;
        border-bottom: 1px solid #ebeef5;
        overflow: hidden;
        &:first-child{
          padding: 0 12px;
          padding-bottom: 12px;
        }
        &:last-child{
          padding: 0 12px;
          padding-top: 12px;
          border-bottom: 0;
        }
      }
      .img{
        width: 77px;
        height: 92px;
        #bg-img;
      }
      .info{
        padding-left: 94px;
      }
      .name{
        padding-top: 20px;
        padding-bottom: 20px;
        line-height: 1.5;
      }
      .style-wrap{
        color: #888;
      }
      .style{
        margin-right: 20px;
      }
    }
  }
  .pagination{
    text-align: right;
    margin: 40px 0 20px;
    span{
      color: #666;
      font-size: 12px;
      &:hover{
        color: @font-color;
        text-decoration: underline;
        cursor: pointer;
      }
      &.prev{
        margin-right: 15px;
      }
    }
  }
}
.no-order_list{
  text-align: center;
  img{
    margin-top: 14%;
  }
  p{
    font-size: 16px;
    line-height: 42px;
  }
}
</style>
