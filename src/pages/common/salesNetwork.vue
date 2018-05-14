<template>
  <div class="salesNetwork-wrap">
    <header>
      <img src="../../assets/images/salesNetwork/banner.png" alt="">
    </header>
    
    <main>
      <h3 class="online-h3">线上商城</h3>
      <div class="online-store">
        <div><img src="../../assets/images/salesNetwork/QQ.png" alt=""></div>
        <div><img src="../../assets/images/salesNetwork/jd.png" alt=""></div>
        <div><img src="../../assets/images/salesNetwork/tm.png" alt=""></div>
        <div><img src="../../assets/images/salesNetwork/tb.png" alt=""></div>
        <div><img src="../../assets/images/salesNetwork/yz.png" alt=""></div>
      </div>
      
      
      <h3 class="offline-h3">线下门店</h3>
      <h4>北京</h4>
      
      <div class="store-address">
        <div>
          <p>腾讯印象北京店</p>
          <p>北京市海淀区海淀大街 38 号银科大厦 1 层</p>
        </div>
  
        <div>
          <p>桦泰圣鹰—金源—燕莎</p>
          <p>北京市海淀区远大路 1 号金源燕莎友谊商城 B1 层</p>
        </div>
  
        <div>
          <p>桦泰圣鹰—四通桥—当代</p>
          <p>北京市海淀区中关村大街 40 号 6 层</p>
        </div>
  
        <div>
          <p>桦泰圣鹰—牡丹园—翠微</p>
          <p>北京市海淀区花园路2号翠微百货3层</p>
        </div>
  
        <div>
          <p>桦泰圣鹰—亮马桥—燕莎</p>
          <p>北京市朝阳区亮马桥52号燕莎友谊商城5层</p>
        </div>
  
        <div>
          <p>鹰巢数码—建国路—北京SKP</p>
          <p>北京市朝阳区建国路87号北京SKP5层</p>
        </div>
  
        <div>
          <p>鹰巢数码-崇文门-国瑞</p>
          <p>深圳市南山市高新科技园腾讯大厦 1 层</p>
        </div>
      </div>
      
      <h4>深圳</h4>
      <div class="store-address">
        <div>
          <p>腾讯印象深圳店</p>
          <p>深圳市南山市高新科技园腾讯大厦 1 层</p>
        </div>
      </div>
      
      <h4>上海</h4>
      <div class="store-address">
        <div>
          <p>腾讯印象上海店</p>
          <p>上海市徐汇区漕河泾田路 397 号腾云大厦 1 层</p>
        </div>
  
        <div>
          <p>上海乐之</p>
          <p>上海市徐汇区漕溪北路 339 号—百脑汇乐之科技智能</p>
          <p>体验馆1层（地铁 1/9/11 号线徐家汇站 4/5 出口）</p>
        </div>
      </div>
      
      <h4>其他城市</h4>
      <div class="store-address">
        <div>
          <p>广州乐之</p>
          <p>广州市天河区天河路 596 号—百脑汇负 1 层乐之江苏</p>
          <p>无锡金石路 88 号万象城 3-25 铺</p>
        </div>
  
        <div>
          <p>合肥乐之</p>
          <p>安徽省合肥市金寨路 162 号百脑汇</p>
        </div>
  
        <div>
          <p>杭州乐之</p>
          <p>浙江省杭州市下城区延安路 391 号 2 楼</p>
        </div>
  
        <div>
          <p>腾讯印象成都店</p>
          <p>四川省成都市高新区天府三街 198 号腾讯大厦 A 座</p>
        </div>
  
        <div>
          <p>桃园时光</p>
          <p>山东省潍坊市高新区健康东街与惠贤路交汇处东南300米</p>
        </div>
      </div>
    </main>
    
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'salesNetwork'
};
</script>

<style lang="less" scoped>
  header {
    img {
      width: 100%;
    }
  }
  
  main {
    width: 1200px;
    margin: 20px auto 0 auto;
    padding: 0 40px;
    background: #fff;
    h3 {
      margin: 0;
    }
    
    .online-h3,
    .offline-h3{
      padding-top: 41px;
      padding-bottom: 51px;
    }
    
    .online-store {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 384px;
        height: 180px;
        background: #fff;
        border: 1px solid #eaeaea;
        margin-bottom: 15px;
        &:nth-child(3n+2) {
          margin-left: 20px;
          margin-right: 20px;
        }
        &:hover {
          border: 1px solid #f35605;
        }
      }
    }
    
    h4 {
      color: #6b6b6b;
      font-weight: normal;
    }
    
    .store-address {
      display: flex;
      flex-wrap: wrap;
      div {
        width: 384px;
        margin-bottom: 31px;
        &:nth-child(3n+2) {
          margin-left: 20px;
          margin-right: 20px;
        }
        
        p {
          line-height: 2;
          color: #6b6b6b;
        }
      }
    }
  }
  
  footer {
    background: #f4f4f4;
    height: 20px;
  }
</style>
