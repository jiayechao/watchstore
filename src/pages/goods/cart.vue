<template>
  <div class="main-wrap">
    <div class="cart-wrap">
      <el-table
        empty-text="没有购买，快去购物吧~"
        :data="cartGoods"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="62">
        </el-table-column>
        <el-table-column
          label="商品"
          width="316">
          <template slot-scope="scope">
            <div class="img fl" :style="{backgroundImage: 'url(' + scope.row.imgUrl + ')'}"></div>
            <span class="name">{{scope.row.itemName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="颜色"
          width="160"
          prop="colorDescr"
          align="center">
        </el-table-column>
        <el-table-column
          label="数量"
          width="160"
          align="center">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.num" @change="changeNum(scope.row.num, scope.row.cartId)" :min="1" size="mini"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          label="单价"
          width="160"
          align="center">
          <template slot-scope="scope">
            <span>￥{{scope.row.singlePrice}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="小计"
          width="160"
          align="center">
          <template slot-scope="scope">
            <span>￥{{scope.row.subtotal}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label=""
          align="center">
          <template slot-scope="scope">
            <span class="delete" @click="deleteCart(scope.row.cartId)"><i class="el-icon-delete"></i></span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pay-wrap fr">
        <p class="totalPrice"><span class="fl">小计</span>￥{{payPrice}}</p>
        <p class="freightPrice"><span class="fl">运费</span><span>￥0.00</span></p>
        <p class="payPrice"><span class="fl">商品总价</span>￥{{payPrice}}</p>
        <p>
          <router-link class="fl toGoods" to="/"><i class="el-icon el-icon-d-arrow-left"></i>继续购物</router-link>
          <el-button class="custom-bg" type="primary" @click="orderUserCart">去结算</el-button>
        </p>
      </div>
      </div>
  </div>
</template>

<script>
import {getCart} from '@/utils/cart';
export default {
  data() {
    return {
      cartGoods: [],
      multipleSelection: []
    };
  },
  created() {
    getCart().then(res => {
      this.cartGoods = res.data;
    });
  },
  computed: {
    payPrice() {
      let price = 0;
      this.multipleSelection.forEach((item) => {
        price += item.subtotal;
      });
      return price;
    }
  },
  methods: {
    orderUserCart() {
      if (this.multipleSelection.length) {
        this.$store.commit('ADD_CURRENT_GOODS', this.multipleSelection);
        this.$router.push({path: '/purchase'});
      } else {
        this.$message({
          message: '买点商品吧~',
          type: 'warning'
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteCart(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$fetchPost({
          url: this.$api.DEL_CART,
          data: {
            cartIds: id
          }
        }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }).then(res => {
          getCart().then(res => {
            this.cartGoods = res.data;
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    changeNum(num, id) {
      this.$fetchPost({
        url: this.$api.UPDATE_CART_NUM,
        data: {
          cartId: id,
          num: num
        }
      });
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
  .cart-wrap{
      margin-bottom: 20px;
      padding: 18px 50px;
      background: #fff;
      box-shadow: 0 0 10px  0 #ccc;
      overflow: hidden;
    .img{
      width: 56px;
      height: 80px;
      margin: 10px 0;
      #bg-img;
    }
    .name{
      line-height: 104px;
      padding-left: 28px;
    }
    .pay-wrap{
      padding-bottom: 60px;
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
    .totalPrice,  .freightPrice{
      line-height: 24px;
      color: #666;
    }
    .totalPrice{
      padding-top: 34px;
    }
    .payPrice{
      font-size: 16px;
      line-height: 68px;
      padding-bottom: 14px;
    }
    .delete{
      cursor: pointer;
    }
  }
}
</style>
