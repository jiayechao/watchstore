<template>
  <header class="header">
    <div class="header-wrap">
        <div class="logo fl"></div>
        <ul class="nav">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/">S系列</router-link></li>
            <li><router-link to="/">X系列</router-link></li>
            <li><router-link to="/">品牌</router-link></li>
            <li class="active"><router-link to="/">商城</router-link></li>
        </ul>
        <div class="info fr">
            <!-- 这里需要判定token来做是否登陆及购物车 -->
            <a class="cart" href="javascript:;" v-popover:popover4> <svg-icon class="svg-icon" icon-class="cart" />购物车</a>
            <router-link class="signin" v-if="!userId"  to="/signin"> <svg-icon class="svg-icon" icon-class="my" />登录</router-link>
             <el-dropdown class="user-list" v-else>
               <a class="el-dropdown-link signin" href="javascript:;"> <img class="img-icon" :src="headerImg" alt="个人头像">{{username}}</a>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><router-link  :to="'/user/'+userId+'/order_list'">我的订单</router-link></el-dropdown-item>
                  <el-dropdown-item><router-link  :to="'/user/'+userId+'/info'">用户信息</router-link></el-dropdown-item>
                  <el-dropdown-item><router-link  :to="'/user/'+userId+'/address'">收货地址</router-link></el-dropdown-item>
                  <el-dropdown-item><a href="javascript:;"  @click="signout">安全退出</a></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-popover
                  popper-class="cart-drop"
                  ref="popover4"
                  placement="bottom-end"
                  width="410"
                  trigger="hover"
                  @show="getCartGoods">
                  <div v-if="cartGoods.length && userId">
                    <div class="good-item" v-for="(item, index) in cartGoods" :key="index">
                      <div class="good-img" :style="{backgroundImage: 'url(' + item.imgUrl + ')'}"></div>
                      <div class="good-info">
                        <p class="title">{{item.itemName}}</p>
                        <div class="detail">
                          <span class="count">数量 {{item.num}}</span><span class="color">{{item.colorDescr}}</span><span class="price">￥{{item.subtotal}}</span>
                        </div>
                      </div>
                      <div class="remove" @click="removeCart(item.cartId)"> <i class="el-icon-delete"></i></div>
                    </div>
                    <div class="total">
                      <span>总计</span><span class="total-price">￥ {{totalPrice}}</span>
                    </div>
                    <el-button class="toCart custom-bg" type="primary" @click="toCart">去购物车</el-button>
                  </div>
                  <p class="no-goods" v-else-if="!cartGoods.length && userId">购物车空的，快去购物吧~</p>
                  <p class="no-goods" v-else>登录后才能查看购物车~</p>
                </el-popover>
        </div>
    </div>
  </header>
</template>

<script>
import {getCart} from '@/utils/cart';
export default {
  name: 'Header',
  data() {
    return {
      cartGoods: []
    };
  },
  computed: {
    headerImg() {
      return this.$store.getters.headImgUrl ? this.$store.getters.headImgUrl : '../../../../assets/images/shangchuantouxiang.png';
    },
    username() {
      return this.$store.getters.username ? this.$store.getters.username : '登录';
    },
    userId() {
      return this.$store.getters.userId;
    },
    totalPrice() {
      let sum = 0;
      this.cartGoods.forEach(item => {
        sum += item.subtotal;
      });
      return sum.toFixed(2);
    }
  },
  methods: {
    removeCart(id) {
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
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    toCart() {
      this.$router.push({path: '/cart'});
    },
    getCartGoods() {
      if (this.$tools.getItem('userInfo', 1)) {
        getCart().then(res => {
          this.cartGoods = res.data;
        });
      }
    },
    signout() {
      this.$store.dispatch('LogOut').then(res => {
        this.$router.push({path: '/'});
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/base.less";
  header{
    background: #f8f8f8;
    border-bottom: 1px solid #dcdcdc;
    .header-wrap{
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
    }
    .logo{
        float: left;
        width: 148px;
        height: 80px;
        margin-right: 178px;
        background: url('../../assets/images/logo.png') left center no-repeat;
    }
    .nav{
        li{
            float: left;
            height: 80px;
            // padding-top: 30px;
            line-height: 50px;
            padding: 30px 25px 0;
            box-sizing: border-box;
            &.active{
              a{
                color: @base-color;
                  border-bottom: 3px solid @base-color;
              }
            }
            &:hover{
              a{
                color: @hover-color;
                  border-bottom: 3px solid @hover-color;
              }
            }
        }
        a{
            display: inline-block;
            height: 50px;
            // padding: 0 25px;
            color: @font-color;
            box-sizing: border-box;
        }
    }
    .info{
        height: 50px;
        padding-top: 30px;
        line-height: 50px;
        padding-right: 50px;
        svg{
          margin-right: 10px;
        }
        .signin{
          img{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 10px;
            vertical-align: middle;
          }
        }
        .user-list{
          line-height: 1;
        }
        a{
            color: @font-color;
            &.signin{
                margin-left: 40px;
            }
        }
    }
}
.no-goods{
  text-align: center;
  line-height: 100px;
}
 .good-item{
    position: relative;
    padding: 0 24px;
    height: 118px;
    border-bottom: 1px solid #dcdcdc;
    .good-img{
        float: left;
        width: 70px;
        height: 100%;
        #bg-img;
    }
    .good-info{
      padding-left: 90px;
    }
    .title{
      font-size: 16px;
      line-height: 32px;
      color: @font-color;
      padding-top: 24px;
    }
    .detail{
      font-size: 12px;
      color: #666;
      line-height: 28px;
      .count{
        margin-right: 26px;
      }
      .price{
        float: right;
      }
    }
    .remove{
      position: absolute;
      top: 24px;
      right: 24px;
      cursor: pointer;
    }
}
.total{
  padding: 0 24px;
  font-size: 16px;
  line-height: 40px;
  padding-top: 14px;
  padding-bottom: 26px;
  color: @font-color;
  font-weight: bold;
  .total-price{
    float: right;
  }
}
.toCart{
  float: right;
  width: 112px;
  margin-right: 24px;
  margin-bottom: 40px;
}
.el-dropdown-menu{
  .el-dropdown-menu__item{
    // background: @hover-color;
  }
  a{
    color: #666;
  }
}
</style>
