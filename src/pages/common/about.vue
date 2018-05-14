<template>
  <div class="about-wrap">
    <header>
      <img src="../../assets/images/about/about-bk.png">
    </header>
    
    <main>
      <h3 style="margin-top: 41px;margin-bottom: 23px;">关于我们</h3>
      <p class="lh-2 bt-20">真时科技有限公司创立于2016年9月，专注于智能可穿戴设备与服务研发与生产，秉承“生活.科技.美”的产品设计理念，真时科技推出智能可穿戴品牌 Pacewear，致力于为消费者提供高品质的智能科技产品和便捷的智能生活体验。</p>
      <p class="lh-2 bt-20">真时科技在北京、深圳、青岛三地设有分公司，核心团队主要来自腾讯、歌尔、Motorola、Nokia，在系统及软件服务开发、消费电子研发和制造等领域拥有丰富经验。</p>
      <p class="lh-2 bt-20">真时科技目前已获得由腾讯科技、歌尔股份领投，多家机构参投的A轮融资。</p>
      
      <h3 style="margin-top: 83px;">品牌文化</h3>
      <div class="brand-text lh-2">
        <p>父母给孩子的陪伴应该是彼此独立而分秒相连的，只有为孩子打造独立的成长空间，快乐自由去做想做的事，</p>
        <p>父母才能心无旁骛地投入工作，为孩子打拼更好的未来。</p>
        <p>孩子独立成长，父母安心发展，让我们学会更好的陪伴。</p>
      </div>
     
      
      <div class="about-main-img">
        <span class="img-l img-b"><img src="../../assets/images/about/about-1.png" alt=""></span>
        <span class="img-r img-b"><img src="../../assets/images/about/about-2.png" alt=""></span>
        <span class="img-l img-t"><img src="../../assets/images/about/about-2.png" alt=""></span>
        <span class="img-r img-t"><img src="../../assets/images/about/about-1.png" alt=""></span>
      </div>
      
      
      <h3 style="margin-top: 83px;">联系我们</h3>
      <div class="footer-address">
        <div class="address-detail">
          <h4>北京</h4>
          <p>地址：中国北京市海淀区学院路35号世宁大厦19楼</p>
          <p>电话：<span class="phone">010-83030456</span></p>
        </div>
        
        <div class="address-detail">
          <h4>北京</h4>
          <p>地址：中国北京市海淀区学院路35号世宁大厦19楼</p>
          <p>电话：<span class="phone">010-83030456</span></p>
        </div>
        
        <div class="address-detail">
          <h4>北京</h4>
          <p>地址：中国北京市海淀区学院路35号世宁大厦19楼</p>
          <p>电话：<span class="phone">010-83030456</span></p>
        </div>
        
        <div class="address-detail">
          <h4>北京</h4>
          <p>地址：中国北京市海淀区学院路35号世宁大厦19楼</p>
          <p>电话：<span class="phone">010-83030456</span></p>
        </div>
      </div>
    </main>
    
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'about'
};
</script>

<style lang='less' scoped>
  .about-wrap {
    background: #ffffff;
  }
  
  header {
    img {
      width: 100%;
    }
  }
  
  main {
    width: 1200px;
    margin: 0 auto;
    .lh-2 {
      line-height: 2em;
    }
    
    .bt-20 {
      margin-bottom: 20px;
    }
    
    .brand-text {
      margin-bottom: 30px;
    }
    
    .about-main-img {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      div {
        line-height: normal;
        width: calc(50% - 10px);
        img {
          width: 100%;
        }
      }
      
      .img-l {
        margin-right: 5px;
      }
      
      .img-r {
        margin-left: 5px;
      }
      
      .img-t {
        margin-top: 5px;
      }
      
      .img-b {
        margin-bottom: 5px;
      }
    }
    
    .footer-address {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 100px;
      color: #6b6b6b;
      h4 {
        font-weight: normal;
      }
      .address-detail {
        width: 50%;
        &:nth-child(2n) {
          margin-left: 20px;
          width: calc(50% - 20px);
        }
        
        p {
          margin-bottom: 11px;
        }
        
        .phone {
          color: #333333;
        }
      }
    }
  }
  
  footer {
    background: #f4f4f4;
    height: 20px;
  }
</style>
