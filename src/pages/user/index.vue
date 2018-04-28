<template>
<div class="main-wrap">
  <div class="sidebar">
    <div class="userImg"  :style="{backgroundImage: 'url(' + userImg + ')'}"></div>
    <p class="username">{{username}}</p>
    <ul>
      <li :class="{active: classTag.indexOf('info') !== -1}"><router-link  :to="'/user/'+userId+'/info'"><svg-icon class="svg-icon" icon-class="my" />用户信息</router-link></li>
      <li :class="{active: classTag.indexOf('order') !== -1 || classTag.indexOf('service') !== -1}"><router-link  :to="'/user/'+userId+'/order_list'"><i class="el-icon el-icon-tickets"></i>我的订单</router-link></li>
      <li :class="{active: classTag.indexOf('address') !== -1}"><router-link  :to="'/user/'+userId+'/address'"><i class="el-icon el-icon-location-outline"></i>收获地址</router-link></li>
    </ul>
  </div>
  <div class="split"></div>
  <div class="main">
      <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    classTag() {
      return this.$route.path;
    },
    userId() {
      return this.$store.getters.userId;
    },
    userImg() {
      return this.$store.getters.headImgUrl || 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524707046&di=66315fb625c507c356fe02ab708feb7a&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b52855dc4b6932f875a13252f0e4.jpg%401280w_1l_2o_100sh.jpg';
    },
    username() {
      return this.$store.getters.username;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/base.less";
 .main-wrap{
   display: table;
    width: 1200px;
    min-height: 690px;
    padding-top: 20px;
    padding-bottom: 120px;
    margin: 0 auto;
    .sidebar{
      display: table-cell;
      width: 286px;
      padding: 45px 50px;
      background: #fff;
      box-shadow: 0 0 10px  0 #ccc;
      box-sizing: border-box;
      vertical-align: top;
      .userImg{
        width: 92px;
        height: 92px;
        margin: 0 auto;
        #bg-img;
        border-radius: 50%;
      }
      .username{
        line-height: 38px;
        text-align: center;
        margin-bottom: 14px;
      }
      li{
        line-height: 40px;
        text-align: center;
        a{
          color: #888
        }
        &.active{
          border-top: 1px solid #eaeaea;
          border-bottom:1px solid #eaeaea;
          a{
            color: @font-color;
          }
        }
         &:hover a{
            color: @font-color;
         }
      }
    }
    .split{
      display: table-cell;
      width: 20px;
      background: transparent;
    }
    .main{
      display: table-cell;
      background: #fff;
      padding: 45px 50px;
      box-shadow: 0 0 10px  0 #ccc;
      }
 }
</style>
