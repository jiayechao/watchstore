<template>
  <div class="main-wrap">
    <div class="panel address-list">
      <p class="title">收货人信息</p>
      <div class="address-wrap" :style="{height: addressWrap[wrapindex].height}">
        <div v-if="addressList.length" class="address fl" :class="{active: item.addressId === orderForm.addressId  }" v-for="(item, index) in addressList" :key="index" @click="chooseAdd(item.addressId)">
          <p class="name">{{item.provinceName}}<span v-if="item.provinceName !== item.cityName">{{item.cityName}}</span><span>（{{item.receiver}} 收）</span></p>
          <p class="phone">{{item.areaName}}{{item.addressDetail}} <span>{{item.phone}}</span></p>
          <span class="isDefault" v-if="item.isDefault">默认地址</span>
          <!-- <el-checkbox @change="changeDefault({addressId: item.addressId})" v-model="item.isDefault" :true-label = "1" :false-label="0" class="has_checked"  name="type">默认地址</el-checkbox> -->
          <div class="handle">
             <!-- <a href="javascript:;" class="delete fr" @click.stop="deleteAddress({addressId: item.addressId})"><i class="el-icon el-icon-delete"></i>删除</a> -->
             <!-- <i class="el-icon el-icon-edit-outline"> </i>-->
            <a href="javascript:;" class="edit" @click.stop="editAddress(item)">修改</a>
          </div>
        </div>
         <div v-else class="address no-address fl" @click="openAddDialog">
           添加新地址
         </div>
      </div>
      <p class="note">
        <span v-if="addressList.length > 3 && wrapindex === 0" class="fl" @click="visibleAllAddress">{{addressWrap[wrapindex].text}}</span>
        <el-button v-if="addressList.length <  4 || wrapindex === 1" class="custom-bg custom-height" type="primary"  @click="openAddDialog">添加收货地址</el-button>
        <router-link class="fr" :to="'/user/'+$store.getters.userId+'/address'">管理收货地址</router-link>
        </p>
    </div>
    <div class="panel order-info">
      <p class="title">订单信息</p>
      <!-- <svg-icon class="svg-icon" icon-class="yunshupeisong" /><svg-icon class="svg-icon" icon-class="refund" /> i class="el-icon el-icon-tickets"></i>-->
      <div class="delivery-type"><span class="title">配送方式：</span><span class="text"><svg-icon class="svg-icon" icon-class="tianmaoshunfengbaoyou" />顺丰速运</span></div>
      <div class="pay-type"><span class="title">网上支付：</span><span class="text"><img class="img-icon" src="../../assets/images/wxPay-mini.png">微信支付</span><span class="text"><img class="img-icon" src="../../assets/images/aliPay-mini.png">支付宝</span></div>
      <div class="invoice-list">
        <div>
          <span class="title">发票：</span>
          <el-radio-group v-model="invoiceTag">
            <el-radio :label="0">不开发票</el-radio>
            <el-radio :label="3">普通发票<span>（统一默认开具电子发票）</span></el-radio>
            <el-radio :label="4">增值税专用发票</el-radio>
          </el-radio-group>
        </div>
        <div class="invoice-title" v-if="invoiceTag === 3">
            <span>发票抬头：</span>
            <el-radio-group v-model="orderForm.invoiceType">
              <el-radio :label="1">个人</el-radio>
              <el-radio :label="2">公司</el-radio>
            </el-radio-group>
        </div>
        <div class="invoice-content" v-if="orderForm.invoiceType === 1 && invoiceTag === 3"><span>发票内容：</span><span>商品明细</span></div>
        <p v-if="invoiceTag === 4" style="padding-left: 75px">如需开增值税发票，请联系在线客服，或拨打400-705-8885</p>
        <div class="invoice-wrap" v-if="orderForm.invoiceType === 2 && invoiceTag === 3">
          <div class="invoice fl" :class="{active: item.invoiceId === orderForm.invoiceId  }"  v-for="(item, index) in invoiceList" :key="index" @click="chooseInvoice(item.invoiceId, item.invoiceType)">
          <i class="el-icon el-icon-tickets"></i>
            <p class="name">公司发票</p>
            <div class="phone"><span class="fl">公司名称：</span><p style="paddingLeft:60px">{{item.title}}</p></div>
            <div class="detail"><span class="fl">纳锐人识别号：</span><p style="paddingLeft:84px">{{item.taxNumber}}</p></div>
            <div class="handle">
              <!-- <i class="el-icon el-icon-delete"></i> <i class="el- icon el-icon-edit-outline"></i>-->
              <a href="javascript:;" class="delete fr" @click.stop="deleteInvoice({invoiceId: item.invoiceId})">删除</a>
              <a href="javascript:;" class="edit fr" @click.stop="editInvoice(item)" > 编辑</a>
            </div>
          </div>
          <div class="invoice fl" @click="openInvoiceDialog">
            添加新发票信息
          </div>
        </div>
      </div>
    </div>
    <div class="panel my-goods">
      <el-table
        empty-text="没有购买，快去购物吧~"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="商品"
          width="403">
          <template slot-scope="scope">
            <div class="img fl" :style="{backgroundImage: 'url(' + scope.row.imgUrl + ')'}"></div>
            <span class="name">{{scope.row.itemName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="属性"
          width="163"
          align="center"
          prop="colorDescr">
        </el-table-column>
        <el-table-column
          label="数量"
          align="center"
          width="212"
          prop="num">
        </el-table-column>
        <el-table-column
          label="单价"
          align="center"
          width="230">
          <template slot-scope="scope">
            <span>￥{{scope.row.singlePrice}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="小计"
          align="right">
          <template slot-scope="scope">
            <span>￥{{scope.row.subtotal}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pay-wrap fr" v-if="tableData.length">
        <p class="totalPrice"><span class="fl">商品总价</span><span>￥{{totalPrice}}</span></p>
        <p class="payPrice"><span class="fl">应付金额</span><span v-if="tableData[0].subPresaletotal">￥{{presaletotal}}</span><span v-else>￥{{payPrice}}</span></p>
        <p>
          <router-link class="fl toGoods" :to="'/goods/'+tableData[0].itemBaseId"><i class="el-icon el-icon-d-arrow-left"></i>继续购物</router-link>
          <el-button v-if="tableData[0].subPresaletotal"  class="custom-bg" type="primary" @click="preOrderUserCart">提交订单</el-button>
          <el-button v-else class="custom-bg" type="primary" @click="orderUserCart">提交订单</el-button>
        </p>
      </div>
    </div>
    <!-- 新建地址弹窗 -->
    <el-dialog   custom-class="address-dialog hasCancel"  width="723px" :visible.sync="addressDialogVisible">
        <p slot="title"><span v-if="!addEdit">+ 新建地址</span><span v-else><i class="el- icon el-icon-edit-outline"></i> 修改地址</span></p>
        <el-address :addressDialogVisible="addressDialogVisible" :addEdit="addEdit"  :addressForm="addressForm" @closeAddDialog="closeAddDialog"></el-address>
    </el-dialog>
    <!-- 新建发票弹窗 -->
    <el-dialog   custom-class="invoice-dialog hasCancel"  width="723px" :visible.sync="invoiceDialogVisible">
      <p slot="title"><span v-if="!invoiceEdit">+ 新建发票</span><span v-else><i class="el- icon el-icon-edit-outline"></i> 修改发票</span></p>
        <el-invoice :invoiceDialogVisible="invoiceDialogVisible" :invoiceEdit="invoiceEdit"  :invoiceForm="invoiceForm" @closeInvoiceDialog="closeInvoiceDialog"></el-invoice>
    </el-dialog>
  </div>
</template>

<script>
import address from '@/components/address';
import invoice from '@/components/invoice';
import {getAddressList, delAddress, resetDefaultAddress} from '@/utils/address';
import {getInvoiceList, delInvoice} from '@/utils/invoice';
export default {
  data() {
    return {
      orderForm: { // 用来提交订单的参数
        invoiceType: 1,
        addressId: 0,
        invoiceId: 0,
        cartIds: '',
        itemStyleId: '',
        num: ''
      },
      wrapindex: 0,
      addressWrap: [{
        height: '153px',
        text: '显示全部地址'
      },
      {
        height: 'auto',
        text: '收起地址'
      }],
      invoiceTag: 0, // 是否开发票
      addressList: [],
      addEdit: false, // 用来区分是新增还是编辑
      addressForm: {},
      invoiceList: [],
      invoiceEdit: false,
      invoiceForm: {},
      addressDialogVisible: false,
      invoiceDialogVisible: false
    };
  },
  computed: {
    tableData() {
      return this.$store.getters.currentGoods;
    },
    totalPrice() {
      let sum = 0;
      this.tableData.forEach(item => {
        sum += item.subtotal;
      });
      return sum.toFixed(2);
    },
    payPrice() {
      let sum = 0;
      this.tableData.forEach(item => {
        sum += item.subtotal;
      });
      return sum.toFixed(2);
    },
    presaletotal() {
      let sum = 0;
      this.tableData.forEach(item => {
        sum += item.subPresaletotal;
      });
      return sum.toFixed(2);
    }
  },
  created() {
    getAddressList().then(res => {
      this.addressList = res.data.addressList;
      this.orderForm.addressId = this.addressList.length ? this.addressList[0].addressId : '';
    });
    // 多个商品
    let cartIdArr = [];
    if (this.tableData.length) {
      this.tableData.forEach(item => {
        cartIdArr.push(item.cartId);
      });
    }
    this.orderForm.cartIds = cartIdArr.join(',');
    // 抢购商品的提交字段
    this.orderForm.itemStyleId = this.tableData.length ? this.tableData[0].itemStyleId : '';
    this.orderForm.num = this.tableData.length ? this.tableData[0].num : '';
    getInvoiceList().then(res => {
      this.invoiceList = res.data;
      this.orderForm.invoiceId = this.invoiceList.length ? this.invoiceList[0].invoiceId : '';
    });
  },
  methods: {
    orderUserCart() {
      if (!this.orderForm.cartIds) {
        this.$message.error('没有购买商品');
        return;
      } else if (!this.orderForm.addressId) {
        this.$message.error('没有选择地址');
        return;
      } else if (this.invoiceTag === 3 && this.orderForm.invoiceType === 2 && !this.orderForm.invoiceId) {
        this.$message.error('没有选择发票');
        return;
      }
      // 不开发票时处理数据
      if (this.invoiceTag === 0) {
        this.orderForm.invoiceType = 0;
        delete this.orderForm.invoiceId;
      }
      // 开个人发票时处理数据
      if (this.invoiceTag === 3 && this.orderForm.invoiceType === 1) {
        delete this.orderForm.invoiceId;
      }
      // 增值税发票时的处理，删掉invoiceType
      if (this.invoiceTag === 4) {
        this.orderForm.invoiceType = 3;
        delete this.orderForm.invoiceId;
      }
      this.$fetchPost({
        url: this.$api.ORDER_USER_CART,
        data: this.orderForm
      }).then(res => {
        const orderId = res.data.orderId;
        this.$router.push({path: `/pay/${orderId}`});
      });
    },
    preOrderUserCart() {
      if (!this.orderForm.itemStyleId) {
        this.$message.error('没有购买商品');
        return;
      } else if (!this.orderForm.addressId) {
        this.$message.error('没有选择地址');
        return;
      } else if (this.invoiceTag === 3 && this.orderForm.invoiceType === 2 && !this.orderForm.invoiceId) {
        this.$message.error('没有选择发票');
        return;
      }
      // 不开发票时处理数据
      if (this.invoiceTag === 0) {
        this.orderForm.invoiceType = 0;
        delete this.orderForm.invoiceId;
      }
      // 开个人发票时处理数据
      if (this.invoiceTag === 3 && this.orderForm.invoiceType === 1) {
        delete this.orderForm.invoiceId;
      }
      this.$fetchPost({
        url: this.$api.PRESALE_ORDER,
        data: this.orderForm
      }).then(res => {
        const orderId = res.data.orderId;
        this.$router.push({path: `/pay/${orderId}`});
      });
    },
    openAddDialog() {
      this.addEdit = false;
      this.addressForm = {};
      this.addressDialogVisible = true;
    },
    openInvoiceDialog() {
      this.invoiceEdit = false;
      this.invoiceForm = {};
      this.invoiceDialogVisible = true;
    },
    closeAddDialog(addressId) {
      this.addressDialogVisible = false;
      console.log('addressId', addressId);
      getAddressList().then(res => {
        this.addressList = res.data.addressList;
        if (addressId) {
          this.orderForm.addressId = addressId.data.addressId;
        }
      });
    },
    closeInvoiceDialog(invoiceId) {
      this.invoiceDialogVisible = false;
      console.log('invoiceId', invoiceId);
      getInvoiceList().then(res => {
        this.invoiceList = res.data;
        if (invoiceId) {
          this.orderForm.invoiceId = invoiceId.data.invoiceId;
          // this.orderForm.invoiceId = this.invoiceList.length ? this.invoiceList[0].invoiceId : '';
        }
      });
    },
    // 删除地址
    deleteAddress(data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delAddress(data).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        });
        return getAddressList().then(res => {
          this.addressList = res.data.addressList;
          this.orderForm.addressId = this.addressList.length ? this.addressList[0].addressId : '';
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    // 删除发票
    deleteInvoice(data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delInvoice(data).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        });
        return getInvoiceList().then(res => {
          this.invoiceList = res.data;
          this.orderForm.invoiceId = this.invoiceList.length ? this.invoiceList[0].invoiceId : '';
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    // 选择收货地址
    chooseAdd(id) {
      this.orderForm.addressId = id;
    },
    // 选择发票
    chooseInvoice(id) {
      this.orderForm.invoiceId = id;
    },
    // 编辑地址
    editAddress(data) {
      this.addEdit = true;
      this.addressForm = Object.assign({}, data);
      this.addressDialogVisible = true;
    },
    // 修改发票
    editInvoice(data) {
      console.log('this.invoiceEdit', this.invoiceEdit);
      this.invoiceEdit = true;
      console.log('this.invoiceEdit', this.invoiceEdit);
      this.invoiceForm = Object.assign({}, data);
      this.invoiceDialogVisible = true;
    },
    // 修改默认地址
    changeDefault(data) {
      resetDefaultAddress(data).then(res => {
        return getAddressList();
      }).then(res => {
        this.addressList = res.data.addressList;
      });
    },
    // 展开全部
    visibleAllAddress() {
      this.wrapindex = this.wrapindex === 0 ? 1 : 0;
    }
  },
  components: {
    'el-address': address,
    'el-invoice': invoice
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
  .panel{
    margin-bottom: 20px;
    padding: 18px 50px;
    background: #fff;
    box-shadow: 0 0 10px  0 #ccc;
  }
  .address-list{
    .title{
      line-height: 40px;
      margin-bottom: 10px;
    }
    .address-wrap{
      height: 153px;
      overflow: hidden;
    }
    .note{
      line-height: 54px;
      color: @base-color;
      overflow: hidden;
      span{
        cursor: pointer;
      }
      a{
        color: @base-color;
      }
    }
    .address{
      position: relative;
      width: 356px;
      height: 153px;
      color: #888888;
      padding: 10px 20px 10px 30px;
      border: 2px solid #eaeaea;
      margin-right: 16px;
      margin-bottom: 10px;
      box-sizing: border-box;
      .el-icon-location-outline{
        position: absolute;
        top: 10px;
        left: 11px;
      }
      .isDefault{
        position: absolute;
        top: 0;
        right: 0;
        padding: 4px;
        color: #fff;
        background: #cccccc;
      }
      .name{
        line-height: 1;
        margin-bottom: 15px;
        span{
          margin-left: 10px;
        }
      }
      .phone,.detail{
        font-size: 12px;
        line-height: 22px;
        span:last-child{
          margin-left: 10px;
        }
      }
      .detail{
        height: 44px;
        overflow: hidden;
      }
      .el-checkbox{
        color: #888;
      }
      .handle{
        position: absolute;
        bottom: 10px;
        margin-top: 16px;
        .delete, .edit{
         color: @base-color;
          line-height: 20px;
          i{
            margin-right: 4px;
          }
          &:hover{
            color: @hover-color;
          }
        }
        .delete{
          margin-left: 12px;
        }
      }
      &.active{
        border-color: @base-color;
        .name, .phone, .detail {
          color: @font-color;
        }
        &:after{
          position: absolute;
          content: "";
          width: 31px;
          height: 31px;
          bottom: 0;
          right: 0;
          background: url(../../assets/images/active.png)
        }
      }
      &:nth-of-type(3n+3){
        margin-right: 0
      }
      &.no-address{
        line-height: 153px;
        text-align:center;
        padding:0;
        color: #888888;
        cursor: pointer;
      }
    }
  }
  .delivery-type, .pay-type{
    margin: 30px 0;
    line-height: 1;
    .title{
      color: #888;
      margin-right: 6px;
    }
    .text{
      margin-right: 36px;
      img, svg{
        margin-right: 4px;
      }
    }
  }
  .invoice-list{
    .title{
      color: #888;
      line-height: 30px;
      margin-bottom: 10px;
      margin-right: 30px;
    }
    .invoice-title, .invoice-content{
      color: #888;
      padding-left: 60px;
      line-height: 30px;
    }
    .invoice-wrap{
      padding-top: 20px;
      overflow: hidden;
    }
    .invoice{
      position: relative;
      width: 356px;
      height: 153px;
      color: #888;
      padding: 10px 20px 10px 30px;
      border: 1px solid #eaeaea;
      margin-right: 16px;
      margin-bottom: 10px;
      box-sizing: border-box;
      .el-icon-tickets{
        position: absolute;
        top: 10px;
        left: 11px;
      }
      .name{
        line-height: 1;
        margin-bottom: 15px;
      }
      .phone,.detail{
        font-size: 12px;
        line-height: 22px;
      }
      .phone{
        height: 44px;
        overflow: hidden;
      }
      .handle{
        overflow: hidden;
        margin-top: 16px;
        .delete, .edit{
          color: #888;
          line-height: 20px;
          &:hover{
            color: @font-color;
          }
        }
        .delete{
          margin-left: 35px;
        }
      }
      &.active{
        border-color: @base-color;
         .name, .phone, .detail {
          color: @font-color;
        }
      }
      &:nth-of-type(3n+3){
        margin-right: 0
      }
      &:last-child{
        line-height: 153px;
        text-align:center;
        padding:0;
        color: #888888;
        cursor: pointer;
      }
    }
  }
  .my-goods{
    overflow: hidden;
    .img{
      width: 110px;
      height: 126px;
      #bg-img;
    }
    .name{
      display: table-cell;
        line-height: 1.5;
         height: 126px;
        vertical-align: middle;
      // padding-left: 28px;
      // line-height: 126px;
    }
    .pay-wrap{
      p{
        width: 298px;
        text-align: right;
      }
      .el-button{
        width: 190px;
      }
      .toGoods{
        line-height: 40px;
        color: #888;
      }
    }
    .totalPrice{
      padding-top: 11px;
      line-height: 36px;
      color: #666;
    }
    .payPrice{
      font-size: 16px;
      line-height: 38px;
      padding-bottom: 26px;
    }
  }
}
</style>
