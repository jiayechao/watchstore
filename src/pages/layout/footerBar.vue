<template>
  <footer class="footer">
      <div class="footer-wrap">
        <div class="promise">
          <span><svg-icon class="svg-icon" icon-class="dunpai" />一年全国联保</span>
          <span><svg-icon class="svg-icon" icon-class="tianwuliyoutuihuo2" />7天无理由退货</span>
          <span class="large"><svg-icon class="svg-icon" icon-class="tianwuliyoutuihuo" />15天换货保障</span>
          <span><svg-icon class="svg-icon" icon-class="my" />远程客服支持</span>
          <span><svg-icon class="svg-icon" icon-class="weixiuoff" />全国寄修服务</span>
        </div>
        <div class="link-lists">
          <ul>
            <li>产品</li>
            <li>
              <router-link to="/s-series">S3</router-link>
            </li>
            <li>
              <router-link to="/x-series">X1</router-link>
            </li>
          </ul>
          
          <ul>
            <li>品牌</li>
            <li><router-link to="/about">关于我们</router-link></li>
            <li><router-link to="/contact">联系我们</router-link></li>
            <!--<li><router-link to="/wristwatch">加入我们</router-link></li>-->
          </ul>
          
          <ul>
            <li>服务</li>
            <li><router-link to="/commonProblem">常见问题</router-link></li>
            <li><router-link to="/afterService">售后服务</router-link></li>
            <li><router-link to="/salesNetwork">销售网络</router-link></li>
          </ul>
          
          <ul>
            <li>关注我们</li>
            <li>
              <div class="fl" style="margin-right:18px;">
                <img src="../../assets/images/mimashezhi.png" alt="">
                <p style="text-align:center">微信公众号</p>
              </div>
              <div class="fl">
                <img src="../../assets/images/mimashezhi.png" alt="">
                <p style="text-align:center">官方微博</p>
              </div>
            </li>
          </ul>
          
          <div class="fr">
           <p class="phone">400-705-8885</p>
           <p class="time">周一至周日：09:00 ~ 21:00</p>
          </div>
        </div>
        
        <p class="copyright">Copyright © Artimen Technologies inc. All rights reserved 沪ICP备15001612号</p>
      </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style lang="less" scoped>
.footer{
  position: relative;
  background: #fff;
  .footer-wrap{
      width: 1103px;
      margin: 0 auto;
      overflow: hidden;
  }
  .promise{
    display: flex;
    justify-content: space-between;
    padding-top: 24px;
    padding-bottom: 38px;
    border-bottom: 1px solid #eaeaea;
    span{
      line-height: 26px;
      color: #666;
      &.large{
        font-size: 16px;
        svg{
              width: 20px;
            height: 20px;
        }
      }
    }
  }
  .link-lists{
    padding-top: 34px;
    overflow: hidden;
    ul{
      float: left;
      margin-right: 184px;
      &:nth-last-of-type(1){
        margin-right: 0;
      }
      li{
        line-height: 28px;
        font-size: 12px;
        &:first-child{
          font-size: 14px;
          line-height: 46px;
        }
        a{
          color: #888;
        }
      }
    }
    .phone{
      padding-top: 42px;
      line-height: 28px;
      font-size: 18px;
      color: #888;
    }
    .time{
      font-size: 12px;
      line-height: 22px;
      color: #888;
    }
  }
  .copyright{
    font-size: 12px;
    color: #999;
    text-align: center;
    padding: 45px 0 16px;
  }
  .mascot{
    position: absolute;
    bottom: 0;
  }
}
</style>

