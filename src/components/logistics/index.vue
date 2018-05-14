<template>
<div>
  <div class="address">
    <span class="fl"><i class="el-icon el-icon-location-outline"></i>收货地址：</span>
    <p class="text">{{logisticsData.province}}{{logisticsData.city}}{{logisticsData.area}}{{logisticsData.addressDetail}}</p>
    </div>
  <div class="step-wrap">
      <div class="step-item fl" :class="{achieve: index === 0}"  v-for="(item, index) in logisticsData.data" :key="index">
          <p class="step-time fl">{{item.time | moments}}</p>
          <div class="step-icon fl"><svg-icon  icon-class="xiangshangyuanjiantou" fill="#34b035" /></div>
          <div class="step-content fl">
            <p class="step-status">{{item.status}}</p>
            <p class="step-desc">{{item.context}}</p>
          </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    logisticsData: {
      type: Object
    }
  },
  data() {
    return {};
  }

};
</script>
<style lang="less" scoped>
.address{
  color:#333;
  margin: -30px -50px 20px;
  padding: 20px 50px;
  background: #fafafa;
  .text{
    padding-left: 94px;
  }
}
.step-wrap{
  overflow: hidden;

  .step-item{
    color: #666;
    height: 84px;
    &.achieve{
      color: #34b035;
    }
    &:last-child{
      .step-icon:after{
        display: none;
      }
    }
  }
  .step-icon{
    position: relative;
    line-height: 1;
    padding-top: 10px;
    &:after{
      position: absolute;
      content:"";
      width: 1px;
      height: 70px;
      top: 100%;
      left: 6px;
      background: #888;
    }
  }
  .step-time{
    width: 80px;
    font-size: 12px;
  }
  .step-desc{
    font-size: 12px;
  }
  .step-content{
    width: 300px;
  }
}
</style>
